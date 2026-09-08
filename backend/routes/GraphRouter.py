from fastapi import APIRouter
from controllers.GraphController import call_chatbot


router = APIRouter()
router.post("/")(call_chatbot)