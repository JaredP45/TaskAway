# Module Imports
from pydantic import BaseModel, Field
from datetime import datetime
import uuid
from typing import Optional


class UserModel(BaseModel):
    '''
        uid - unique id
        email - user email later used for notifications
        first_name - the only name needed from user
        password - needed for logging
    '''

    uid: str = Field(default_factory=uuid.uuid4, alias="_id")
    email: str = Field(...)
    first_name: str = Field(...)
    password: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "email": "john@email.com",
                "first_name": "John",
                "password": "pAsSwORdPaSsWoRd",
            }
        }


class UpdateUserModel(BaseModel):
    '''
        Update User with optional fields
    '''

    email: Optional[str]
    first_name: Optional[str]
    password: Optional[datetime]

    class Config:
        schema_extra = {
            "example": {
                "email": "john@email.com",
                "first_name": "John",
                "password": "pAsSwORdPaSsWoRd",
            }
        }
