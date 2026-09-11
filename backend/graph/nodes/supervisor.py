from graph.llm import synthesizer_llm
from graph.prompts import SUPERVISOR_SYSTEM_PROMPT as SYSTEM_PROMPT
from langchain_core.messages import AIMessage, RemoveMessage, SystemMessage
from langgraph.graph.message import REMOVE_ALL_MESSAGES
from schema.Agent import AgentState, State
import jwt
from lib.auth import JWT_ALGORITHM, JWT_SECRET
from lib.db import db_session
MEMORY_TABLE = "long_term_memory"
THREAD_TABLE = "chat_threads"
MESSAGE_CHECK_MIN_CALLS = 5
MAX_MESSAGE_TOKENS = 500
KEEP_LAST_MESSAGES = 5




def calculateToken(messages):
    print("calculating token ...")
    tokenCount = 0
    for message in messages:
        content = getattr(message, "content", "")
        if isinstance(message, dict):
            content = message.get("content", "")
        if isinstance(content, str):
            tokenCount += len(content) // 4
        if isinstance(content, list):
            for item in content:
                if isinstance(item, dict):
                    tokenCount += len(item.get("text", "")) // 4

    return tokenCount






def markThreadBad(auth_token: str, thread_id: str):
    if not thread_id:
        return
    try:
        payload = jwt.decode(auth_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = int(payload["sub"])
        with db_session() as db:
            db.query(
                f"UPDATE {THREAD_TABLE} SET status = %s WHERE thread_id = %s AND user_id = %s",
                ("bad", thread_id, user_id),
            )
    except Exception as error:
        print(f"Could not mark thread as bad: {error}")





async def fetchAllMemoryContent(auth_token):
    try:
        payload = jwt.decode(auth_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = int(payload["sub"])
        with db_session() as db:
            memories = db.query(
            f"SELECT * FROM {MEMORY_TABLE} WHERE user_id = %s",
            (user_id,)
        )
        memory_text = "\n".join(memory[2] for memory in memories)
        return memory_text
    except Exception as error:
        return f"Could not fetch memory: {error}"




def boolChecker(value):
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.lower() == "true"
    return bool(value)




async def summariseOldMessages(messages):
    print("Summarising old messages ...")
    response = await synthesizer_llm.ainvoke([SystemMessage(content="you are a summariser agent, so summarise the entire chat you've got"),
                                        *messages])
    return AIMessage(content=response.content)




async def manageContextWindow(state: State, thread_id: str):
    messages = state.get("messages", [])
    if state.get("agentCallCount", 0) < MESSAGE_CHECK_MIN_CALLS:
        return messages, None
    if calculateToken(messages) <= MAX_MESSAGE_TOKENS:
        return messages, None
    if len(messages) <= KEEP_LAST_MESSAGES:
        return messages, None
    last_messages = messages[-KEEP_LAST_MESSAGES:]
    old_messages = messages[:-KEEP_LAST_MESSAGES]
    summarisedContext = await summariseOldMessages(old_messages)
    compressed_messages = [summarisedContext, *last_messages]
    markThreadBad(state["auth_token"], thread_id)
    return compressed_messages, [
        RemoveMessage(id=REMOVE_ALL_MESSAGES),
        *compressed_messages,
    ]





async def supervisor(state: State):
    messages_for_supervisor, messages_update = await manageContextWindow(state,state.get("thread_id", ""))

    if not state.get("calledInitialLongTermMemory") is True:
        long_term_memory = await fetchAllMemoryContent(state["auth_token"])
    else:
        long_term_memory = state.get("longTermMemory", "")

    response = await synthesizer_llm.with_structured_output(AgentState).ainvoke([
        SystemMessage(content=SYSTEM_PROMPT),
        *messages_for_supervisor])
    normal_response = boolChecker(response.normalResponse)

    plans = []
    for planItem in response.plans:
        payload = {}
        payload["id"] = planItem.id
        payload["agent"] = planItem.agent
        payload["plan"] = planItem.plan
        payload["status"] = planItem.status
        plans.append(payload)

    print("Supervisor plans created:", plans)
    if normal_response or len(response.agents) == 0:
        print("Supervisor selected direct response")
        result = {
            "planDescription": "",
            "plans": [],
            "agents": [{}],
            "normalResponse": True,
            "calledInitialLongTermMemory": True,
            "longTermMemory": long_term_memory,
            "agentCallCount": state.get("agentCallCount", 0) + 1
            }
        if messages_update:
            result["messages"] = messages_update
        return result

    agentHouse = {}
    for agent in response.agents:
        agentHouse[agent] = False

    print("Supervisor handoff ready")
    result = {
        "planDescription": response.planDescription,
        "plans": plans,
        "agents": [agentHouse],
        "normalResponse": normal_response,
        "calledInitialLongTermMemory": True,
        "longTermMemory": long_term_memory,
        "agentCallCount": state.get("agentCallCount", 0) + 1
       }
    if messages_update:
        result["messages"] = messages_update
    return result