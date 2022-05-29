# Module Imports
from pydantic import BaseModel, Field
import uuid
from typing import Optional


class TaskModel(BaseModel):
    '''
        uid - unique ID
        title - title of task
        description - task description
    '''
    
    uid: str = Field(default_factory=uuid.uuid4, alias="_id")
    title: str = Field(...)
    description: str = Field(...)
    completed: bool = False

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "title": "Task Title",
                "description": "The context or instructions for the task.",
                "completed": True
            }
        }


class UpdateTaskModel(BaseModel):
    '''
        Update Todo with optional fields
    '''

    title: Optional[str]
    description: Optional[str]
    completed: Optional[bool]

    class Config:
        schema_extra = {
            "example": {
                "title": "Task Title",
                "description": "The context or instructions for the task.",
                "completed": True
            }
        }