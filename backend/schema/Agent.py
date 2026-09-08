from langchain.agents import AgentState
from typing_extensions import TypedDict
from langgraph.graph.message import add_messages
from typing import Annotated
from pydantic import BaseModel


class State(TypedDict):
    messages: Annotated[list, add_messages]
    auth_token: str


class AgentStateWithAuth(AgentState):
    auth_token: str


class UserPayload(BaseModel):
    query: str