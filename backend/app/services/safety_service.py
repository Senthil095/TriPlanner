"""
Safety Service for Solo Travelers

Provides:
1. Safety scoring for locations
2. Women safety mode recommendations
3. Safe areas and times
4. Emergency information
"""

from typing import Dict, List, Any, Optional
from datetime import datetime, time
from app.services.firebase_service import FirebaseService


class SafetyService:
    """Service for managing safety information and recommendations"""
    
    # Safety data for major destinations (can be expanded or moved to database)
    CITY_SAFETY_DATA = {
        "paris": {
            "overall_score": 7,
            "emergency_numbers": {
                "police": "17",
                "ambulance": "15",
                "fire": "18",
                "tourist_helpline": "+33 1 53 71 53 71"
            },
            "safe_areas": [
                "Le Marais", "Saint-Germain-des-Prés", "7th Arrondissement",
                "Latin Quarter", "Montmartre (daytime)"
            ],
            "areas_to_avoid_at_night": [
                "Gare du Nord area", "Châtelet-Les Halles (late night)",
                "Pigalle", "Barbès-Rochechouart", "Stalingrad"
            ],
            "solo_friendly_spots": [
                "Café de Flore", "Shakespeare and Company",
                "Luxembourg Gardens", "Musée d'Orsay"
            ],
            "general_tips": [
                "Keep belongings secure, especially on metro",
                "Be cautious of pickpockets near tourist areas",
                "Use official taxis or ride-sharing apps",
                "Stay aware in crowded areas"
            ],
            "women_specific_tips": [
                "Avoid walking alone in Bois de Boulogne after dark",
                "Use women-only metro cars during rush hour",
                "Keep a personal alarm handy",
                "Share live location with trusted contacts"
            ]
        },
        "tokyo": {
            "overall_score": 9,
            "emergency_numbers": {
                "police": "110",
                "ambulance": "119",
                "fire": "119",
                "tourist_helpline": "+81 3 3201 3331"
            },
            "safe_areas": [
                "Shibuya", "Shinjuku", "Ginza", "Asakusa",
                "Ueno", "Akihabara", "Harajuku"
            ],
            "areas_to_avoid_at_night": [
                "Kabukicho (some areas)", "Roppongi (late night)"
            ],
            "solo_friendly_spots": [
                "Tsutaya Books Daikanyama", "Yoyogi Park",
                "TeamLab Borderless", "Senso-ji Temple"
            ],
            "general_tips": [
                "Japan is very safe but stay aware",
                "Learn basic Japanese phrases",
                "Carry cash as many places don't accept cards",
                "Respect local customs and be quiet on trains"
            ],
            "women_specific_tips": [
                "Women-only train cars available during rush hours",
                "Japan has very low crime rate",
                "Be cautious of crowded trains during rush hour",
                "Many hotels have women-only floors"
            ]
        },
        "bangkok": {
            "overall_score": 6,
            "emergency_numbers": {
                "police": "191",
                "ambulance": "1669",
                "tourist_police": "1155",
                "tourist_helpline": "1672"
            },
            "safe_areas": [
                "Sukhumvit", "Silom", "Siam", "Chatuchak",
                "Old Town (Rattanakosin)"
            ],
            "areas_to_avoid_at_night": [
                "Khlong Toei", "Patpong (late night)",
                "Nana Plaza area", "Soi Cowboy"
            ],
            "solo_friendly_spots": [
                "Chatuchak Weekend Market", "Grand Palace area",
                "Wat Pho", "Lumphini Park (daytime)"
            ],
            "general_tips": [
                "Use Grab instead of regular taxis",
                "Beware of common tourist scams",
                "Stay hydrated and protect from sun",
                "Respect royal family and religion"
            ],
            "women_specific_tips": [
                "Dress modestly at temples",
                "Avoid isolated areas after dark",
                "Use well-lit main roads at night",
                "Keep copies of important documents"
            ]
        },
        "default": {
            "overall_score": 5,
            "emergency_numbers": {
                "police": "911",
                "ambulance": "911",
                "tourist_helpline": "Check local tourism board"
            },
            "safe_areas": ["Main tourist districts", "Hotel areas"],
            "areas_to_avoid_at_night": ["Poorly lit areas", "Non-tourist districts late at night"],
            "solo_friendly_spots": ["Popular cafes", "Museums", "Parks during daytime"],
            "general_tips": [
                "Research your destination before arrival",
                "Keep valuables secure",
                "Use official transportation",
                "Stay aware of your surroundings"
            ],
            "women_specific_tips": [
                "Share your itinerary with trusted contacts",
                "Stay in well-reviewed accommodations",
                "Trust your instincts",
                "Keep emergency contacts handy"
            ]
        }
    }
    
    @staticmethod
    async def get_city_safety_info(city: str) -> Dict[str, Any]:
        """Get safety information for a city"""
        city_lower = city.lower().strip()
        
        # Try to get from database first
        db_info = await FirebaseService.get_safety_info(city_lower)
        if db_info:
            return db_info
            
        # Check if we have specific data for this city in static fallback
        if city_lower in SafetyService.CITY_SAFETY_DATA:
            return SafetyService.CITY_SAFETY_DATA[city_lower]
        
        # Return default safety info
        return SafetyService.CITY_SAFETY_DATA["default"]
    
    @staticmethod
    def calculate_place_safety_score(
        place: Dict[str, Any],
        visit_time: str,
        safety_mode: bool = False
    ) -> int:
        """
        Calculate safety score for a specific place based on:
        - Location characteristics
        - Time of visit
        - Safety mode (women safety)
        """
        base_score = place.get("safety_score", 7)
        
        # Parse visit time
        try:
            hour = int(visit_time.split(":")[0])
        except (ValueError, IndexError):
            hour = 12  # Default to noon
        
        # Adjust score based on time
        if hour < 6 or hour > 22:
            base_score -= 2  # Late night/early morning penalty
        elif hour > 18:
            base_score -= 1  # Evening slight penalty
        
        # Adjust for safety mode
        if safety_mode:
            category = place.get("category", "").lower()
            # Penalize certain categories in safety mode
            if any(word in category for word in ["nightlife", "bar", "club"]):
                base_score -= 2
            # Boost safe categories
            if any(word in category for word in ["museum", "temple", "park", "cafe"]):
                base_score += 1
        
        # Clamp score between 1 and 10
        return max(1, min(10, base_score))
    
    @staticmethod
    def get_safety_tips_for_place(
        place: Dict[str, Any],
        city: str,
        safety_mode: bool = False
    ) -> List[str]:
        """Get specific safety tips for a place"""
        # ... implementation remains sync as it doesn't need DB ...
        tips = []
        category = place.get("category", "").lower()
        
        # General tips based on category
        if "temple" in category or "religious" in category:
            tips.extend([
                "Dress modestly - cover shoulders and knees",
                "Remove shoes before entering",
                "Speak quietly and respectfully"
            ])
        
        if "market" in category or "shopping" in category:
            tips.extend([
                "Keep valuables secure and in front of you",
                "Be aware of pickpockets in crowded areas",
                "Negotiate prices but be respectful"
            ])
        
        if "nightlife" in category or "bar" in category:
            tips.extend([
                "Don't leave drinks unattended",
                "Use ride-sharing apps for transportation",
                "Stay with groups when possible"
            ])
        
        if "outdoor" in category or "nature" in category:
            tips.extend([
                "Carry water and sun protection",
                "Tell someone your plans",
                "Stick to marked trails"
            ])
        
        # Women-specific tips if safety mode is enabled
        if safety_mode:
            tips.extend([
                "Share live location with trusted contacts",
                "Keep phone charged",
                "Trust your instincts - leave if uncomfortable"
            ])
        
        return tips[:5]  # Return top 5 tips
    
    @staticmethod
    async def is_place_safe_at_time(
        place: Dict[str, Any],
        visit_time: str,
        city: str,
        safety_mode: bool = False
    ) -> Dict[str, Any]:
        """Check if a place is safe to visit at a specific time"""
        
        try:
            hour = int(visit_time.split(":")[0])
        except (ValueError, IndexError):
            hour = 12
        
        is_night = hour < 6 or hour > 21
        # await the async call
        city_data = await SafetyService.get_city_safety_info(city)
        place_name = place.get("name", "").lower()
        
        # Check if place is in areas to avoid at night
        unsafe_at_night = any(
            area.lower() in place_name
            for area in city_data.get("areas_to_avoid_at_night", [])
        )
        
        # Check if it's a solo-friendly spot
        solo_friendly = any(
            spot.lower() in place_name
            for spot in city_data.get("solo_friendly_spots", [])
        )
        
        result = {
            "is_safe": True,
            "safety_level": "high",
            "warnings": [],
            "recommendations": []
        }
        
        if is_night and unsafe_at_night:
            result["is_safe"] = False
            result["safety_level"] = "low"
            result["warnings"].append(
                f"This area is not recommended after dark"
            )
            result["recommendations"].append(
                "Consider visiting during daytime or choose alternative location"
            )
        elif is_night and safety_mode:
            result["safety_level"] = "medium"
            result["warnings"].append(
                "Exercise extra caution when traveling alone at night"
            )
            result["recommendations"].extend([
                "Use official taxis or ride-sharing apps",
                "Stay in well-lit, populated areas"
            ])
        
        if solo_friendly:
            result["recommendations"].append(
                "This is a recommended solo-friendly location"
            )
        
        return result
    
    @staticmethod
    async def filter_safe_places(
        places: List[Dict[str, Any]],
        city: str,
        safety_mode: bool = False,
        time_filter: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Filter and sort places by safety score"""
        
        filtered = []
        for place in places:
            visit_time = time_filter or place.get("recommended_time", "12:00")
            if isinstance(visit_time, str) and " - " in visit_time:
                visit_time = visit_time.split(" - ")[0]
            
            # await the async call
            safety_check = await SafetyService.is_place_safe_at_time(
                place, visit_time, city, safety_mode
            )
            
            # In safety mode, exclude unsafe places
            if safety_mode and not safety_check["is_safe"]:
                continue
            
            # Add safety info to place
            place["safety_check"] = safety_check
            place["safety_tips"] = SafetyService.get_safety_tips_for_place(
                place, city, safety_mode
            )
            
            filtered.append(place)
        
        # Sort by safety score (highest first)
        filtered.sort(
            key=lambda p: p.get("safety_score", 5),
            reverse=True
        )
        
        return filtered
    
    @staticmethod
    async def get_emergency_contacts(city: str) -> Dict[str, str]:
        """Get emergency contact numbers for a city"""
        # await the async call
        city_data = await SafetyService.get_city_safety_info(city)
        return city_data.get("emergency_numbers", {
            "police": "911",
            "ambulance": "911"
        })


# Singleton instance
_safety_service = None


def get_safety_service() -> SafetyService:
    global _safety_service
    if _safety_service is None:
        _safety_service = SafetyService()
    return _safety_service
