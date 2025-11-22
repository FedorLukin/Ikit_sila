from ninja import Schema


class UserCreateSchema(Schema):
    username: str
    email: str
    name: str
    password: str


class UserResponseSchema(Schema):
    id: int
    username: str
    email: str
    name: str
