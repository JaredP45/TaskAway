# Module Imports
from pydantic import BaseModel, Field
from datetime import datetime
import uuid
from typing import Optional


class TaskModel(BaseModel):
    '''
        uid - unique ID
        title - title of task
        description - task description
        created_on - day task was created on
        completed - if task was completed
    '''
    
    uid: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    created_on: datetime = Field(...)
    expires_on: datetime = Field(...)
    completed_on: datetime = Field(...)
    completed: bool = False

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "title": "Task Title",
                "description": "The context or instructions for the task.",
                "created_on": "2022-05-28 00:00:00.000000",
                "expires_on": "2022-05-28 00:00:00.000000",
                "completed_on": "2022-05-28 00:00:00.000000",
                "completed": True,
            }
        }


class UpdateTaskModel(BaseModel):
    '''
        Update Todo with optional fields
    '''

    title: Optional[str]
    description: Optional[str]
    created_on: Optional[datetime]
    expires_on: Optional[datetime]
    completed_on: Optional[datetime]
    completed: Optional[bool] 

    class Config:
        schema_extra = {
            "example": {
                "title": "Task Title",
                "description": "The context or instructions for the task.",
                "created_on": "2022-05-28 00:00:00.000000",
                "expires_on": "2022-05-28 00:00:00.000000",
                "completed_on": "2022-05-28 00:00:00.000000",
                "completed": True,
            }
        }