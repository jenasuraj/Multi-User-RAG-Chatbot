from fastapi import Request
from fastapi.responses import StreamingResponse
from lib.auth import get_auth_token
from schema.Agent import UserPayload
from graph.agent import graph
from langchain_core.messages import HumanMessage
from langchain_core.messages import BaseMessageChunk



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
                if metadata.get("langgraph_node") not in ["finalNode"]:
                    continue
                if not isinstance(msg,BaseMessageChunk): #isinstance checks whether the following first parameteer is the particular type or not
                    continue                         #it will check whether the msg is of type BaseMessageChunk or not, if it is then it will continue to the next iteration of the loop without executing the code below it.
                                                     #basemessage chunk is a class that presents a type and ensures whether the following one is a streaming chunk or not ..
                                                     #we are doing so because we dont want to stream the final message otherwise we'll get duplicate as well 
                if msg.content:                      # example : isinstance("hello", str) will return True because "hello" is a string, but isinstance(5, str) will return False because 5 is an integer, not a string.  
                    yield msg.content

    return StreamingResponse(stream_chat(), media_type="text/plain")