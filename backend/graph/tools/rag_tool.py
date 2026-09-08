from typing import Annotated
import jwt
from langchain.tools import tool
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_postgres import PGVector
from langgraph.prebuilt import InjectedState
from lib.auth import JWT_ALGORITHM, JWT_SECRET
from lib.db import PGVECTOR_DATABASE_URL


embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-mpnet-base-v2"
)


@tool
def rag_retrieval(
    query: str,
    auth_token: Annotated[str, InjectedState("auth_token")],
) -> str:
    """Search the logged-in user's uploaded PDF chunks."""
    payload = jwt.decode(
        auth_token,
        JWT_SECRET,
        algorithms=[JWT_ALGORITHM],
    )
    user_id = payload.get("sub")

    if not user_id:
        return "Invalid user session."

    collection_name = f"user_{user_id}"

    vector_store = PGVector(
        embeddings=embeddings,
        collection_name=collection_name,
        connection=PGVECTOR_DATABASE_URL,
        use_jsonb=True,
    )

    documents = vector_store.similarity_search(query, k=3)

    if not documents:
        return "No matching PDF context found."

    return "\n\n".join(
        document.page_content for document in documents
    )
