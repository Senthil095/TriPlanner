// App.jsx - Main application with routing
import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home as HomeIcon, Map, Shield, Star, StickyNote, 
  MessageCircle, DollarSign, Menu, X, User, LogOut
} from 'lucide-react';
import { useState } from 'react';
import { useTrip } from './context/TripContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import PlanGenerator from './pages/PlanGenerator';
import ItineraryView from './pages/ItineraryView';
import BudgetView from './pages/BudgetView';
import SafetyTips from './pages/SafetyTips';
import HiddenGems from './pages/HiddenGems';
import Notes from './pages/Notes';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import Signup from './pages/Signup';

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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = React.useRef(null);
  const { state, actions } = useTrip();
  
  // Close user menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Don't show nav on auth pages or itinerary view
  if (location.pathname === '/itinerary' || location.pathname === '/login' || location.pathname === '/signup') {
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
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <User size={18} className="text-primary-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {state.user?.email?.split('@')[0] || 'User'}
                  </span>
                </button>
                
                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{state.user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        actions.logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
              >
                <User size={18} />
                Sign In
              </Link>
            )}
            
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
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/plan" element={
          <ProtectedRoute>
            <PlanGenerator />
          </ProtectedRoute>
        } />
        <Route path="/itinerary" element={
          <ProtectedRoute>
            <ItineraryView />
          </ProtectedRoute>
        } />
        <Route path="/budget" element={
          <ProtectedRoute>
            <BudgetView />
          </ProtectedRoute>
        } />
        <Route path="/safety" element={<SafetyTips />} />
        <Route path="/hidden-gems" element={<HiddenGems />} />
        <Route path="/notes" element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        } />
        <Route path="/chatbot" element={
          <ProtectedRoute>
            <Chatbot />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
