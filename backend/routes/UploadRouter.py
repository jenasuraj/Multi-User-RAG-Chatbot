from fastapi import APIRouter
from controllers.UploadController import upload_pdf


router = APIRouter()
router.post("/pdf")(upload_pdf)