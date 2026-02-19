"""
Route Optimization Service

Implements:
1. K-means clustering to group nearby places by day
2. TSP-based ordering within each day to minimize travel distance
3. Fatigue-aware scheduling (high-energy morning, light evening)
"""

import math
from typing import List, Dict, Any, Tuple
from dataclasses import dataclass
import numpy as np
from sklearn.cluster import KMeans


@dataclass
class Location:
    id: str
    name: str
    lat: float
    lng: float
    category: str
    energy_required: str  # low, medium, high
    visit_duration: int  # minutes
    recommended_period: str  # morning, afternoon, evening, any


def haversine_distance(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculate the great circle distance between two points in km"""
    R = 6371  # Earth's radius in kilometers
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lng = math.radians(lng2 - lng1)
    
    a = math.sin(delta_lat / 2) ** 2 + \
        math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lng / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    return R * c


class RouteOptimizer:
    """Optimizes travel routes to avoid zigzag paths and consider fatigue"""
    
    def __init__(self, max_walking_per_day: float = 10.0):
        self.max_walking_per_day = max_walking_per_day  # km
    
    def cluster_places_by_day(
        self,
        places: List[Dict[str, Any]],
        num_days: int
    ) -> List[List[Dict[str, Any]]]:
        """
        Cluster places into groups for each day using K-means
        to minimize travel between places on the same day.
        """
        if not places or num_days <= 0:
            return []
        
        # If fewer places than days, distribute evenly
        if len(places) <= num_days:
            return [[place] for place in places] + [[] for _ in range(num_days - len(places))]
        
        # Extract coordinates for clustering
        coords = np.array([[p["location"]["lat"], p["location"]["lng"]] for p in places])
        
        # Use K-means to cluster places
        n_clusters = min(num_days, len(places))
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        labels = kmeans.fit_predict(coords)
        
        # Group places by cluster
        clusters = [[] for _ in range(num_days)]
        for i, label in enumerate(labels):
            clusters[label].append(places[i])
        
        # Balance clusters if some are empty
        non_empty = [c for c in clusters if c]
        empty_count = num_days - len(non_empty)
        
        if empty_count > 0:
            # Redistribute from largest clusters
            non_empty.sort(key=len, reverse=True)
            for i in range(empty_count):
                if len(non_empty[0]) > 1:
                    clusters[len(non_empty) + i] = [non_empty[0].pop()]
        
        return clusters
    
    def optimize_day_route(self, places: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Optimize the order of places for a single day using nearest neighbor TSP.
        Returns places in optimized order.
        """
        if len(places) <= 1:
            return places
        
        # Start with the place that has morning recommendation if available
        morning_places = [p for p in places if self._get_energy_period(p) == "morning"]
        if morning_places:
            start_idx = places.index(morning_places[0])
        else:
            # Start with a random place (first one)
            start_idx = 0
        
        # Nearest neighbor algorithm
        unvisited = list(range(len(places)))
        route = [start_idx]
        unvisited.remove(start_idx)
        
        while unvisited:
            current = route[-1]
            current_loc = places[current]["location"]
            
            # Find nearest unvisited place
            nearest = min(
                unvisited,
                key=lambda i: haversine_distance(
                    current_loc["lat"], current_loc["lng"],
                    places[i]["location"]["lat"], places[i]["location"]["lng"]
                )
            )
            route.append(nearest)
            unvisited.remove(nearest)
        
        return [places[i] for i in route]
    
    def _get_energy_period(self, place: Dict[str, Any]) -> str:
        """Determine the best time period for a place based on its category"""
        category = place.get("category", "").lower()
        
        # High energy activities for morning
        high_energy = ["adventure", "hiking", "outdoor", "nature", "sports"]
        # Low energy activities for evening
        low_energy = ["relaxation", "dining", "nightlife", "spa", "shopping"]
        
        if any(cat in category for cat in high_energy):
            return "morning"
        elif any(cat in category for cat in low_energy):
            return "evening"
        return "afternoon"
    
    def apply_fatigue_aware_scheduling(
        self,
        day_places: List[Dict[str, Any]],
        mood: str = "energetic"
    ) -> List[Dict[str, Any]]:
        """
        Reorder places based on fatigue-aware scheduling:
        - Morning: High-energy activities
        - Afternoon: Medium-energy activities
        - Evening: Low-energy activities
        """
        
        # Categorize by energy requirement
        morning_places = []
        afternoon_places = []
        evening_places = []
        
        for place in day_places:
            period = self._get_energy_period(place)
            if period == "morning":
                morning_places.append(place)
            elif period == "evening":
                evening_places.append(place)
            else:
                afternoon_places.append(place)
        
        # Combine in order
        scheduled = morning_places + afternoon_places + evening_places
        
        # Adjust number of places based on mood
        if mood == "relaxed":
            # Limit to fewer places, prioritize key attractions
            max_places = min(len(scheduled), 4)
            scheduled = scheduled[:max_places]
        elif mood == "adventurous":
            # Can handle more places
            pass
        
        return scheduled
    
    def calculate_total_distance(self, places: List[Dict[str, Any]]) -> float:
        """Calculate total walking/travel distance for a list of places"""
        if len(places) <= 1:
            return 0.0
        
        total = 0.0
        for i in range(len(places) - 1):
            loc1 = places[i]["location"]
            loc2 = places[i + 1]["location"]
            total += haversine_distance(loc1["lat"], loc1["lng"], loc2["lat"], loc2["lng"])
        
        return round(total, 2)
    
    def assign_visit_times(
        self,
        places: List[Dict[str, Any]],
        start_time: str = "09:00"
    ) -> List[Dict[str, Any]]:
        """Assign specific visit times to each place"""
        
        current_hour, current_min = map(int, start_time.split(":"))
        current_minutes = current_hour * 60 + current_min
        
        for i, place in enumerate(places):
            # Set start time
            start_hour = current_minutes // 60
            start_min = current_minutes % 60
            place["recommended_time_start"] = f"{start_hour:02d}:{start_min:02d}"
            
            # Add visit duration
            duration = place.get("visit_duration", 60)
            current_minutes += duration
            
            # Set end time
            end_hour = current_minutes // 60
            end_min = current_minutes % 60
            place["recommended_time_end"] = f"{end_hour:02d}:{end_min:02d}"
            place["recommended_time"] = f"{place['recommended_time_start']} - {place['recommended_time_end']}"
            
            # Add travel time to next place (estimate 15-30 minutes)
            if i < len(places) - 1:
                travel_time = 20  # Default travel time in minutes
                current_minutes += travel_time
                
                # Add lunch break if crossing noon
                if start_hour < 12 and end_hour >= 12:
                    current_minutes += 60  # 1 hour lunch break
        
        return places
    
    def optimize_itinerary(
        self,
        places: List[Dict[str, Any]],
        num_days: int,
        mood: str = "energetic"
    ) -> List[List[Dict[str, Any]]]:
        """
        Main optimization function that combines all strategies:
        1. Cluster places by geographic proximity
        2. Apply fatigue-aware scheduling
        3. Optimize route within each day
        4. Assign visit times
        """
        
        # Step 1: Cluster places by day
        daily_clusters = self.cluster_places_by_day(places, num_days)
        
        optimized_days = []
        for day_places in daily_clusters:
            if not day_places:
                optimized_days.append([])
                continue
            
            # Step 2: Apply fatigue-aware scheduling
            scheduled_places = self.apply_fatigue_aware_scheduling(day_places, mood)
            
            # Step 3: Optimize route (TSP)
            optimized_route = self.optimize_day_route(scheduled_places)
            
            # Step 4: Assign times
            timed_places = self.assign_visit_times(optimized_route)
            
            optimized_days.append(timed_places)
        
        return optimized_days
    
    def calculate_transport_between_places(
        self,
        place1: Dict[str, Any],
        place2: Dict[str, Any]
    ) -> Dict[str, Any]:
        """Calculate transport options between two places"""
        
        loc1 = place1["location"]
        loc2 = place2["location"]
        distance = haversine_distance(loc1["lat"], loc1["lng"], loc2["lat"], loc2["lng"])
        
        # Estimate times and costs for different transport modes
        transport_options = {
            "distance_km": round(distance, 2),
            "options": {}
        }
        
        # Walking (average 5 km/h)
        if distance <= 2:
            walk_time = int(distance / 5 * 60)
            transport_options["options"]["walk"] = {
                "duration": walk_time,
                "cost": 0,
                "recommended": distance <= 1
            }
        
        # Public transport (average 20 km/h including waiting)
        bus_time = int(distance / 20 * 60) + 10  # +10 min waiting
        transport_options["options"]["bus"] = {
            "duration": bus_time,
            "cost": 2,  # Approximate
            "recommended": 1 < distance <= 5
        }
        
        # Taxi (average 30 km/h in city)
        taxi_time = int(distance / 30 * 60) + 5  # +5 min waiting
        taxi_cost = 5 + (distance * 2)  # Base fare + per km
        transport_options["options"]["taxi"] = {
            "duration": taxi_time,
            "cost": round(taxi_cost, 2),
            "recommended": distance > 5
        }
        
        # Determine best option
        if distance <= 1:
            transport_options["recommended_mode"] = "walk"
        elif distance <= 5:
            transport_options["recommended_mode"] = "bus"
        else:
            transport_options["recommended_mode"] = "taxi"
        
        return transport_options


# Singleton instance
_route_optimizer = None


def get_route_optimizer(max_walking_per_day: float = 10.0) -> RouteOptimizer:
    global _route_optimizer
    if _route_optimizer is None:
        _route_optimizer = RouteOptimizer(max_walking_per_day)
    return _route_optimizer
