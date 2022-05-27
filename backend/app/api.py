from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Relative Imports
from app.models import Todo
from app.database import (
    create_todo,
    fetch_all_todos,
    update_todo,
    fetch_one_todo,
    remove_todo,
)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/todo/")
async def get_todo():
    response = await fetch_all_todos()
    return response


@app.get("/api/todo/{uid}/", response_model=Todo)
async def get_todo_by_id(uid):
    response = await fetch_one_todo(uid)
    if response:
        return response
    raise HTTPException(404, f"There is no task with the title {title}.")


@app.post("/api/todo/", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo)
    if response:
        return response
    raise HTTPException(400, "Something went wrong.")


@app.put("/api/todo/{uid}/", response_model=Todo)
async def put_todo(title: str, desc: str):
    response = await update_todo(uid, title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no task with ID {uid}.")


@app.delete("/api/todo/{uid}/")
async def delete_todo(uid):
    response = await remove_todo(uid)
    if response:
        return "Successfully deleted todo."
    raise HTTPException(404, f"There is no task with ID {uid}.")
