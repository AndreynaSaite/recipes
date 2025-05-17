from pydantic import BaseModel


class ClientRegisterResponse(BaseModel):
    status: str
    name: str
    JWT: str
