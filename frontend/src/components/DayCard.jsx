// DayCard Component - Expandable day summary
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Clock, DollarSign, Footprints } from 'lucide-react';
import PlaceCard from './PlaceCard';

function DayCard({ day, onPlaceSkip, onPlaceSelect }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { day_number, theme, places, total_walking_distance, total_cost, energy_level } = day;
  
  const getEnergyColor = (level) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4 border border-gray-100">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg">
              {day_number}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{theme}</h3>
              <p className="text-sm text-gray-500">{places?.length || 0} places to visit</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Footprints size={16} />
                <span>{total_walking_distance?.toFixed(1) || 0} km</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={16} />
                <span>${total_cost?.toFixed(0) || 0}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnergyColor(energy_level)}`}>
                {energy_level} energy
              </span>
            </div>
            
            {/* Expand button */}
            <div className="text-gray-400">
              {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </div>
          </div>
        </div>
        
        {/* Mobile stats */}
        <div className="flex md:hidden items-center gap-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Footprints size={14} />
            <span>{total_walking_distance?.toFixed(1) || 0} km</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={14} />
            <span>${total_cost?.toFixed(0) || 0}</span>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEnergyColor(energy_level)}`}>
            {energy_level}
          </span>
        </div>
      </div>
      
      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="p-4 space-y-4">
            {places?.map((place, index) => (
              <div key={place.id || index} className="relative">
                {/* Timeline connector */}
                {index < places.length - 1 && (
                  <div className="absolute left-6 top-full h-4 w-0.5 bg-gray-200 z-0" />
                )}
                
                <PlaceCard 
                  place={place} 
                  onSkip={() => onPlaceSkip?.(place.id)}
                  onSelect={() => onPlaceSelect?.(place)}
                />
                
                {/* Transport to next */}
                {place.transport_to_next && index < places.length - 1 && (
                  <div className="ml-12 mt-2 mb-2 flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                      <MapPin size={12} />
                    </div>
                    <span>
                      {place.transport_to_next.mode} • {place.transport_to_next.duration} min
                      {place.transport_to_next.cost > 0 && ` • $${place.transport_to_next.cost}`}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Weather backup */}
          {day.weather_backup && (
            <div className="px-4 pb-4">
              <div className="bg-blue-50 rounded-lg p-3 text-sm">
                <span className="font-medium text-blue-800">Weather backup: </span>
                <span className="text-blue-700">{day.weather_backup}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DayCard;
