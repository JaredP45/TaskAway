from fastapi import APIRouter
from apps.taskapp.endpoints import task
from apps.userapp.endpoints import user

router = APIRouter()
router.include_router(user.router)
router.include_router(task.router)
