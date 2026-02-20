from mcp.server.fastmcp import FastMCP
from app.services.firebase_service import FirebaseService, init_firebase
from app.services.safety_service import get_safety_service
from app.services.groq_service import get_groq_service
import asyncio

# Initialize Firebase on module import or server start
try:
    init_firebase()
except Exception as e:
    print(f"Warning: Firebase init failed (might be already initialized): {e}")

# Create MCP Server
mcp = FastMCP("Triplanner API")

@mcp.resource("safety://{city}")
async def get_city_safety(city: str) -> str:
    """Get safety information for a specific city"""
    safety_service = get_safety_service()
    info = await safety_service.get_city_safety_info(city)
    return str(info)

@mcp.resource("gems://{city}")
async def get_hidden_gems(city: str) -> str:
    """Get hidden gems in a city"""
    firebase_service = FirebaseService()
    gems = await firebase_service.get_hidden_gems_by_city(city)
    return str(gems)

@mcp.resource("guides://{city}")
async def get_guides(city: str) -> str:
    """Get available guides in a city"""
    firebase_service = FirebaseService()
    guides = await firebase_service.get_guides_by_city(city)
    return str(guides)

@mcp.tool()
async def find_hidden_gems(city: str) -> str:
    """Find hidden gems in a specific city. Returns a list of gems with descriptions."""
    firebase_service = FirebaseService()
    gems = await firebase_service.get_hidden_gems_by_city(city)
    if not gems:
        return f"No hidden gems found for {city}."
    
    result = f"Hidden Gems in {city}:\n\n"
    for gem in gems:
        result += f"- {gem.get('name')} ({gem.get('category')}): {gem.get('description')}\n"
    return result

@mcp.tool()
async def check_safety(city: str) -> str:
    """Check safety score and advisory for a city."""
    safety_service = get_safety_service()
    info = await safety_service.get_city_safety_info(city)
    
    score = info.get("overall_score", "N/A")
    advisory = info.get("advisory", "No specific advisory.")
    
    return f"Safety Report for {city}:\nScore: {score}/10\nAdvisory: {advisory}"

@mcp.tool()
async def plan_trip_overview(destination: str, duration: int, interests: list[str]) -> str:
    """Generate a quick trip overview using AI."""
    groq_service = get_groq_service()
    # Simplified request for the tool
    request_data = {
        "destination": destination,
        "duration": duration,
        "interests": interests,
        "budget_range": "medium",
        "mood": "adventure",
        "persona": "explorer",
        "safety_mode": True,
        "start_date": "2024-06-01" 
    }
    
    try:
        itinerary = await groq_service.generate_itinerary(request_data)
        return f"Trip Overview for {destination}:\n\n{itinerary.get('trip_overview', 'No overview generated.')}"
    except Exception as e:
        return f"Failed to generate plan: {e}"

if __name__ == "__main__":
    mcp.run()
