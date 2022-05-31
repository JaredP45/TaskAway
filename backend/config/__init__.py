# Module Imports
import os
from pydantic import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class CommonSettings(BaseSettings):
    APP_NAME: str = "TaskAway"
    DEBUG_MODE: bool = os.environ.get("DEBUG_MODE")


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8001


class DatabaseSettings(BaseSettings):
    DB_URL: str = os.environ.get("DB_URL")
    DB_NAME: str = os.environ.get("DB_NAME")
    

class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    """
        Base class that inherits objects from CommonSettings,
            ServerSettings, and DatabaseSettings
    """
    pass

settings = Settings()