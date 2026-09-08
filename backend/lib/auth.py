from datetime import datetime, timedelta, timezone
import os
import jwt
from dotenv import load_dotenv
from fastapi import HTTPException, Request, Response


load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "change-this-secret")
JWT_ALGORITHM = "HS256"
AUTH_COOKIE_NAME = "auth_token"
AUTH_EXPIRE_SECONDS = 60 * 60 * 24 * 7




def create_token(user_id: int, email: str) -> tuple[str, datetime]:
    expires_at = datetime.now(timezone.utc) + timedelta(seconds=AUTH_EXPIRE_SECONDS)
    token = jwt.encode(
        {
            "sub": str(user_id),
            "email": email,
            "exp": expires_at,
        },
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )
    return token, expires_at




def set_auth_cookie(response: Response, token: str, expires_at: datetime):
    response.set_cookie(
        key=AUTH_COOKIE_NAME,
        value=token,
        httponly=True,
        max_age=AUTH_EXPIRE_SECONDS,
        expires=expires_at,
        samesite="lax",
        secure=False,
        path="/",
    )




def get_auth_token(request: Request) -> str:
    token = request.cookies.get(AUTH_COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=401, detail="Login required")
    return token





def get_user_id_from_token(token: str) -> int:
    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM],
        )
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid user session")

        return int(user_id)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid session")



def get_user_id_from_request(request: Request) -> int:
    return get_user_id_from_token(get_auth_token(request))