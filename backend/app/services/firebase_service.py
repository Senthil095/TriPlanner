import firebase_admin
from firebase_admin import credentials, firestore
from typing import Dict, List, Any, Optional
from datetime import datetime
import uuid
import math
from app.config import get_settings

settings = get_settings()

# Initialize Firebase
_firebase_app = None
_db = None


def init_firebase():
    global _firebase_app, _db
    
    if _firebase_app is not None:
        return _db
    
    try:
        # Try using credentials file path first
        if settings.firebase_credentials_path:
            cred = credentials.Certificate(settings.firebase_credentials_path)
        else:
            # Use environment variables
            cred_dict = {
                "type": "service_account",
                "project_id": settings.firebase_project_id,
                "private_key": settings.firebase_private_key,
                "client_email": settings.firebase_client_email,
                "token_uri": "https://oauth2.googleapis.com/token",
            }
            cred = credentials.Certificate(cred_dict)
        
        _firebase_app = firebase_admin.initialize_app(cred)
        _db = firestore.client()
        return _db
    except Exception as e:
        print(f"Firebase initialization error: {e}")
        # Return mock for development without Firebase
        return None


def get_db():
    global _db
    if _db is None:
        init_firebase()
    return _db


class FirebaseService:
    """Service class for Firebase Firestore operations"""
    
    @staticmethod
    def generate_id() -> str:
        return str(uuid.uuid4())
    
    # ==================== TRIPS ====================
    
    @staticmethod
    async def save_trip(user_id: str, destination: str, duration: int, itinerary: Dict[str, Any]) -> str:
        """Save a trip itinerary to Firestore"""
        db = get_db()
        if db is None:
            # Return mock ID for development
            return FirebaseService.generate_id()
        
        trip_id = FirebaseService.generate_id()
        trip_data = {
            "tripId": trip_id,
            "userId": user_id,
            "destination": destination,
            "duration": duration,
            "itinerary": itinerary,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow(),
        }
        
        db.collection("trips").document(trip_id).set(trip_data)
        return trip_id
    
    @staticmethod
    async def get_trip(trip_id: str) -> Optional[Dict[str, Any]]:
        """Get a trip by ID"""
        db = get_db()
        if db is None:
            return None
        
        doc = db.collection("trips").document(trip_id).get()
        if doc.exists:
            return doc.to_dict()
        return None
    
    @staticmethod
    async def get_user_trips(user_id: str) -> List[Dict[str, Any]]:
        """Get all trips for a user"""
        db = get_db()
        if db is None:
            return []
        
        trips = db.collection("trips").where("userId", "==", user_id).stream()
        return [trip.to_dict() for trip in trips]
    
    @staticmethod
    async def update_trip(trip_id: str, updates: Dict[str, Any]) -> bool:
        """Update a trip"""
        db = get_db()
        if db is None:
            return True
        
        updates["updatedAt"] = datetime.utcnow()
        db.collection("trips").document(trip_id).update(updates)
        return True
    
    @staticmethod
    async def delete_trip(trip_id: str) -> bool:
        """Delete a trip"""
        db = get_db()
        if db is None:
            return True
        
        db.collection("trips").document(trip_id).delete()
        return True
    
    # ==================== GUIDES ====================
    
    @staticmethod
    async def register_guide(guide_data: Dict[str, Any]) -> str:
        """Register a new local guide"""
        db = get_db()
        guide_id = FirebaseService.generate_id()
        
        guide_doc = {
            "guideId": guide_id,
            "name": guide_data["name"],
            "email": guide_data["email"],
            "city": guide_data["city"].lower(),
            "languages": guide_data["languages"],
            "experienceYears": guide_data.get("experience_years", 0),
            "specialties": guide_data.get("specialties", []),
            "contactPhone": guide_data.get("contact_phone"),
            "bio": guide_data.get("bio"),
            "rating": 0.0,
            "reviewCount": 0,
            "verified": False,
            "createdAt": datetime.utcnow(),
        }
        
        if db:
            db.collection("guides").document(guide_id).set(guide_doc)
        
        return guide_id
    
    @staticmethod
    async def get_guides_by_city(city: str) -> List[Dict[str, Any]]:
        """Get all guides for a specific city"""
        db = get_db()
        if db is None:
            # Return mock data for development
            return [
                {
                    "guideId": "mock-guide-1",
                    "name": "Local Expert",
                    "city": city,
                    "languages": ["English", "Local Language"],
                    "experienceYears": 5,
                    "specialties": ["Culture", "Food Tours"],
                    "rating": 4.8,
                    "verified": True,
                }
            ]
        
        guides = db.collection("guides").where("city", "==", city.lower()).stream()
        return [guide.to_dict() for guide in guides]
    
    @staticmethod
    async def get_guide(guide_id: str) -> Optional[Dict[str, Any]]:
        """Get a guide by ID"""
        db = get_db()
        if db is None:
            return None
        
        doc = db.collection("guides").document(guide_id).get()
        if doc.exists:
            return doc.to_dict()
        return None
    
    # ==================== HIDDEN GEMS ====================
    
    @staticmethod
    async def add_hidden_gem(gem_data: Dict[str, Any]) -> str:
        """Add a new hidden gem"""
        db = get_db()
        gem_id = FirebaseService.generate_id()
        
        gem_doc = {
            "gemId": gem_id,
            "name": gem_data["name"],
            "city": gem_data["city"].lower(),
            "description": gem_data["description"],
            "category": gem_data["category"],
            "location": gem_data["location"],
            "bestTimeToVisit": gem_data.get("best_time_to_visit"),
            "localTip": gem_data.get("local_tip"),
            "submittedBy": gem_data["submitted_by"],
            "rating": gem_data.get("rating", 4.0),
            "popularityScore": gem_data.get("popularity_score", 10),
            "createdAt": datetime.utcnow(),
            "approved": False,
        }
        
        # Calculate inverse popularity rank
        popularity = gem_doc["popularityScore"]
        rating = gem_doc["rating"]
        gem_doc["inversePopularityRank"] = rating * (1 / math.log(popularity + 2))
        
        if db:
            db.collection("hidden_gems").document(gem_id).set(gem_doc)
        
        return gem_id
    
    @staticmethod
    async def get_hidden_gems_by_city(city: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Get hidden gems for a city, sorted by inverse popularity"""
        db = get_db()
        if db is None:
            # Return mock data for development
            return [
                {
                    "gemId": "mock-gem-1",
                    "name": "Secret Garden Cafe",
                    "city": city,
                    "description": "A hidden cafe with amazing local coffee",
                    "category": "food",
                    "rating": 4.9,
                    "popularityScore": 15,
                    "inversePopularityRank": 4.9 * (1 / math.log(17)),
                    "localTip": "Ask for the house special",
                },
                {
                    "gemId": "mock-gem-2",
                    "name": "Sunset View Point",
                    "city": city,
                    "description": "Locals' favorite spot for sunset",
                    "category": "nature",
                    "rating": 4.7,
                    "popularityScore": 8,
                    "inversePopularityRank": 4.7 * (1 / math.log(10)),
                    "localTip": "Come 30 min before sunset",
                },
            ]
        
        gems = (
            db.collection("hidden_gems")
            .where("city", "==", city.lower())
            .where("approved", "==", True)
            .order_by("inversePopularityRank", direction=firestore.Query.DESCENDING)
            .limit(limit)
            .stream()
        )
        return [gem.to_dict() for gem in gems]
    
    # ==================== NOTES ====================
    
    @staticmethod
    async def create_note(note_data: Dict[str, Any]) -> str:
        """Create a new note"""
        db = get_db()
        note_id = FirebaseService.generate_id()
        
        note_doc = {
            "noteId": note_id,
            "tripId": note_data["trip_id"],
            "content": note_data["content"],
            "reminderTime": note_data.get("reminder_time"),
            "location": note_data.get("location"),
            "createdAt": datetime.utcnow(),
        }
        
        if db:
            db.collection("notes").document(note_id).set(note_doc)
        
        return note_id
    
    @staticmethod
    async def get_notes_by_trip(trip_id: str) -> List[Dict[str, Any]]:
        """Get all notes for a trip"""
        db = get_db()
        if db is None:
            return []
        
        notes = db.collection("notes").where("tripId", "==", trip_id).stream()
        return [note.to_dict() for note in notes]
    
    @staticmethod
    async def update_note(note_id: str, updates: Dict[str, Any]) -> bool:
        """Update a note"""
        db = get_db()
        if db is None:
            return True
        
        db.collection("notes").document(note_id).update(updates)
        return True
    
    @staticmethod
    async def delete_note(note_id: str) -> bool:
        """Delete a note"""
        db = get_db()
        if db is None:
            return True
        
        db.collection("notes").document(note_id).delete()
        return True
    
    # ==================== USERS ====================
    
    @staticmethod
    async def create_user(user_id: str, email: str, preferences: Dict[str, Any] = None) -> bool:
        """Create a new user profile"""
        db = get_db()
        if db is None:
            return True
        
        user_doc = {
            "userId": user_id,
            "email": email,
            "preferences": preferences or {},
            "createdAt": datetime.utcnow(),
        }
        
        db.collection("users").document(user_id).set(user_doc)
        return True
    
    @staticmethod
    async def get_user(user_id: str) -> Optional[Dict[str, Any]]:
        """Get user profile"""
        db = get_db()
        if db is None:
            return None
        
        doc = db.collection("users").document(user_id).get()
        if doc.exists:
            return doc.to_dict()
        return None
    
    @staticmethod
    async def update_user_preferences(user_id: str, preferences: Dict[str, Any]) -> bool:
        """Update user preferences"""
        db = get_db()
        if db is None:
            return True
        
        db.collection("users").document(user_id).update({"preferences": preferences})
        return True
