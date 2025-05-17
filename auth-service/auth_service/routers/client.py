from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from auth_service.models.clients_model import ClientsModel
from auth_service.schemas.client import *
from auth_service.utils.async_session import get_session, add_record_db, delete_record_db, update_record_db
from auth_service.utils.password_utils import PasswordUtils
from auth_service.utils.jwt_controller import create_token, decode_token
from auth_service.errors.errors import IncorrcetEmailOrPasswordError


client_router: APIRouter = APIRouter(prefix='/client')


@client_router.post('/login', response_model=ClientLoginResponse)
async def login_client(login_request: ClientLoginRequest, db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(ClientsModel).filter(ClientsModel.email == login_request.email))
    client: ClientsModel | None = result.scalars().first()
    if not client or not PasswordUtils.verify_password(login_request.password, str(client.password)):
        ### logger.error(f'Client {login_request.email} failed to log in')
        raise IncorrcetEmailOrPasswordError(detail='Incorrcet email')

    ### logger.info(f'Client {client.email} logged in')
    return ClientLoginResponse(
        status='ok',
        name=client.name,
        JWT=create_token({
            'id': client.id,
            'email': str(client.email),
            'name': client.name,
        })
    )


@client_router.post('/register', response_model=ClientRegisterResponse)
async def register_client(register_request: ClientRegisterRequest, db: AsyncSession = Depends(get_session)):
    new_client: ClientsModel = ClientsModel(
        name=str(register_request.name),
        email=str(register_request.email),
        password=PasswordUtils.hash_password(register_request.password),
   )

    await add_record_db(db, new_client)

    ### logger.info(f'client {new_client.email} registered')
    return ClientRegisterResponse(
        status='ok',
        name=new_client.name,
        JWT=create_token({
            'id': new_client.id,
            'email': str(new_client.email),
            'name': new_client.name,
        })
    )
