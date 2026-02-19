from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class MoodType(str, Enum):
    RELAXED = "relaxed"
    ENERGETIC = "energetic"
    ADVENTUROUS = "adventurous"


class TravelPersona(str, Enum):
    BUDGET_NOMAD = "budget_nomad"
    CULTURE_EXPLORER = "culture_explorer"
    DIGITAL_NOMAD = "digital_nomad"
    WEEKEND_TRIPPER = "weekend_tripper"


class InterestType(str, Enum):
    CULTURE = "culture"
    FOOD = "food"
    ADVENTURE = "adventure"
    SHOPPING = "shopping"
    RELAXATION = "relaxation"


class BudgetRange(str, Enum):
    BUDGET = "budget"
    MODERATE = "moderate"
    LUXURY = "luxury"


# Request Models
class ItineraryRequest(BaseModel):
    destination: str = Field(..., description="Destination city")
    duration: int = Field(..., ge=1, le=30, description="Trip duration in days")
    interests: List[InterestType] = Field(..., description="User interests")
    budget_range: BudgetRange = Field(..., description="Budget range")
    mood: MoodType = Field(..., description="Travel mood")
    persona: TravelPersona = Field(..., description="Travel persona")
    safety_mode: bool = Field(default=False, description="Enable women safety mode")
    start_date: Optional[str] = Field(None, description="Trip start date")


class ReplanRequest(BaseModel):
    trip_id: str = Field(..., description="Trip ID to replan")
    skipped_places: List[str] = Field(default=[], description="Places to skip")
    skipped_days: List[int] = Field(default=[], description="Days to skip")
    new_preferences: Optional[Dict[str, Any]] = Field(None, description="Updated preferences")


class ChatRequest(BaseModel):
    message: str = Field(..., description="User message")
    trip_id: Optional[str] = Field(None, description="Current trip context")
    conversation_history: List[Dict[str, str]] = Field(default=[], description="Previous messages")


class SavePlanRequest(BaseModel):
    user_id: str = Field(..., description="User ID")
    itinerary: Dict[str, Any] = Field(..., description="Itinerary data")
    destination: str = Field(..., description="Destination city")
    duration: int = Field(..., description="Trip duration")


class GuideRegistration(BaseModel):
    name: str = Field(..., description="Guide name")
    email: str = Field(..., description="Guide email")
    city: str = Field(..., description="City of operation")
    languages: List[str] = Field(..., description="Languages spoken")
    experience_years: int = Field(..., ge=0, description="Years of experience")
    specialties: List[str] = Field(default=[], description="Specialties")
    contact_phone: Optional[str] = Field(None, description="Contact phone")
    bio: Optional[str] = Field(None, description="Short bio")


class HiddenGemSubmission(BaseModel):
    name: str = Field(..., description="Place name")
    city: str = Field(..., description="City")
    description: str = Field(..., description="Description")
    category: str = Field(..., description="Category")
    location: Dict[str, float] = Field(..., description="Lat/lng coordinates")
    best_time_to_visit: Optional[str] = Field(None, description="Best time to visit")
    local_tip: Optional[str] = Field(None, description="Local insider tip")
    submitted_by: str = Field(..., description="Submitter name or ID")


class NoteCreate(BaseModel):
    trip_id: str = Field(..., description="Trip ID")
    content: str = Field(..., description="Note content")
    reminder_time: Optional[datetime] = Field(None, description="Reminder time")
    location: Optional[Dict[str, float]] = Field(None, description="Location trigger")


# Response Models
class Place(BaseModel):
    id: str
    name: str
    description: str
    category: str
    location: Dict[str, float]
    visit_duration: int  # in minutes
    recommended_time: str  # e.g., "09:00 - 11:00"
    cost_estimate: float
    safety_score: int = Field(ge=1, le=10)
    safety_tips: List[str] = []
    cultural_etiquette: List[str] = []
    is_instagram_spot: bool = False
    image_url: Optional[str] = None
    transport_to_next: Optional[Dict[str, Any]] = None


class DayItinerary(BaseModel):
    day_number: int
    date: Optional[str] = None
    theme: str
    places: List[Place]
    total_walking_distance: float  # in km
    total_cost: float
    energy_level: str  # low, medium, high
    weather_backup: Optional[str] = None


class BudgetBreakdown(BaseModel):
    accommodation: float
    food: float
    transport: float
    activities: float
    miscellaneous: float
    total: float
    budget_tips: List[str] = []
    trade_offs: List[Dict[str, Any]] = []


class SafetyInfo(BaseModel):
    overall_safety_score: int = Field(ge=1, le=10)
    emergency_numbers: Dict[str, str]
    safe_areas: List[str]
    areas_to_avoid_at_night: List[str]
    solo_friendly_spots: List[str]
    general_tips: List[str]
    women_specific_tips: List[str] = []


class CulturalEtiquette(BaseModel):
    dress_code: List[str]
    behavior_rules: List[str]
    local_customs: List[str]
    tipping_culture: str
    common_phrases: Dict[str, str]


class ItineraryResponse(BaseModel):
    trip_id: str
    destination: str
    duration: int
    days: List[DayItinerary]
    budget: BudgetBreakdown
    safety_info: SafetyInfo
    cultural_etiquette: CulturalEtiquette
    hidden_gems: List[Place] = []
    instagram_spots: List[str] = []
    created_at: datetime


class Guide(BaseModel):
    id: str
    name: str
    city: str
    languages: List[str]
    rating: float
    experience_years: int
    specialties: List[str]
    bio: Optional[str]
    contact_email: str
    verified: bool = False


class HiddenGem(BaseModel):
    id: str
    name: str
    city: str
    description: str
    category: str
    location: Dict[str, float]
    rating: float
    popularity_score: int
    inverse_popularity_rank: float
    local_tip: Optional[str]
    best_time_to_visit: Optional[str]
    submitted_by: str


class ChatResponse(BaseModel):
    response: str
    suggested_actions: List[str] = []
    updated_itinerary: Optional[Dict[str, Any]] = None


class Note(BaseModel):
    id: str
    trip_id: str
    content: str
    reminder_time: Optional[datetime]
    location: Optional[Dict[str, float]]
    created_at: datetime
