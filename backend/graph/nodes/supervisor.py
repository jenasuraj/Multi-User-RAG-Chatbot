from graph.llm import synthesizer_llm
from graph.prompts import SUPERVISOR_SYSTEM_PROMPT as SYSTEM_PROMPT
from langchain_core.messages import SystemMessage
from schema.Agent import AgentState, State
import jwt
from lib.auth import JWT_ALGORITHM, JWT_SECRET
from lib.db import db_session
MEMORY_TABLE = "long_term_memory"




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


async def supervisor(state: State):
    if not state.get("calledInitialLongTermMemory") is True:
        long_term_memory = await fetchAllMemoryContent(state["auth_token"])
    else:
        long_term_memory = state.get("longTermMemory", "")

    response = await synthesizer_llm.with_structured_output(AgentState).ainvoke([
        SystemMessage(content=SYSTEM_PROMPT),
        *state["messages"]])
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
        return {
            "planDescription": "",
            "plans": [],
            "agents": [{}],
            "normalResponse": True,
            "calledInitialLongTermMemory": True,
            "longTermMemory": long_term_memory
            }

    agentHouse = {}
    for agent in response.agents:
        agentHouse[agent] = False

    print("Supervisor handoff ready")
    return {
        "planDescription": response.planDescription,
        "plans": plans,
        "agents": [agentHouse],
        "normalResponse": normal_response,
        "calledInitialLongTermMemory": True,
        "longTermMemory": long_term_memory
       }
