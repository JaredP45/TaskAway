import os
import motor.motor_asyncio
from .models import Todo

client = motor.motor_asyncio.AsyncIOMotorClient()

db = client.TaskAwayCluster
collection = db.todo


async def fetch_all_todos():
    todos = []
    cursor = collection.find({})
    async for document in cursor:
        todos.append(Todo(**document))
    return todos


async def fetch_one_todo(uid):
    document = await collection.find_one({"uid": uid}, {"_id": 0})
    return document


async def create_todo(todo):
    document = todo.dict()
    await collection.insert_one(document)
    result = await fetch_one_todo(todo.uid)
    return result


async def update_todo(uid, title, desc):
    await collection.update_one({"uid": uid}, {"$set": {"title": title, "description": desc}})
    result = await fetch_one_todo(uid)
    return result


async def remove_todo(uid):
    await collection.delete_one({"uid": uid})
    return True
