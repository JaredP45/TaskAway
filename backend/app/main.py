from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .models import Todo
from .database import (
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


@app.get("/api/todo/{title}/", response_model=Todo)
async def get_todo_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no task with the title {title}.")


@app.post("/api/todo/", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong.")


@app.put("/api/todo/{title}/", response_model=Todo)
async def put_todo(title: str, desc: str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no taks with the title {title}.")


@app.delete("/api/todo/{title}/")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Successfully deleted todo."
    raise HTTPException(404, f"There is no task with the tite {title}.")
