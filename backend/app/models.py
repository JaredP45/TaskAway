# Module Imports
from pydantic import BaseModel


class Todo(BaseModel):
    '''
        uid - unique ID
        title - title of task
        description - task description
    '''
    
    uid: str
    title: str
    description: str

    class Config:
        schema_extra = {
            "example": {
                "uid": "0",
                "title": "First Task",
                "description": "The context behind my first task."
            }
        }
