from fastapi_users import models as user_models


class User(user_models.BaseUser):
    pass


class UserCreate(user_models.BaseUserCreate):
    pass


class UserUpdate(User, user_models.BaseUserUpdate):
    pass


class UserDB(User, user_models.BaseUserDB):
    pass
