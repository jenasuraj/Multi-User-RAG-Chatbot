from fastapi import APIRouter
from controllers.GraphController import call_chatbot, create_chat_thread, list_chat_threads


router = APIRouter()
router.get("/threads")(list_chat_threads)
router.post("/threads")(create_chat_thread)
router.post("/")(call_chatbot)
