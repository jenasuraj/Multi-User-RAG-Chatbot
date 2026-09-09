from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from typing import Annotated
from pydantic import BaseModel, Field


class AgentHouse(TypedDict):
    name:str
    status:bool


class PlanObject(BaseModel):
    plan: str = Field(description="Description of the individual plan or step")
    agent: str = Field(description="Name of the agent responsible for executing the plan")
    id: int = Field(description="Unique identifier for the plan object")
    status: str = Field(description="Current status of the plan object, e.g., 'pending','completed'")    


class State(TypedDict):
    messages: Annotated[list, add_messages]
    planDescription: str
    plans: list[PlanObject]
    agents: list[AgentHouse]
    webSearch: Annotated[list, add_messages]
    weather: Annotated[list, add_messages]
    memory_agent: Annotated[list, add_messages]
    coding: Annotated[list, add_messages]
    auth_token: str
    normalResponse: bool
    calledInitialLongTermMemory: bool
    

class AgentState(BaseModel):
    planDescription: str = Field( description="Overall plan description for completing the user's request")
    plans: list[PlanObject] = Field(description="List of individual plans or steps to be executed by agents")
    agents: list[str] = Field( description="List of agents required to execute the plans")
    normalResponse: bool = Field(description="True when the final node should answer directly without sub-agents")


class AgentStateWithAuth(AgentState):
    auth_token: str


class UserPayload(BaseModel):
    query: str
