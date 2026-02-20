"""
Groq Service for AI Chat Assistant

Uses Groq's ultra-fast LLM inference for the travel chatbot.
"""

from groq import Groq
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

# System prompt for travel assistant
TRAVEL_ASSISTANT_PROMPT = """You are an expert AI travel assistant for TriPlanner. You help users plan trips, answer travel questions, and provide recommendations.

Your capabilities:
- Answer questions about destinations, attractions, and activities
- Provide budget tips and cost estimates
- Give safety advice and cultural etiquette tips
- Suggest restaurants, hotels, and local experiences
- Help with itinerary modifications
- Provide weather-related alternatives
- Share local transportation options

Guidelines:
- Be friendly, helpful, and conversational
- Give concise but informative answers
- Use emojis sparingly to make responses engaging
- If you don't know something specific, suggest where they can find the information
- Always prioritize traveler safety
- Be culturally sensitive and respectful

When the user shares their current itinerary context, use it to provide more relevant and personalized advice."""


class GroqService:
    """Service for interacting with Groq API for chat functionality"""
    
    def __init__(self):
        self.client = Groq(api_key=settings.groq_api_key)
        self.model = settings.groq_model
        self.max_tokens = settings.max_tokens

    def _extract_json(self, text: str) -> Dict[str, Any]:
        """Extract JSON from the model's response"""
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
        """Generate a complete travel itinerary using Groq"""
        
        user_prompt = get_itinerary_prompt(request_data)
        
        try:
            chat_completion = self.client.chat.completions.create(
                model=self.model,
                max_tokens=self.max_tokens,
                messages=[
                    {"role": "system", "content": ITINERARY_SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt}
                ]
            )
            
            response_text = chat_completion.choices[0].message.content
            itinerary = self._extract_json(response_text)
            
            return itinerary
            
        except Exception as e:
            raise Exception(f"Groq API error generating itinerary: {str(e)}")

    async def replan_itinerary(
        self,
        original_itinerary: Dict[str, Any],
        skipped_places: List[str],
        skipped_days: List[int],
        new_preferences: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Replan an existing itinerary based on changes using Groq"""
        
        user_prompt = get_replan_prompt(original_itinerary, skipped_places, skipped_days)
        
        if new_preferences:
            user_prompt += f"\n\n## Updated Preferences:\n{json.dumps(new_preferences, indent=2)}"
        
        try:
            chat_completion = self.client.chat.completions.create(
                model=self.model,
                max_tokens=self.max_tokens,
                messages=[
                    {"role": "system", "content": REPLAN_SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt}
                ]
            )
            
            response_text = chat_completion.choices[0].message.content
            updated_itinerary = self._extract_json(response_text)
            
            return updated_itinerary
            
        except Exception as e:
            raise Exception(f"Groq API error replanning itinerary: {str(e)}")

    async def get_cultural_tips(self, destination: str) -> Dict[str, Any]:
        """Get cultural etiquette tips for a destination using Groq"""
        
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
            chat_completion = self.client.chat.completions.create(
                model=self.model,
                max_tokens=2048,
                messages=[{"role": "user", "content": prompt}]
            )
            
            return self._extract_json(chat_completion.choices[0].message.content)
            
        except Exception as e:
            return {
                "dress_code": ["Dress appropriately for local customs"],
                "behavior_rules": ["Be respectful of local traditions"],
                "local_customs": ["Research local customs before your trip"],
                "tipping_culture": "Varies by establishment",
                "common_phrases": {"hello": "Hello", "thank_you": "Thank you"}
            }
    
    async def chat(
        self,
        message: str,
        conversation_history: List[Dict[str, str]] = None,
        itinerary_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Handle chat interactions with the travel assistant using Groq.
        
        Args:
            message: User's message
            conversation_history: Previous messages in the conversation
            itinerary_context: Current trip itinerary for context
            
        Returns:
            Dict with response text and suggested actions
        """
        
        # Build context-aware user prompt
        user_prompt = message
        if itinerary_context:
            user_prompt = f"""Current Trip Context:
Destination: {itinerary_context.get('destination', 'Not specified')}
Duration: {itinerary_context.get('total_days', 'Not specified')} days
Budget: ${itinerary_context.get('total_budget', 'Not specified')}

User Question: {message}"""
        
        # Build messages list
        messages = [
            {"role": "system", "content": TRAVEL_ASSISTANT_PROMPT}
        ]
        
        # Add conversation history (last 10 messages for context)
        if conversation_history:
            for msg in conversation_history[-10:]:
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", "")
                })
        
        # Add current user message
        messages.append({"role": "user", "content": user_prompt})
        
        try:
            # Call Groq API
            chat_completion = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=0.7,
                top_p=0.9,
            )
            
            response_text = chat_completion.choices[0].message.content
            
            # Extract suggested actions based on response content
            suggested_actions = self._extract_suggested_actions(response_text)
            
            return {
                "response": response_text,
                "suggested_actions": suggested_actions,
                "model": self.model,
                "usage": {
                    "prompt_tokens": chat_completion.usage.prompt_tokens,
                    "completion_tokens": chat_completion.usage.completion_tokens,
                    "total_tokens": chat_completion.usage.total_tokens
                }
            }
            
        except Exception as e:
            raise Exception(f"Groq API error: {str(e)}")
    
    def _extract_suggested_actions(self, response_text: str) -> List[str]:
        """Extract suggested follow-up actions from the response"""
        suggested_actions = []
        
        response_lower = response_text.lower()
        
        if any(word in response_lower for word in ["budget", "cost", "price", "expensive", "cheap"]):
            suggested_actions.append("Check budget details")
        
        if any(word in response_lower for word in ["weather", "rain", "sunny", "cold", "hot"]):
            suggested_actions.append("View weather alternatives")
        
        if any(word in response_lower for word in ["restaurant", "food", "eat", "cuisine", "dining"]):
            suggested_actions.append("Find restaurants")
        
        if any(word in response_lower for word in ["hotel", "stay", "accommodation", "hostel"]):
            suggested_actions.append("Browse accommodations")
        
        if any(word in response_lower for word in ["safe", "danger", "caution", "warning"]):
            suggested_actions.append("View safety tips")
        
        if any(word in response_lower for word in ["modify", "change", "alternative", "instead"]):
            suggested_actions.append("Modify itinerary")
        
        return suggested_actions[:3]  # Return max 3 suggestions
    
    async def quick_response(self, prompt: str) -> str:
        """Get a quick response without conversation history"""
        try:
            chat_completion = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": TRAVEL_ASSISTANT_PROMPT},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1024,
                temperature=0.7,
            )
            return chat_completion.choices[0].message.content
        except Exception as e:
            raise Exception(f"Groq API error: {str(e)}")


# Singleton instance
_groq_service = None


def get_groq_service() -> GroqService:
    """Get or create the Groq service singleton"""
    global _groq_service
    if _groq_service is None:
        _groq_service = GroqService()
    return _groq_service
