// SafetyBadge Component - Visual safety indicator
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

function SafetyBadge({ score, size = 'md', showLabel = false }) {
  const getConfig = (score) => {
    if (score >= 8) {
      return {
        icon: ShieldCheck,
        color: 'text-green-600 bg-green-100',
        label: 'Very Safe',
      };
    } else if (score >= 6) {
      return {
        icon: Shield,
        color: 'text-yellow-600 bg-yellow-100',
        label: 'Moderate',
      };
    } else if (score >= 4) {
      return {
        icon: ShieldAlert,
        color: 'text-orange-600 bg-orange-100',
        label: 'Caution',
      };
    } else {
      return {
        icon: ShieldAlert,
        color: 'text-red-600 bg-red-100',
        label: 'High Risk',
      };
    }
  };
  
  const config = getConfig(score || 5);
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };
  
  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20,
  };
  
  if (showLabel) {
    return (
      <div className={`flex items-center gap-2 px-2 py-1 rounded-lg ${config.color}`}>
        <Icon size={iconSizes[size]} />
        <span className="font-medium">{config.label}</span>
        <span className="font-bold">{score}/10</span>
      </div>
    );
  }
  
  return (
    <div 
      className={`${sizeClasses[size]} rounded-full ${config.color} flex items-center justify-center`}
      title={`Safety Score: ${score}/10 - ${config.label}`}
    >
      <Icon size={iconSizes[size]} />
    </div>
  );
}

export default SafetyBadge;
