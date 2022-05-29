# Module Imports
from fastapi import Request
import motor.motor_asyncio
from fastapi.encoders import jsonable_encoder

# Relative Imports
from apps.taskaway.models.models import TaskModel 

client = motor.motor_asyncio.AsyncIOMotorClient()

db = client.TaskAwayCluster
collection = db.taskaway

# Create Request
async def create_task(task):
    task = jsonable_encoder(task)
    new_task = await collection.insert_one(task)
    created_task = await collection.find_one({"_id": new_task.inserted_id})
    return created_task


# Fetch Requests
async def fetch_all_tasks():
    tasks = []
    cursor = collection.find({}).to_list(length=100)
    for document in await cursor:
        tasks.append(document)
    return tasks


async def fetch_one_task(uid):
    document = await collection.find_one({"_id": uid})
    return document


# Update Request
async def update_task(uid, task):
    task = { _key: _value for _key, _value in task.dict().items() if _value is not None }

    if len(task) >= 1:
        set_task = await collection.update_one({"_id": uid}, {"$set": task})

        if set_task.modified_count == 1:
            if (updated_task := await fetch_one_task(uid)) is not None:
                return updated_task
    
    if (existing_task := await fetch_one_task(uid)) is not None:
        return existing_task


# Remove Request
async def remove_task(uid: str):
    deleted_task = await collection.delete_one({"_id": uid})
    return True
