from fastapi import APIRouter
from controllers.GraphController import call_chatbot, create_chat_thread, list_chat_threads, mark_chat_thread_bad


router = APIRouter()
router.get("/threads")(list_chat_threads)
router.post("/threads")(create_chat_thread)
router.patch("/threads/bad")(mark_chat_thread_bad)
router.post("/")(call_chatbot)
