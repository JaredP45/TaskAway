from fastapi import APIRouter
from apps.taskaway.endpoints import task

router = APIRouter()
router.include_router(task.router)
