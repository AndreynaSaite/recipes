from pydantic import BaseModel


class ClientLoginResponse(BaseModel):
    status: str
    name: str
    JWT: str
