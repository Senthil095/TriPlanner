import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from functools import lru_cache

load_dotenv()


class Settings(BaseSettings):
    # API Keys
    anthropic_api_key: str = os.getenv("ANTHROPIC_API_KEY", "")
    google_maps_api_key: str = os.getenv("GOOGLE_MAPS_API_KEY", "")
    
    # Firebase Configuration
    firebase_project_id: str = os.getenv("FIREBASE_PROJECT_ID", "")
    firebase_private_key: str = os.getenv("FIREBASE_PRIVATE_KEY", "").replace("\\n", "\n")
    firebase_client_email: str = os.getenv("FIREBASE_CLIENT_EMAIL", "")
    firebase_credentials_path: str = os.getenv("FIREBASE_CREDENTIALS_PATH", "")
    
    # App Configuration
    app_name: str = "AI Travel Planner"
    debug: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # Claude Configuration
    claude_model: str = "claude-sonnet-4-20250514"
    max_tokens: int = 8192
    
    # CORS Origins
    cors_origins: list = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
