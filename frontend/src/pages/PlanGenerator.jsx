// PlanGenerator Page - Form for generating itinerary
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  MapPin, Calendar, Heart, DollarSign, Smile, User,
  Shield, Loader2, Sparkles, ChevronRight
} from 'lucide-react';
import { itineraryApi } from '../services/api';
import { useTrip } from '../context/TripContext';

const interests = [
  { id: 'culture', label: 'Culture', icon: '🏛️' },
  { id: 'food', label: 'Food', icon: '🍜' },
  { id: 'adventure', label: 'Adventure', icon: '🏔️' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'relaxation', label: 'Relaxation', icon: '🧘' },
];

const moods = [
  { id: 'relaxed', label: 'Relaxed', description: 'Fewer places, more downtime', icon: '😌' },
  { id: 'energetic', label: 'Energetic', description: 'Balanced pace, full days', icon: '⚡' },
  { id: 'adventurous', label: 'Adventurous', description: 'Pack in the experiences!', icon: '🔥' },
];

const personas = [
  { id: 'budget_nomad', label: 'Budget Nomad', description: 'Maximize experiences, minimize costs' },
  { id: 'culture_explorer', label: 'Culture Explorer', description: 'Deep dive into local culture' },
  { id: 'digital_nomad', label: 'Digital Nomad', description: 'Balance work and exploration' },
  { id: 'weekend_tripper', label: 'Weekend Tripper', description: 'Quick, impactful visits' },
];

const budgetRanges = [
  { id: 'budget', label: 'Budget', description: '$50-100/day' },
  { id: 'moderate', label: 'Moderate', description: '$100-200/day' },
  { id: 'luxury', label: 'Luxury', description: '$200+/day' },
];

function PlanGenerator() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { actions } = useTrip();
  
  const [formData, setFormData] = useState({
    destination: searchParams.get('destination') || '',
    duration: 3,
    interests: [],
    budget_range: 'moderate',
    mood: 'energetic',
    persona: 'culture_explorer',
    safety_mode: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((i) => i !== interestId)
        : [...prev.interests, interestId],
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.destination) {
      setError('Please enter a destination');
      return;
    }
    
    if (formData.interests.length === 0) {
      setError('Please select at least one interest');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const itinerary = await itineraryApi.generate(formData);
      
      // Save to context and offline storage
      await actions.saveTrip(itinerary);
      actions.setCurrentTrip(itinerary);
      
      // Navigate to itinerary view
      navigate('/itinerary', { state: { tripId: itinerary.trip_id } });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to generate itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plan Your Solo Adventure
          </h1>
          <p className="text-lg text-gray-600">
            Tell us about your trip and we'll create the perfect itinerary
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <MapPin className="text-primary-500" size={24} />
              Where are you going?
            </label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              placeholder="Enter city name (e.g., Paris, Tokyo, Bangkok)"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-lg"
            />
          </div>
          
          {/* Duration */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Calendar className="text-primary-500" size={24} />
              How many days?
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="14"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <span className="text-2xl font-bold text-primary-600 w-16 text-center">
                {formData.duration} {formData.duration === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
          
          {/* Interests */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Heart className="text-primary-500" size={24} />
              What are your interests?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.interests.includes(interest.id)
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{interest.icon}</div>
                  <div className="text-sm font-medium text-gray-700">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Budget */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <DollarSign className="text-primary-500" size={24} />
              What's your budget?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {budgetRanges.map((budget) => (
                <button
                  key={budget.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget_range: budget.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.budget_range === budget.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{budget.label}</div>
                  <div className="text-sm text-gray-500">{budget.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Mood */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Smile className="text-primary-500" size={24} />
              What's your travel mood?
            </label>
            <div className="grid grid-cols-3 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, mood: mood.id })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.mood === mood.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{mood.icon}</div>
                  <div className="font-semibold text-gray-900">{mood.label}</div>
                  <div className="text-xs text-gray-500">{mood.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Persona */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <User className="text-primary-500" size={24} />
              What type of traveler are you?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, persona: persona.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.persona === persona.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-900">{persona.label}</div>
                  <div className="text-sm text-gray-500">{persona.description}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Safety Mode */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-primary-500" size={24} />
                <div>
                  <h3 className="font-semibold text-gray-900">Women Safety Mode</h3>
                  <p className="text-sm text-gray-500">
                    Prioritize safe areas and solo-friendly locations
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, safety_mode: !formData.safety_mode })}
                className={`w-14 h-8 rounded-full transition-colors ${
                  formData.safety_mode ? 'bg-primary-500' : 'bg-gray-200'
                }`}
              >
                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                  formData.safety_mode ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
              {error}
            </div>
          )}
          
          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-primary-500 text-white rounded-xl font-semibold text-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                Generating Your Perfect Itinerary...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Generate My Itinerary
                <ChevronRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PlanGenerator;
