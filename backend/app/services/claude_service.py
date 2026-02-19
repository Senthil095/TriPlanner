import anthropic
import json
import re
from typing import Dict, Any, List, Optional
from app.config import get_settings
from app.prompts.itinerary_prompt import (
    ITINERARY_SYSTEM_PROMPT,
    CHAT_SYSTEM_PROMPT,
    REPLAN_SYSTEM_PROMPT,
    get_itinerary_prompt,
    get_replan_prompt,
    get_chat_prompt,
)

settings = get_settings()


class ClaudeService:
    """Service for interacting with Claude AI API"""
    
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        self.model = settings.claude_model
        self.max_tokens = settings.max_tokens
    
    def _extract_json(self, text: str) -> Dict[str, Any]:
        """Extract JSON from Claude's response"""
        # Try to find JSON in code blocks first
        json_match = re.search(r'```(?:json)?\s*([\s\S]*?)\s*```', text)
        if json_match:
            json_str = json_match.group(1)
        else:
            # Try to find raw JSON
            json_match = re.search(r'\{[\s\S]*\}', text)
            if json_match:
                json_str = json_match.group(0)
            else:
                raise ValueError("No JSON found in response")
        
        return json.loads(json_str)
    
    async def generate_itinerary(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate a complete travel itinerary using Claude"""
        
        user_prompt = get_itinerary_prompt(request_data)
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                system=ITINERARY_SYSTEM_PROMPT,
                messages=[
                    {"role": "user", "content": user_prompt}
                ]
            )
            
            response_text = message.content[0].text
            itinerary = self._extract_json(response_text)
            
            return itinerary
            
        except anthropic.APIError as e:
            raise Exception(f"Claude API error: {str(e)}")
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse itinerary JSON: {str(e)}")
    
    async def replan_itinerary(
        self,
        original_itinerary: Dict[str, Any],
        skipped_places: List[str],
        skipped_days: List[int],
        new_preferences: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Replan an existing itinerary based on changes"""
        
        user_prompt = get_replan_prompt(original_itinerary, skipped_places, skipped_days)
        
        if new_preferences:
            user_prompt += f"\n\n## Updated Preferences:\n{json.dumps(new_preferences, indent=2)}"
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=self.max_tokens,
                system=REPLAN_SYSTEM_PROMPT,
                messages=[
                    {"role": "user", "content": user_prompt}
                ]
            )
            
            response_text = message.content[0].text
            updated_itinerary = self._extract_json(response_text)
            
            return updated_itinerary
            
        except anthropic.APIError as e:
            raise Exception(f"Claude API error: {str(e)}")
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse replanned itinerary JSON: {str(e)}")
    
    async def chat(
        self,
        message: str,
        conversation_history: List[Dict[str, str]],
        itinerary_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Handle chat interactions with travel assistant"""
        
        user_prompt = get_chat_prompt(message, itinerary_context)
        
        # Build messages with history
        messages = []
        for msg in conversation_history[-10:]:  # Keep last 10 messages for context
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })
        
        messages.append({"role": "user", "content": user_prompt})
        
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                system=CHAT_SYSTEM_PROMPT,
                messages=messages
            )
            
            response_text = response.content[0].text
            
            # Check if response contains itinerary update
            updated_itinerary = None
            try:
                if "{" in response_text and "days" in response_text:
                    updated_itinerary = self._extract_json(response_text)
            except (json.JSONDecodeError, ValueError):
                pass  # No JSON in response, that's fine
            
            # Extract suggested actions from response
            suggested_actions = []
            if "you could" in response_text.lower() or "suggest" in response_text.lower():
                suggested_actions = ["View alternatives", "Modify plan", "Keep current"]
            
            return {
                "response": response_text,
                "suggested_actions": suggested_actions,
                "updated_itinerary": updated_itinerary
            }
            
        except anthropic.APIError as e:
            raise Exception(f"Claude API error: {str(e)}")
    
    async def get_cultural_tips(self, destination: str) -> Dict[str, Any]:
        """Get cultural etiquette tips for a destination"""
        
        prompt = f"""Provide detailed cultural etiquette information for solo travelers visiting {destination}.

Include:
1. Dress code guidelines
2. Behavior rules in public places
3. Local customs to be aware of
4. Tipping culture
5. Common useful phrases in local language

Respond in JSON format:
{{
  "dress_code": ["guideline1", "guideline2"],
  "behavior_rules": ["rule1", "rule2"],
  "local_customs": ["custom1", "custom2"],
  "tipping_culture": "Description",
  "common_phrases": {{"hello": "local_word", "thank_you": "local_word", "excuse_me": "local_word"}}
}}
"""
        
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=2048,
                messages=[{"role": "user", "content": prompt}]
            )
            
            return self._extract_json(message.content[0].text)
            
        except Exception as e:
            return {
                "dress_code": ["Dress appropriately for local customs"],
                "behavior_rules": ["Be respectful of local traditions"],
                "local_customs": ["Research local customs before your trip"],
                "tipping_culture": "Varies by establishment",
                "common_phrases": {"hello": "Hello", "thank_you": "Thank you"}
            }


# Singleton instance
_claude_service = None


def get_claude_service() -> ClaudeService:
    global _claude_service
    if _claude_service is None:
        _claude_service = ClaudeService()
    return _claude_service
