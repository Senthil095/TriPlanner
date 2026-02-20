"""
Meta API Routes

Endpoints:
- GET /api/meta/{doc_id}: Get metadata document (stats, testimonials, destinations, safety_tips)
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from app.services.firebase_service import FirebaseService

router = APIRouter(prefix="/api/meta", tags=["meta"])

# Default fallback payloads for well-known doc IDs so the UI
# never sees a 404 when the Firestore document simply hasn't been
# seeded yet.
_FALLBACKS: Dict[str, Dict[str, Any]] = {
    "stats": {
        "items": [
            {"number": "10K+", "label": "Trips Planned"},
            {"number": "50+",  "label": "Countries"},
            {"number": "4.9★", "label": "Avg Rating"},
        ]
    },
    "testimonials": {
        "items": []
    },
    "destinations": {
        "items": []
    },
}


@router.get("/{doc_id}", response_model=Dict[str, Any])
async def get_meta_document(doc_id: str):
    """
    Get metadata document by ID.

    Useful for fetching dynamic content for UI components like:
    - stats
    - testimonials
    - destinations
    - safety_tips
    - guides (available cities)

    If the Firestore document does not exist yet, a sensible empty/default
    payload is returned rather than a 404, so the frontend can render
    gracefully without Firestore data being pre-seeded.
    """
    try:
        firebase_service = FirebaseService()
        data = await firebase_service.get_meta(doc_id)

        if data:
            return data

        # Return the known fallback if available, otherwise a generic empty doc
        return _FALLBACKS.get(doc_id, {"items": [], "doc_id": doc_id})

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
