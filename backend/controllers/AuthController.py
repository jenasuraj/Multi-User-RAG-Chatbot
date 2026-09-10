import bcrypt
from fastapi import Depends, HTTPException, Response, status
from pydantic import BaseModel
from lib.auth import AUTH_COOKIE_NAME, create_token, set_auth_cookie
from lib.db import Database, get_db
from schema.AuthSchema import RegisterCred,LoginCred




async def register_user(user_credentials: RegisterCred,response: Response,db: Database = Depends(get_db)):

    existing_user = db.query("SELECT id FROM users WHERE email = %s", (user_credentials.email,))
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists, please login",
        )
    password_hash = bcrypt.hashpw(
        user_credentials.password.encode("utf-8"),
        bcrypt.gensalt(),
    ).decode("utf-8")

    user = db.query(
        """
        INSERT INTO users (name, email, password)
        VALUES (%s, %s, %s)
        RETURNING id, name, email
        """,
        (user_credentials.name, user_credentials.email, password_hash))[0]

    token, expires_at = create_token(user[0], user[2])
    set_auth_cookie(response, token, expires_at)

    return {
        "message": "Registered successfully",
        "user": {
            "id": user[0],
            "name": user[1],
            "email": user[2],
        },
    }






async def login_user(user_credentials: LoginCred,response: Response,db: Database = Depends(get_db)):

    user = db.query("SELECT id, name, email, password FROM users WHERE email = %s",(user_credentials.email,))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User does not exist, register first",
        )

    user = user[0]
    password_hash = user[3]
    if not bcrypt.checkpw(
        user_credentials.password.encode("utf-8"),
        password_hash.encode("utf-8"),
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    token, expires_at = create_token(user[0], user[2])
    set_auth_cookie(response, token, expires_at)

    return {
        "message": "Logged in successfully",
        "user": {
            "id": user[0],
            "name": user[1],
            "email": user[2],
        },
    }


async def logout_user(response: Response):
    response.delete_cookie(
        key=AUTH_COOKIE_NAME,
        path="/",
        samesite="lax",
        secure=False,
    )
    return {"message": "Logged out successfully"}
