from fastapi import APIRouter
from controllers.AuthController import login_user, register_user


router = APIRouter()

router.post("/register")(register_user)
router.post("/login")(login_user)