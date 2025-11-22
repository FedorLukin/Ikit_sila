from ninja import Router
from django.contrib.auth import get_user_model, authenticate
from django.db import IntegrityError
from ninja_jwt.authentication import JWTAuth
from ninja_jwt.tokens import RefreshToken
from ninja.errors import HttpError
from .schemas import UserCreateSchema, UserUpdateSchema, UserResponseSchema, LoginSchema, TokenSchema

User = get_user_model()
router = Router()


@router.post("/register", response=UserResponseSchema)
def register(request, payload: UserCreateSchema):
    try:
        user = User.objects.create_user(
            username=payload.username,
            email=payload.email,
            password=payload.password
        )
    except IntegrityError:
        raise HttpError(400, "Пользователь с таким username или email уже существует")
    user.save()
    return user


@router.patch("/me", auth=JWTAuth(), response=UserResponseSchema)
def update_me(request, payload: UserUpdateSchema):
    user = request.auth
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(user, field, value)
    user.save()
    return user


@router.post("/login", response=TokenSchema)
def login(request, payload: LoginSchema):
    """
    Логин пользователя. Возвращает JWT токен.
    """
    user = authenticate(username=payload.username, password=payload.password)

    if not user:
        raise HttpError(401, "Неверный username или пароль")

    # Генерация токена
    refresh = RefreshToken.for_user(user)
    return TokenSchema(access_token=str(refresh.access_token))


