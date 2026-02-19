// ChatWidget Component - Floating chat button and quick actions
import React, { useState } from 'react';
import { MessageCircle, X, Send, Navigation, CloudRain, Edit, DollarSign, Shield, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const quickActions = [
  { id: 'whats_next', label: "What's next?", icon: Navigation },
  { id: 'weather_backup', label: 'Weather backup', icon: CloudRain },
  { id: 'change_plan', label: 'Change plan', icon: Edit },
  { id: 'budget_check', label: 'Budget check', icon: DollarSign },
  { id: 'safety_tips', label: 'Safety tips', icon: Shield },
  { id: 'local_food', label: 'Local food', icon: Utensils },
];

function ChatWidget({ tripId, onQuickAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleQuickAction = (actionId) => {
    if (onQuickAction) {
      onQuickAction(actionId);
    }
    setIsOpen(false);
  };
  
  const handleOpenChat = () => {
    navigate('/chatbot', { state: { tripId } });
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick actions panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden mb-2 animate-in slide-in-from-bottom-4">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-500">Get instant help with your trip</p>
          </div>
          
          <div className="p-2 grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <Icon size={18} className="text-primary-500" />
                  <span className="text-sm text-gray-700">{action.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="p-3 border-t border-gray-100">
            <button
              onClick={handleOpenChat}
              className="w-full py-2 px-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Open Full Chat
            </button>
          </div>
        </div>
      )}
      
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-105 ${
          isOpen 
            ? 'bg-gray-600 text-white rotate-90' 
            : 'bg-primary-500 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}

export default ChatWidget;
