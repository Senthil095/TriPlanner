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
from app.services.groq_service import get_groq_service
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
        groq_service = get_groq_service()
        safety_service = get_safety_service()
        route_optimizer = get_route_optimizer()

        # Prepare request data for Groq
        request_data = {
            "destination": request.city,
            "duration": request.days,
            "interests": request.interests,
            "budget_range": request.budget,
            "mood": request.mood,
            "persona": request.travelers,
            "special_requests": request.special_requests,
            "safety_mode": False,
            "start_date": None,
            "origin": request.origin,
        }

        # Generate itinerary using Groq
        itinerary = await groq_service.generate_itinerary(request_data)

        # Add trip ID
        trip_id = str(uuid.uuid4())
        itinerary["trip_id"] = trip_id
        itinerary["created_at"] = datetime.utcnow().isoformat()

        # Enhance with safety information
        safety_info = await safety_service.get_city_safety_info(request.city)
        if "safety_info" not in itinerary:
            itinerary["safety_info"] = safety_info

        # Apply additional safety filtering if safety mode is enabled
        if request_data["safety_mode"]:
            for day in itinerary.get("days", []):
                day["places"] = await safety_service.filter_safe_places(
                    day.get("places", []),
                    request.city,
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
                request.days,
                request.mood
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
        groq_service = get_groq_service()
        firebase_service = FirebaseService()

        # Get the original itinerary
        original_itinerary = await firebase_service.get_trip(request.trip_id)

        if not original_itinerary:
            raise HTTPException(status_code=404, detail="Trip not found")

        # Replan using Groq
        updated_itinerary = await groq_service.replan_itinerary(
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
    return await safety_service.get_city_safety_info(city)


@router.get("/cultural-tips/{destination}")
async def get_cultural_tips(destination: str):
    """Get cultural etiquette tips for a destination"""
    try:
        groq_service = get_groq_service()
        tips = await groq_service.get_cultural_tips(destination)
        return tips
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
