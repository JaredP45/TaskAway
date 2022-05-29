# Module Imports
from pydantic import BaseModel, Field
from datetime import date as date_type
import uuid
from typing import Optional


class TaskModel(BaseModel):
    '''
        uid - unique ID
        title - title of task
        description - task description
        date_created - day task was created on
        completed - if task was completed
    '''
    
    uid: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    created_on: date_type = Field(..., alias="date")
    completed: bool = False

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "title": "Task Title",
                "description": "The context or instructions for the task.",
                "created_on": "2022-05-28",
                "completed": True
            }
        }


class UpdateTaskModel(BaseModel):
    '''
        Update Todo with optional fields
    '''

    title: Optional[str]
    description: Optional[str]
    created_on: Optional[date_type]
    completed: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "title": "Task Title",
                "description": "The context or instructions for the task.",
                "created_on": "2022-05-28",
                "completed": True
            }
        }