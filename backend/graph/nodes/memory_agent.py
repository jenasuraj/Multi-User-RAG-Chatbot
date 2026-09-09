from schema.Agent import State
from graph.llm import agent_llm
from typing import Annotated, Sequence
from typing_extensions import TypedDict
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage, BaseMessage
from langchain.agents import create_agent
from langchain.tools import tool
from graph.prompts import MEMORY_AGENT_PROMPT as prompt
from langgraph.graph.message import add_messages


class MemoryAgentState(TypedDict):
    messages: Annotated[Sequence[BaseMessage], add_messages]
    auth_token: str



async def memory_agent(state: State):
    from graph.tools.memory_tool import fetch_user_memory, persist_user_memory
    from graph.tools.rag_tool import rag_retrieval
    print("Memory agent node entered")
    plans = state["plans"]
    pending_memory_agent_plans = [
        plan for plan in plans
        if plan["agent"] == "memory_agent" and plan["status"] == "pending"
    ]

    @tool
    def read_plan():
        """Read only the memory_agent plans assigned by the supervisor."""
        print("Memory agent calling read_plan")
        if len(pending_memory_agent_plans) == 0:
            return "There are no todo plans as of now, please respond normally"
        return pending_memory_agent_plans

    @tool
    def write_plan(id: int, status: str):
        """Update a memory_agent plan status by its structured plan id."""
        print(f"Memory agent calling write_plan: {id} -> {status}")
        if status not in ("pending", "completed"):
            return "Invalid status. Use only 'pending' or 'completed'."
        for plan in plans:
            if plan["id"] == id and plan["agent"] == "memory_agent":
                plan["status"] = status
                return f"plan {id} written successfully with status {status}"
        return f"No memory_agent plan found with id {id}"

    agent = create_agent(
        model=agent_llm,
        system_prompt=prompt,
        state_schema=MemoryAgentState,
        tools=[
            rag_retrieval,
            fetch_user_memory,
            persist_user_memory,
            read_plan,
            write_plan,
        ],
    )

    agent_messages = [
        SystemMessage(content=f"""
        Past memory_agent observations / context:
        {state.get("memory_agent", [])}

        Current pending memory_agent plans:
        {pending_memory_agent_plans}

        Important:
        - Use past memory only as context.
        - Do not assume a current plan is completed just because a similar old task was completed.
        - You must complete the current pending memory_agent plans or explain why you cannot.
        """),
        HumanMessage(content="Execute the current pending memory_agent plans now."),
    ]
    response = await agent.ainvoke({
        "messages": agent_messages,
        "auth_token": state["auth_token"],
    })
    agentHouse = state["agents"][0]
    agentHouse["memory_agent"] = True
    print("Memory agent node completed")
    return {
        "memory_agent": [AIMessage(content=response["messages"][-1].content)],
        "plans": plans,
        "agents": [agentHouse],
    }
