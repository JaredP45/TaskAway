# Module Imports
import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

# Relative Imports
from apps.routes.api import router
from config import settings


app = FastAPI()
app.include_router(router)

@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(str(settings.DB_URL))
    app.mongodb = app.mongodb_client[str(settings.DB_NAME)]


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
