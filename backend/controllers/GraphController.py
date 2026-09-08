from fastapi import Request
from fastapi.responses import StreamingResponse
from lib.auth import get_auth_token
from schema.Agent import UserPayload
from graph.agent import graph
from langchain_core.messages import HumanMessage



async def call_chatbot(request: Request, payload: UserPayload):
    token = get_auth_token(request)
    async def stream_chat():
        async for part in graph.astream(
            {
                "messages": [HumanMessage(content=payload.query)],
                "auth_token": token,
            },
            stream_mode=["messages"],
            version="v2",
            subgraphs=True,  #do this to provide streaming from react agent as well ..
            ):
            if part["type"] == "messages":
                msg, metadata = part["data"]
                if msg.content:
                    yield msg.content

    return StreamingResponse(stream_chat(), media_type="text/plain")