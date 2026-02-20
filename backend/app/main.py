"""
AI Travel Planner - Solo Traveller Edition

FastAPI Backend Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import get_settings
from app.services.firebase_service import init_firebase
from app.routes import itinerary, plans, guides, hidden_gems, chatbot, meta
from app.routes import user, emergency

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan handler for startup and shutdown events"""
    # Startup
    print("Starting AI Travel Planner API...")
    init_firebase()
    print("Firebase initialized")
    yield
    # Shutdown
    print("Shutting down AI Travel Planner API...")


app = FastAPI(
    title=settings.app_name,
    description="""
    AI-powered travel planning for solo travelers.

    Features:
    - Personalized itinerary generation
    - Safety-aware recommendations
    - Fatigue-optimized scheduling
    - Route optimization
    - Hidden gems discovery
    - Local guide connections
    - Budget management
    - AI chatbot assistant
    """,
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(itinerary.router)
app.include_router(plans.router)
app.include_router(guides.router)
app.include_router(hidden_gems.router)
app.include_router(chatbot.router)
app.include_router(meta.router)
app.include_router(user.router)
app.include_router(emergency.router)


@app.get("/")
async def root():
    """Root endpoint - API health check"""
    return {
        "name": settings.app_name,
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "itinerary": "/api/generate-itinerary",
            "plans": "/api/save-plan",
            "guides": "/api/guides/{city}",
            "hidden_gems": "/api/hidden-gems/{city}",
            "chat": "/api/chat",
            "user_profile": "/api/user/profile/{user_id}",
            "emergency_sos": "/api/emergency/trigger-sos",
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
