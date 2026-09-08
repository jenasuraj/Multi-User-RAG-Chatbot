from pydantic import BaseModel

class RegisterCred(BaseModel):
    name: str
    email: str
    password: str


class LoginCred(BaseModel):
    email: str
    password: str