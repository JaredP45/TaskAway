# Module Imports
from typing import Optional
from fastapi import APIRouter, Body, HTTPException, status, Request
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder

# Relative Imports
from apps.userapp.models.user import UserDB
from apps.userapp.auth.auth import jwt_authentication
from apps.config import settings



def get_users_router(app):
    users_routers = APIRouter(prefix="/users", tags=["Users App"], responses={404: {"description": "Not found"}})

    def on_after_register(user: UserDB, request: Request):
        print(f"User {user.id} has registered.")

    def on_after_forgot_password(user: UserDB, token: str, request: Request):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    users_router.include_router(
        app.fastapi_users.get_auth_router(jwt_authentication),
        prefix="/auth/jwt",
        tags=["auth"],
    )
    users_router.include_router(
        app.fastapi_users.get_register_router(on_after_register),
        prefix="/auth",
        tags=["auth"],
    )
    users_router.include_router(
        app.fastapi_users.get_reset_password_router(
            settings.JWT_SECRET_KEY, after_forgot_password=on_after_forgot_password
        ),
        prefix="/auth",
        tags=["auth"],
    )
    users_router.include_router(
        app.fastapi_users.get_users_router(), prefix="/users", tags=["users"]
    )

    return users_router