# Module Imports
import uvicorn
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

# Relative Imports
from apps.taskaway.api.routers import router as task_router
from config import settings

app = FastAPI()


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(str(settings.DB_URL))
    app.mongodb = app.mongodb_client[str(settings.DB_NAME)]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(task_router, tags=["tasks"])

if __name__ == '__main__':
    uvicorn.run('main:app', host=settings.HOST, port=settings.PORT, reload=settings.DEBUG_MODE)
