"""
Guides API Routes

Endpoints:
- GET /api/guides/{city}: Get guides for a city
- POST /api/guides/register: Register a new guide
- GET /api/guides/profile/{guide_id}: Get guide profile
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List

from app.models.schemas import GuideRegistration
from app.services.firebase_service import FirebaseService

router = APIRouter(prefix="/api", tags=["guides"])


@router.get("/guides/cities", response_model=List[str])
async def get_available_cities():
    """
    Get list of cities with registered guides.
    """
    try:
        firebase_service = FirebaseService()
        meta = await firebase_service.get_meta("guides")
        
        if meta and "available_cities" in meta:
            return meta["available_cities"]
            
        # Fallback to static list if DB fetch fails or is empty
        return [
            "Paris",
            "Tokyo",
            "Bangkok",
            "Rome",
            "Barcelona",
            "New York",
            "London",
            "Sydney",
            "Dubai",
            "Singapore"
        ]
    except Exception:
        # Fallback on error
        return [
            "Paris", "Tokyo", "Bangkok", "Rome", "Barcelona", 
            "New York", "London", "Sydney", "Dubai", "Singapore"
        ]


@router.get("/guides/{city}", response_model=List[Dict[str, Any]])
async def get_guides_by_city(city: str):
    """
    Get all registered local guides for a specific city.
    
    Returns verified guides with their:
    - Profile information
    - Languages spoken
    - Specialties
    - Ratings and reviews
    """
    try:
        firebase_service = FirebaseService()
        
        guides = await firebase_service.get_guides_by_city(city)
        
        return guides
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/guides/register", response_model=Dict[str, Any])
async def register_guide(request: GuideRegistration):
    """
    Register as a local guide.
    
    New guides start as unverified and require admin approval.
    """
    try:
        firebase_service = FirebaseService()
        
        guide_data = {
            "name": request.name,
            "email": request.email,
            "city": request.city,
            "languages": request.languages,
            "experience_years": request.experience_years,
            "specialties": request.specialties,
            "contact_phone": request.contact_phone,
            "bio": request.bio
        }
        
        guide_id = await firebase_service.register_guide(guide_data)
        
        return {
            "success": True,
            "guide_id": guide_id,
            "message": "Registration submitted. Pending verification.",
            "status": "pending_verification"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/guides/profile/{guide_id}", response_model=Dict[str, Any])
async def get_guide_profile(guide_id: str):
    """
    Get detailed profile of a specific guide.
    """
    try:
        firebase_service = FirebaseService()
        
        guide = await firebase_service.get_guide(guide_id)
        
        if not guide:
            raise HTTPException(status_code=404, detail="Guide not found")
        
        return guide
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



