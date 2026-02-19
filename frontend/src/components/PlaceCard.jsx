// PlaceCard Component - Individual place details
import React from 'react';
import { Clock, DollarSign, Camera, Shield, SkipForward, Info } from 'lucide-react';
import SafetyBadge from './SafetyBadge';

function PlaceCard({ place, onSkip, onSelect, compact = false }) {
  const {
    name,
    description,
    category,
    recommended_time,
    cost_estimate,
    safety_score,
    safety_tips,
    cultural_etiquette,
    is_instagram_spot,
    image_url,
  } = place;
  
  if (compact) {
    return (
      <div 
        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={onSelect}
      >
        <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
          <span className="text-primary-600 text-xs font-medium">{category?.slice(0, 3).toUpperCase()}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{name}</h4>
          <p className="text-xs text-gray-500">{recommended_time}</p>
        </div>
        <SafetyBadge score={safety_score} size="sm" />
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
      <div className="flex gap-4">
        {/* Image or placeholder */}
        <div className="w-20 h-20 rounded-lg bg-gray-200 flex-shrink-0 overflow-hidden">
          {image_url ? (
            <img src={image_url} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Camera size={24} />
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{name}</h4>
                {is_instagram_spot && (
                  <span className="px-2 py-0.5 bg-pink-100 text-pink-700 text-xs rounded-full flex items-center gap-1">
                    <Camera size={10} />
                    Photo spot
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wide">{category}</span>
            </div>
            <SafetyBadge score={safety_score} />
          </div>
          
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
          
          {/* Meta info */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{recommended_time}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={14} />
              <span>${cost_estimate?.toFixed(0) || 0}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Safety tips */}
      {safety_tips && safety_tips.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
            <Shield size={12} />
            <span>Safety Tips</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            {safety_tips.slice(0, 2).map((tip, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-gray-400">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Cultural etiquette */}
      {cultural_etiquette && cultural_etiquette.length > 0 && (
        <div className="mt-2">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-700 mb-1">
            <Info size={12} />
            <span>Cultural Notes</span>
          </div>
          <ul className="text-xs text-gray-600 space-y-1">
            {cultural_etiquette.slice(0, 2).map((note, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-gray-400">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Actions */}
      {onSkip && (
        <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSkip();
            }}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <SkipForward size={14} />
            Skip this place
          </button>
        </div>
      )}
    </div>
  );
}

export default PlaceCard;
