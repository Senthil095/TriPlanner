// Chatbot Page - AI Travel Assistant
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Send, Bot, User, Loader2, Sparkles,
  Navigation, CloudRain, Edit, DollarSign, Shield, Utensils
} from 'lucide-react';
import { chatApi } from '../services/api';
import { useTrip } from '../context/TripContext';

const quickActions = [
  { id: 'whats_next', label: "What's next?", icon: Navigation },
  { id: 'weather_backup', label: 'Weather alternatives', icon: CloudRain },
  { id: 'change_plan', label: 'Change my plan', icon: Edit },
  { id: 'budget_check', label: 'Budget check', icon: DollarSign },
  { id: 'safety_tips', label: 'Safety tips', icon: Shield },
  { id: 'local_food', label: 'Local food', icon: Utensils },
];

function Chatbot() {
  const location = useLocation();
  const { state } = useTrip();
  const messagesEndRef = useRef(null);
  
  const tripId = location.state?.tripId || state.currentTrip?.trip_id;
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI travel assistant. I can help you with your trip - ask me about your itinerary, get recommendations, or modify your plans. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      const response = await chatApi.send({
        message: userMessage,
        trip_id: tripId,
        conversation_history: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });
      
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.response, suggestions: response.suggested_actions },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I couldn't process your request. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickAction = async (actionId) => {
    if (isLoading) return;
    
    const action = quickActions.find((a) => a.id === actionId);
    setMessages((prev) => [...prev, { role: 'user', content: action.label }]);
    setIsLoading(true);
    
    try {
      const response = await chatApi.quickAction(actionId, tripId);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.response },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "I'm sorry, I couldn't process your request. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Bot className="text-primary-500" />
            Travel Assistant
          </h1>
          <p className="text-sm text-gray-600">
            Ask me anything about your trip
          </p>
        </div>
      </header>
      
      {/* Messages */}
      <main className="flex-1 overflow-y-auto py-4">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} className="text-primary-600" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white shadow-sm border border-gray-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                
                {/* Suggestions */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setInput(suggestion);
                        }}
                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-gray-600" />
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <Bot size={18} className="text-primary-600" />
              </div>
              <div className="bg-white shadow-sm border border-gray-100 rounded-2xl px-4 py-3">
                <Loader2 className="animate-spin text-primary-500" size={20} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>
      
      {/* Quick actions */}
      <div className="bg-white border-t border-gray-100 py-3">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  <Icon size={16} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Input */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your trip..."
                rows={1}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
