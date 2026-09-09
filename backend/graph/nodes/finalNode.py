from graph.agent import State
from graph.llm import synthesizer_llm
from langchain_core.messages import SystemMessage, AIMessage, HumanMessage
from graph.prompts import FINAL_AGENT_SYSTEM_PROMPT
from graph.prompts import DIRECT_RESPONSE_SYSTEM_PROMPT



def is_direct_response(state: State):
    normal_response = state.get("normalResponse", False)
    if isinstance(normal_response, str):
        normal_response = normal_response.lower() == "true"

    agents = state.get("agents", [])
    no_agents = len(agents) == 0 or len(agents[0].keys()) == 0
    return no_agents and normal_response is True



async def finalNode(state: State):
    print("Final node entered",state)
    if is_direct_response(state):
        print("Final node generating direct response")
        response = await synthesizer_llm.ainvoke([
            SystemMessage(content=DIRECT_RESPONSE_SYSTEM_PROMPT),
            *state["messages"]
        ])
        return {"messages": [AIMessage(content=response.content)]}

    plans = state["plans"]
    final_context = f"""
    Original conversation:
    {state["messages"]}

    Supervisor plan description:
    {state["planDescription"]}

    Execution plans:
    {plans}
    """

    if any(plan["agent"] == "weather" for plan in plans):
        final_context += f"""
        Weather memory:
        {state["weather"]}
        """

    if any(plan["agent"] == "web_search" for plan in plans):
        final_context += f"""
        Web search memory:
        {state["webSearch"]}
        """

    if any(plan["agent"] == "memory_agent" for plan in plans):
        final_context += f"""
        Memory/document context:
        {state.get("memory_agent", [])}
        """

    if any(plan["agent"] == "coding" for plan in plans):
        final_context += f"""
        Coding memory:
        {state["coding"]}
        """

    response = await synthesizer_llm.ainvoke([
        SystemMessage(content=FINAL_AGENT_SYSTEM_PROMPT),
        HumanMessage(content=final_context),
    ])

    print("✅ Final node completed")
    return {"messages": [AIMessage(content=response.content)]}
