"""
Hidden Gems API Routes

Endpoints:
- GET /api/hidden-gems/{city}: Get hidden gems for a city
- POST /api/hidden-gems: Submit a new hidden gem
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List

from app.models.schemas import HiddenGemSubmission
from app.services.firebase_service import FirebaseService

router = APIRouter(prefix="/api", tags=["hidden-gems"])


@router.get("/hidden-gems/{city}", response_model=List[Dict[str, Any]])
async def get_hidden_gems(city: str, limit: int = 20):
    """
    Get hidden gems for a specific city.
    
    Hidden gems are ranked using inverse popularity algorithm:
    score = rating * (1 / log(popularity + 2))
    
    This prioritizes high-rated places that aren't overcrowded.
    """
    try:
        firebase_service = FirebaseService()
        
        gems = await firebase_service.get_hidden_gems_by_city(city, limit)
        
        return gems
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/hidden-gems", response_model=Dict[str, Any])
async def submit_hidden_gem(request: HiddenGemSubmission):
    """
    Submit a new hidden gem recommendation.
    
    Submissions require:
    - Place name and description
    - Location coordinates
    - Category
    - Submitter information
    
    New submissions require approval before becoming visible.
    """
    try:
        firebase_service = FirebaseService()
        
        gem_data = {
            "name": request.name,
            "city": request.city,
            "description": request.description,
            "category": request.category,
            "location": request.location,
            "best_time_to_visit": request.best_time_to_visit,
            "local_tip": request.local_tip,
            "submitted_by": request.submitted_by,
            "rating": 4.5,  # Default rating for new submissions
            "popularity_score": 5  # Low initial popularity
        }
        
        gem_id = await firebase_service.add_hidden_gem(gem_data)
        
        return {
            "success": True,
            "gem_id": gem_id,
            "message": "Hidden gem submitted. Pending approval.",
            "status": "pending_approval"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/hidden-gems/categories", response_model=List[str])
async def get_gem_categories():
    """
    Get available categories for hidden gems.
    """
    return [
        "food",
        "nature",
        "culture",
        "nightlife",
        "shopping",
        "art",
        "history",
        "viewpoint",
        "relaxation",
        "adventure"
    ]


@router.get("/hidden-gems/featured", response_model=List[Dict[str, Any]])
async def get_featured_gems():
    """
    Get featured hidden gems across all cities.
    
    Returns a curated selection of top-rated hidden gems.
    """
    # Mock featured gems for demonstration
    return [
        {
            "id": "featured-1",
            "name": "Secret Rooftop Garden",
            "city": "Tokyo",
            "description": "A hidden garden on top of an old building in Shimokitazawa",
            "category": "nature",
            "rating": 4.9,
            "inversePopularityRank": 3.2
        },
        {
            "id": "featured-2",
            "name": "Underground Jazz Bar",
            "city": "Paris",
            "description": "Authentic jazz experience in a converted wine cellar",
            "category": "nightlife",
            "rating": 4.8,
            "inversePopularityRank": 3.0
        },
        {
            "id": "featured-3",
            "name": "Local Market Alley",
            "city": "Bangkok",
            "description": "Where locals shop - amazing street food and fresh produce",
            "category": "food",
            "rating": 4.7,
            "inversePopularityRank": 2.9
        }
    ]
