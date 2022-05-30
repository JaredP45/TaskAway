
# Module Imports
import motor.motor_asyncio
from pydantic import BaseSettings
import os


class CommonSettings(BaseSettings):
    APP_NAME: str = "TaskAway"
    DEBUG_MODE: bool


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8001


class DatabaseSettings(BaseSettings):
    DB_URL: str
    DB_NAME: str


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    """
        Base class that inherits objects from CommonSettings,
            ServerSettings, and DatabaseSettings
    """
    pass

settings = Settings()