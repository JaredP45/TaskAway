# Module Imports
from typing import Optional
from fastapi import APIRouter, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# Relative Imports
from apps.taskaway.models import TaskModel, UpdateTaskModel
from apps.taskaway.api.requests import (
    create_task,
    fetch_all_tasks,
    update_task,
    fetch_one_task,
    remove_task,
)

router = APIRouter()

# Create Router
@router.post("/api/taskaway/", response_description="Create a task")
async def post_task(task: TaskModel = Body(...)):
    response = await create_task(task)

    if response:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=response)
    raise HTTPException(400, "Something went wrong.")


# Retrieve Router(s)
@router.get("/api/taskaway/", response_description="List all tasks")
async def get_all_tasks():
    response = await fetch_all_tasks()
    return response


@router.get("/api/taskaway/{uid}/", response_description="Get a single task")
async def get_task_by_id(uid: str):
    response = await fetch_one_task(uid)

    if response:
        return response
    raise HTTPException(status_code=404, detail=f"There is no task with ID {uid}.")


# Update Router
@router.put("/api/taskaway/{uid}/", response_description="Update a task")
async def put_task(uid: str, task: UpdateTaskModel = Body(...)):
    response = await update_task(uid, task)

    if response:
        return response
    raise HTTPException(status_code=404, detail=f"There is no task with ID {uid}.")


# Delete Router
@router.delete("/api/taskaway/{uid}/", response_description="Delete task")
async def delete_task(uid: str):
    response = await remove_task(uid)

    if response:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"There is no task with ID {uid}.")
