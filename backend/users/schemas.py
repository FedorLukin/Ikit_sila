from ninja import Schema
from typing import Optional
from datetime import date


# Схема создания пользователя
class UserCreateSchema(Schema):
    username: str
    email: str
    password: str

    name: Optional[str] = None  
    vk_id: Optional[str] = None
    tg_id: Optional[str] = None
    institution: Optional[str] = None
    birth_date: Optional[date] = None


# Схема обновления пользователя
class UserUpdateSchema(Schema):
    username: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None
    password: Optional[str] = None

    vk_id: Optional[str] = None
    tg_id: Optional[str] = None
    institution: Optional[str] = None
    birth_date: Optional[date] = None


# Схема ответа пользователя
class UserResponseSchema(Schema):
    id: int
    username: str
    email: str

    name: Optional[str] = None
    vk_id: Optional[str] = None
    tg_id: Optional[str] = None
    institution: Optional[str] = None
    birth_date: Optional[date] = None


# Схема для запроса логина
class LoginSchema(Schema):
    username: str
    password: str


# Схема для ответа токена
class TokenSchema(Schema):
    access_token: str
    token_type: str = "bearer"