from pydantic import BaseModel, field_validator, EmailStr

from auth_service.errors.errors import PasswordValidateError
from auth_service.utils.password_utils import PasswordUtils


class ClientRegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    telegram: str
    about: str
    tag: str = ''
    is_speaker: bool
    speaker_description: str = ''

    # TODO: 
    @field_validator('email', 'full_name', 'telegram', 'about', 'is_speaker')
    def not_empty(cls, field: str | int | EmailStr | bool) -> str | int | bool:
        if isinstance(field, str) and not field.strip():
            raise ValueError('The field must not be empty')
        return field
    
    @field_validator('password')
    def validate_password(cls, password: str) -> str:
        status, error = PasswordUtils.is_password_valid(password)
        if not status:
            raise PasswordValidateError(detail=error)
        return password
