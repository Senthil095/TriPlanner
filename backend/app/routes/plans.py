"""
Plans API Routes

Endpoints:
- POST /api/save-plan: Save a trip plan
- GET /api/get-plan/{trip_id}: Get a saved plan
- GET /api/user-plans/{user_id}: Get all plans for a user
- DELETE /api/delete-plan/{trip_id}: Delete a plan
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List

from app.models.schemas import SavePlanRequest, NoteCreate
from app.services.firebase_service import FirebaseService

router = APIRouter(prefix="/api", tags=["plans"])


@router.post("/save-plan", response_model=Dict[str, Any])
async def save_plan(request: SavePlanRequest):
    """
    Save a trip itinerary to the database.
    
    Returns the trip ID for future reference.
    """
    try:
        firebase_service = FirebaseService()
        
        trip_id = await firebase_service.save_trip(
            user_id=request.user_id,
            destination=request.destination,
            duration=request.duration,
            itinerary=request.itinerary
        )
        
        return {
            "success": True,
            "trip_id": trip_id,
            "message": "Plan saved successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/get-plan/{trip_id}", response_model=Dict[str, Any])
async def get_plan(trip_id: str):
    """
    Retrieve a saved trip plan by ID.
    """
    try:
        firebase_service = FirebaseService()
        
        trip = await firebase_service.get_trip(trip_id)
        
        if not trip:
            raise HTTPException(status_code=404, detail="Plan not found")
        
        return trip
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/user-plans/{user_id}", response_model=List[Dict[str, Any]])
async def get_user_plans(user_id: str):
    """
    Get all saved plans for a specific user.
    """
    try:
        firebase_service = FirebaseService()
        
        trips = await firebase_service.get_user_trips(user_id)
        
        return trips
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/delete-plan/{trip_id}")
async def delete_plan(trip_id: str):
    """
    Delete a saved trip plan.
    """
    try:
        firebase_service = FirebaseService()
        
        await firebase_service.delete_trip(trip_id)
        
        return {
            "success": True,
            "message": "Plan deleted successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== NOTES ====================

@router.post("/notes", response_model=Dict[str, Any])
async def create_note(request: NoteCreate):
    """
    Create a new note for a trip.
    
    Supports:
    - Text content
    - Time-based reminders
    - Location-based triggers
    """
    try:
        firebase_service = FirebaseService()
        
        note_data = {
            "trip_id": request.trip_id,
            "content": request.content,
            "reminder_time": request.reminder_time.isoformat() if request.reminder_time else None,
            "location": request.location
        }
        
        note_id = await firebase_service.create_note(note_data)
        
        return {
            "success": True,
            "note_id": note_id,
            "message": "Note created successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/notes/{trip_id}", response_model=List[Dict[str, Any]])
async def get_trip_notes(trip_id: str):
    """
    Get all notes for a specific trip.
    """
    try:
        firebase_service = FirebaseService()
        
        notes = await firebase_service.get_notes_by_trip(trip_id)
        
        return notes
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/notes/{note_id}")
async def delete_note(note_id: str):
    """
    Delete a note.
    """
    try:
        firebase_service = FirebaseService()
        
        await firebase_service.delete_note(note_id)
        
        return {
            "success": True,
            "message": "Note deleted successfully"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
