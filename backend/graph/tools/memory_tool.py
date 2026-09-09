from typing import Annotated
import jwt
from langchain.tools import tool
from langgraph.prebuilt import InjectedState
from lib.auth import JWT_ALGORITHM, JWT_SECRET
from lib.db import db_session


MEMORY_TABLE = "long_term_memory"


@tool
def persist_user_memory(
    data: str,
    auth_token: Annotated[str, InjectedState("auth_token")],
) -> str:
    """Store an important long-term fact about the logged-in user."""
    try:
        payload = jwt.decode(auth_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = int(payload["sub"])

        with db_session() as db:
            db.query(
                f"INSERT INTO {MEMORY_TABLE} (user_id, data) VALUES (%s, %s)",
                (user_id, data),
            )

        return "Memory stored successfully."
    except Exception as error:
        return f"Could not store memory: {error}"


@tool
def fetch_user_memory(
    auth_token: Annotated[str, InjectedState("auth_token")],
) -> str:
    """Fetch all long-term facts stored for the logged-in user."""
    try:
        payload = jwt.decode(auth_token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = int(payload["sub"])

        with db_session() as db:
            memories = db.query(
                f"SELECT * FROM {MEMORY_TABLE} WHERE user_id = %s",
                (user_id,),
            )

        return str(memories)
    except Exception as error:
        return f"Could not fetch memory: {error}"
