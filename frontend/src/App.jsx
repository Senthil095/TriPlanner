// App.jsx - Main application with routing, theme, and glassmorphism design
import React, { Suspense, lazy, useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home as HomeIcon, Map, Shield, Star, StickyNote,
  MessageCircle, DollarSign, Menu, X, User, LogOut, Compass
} from 'lucide-react';
import { useTrip } from './context/TripContext';
import { useTheme } from './context/ThemeContext';

// UI Components
import ThemeToggle from './components/ui/ThemeToggle';
import FloatingBottomNav from './components/ui/FloatingBottomNav';
import { SkeletonCard } from './components/ui/SkeletonLoader';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home'));
const PlanGenerator = lazy(() => import('./pages/PlanGenerator'));
const ItineraryView = lazy(() => import('./pages/ItineraryView'));
const BudgetView = lazy(() => import('./pages/BudgetView'));
const SafetyTips = lazy(() => import('./pages/SafetyTips'));
const HiddenGems = lazy(() => import('./pages/HiddenGems'));
const Notes = lazy(() => import('./pages/Notes'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Onboarding = lazy(() => import('./pages/Onboarding'));

// Loading fallback
function PageLoader() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/dashboard', label: 'Dashboard', icon: Compass },
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
  const userMenuRef = useRef(null);
  const { state, actions } = useTrip();

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hide nav on auth/onboarding pages
  const hiddenPaths = ['/login', '/signup', '/onboarding'];
  if (hiddenPaths.some(p => location.pathname.startsWith(p))) {
    return null;
  }

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <Map size={18} className="text-white" />
            </div>
            <span className="font-bold text-surface-900 dark:text-surface-100 hidden sm:block text-lg">
              TriPlanner
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium ${isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-primary-50 dark:bg-primary-500/10 rounded-xl"
                      layoutId="navIndicator"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon size={16} className="relative z-10" />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Online indicator */}
            <div
              className={`w-2 h-2 rounded-full ${state.isOnline ? 'bg-emerald-500' : 'bg-surface-400'}`}
              title={state.isOnline ? 'Online' : 'Offline'}
            />

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User menu */}
            {state.isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-semibold">
                    {(state.user?.displayName || state.user?.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-surface-700 dark:text-surface-200">
                    {state.user?.displayName || state.user?.email?.split('@')[0] || 'User'}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 glass-card p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-surface-200 dark:border-surface-700 mb-1">
                        <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
                          {state.user?.email}
                        </p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 transition-colors"
                      >
                        <Compass size={16} />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          actions.logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md shadow-primary-500/20 hover:shadow-primary-500/40"
              >
                <User size={16} />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              {isMenuOpen ? (
                <X size={22} className="text-surface-600 dark:text-surface-300" />
              ) : (
                <Menu size={22} className="text-surface-600 dark:text-surface-300" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-surface-200/50 dark:border-surface-700/50 overflow-hidden"
          >
            <div className="py-2 px-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400'
                        : 'text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'
                      }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <Navigation />

      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/onboarding" element={
              <ProtectedRoute><Onboarding /></ProtectedRoute>
            } />
            <Route path="/plan" element={
              <ProtectedRoute><PlanGenerator /></ProtectedRoute>
            } />
            <Route path="/itinerary" element={
              <ProtectedRoute><ItineraryView /></ProtectedRoute>
            } />
            <Route path="/budget" element={
              <ProtectedRoute><BudgetView /></ProtectedRoute>
            } />
            <Route path="/safety" element={<SafetyTips />} />
            <Route path="/hidden-gems" element={<HiddenGems />} />
            <Route path="/notes" element={
              <ProtectedRoute><Notes /></ProtectedRoute>
            } />
            <Route path="/chatbot" element={
              <ProtectedRoute><Chatbot /></ProtectedRoute>
            } />
          </Routes>
        </AnimatePresence>
      </Suspense>

      {/* Floating bottom nav for mobile */}
      <FloatingBottomNav />

      {/* Bottom padding for mobile nav */}
      <div className="h-20 md:h-0" />
    </div>
  );
}

export default App;
