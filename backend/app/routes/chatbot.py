"""
Chatbot API Routes

Endpoints:
- POST /api/chat: Send message to travel assistant
"""

from fastapi import APIRouter, HTTPException
from typing import Dict, Any

from app.models.schemas import ChatRequest, ChatResponse
from app.services.claude_service import get_claude_service
from app.services.firebase_service import FirebaseService

router = APIRouter(prefix="/api", tags=["chatbot"])


@router.post("/chat", response_model=Dict[str, Any])
async def chat(request: ChatRequest):
    """
    Chat with the AI travel assistant.
    
    The assistant can:
    - Answer questions about the trip
    - Suggest modifications to the itinerary
    - Provide weather alternatives
    - Give safety advice
    - Help with budget decisions
    
    Supports context-aware conversations with:
    - Current trip information
    - Conversation history
    """
    try:
        claude_service = get_claude_service()
        firebase_service = FirebaseService()
        
        # Get trip context if provided
        itinerary_context = None
        if request.trip_id:
            trip = await firebase_service.get_trip(request.trip_id)
            if trip:
                itinerary_context = trip.get("itinerary", {})
        
        # Get AI response
        response = await claude_service.chat(
            message=request.message,
            conversation_history=request.conversation_history,
            itinerary_context=itinerary_context
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/chat/quick-action", response_model=Dict[str, Any])
async def quick_action(action: str, trip_id: str):
    """
    Handle predefined quick actions.
    
    Supported actions:
    - whats_next: Get the next place in the itinerary
    - weather_backup: Get indoor alternatives
    - change_plan: Start replanning conversation
    - budget_check: Get current budget status
    """
    try:
        firebase_service = FirebaseService()
        claude_service = get_claude_service()
        
        trip = await firebase_service.get_trip(trip_id)
        if not trip:
            raise HTTPException(status_code=404, detail="Trip not found")
        
        itinerary = trip.get("itinerary", {})
        
        action_prompts = {
            "whats_next": "What is the next place I should visit based on my current itinerary? Give me brief details.",
            "weather_backup": "It's raining. What are good indoor alternatives for my planned outdoor activities today?",
            "change_plan": "I want to modify my itinerary. What options do I have?",
            "budget_check": "What's my current budget status and where can I save money?",
            "safety_tips": "Give me the top safety tips for my current location.",
            "local_food": "What local food should I try near my current location?"
        }
        
        prompt = action_prompts.get(action, f"Help me with: {action}")
        
        response = await claude_service.chat(
            message=prompt,
            conversation_history=[],
            itinerary_context=itinerary
        )
        
        return {
            "action": action,
            "response": response["response"],
            "suggested_actions": response.get("suggested_actions", [])
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/chat/suggestions")
async def get_chat_suggestions():
    """
    Get suggested conversation starters and quick actions.
    """
    return {
        "quick_actions": [
            {"id": "whats_next", "label": "What's next?", "icon": "navigation"},
            {"id": "weather_backup", "label": "Weather backup", "icon": "cloud-rain"},
            {"id": "change_plan", "label": "Change my plan", "icon": "edit"},
            {"id": "budget_check", "label": "Budget check", "icon": "dollar-sign"},
            {"id": "safety_tips", "label": "Safety tips", "icon": "shield"},
            {"id": "local_food", "label": "Local food", "icon": "utensils"}
        ],
        "suggested_questions": [
            "What are the must-see places today?",
            "Is my current location safe at night?",
            "Where can I find good street food nearby?",
            "What's the best way to get to my next destination?",
            "Can you recommend a quiet cafe to work from?",
            "What cultural customs should I know about?"
        ]
    }
