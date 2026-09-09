from graph.llm import supervisor_llm
from graph.prompts import SUPERVISOR_SYSTEM_PROMPT as SYSTEM_PROMPT
from langchain_core.messages import SystemMessage
from schema.Agent import AgentState, State


def boolChecker(value):
    if isinstance(value, bool):
        return value
    if isinstance(value, str):
        return value.lower() == "true"
    return bool(value)


async def supervisor(state: State):

    response = await supervisor_llm.with_structured_output(AgentState).ainvoke([
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
    }