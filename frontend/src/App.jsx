// App.jsx - Main application with routing
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, Map, Shield, Star, StickyNote, 
  MessageCircle, DollarSign, Menu, X, User
} from 'lucide-react';
import { useState } from 'react';
import { useTrip } from './context/TripContext';

// Pages
import Home from './pages/Home';
import PlanGenerator from './pages/PlanGenerator';
import ItineraryView from './pages/ItineraryView';
import BudgetView from './pages/BudgetView';
import SafetyTips from './pages/SafetyTips';
import HiddenGems from './pages/HiddenGems';
import Notes from './pages/Notes';
import Chatbot from './pages/Chatbot';

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/plan', label: 'Plan Trip', icon: Map },
  { path: '/safety', label: 'Safety', icon: Shield },
  { path: '/hidden-gems', label: 'Hidden Gems', icon: Star },
  { path: '/notes', label: 'Notes', icon: StickyNote },
  { path: '/chatbot', label: 'Assistant', icon: MessageCircle },
];

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useTrip();
  
  // Don't show nav on itinerary view (has its own header)
  if (location.pathname === '/itinerary') {
    return null;
  }
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <Map size={20} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">AI Travel Planner</span>
          </Link>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          {/* Online status & user */}
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${state.isOnline ? 'bg-green-500' : 'bg-gray-400'}`} 
                 title={state.isOnline ? 'Online' : 'Offline'} />
            
            {state.isAuthenticated ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={18} className="text-gray-600" />
              </div>
            ) : null}
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-600'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<PlanGenerator />} />
        <Route path="/itinerary" element={<ItineraryView />} />
        <Route path="/budget" element={<BudgetView />} />
        <Route path="/safety" element={<SafetyTips />} />
        <Route path="/hidden-gems" element={<HiddenGems />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;
