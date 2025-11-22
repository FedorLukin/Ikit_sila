from ninja import Router
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from ninja.errors import HttpError

from .schemas import UserCreateSchema, UserResponseSchema

router = Router()
User = get_user_model()


@router.post("/register", response=UserResponseSchema)
def register(request, payload: UserCreateSchema):

    try:
        user = User.objects.create_user(
            username=payload.username,
            email=payload.email,
            name=payload.name,
            password=payload.password
        )
    except IntegrityError:
        raise HttpError(400, "Пользователь с таким username или email уже существует")

    return UserResponseSchema(
        id=user.id,
        username=user.username,
        email=user.email,
        name=user.name
    )
