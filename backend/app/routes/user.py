"""
User Profile API Routes

Endpoints:
- GET  /api/user/profile/{user_id}  : Get user profile including guardian details
- PUT  /api/user/profile/{user_id}  : Update user profile / guardian details
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field

from app.services.firebase_service import FirebaseService

router = APIRouter(prefix="/api/user", tags=["user"])


class UserProfileUpdate(BaseModel):
    guardian_name: Optional[str] = Field(None, description="Guardian / emergency contact full name")
    guardian_email: Optional[str] = Field(None, description="Guardian email address")
    guardian_phone: Optional[str] = Field(None, description="Guardian phone number")
    guardian_relation: Optional[str] = Field(None, description="Relation to traveler (e.g. Parent, Sibling)")
    home_country: Optional[str] = Field(None, description="Traveler's home country")
    emergency_message: Optional[str] = Field(None, description="Custom SOS message to send to guardian")


@router.get("/profile/{user_id}", response_model=Dict[str, Any])
async def get_user_profile(user_id: str):
    """
    Retrieve a user's profile including guardian / emergency contact details.
    Returns empty guardian fields if the user has not set them yet.
    """
    try:
        profile = await FirebaseService.get_user_profile(user_id)
        if profile is None:
            # Return a blank profile skeleton so the frontend never gets null
            return {
                "userId": user_id,
                "guardianName": None,
                "guardianEmail": None,
                "guardianPhone": None,
                "guardianRelation": None,
                "homeCountry": None,
                "emergencyMessage": None,
            }
        return profile
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/profile/{user_id}", response_model=Dict[str, Any])
async def update_user_profile(user_id: str, payload: UserProfileUpdate):
    """
    Create or update a user's profile (guardian details, home country, custom SOS message).
    Only fields that are explicitly provided will be updated.
    """
    try:
        update_data = payload.model_dump(exclude_none=True)
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields provided to update")

        await FirebaseService.update_user_profile(user_id, update_data)

        # Return the refreshed profile
        updated = await FirebaseService.get_user_profile(user_id)
        return updated or {"userId": user_id, **update_data}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
