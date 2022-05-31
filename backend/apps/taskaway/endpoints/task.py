# Module Imports
from typing import Optional
from fastapi import APIRouter, Body, HTTPException, status, Request
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder

# Relative Imports
from apps.taskaway.models.task import TaskModel, UpdateTaskModel


router = APIRouter(prefix="/tasks", tags=["Task"], responses={404: {"description": "Not found"}})


# Create Router
@router.post("/", response_description="Create a task")
async def post_task(request: Request, task: TaskModel = Body(...)):
    task = jsonable_encoder(task)
    new_task = await request.app.mongodb["tasks"].insert_one(task)
    created_task = await request.app.mongodb["tasks"].find_one({"_id": new_task.inserted_id})

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_task)


# Retrieve Router(s)
@router.get("/", response_description="List all tasks")
async def get_all_tasks(request: Request):
    tasks = []
    cursor = request.app.mongodb["tasks"].find().to_list(length=100)
    for document in await cursor:
        tasks.append(document)
    return tasks


@router.get("/{uid}", response_description="Get a single task")
async def get_task_by_id(uid: str, request: Request):
    if (task := await request.app.mongodb["tasks"].find_one({"_id": uid})) is not None:
        return task
    raise HTTPException(status_code=404, detail=f"There is no task with ID {uid}.")


# Update Router
@router.put("/{uid}", response_description="Update a task")
async def put_task(uid: str, request: Request, task: UpdateTaskModel = Body(...)):
    task = { _key: _value for _key, _value in task.dict().items() if _value is not None }

    if len(task) >= 1:
        set_task = await request.app.mongodb["tasks"].update_one({"_id": uid}, {"$set": task})

        if set_task.modified_count == 1:
            if (updated_task := await request.app.mongodb["tasks"].find_one({"_id": uid})) is not None:
                return updated_task
    
    if (existing_task := await request.app.mongodb["tasks"].find_one({"_id": uid})) is not None:
        return existing_task

    raise HTTPException(status_code=404, detail=f"There is no task with ID {uid}.")


# Delete Router
@router.delete("/{uid}", response_description="Delete task")
async def delete_task(uid: str, request: Request):
    deleted_task = await request.app.mongodb["tasks"].delete_one({"_id": uid})

    if deleted_task.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"There is no task with ID {uid}.")
