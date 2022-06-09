# Module Imports
from typing import Optional
from fastapi import APIRouter, Body, HTTPException, status, Request
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder

# Relative Imports
from apps.userapp.models.user import UserModel, UpdateUserModel


router = APIRouter(prefix="/users", tags=["Users App"], responses={404: {"description": "Not found"}})


# Create Router
@router.post("/", response_description="Create a user")
async def post_user(request: Request, user: UserModel = Body(...)):
    user = jsonable_encoder(user)
    new_user = await request.app.mongodb["users"].insert_one(user)
    created_user = await request.app.mongodb["user"].find_one({"_id": new_user.inserted_id})

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)


# Retrieve Router(s)
@router.get("/", response_description="List all users")
async def get_all_users(request: Request):
    users = []
    cursor = request.app.mongodb["users"].find().to_list(length=100)
    for document in await cursor:
        users.append(document)
    return users


@router.get("/{uid}", response_description="Get a single user")
async def get_user_by_id(uid: str, request: Request):
    if (user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        return user
    raise HTTPException(status_code=404, detail=f"There is no user with ID {uid}.")


# Update Router
@router.put("/{uid}", response_description="Update a user")
async def put_user(uid: str, request: Request, user: UpdateUserModel = Body(...)):
    user = { _key: _value for _key, _value in user.dict().items() if _value is not None }

    if len(user) >= 1:
        set_user = await request.app.mongodb["users"].update_one({"_id": uid}, {"$set": user})

        if set_user.modified_count == 1:
            if (updated_user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
                return updated_user
    
    if (existing_user := await request.app.mongodb["users"].find_one({"_id": uid})) is not None:
        return existing_user

    raise HTTPException(status_code=404, detail=f"There is no user with ID {uid}.")


# Delete Router
@router.delete("/{uid}", response_description="Delete user")
async def delete_user(uid: str, request: Request):
    deleted_user = await request.app.mongodb["users"].delete_one({"_id": uid})

    if deleted_user.deleted_count == 1:
        return Response(status_code=status.HTTP_204_NO_CONTENT)
    raise HTTPException(status_code=404, detail=f"There is no user with ID {uid}.")
