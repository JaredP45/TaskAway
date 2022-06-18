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
    REALM_APP_ID: str = os.environ.get("REALM_APP_ID")
    DB_URL: str = os.environ.get("DB_URL")
    DB_NAME: str = os.environ.get("DB_NAME")


class AuthSettings(BaseSettings):
    JWT_SECRET_KEY: str = os.environ.get("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    SECURE_COOKIE: bool = False
    

class Settings(CommonSettings, ServerSettings, DatabaseSettings, AuthSettings):
    """
        Base class that inherits objects from CommonSettings,
            ServerSettings, and DatabaseSettings
    """
    pass

settings = Settings()