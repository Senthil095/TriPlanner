// SafetyTips Page - City safety information
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Shield, Phone, MapPin, AlertTriangle, CheckCircle,
  Search, ShieldCheck, ShieldAlert
} from 'lucide-react';
import { itineraryApi } from '../services/api';
import { useTrip } from '../context/TripContext';

function SafetyTips() {
  const [searchParams] = useSearchParams();
  const { state } = useTrip();
  
  const [city, setCity] = useState(searchParams.get('city') || state.currentTrip?.destination || '');
  const [safetyInfo, setSafetyInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (city) {
      loadSafetyInfo(city);
    }
  }, []);
  
  const loadSafetyInfo = async (cityName) => {
    setIsLoading(true);
    try {
      const info = await itineraryApi.getSafetyInfo(cityName);
      setSafetyInfo(info);
    } catch (error) {
      console.error('Failed to load safety info:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (city) {
      loadSafetyInfo(city);
    }
  };
  
  const getSafetyColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-yellow-600 bg-yellow-100';
    if (score >= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <Shield size={32} />
            Solo Safety Guide
          </h1>
          <p className="text-green-100 text-lg">
            Essential safety information for solo travelers
          </p>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-green-300 outline-none"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-colors"
              >
                Get Safety Info
              </button>
            </div>
          </form>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full" />
          </div>
        ) : safetyInfo ? (
          <div className="space-y-6">
            {/* Safety score */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{city} Safety Overview</h2>
                  <p className="text-gray-600">Overall safety assessment for solo travelers</p>
                </div>
                <div className={`px-6 py-3 rounded-xl ${getSafetyColor(safetyInfo.overall_score)}`}>
                  <div className="text-3xl font-bold">{safetyInfo.overall_score}/10</div>
                </div>
              </div>
            </div>
            
            {/* Emergency contacts */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Phone className="text-red-500" />
                Emergency Contacts
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(safetyInfo.emergency_numbers || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="capitalize text-gray-700">{key.replace('_', ' ')}</span>
                    <a href={`tel:${value}`} className="font-bold text-primary-600">
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Safe areas */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-green-500" />
                Safe Areas
              </h2>
              <div className="flex flex-wrap gap-2">
                {safetyInfo.safe_areas?.map((area, index) => (
                  <span key={index} className="px-3 py-2 bg-green-50 text-green-700 rounded-lg">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Areas to avoid */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldAlert className="text-orange-500" />
                Areas to Avoid at Night
              </h2>
              <div className="flex flex-wrap gap-2">
                {safetyInfo.areas_to_avoid_at_night?.map((area, index) => (
                  <span key={index} className="px-3 py-2 bg-orange-50 text-orange-700 rounded-lg">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Solo-friendly spots */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="text-primary-500" />
                Solo-Friendly Spots
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {safetyInfo.solo_friendly_spots?.map((spot, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-primary-50 rounded-lg">
                    <CheckCircle size={16} className="text-primary-500" />
                    <span className="text-gray-700">{spot}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* General tips */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">General Safety Tips</h2>
              <ul className="space-y-3">
                {safetyInfo.general_tips?.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Women-specific tips */}
            {safetyInfo.women_specific_tips?.length > 0 && (
              <div className="bg-pink-50 rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-pink-900 mb-4">Women Safety Tips</h2>
                <ul className="space-y-3">
                  {safetyInfo.women_specific_tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Shield size={18} className="text-pink-500 mt-0.5 flex-shrink-0" />
                      <span className="text-pink-800">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Shield size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Get Safety Information
            </h2>
            <p className="text-gray-600">
              Enter a city name above to see safety tips and recommendations
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default SafetyTips;
