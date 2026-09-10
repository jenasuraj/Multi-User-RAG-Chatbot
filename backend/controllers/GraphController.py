from fastapi import Depends, HTTPException, Request
from fastapi.responses import StreamingResponse
from lib.auth import get_auth_token, get_user_id_from_request, get_user_id_from_token
from lib.db import Database, get_db
from schema.Agent import UserPayload
from graph.agent import graph
from langchain_core.messages import HumanMessage
from langchain_core.messages import BaseMessageChunk

async def list_chat_threads(request: Request, db: Database = Depends(get_db)):
    user_id = get_user_id_from_request(request)
    threads = db.query(
        "SELECT id, thread_id, status, user_id FROM chat_threads WHERE user_id = %s ORDER BY id DESC",
        (user_id,),
    )
    return [
        {
            "id": thread[0],
            "thread_id": thread[1],
            "status": thread[2],
            "user_id": thread[3],
        }
        for thread in threads
    ]


async def create_chat_thread(request: Request, db: Database = Depends(get_db)):
    user_id = get_user_id_from_request(request)
    thread_count = db.query(
        "SELECT COUNT(*) FROM chat_threads WHERE user_id = %s",
        (user_id,),
    )[0][0]
    thread_id = f"user_{user_id}_{thread_count + 1}"
    thread = db.query(
        """
        INSERT INTO chat_threads (thread_id, status, user_id)
        VALUES (%s, %s, %s)
        RETURNING id, thread_id, status, user_id
        """,
        (thread_id, "good", user_id),
    )[0]
    return {
        "id": thread[0],
        "thread_id": thread[1],
        "status": thread[2],
        "user_id": thread[3],
    }


async def call_chatbot(request: Request, payload: UserPayload, db: Database = Depends(get_db)):
    token = get_auth_token(request)
    user_id = get_user_id_from_token(token)
    thread = db.query(
        "SELECT id FROM chat_threads WHERE thread_id = %s AND user_id = %s",
        (payload.thread_id, user_id),
    )
    if not thread:
        raise HTTPException(status_code=404, detail="Thread not found")

    async def stream_chat():
        config = {"configurable": {"thread_id": payload.thread_id}}
        async for part in graph.astream(
            {
                "messages": [HumanMessage(content=payload.query)],
                "auth_token": token,
            },
            config,
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