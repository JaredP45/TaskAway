# Module Imports
import uvicorn
from fastapi import FastAPI

# Relative Imports
from apps.taskaway.api.routers import router as task_router

app = FastAPI()

app.include_router(task_router, tags=["tasks"])


if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)
