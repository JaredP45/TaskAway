# Module Imports
import uvicorn
from fastapi import FastAPI
from fastapi_users import FastAPIUsers
from fastapi_users.db import MongoDBUserDatabase
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

# Relative Imports
from config import settings
from apps.userapp.auth.auth import jwt_authentication
from apps.taskapp.router.task_router import get_tasks_router
from apps.userapp.router.user_router import get_users_router
from apps.userapp.models.user import User, UserCreate, UserUpdate, UserDB



app = FastAPI()

@app.on_event("startup")
async def configure_db_and_routes():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL, uuidRepresentation="standard")
    app.db = app.mongodb_client.get_default_database()
    user_db = MongoDBUserDatabase(UserDB, app.db["users"])

    app.fastapi_users = FastAPIUsers(
        user_db,
        [jwt_authentication],
        User,
        UserCreate,
        UserUpdate,
        UserDB,
    )

    app.include_router(get_tasks_router(app))
    app.include_router(get_users_router(app))

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8001/tasks",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run('main:app', host=settings.HOST, port=settings.PORT, reload=settings.DEBUG_MODE)
