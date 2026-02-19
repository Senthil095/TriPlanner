"""
Itinerary API Routes

Endpoints:
- POST /api/generate-itinerary: Generate AI-powered itinerary
- POST /api/replan: Replan existing itinerary
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import Dict, Any
from datetime import datetime
import uuid

from app.models.schemas import (
    ItineraryRequest,
    ReplanRequest,
    ItineraryResponse,
)
from app.services.claude_service import get_claude_service
from app.services.firebase_service import FirebaseService
from app.services.route_optimizer import get_route_optimizer
from app.services.safety_service import get_safety_service

router = APIRouter(prefix="/api", tags=["itinerary"])


@router.post("/generate-itinerary", response_model=Dict[str, Any])
async def generate_itinerary(request: ItineraryRequest):
    """
    Generate a personalized travel itinerary using AI.
    
    Takes into account:
    - Destination and duration
    - User interests and budget
    - Mood and travel persona
    - Safety mode for solo travelers
    """
    try:
        claude_service = get_claude_service()
        safety_service = get_safety_service()
        route_optimizer = get_route_optimizer()
        
        # Prepare request data for Claude
        request_data = {
            "destination": request.destination,
            "duration": request.duration,
            "interests": [interest.value for interest in request.interests],
            "budget_range": request.budget_range.value,
            "mood": request.mood.value,
            "persona": request.persona.value,
            "safety_mode": request.safety_mode,
            "start_date": request.start_date,
        }
        
        # Generate itinerary using Claude
        itinerary = await claude_service.generate_itinerary(request_data)
        
        # Add trip ID
        trip_id = str(uuid.uuid4())
        itinerary["trip_id"] = trip_id
        itinerary["created_at"] = datetime.utcnow().isoformat()
        
        # Enhance with safety information
        safety_info = safety_service.get_city_safety_info(request.destination)
        if "safety_info" not in itinerary:
            itinerary["safety_info"] = safety_info
        
        # Apply additional safety filtering if safety mode is enabled
        if request.safety_mode:
            for day in itinerary.get("days", []):
                day["places"] = safety_service.filter_safe_places(
                    day.get("places", []),
                    request.destination,
                    safety_mode=True
                )
        
        # Optimize routes for each day
        all_places = []
        for day in itinerary.get("days", []):
            all_places.extend(day.get("places", []))
        
        if all_places:
            # Re-cluster and optimize
            optimized_days = route_optimizer.optimize_itinerary(
                all_places,
                request.duration,
                request.mood.value
            )
            
            # Update itinerary with optimized routes
            for i, day in enumerate(itinerary.get("days", [])):
                if i < len(optimized_days):
                    day["places"] = optimized_days[i]
                    day["total_walking_distance"] = route_optimizer.calculate_total_distance(
                        optimized_days[i]
                    )
        
        return itinerary
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/replan", response_model=Dict[str, Any])
async def replan_itinerary(request: ReplanRequest):
    """
    Replan an existing itinerary when user skips places or days.
    
    Redistributes remaining attractions optimally while:
    - Maintaining route optimization
    - Keeping fatigue-aware scheduling
    - Preserving safety considerations
    """
    try:
        claude_service = get_claude_service()
        firebase_service = FirebaseService()
        
        # Get the original itinerary
        original_itinerary = await firebase_service.get_trip(request.trip_id)
        
        if not original_itinerary:
            raise HTTPException(status_code=404, detail="Trip not found")
        
        # Replan using Claude
        updated_itinerary = await claude_service.replan_itinerary(
            original_itinerary.get("itinerary", {}),
            request.skipped_places,
            request.skipped_days,
            request.new_preferences
        )
        
        # Update the trip in database
        await firebase_service.update_trip(
            request.trip_id,
            {"itinerary": updated_itinerary}
        )
        
        updated_itinerary["trip_id"] = request.trip_id
        updated_itinerary["replanned_at"] = datetime.utcnow().isoformat()
        
        return updated_itinerary
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/safety-info/{city}")
async def get_safety_info(city: str):
    """Get safety information for a specific city"""
    safety_service = get_safety_service()
    return safety_service.get_city_safety_info(city)


@router.get("/cultural-tips/{destination}")
async def get_cultural_tips(destination: str):
    """Get cultural etiquette tips for a destination"""
    try:
        claude_service = get_claude_service()
        tips = await claude_service.get_cultural_tips(destination)
        return tips
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
