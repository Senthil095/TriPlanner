// Dashboard Page - Personalized user dashboard
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Map, Compass, Shield, Star, Clock, Plus, ChevronRight,
    Sparkles, TrendingUp, Heart, Wallet, MapPin, Calendar
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import AnimatedPage, { StaggerContainer, staggerItem } from '../components/ui/AnimatedPage';
import GlassCard from '../components/ui/GlassCard';

const moodOptions = [
    { value: 'city', emoji: '🏙️', label: 'City' },
    { value: 'nature', emoji: '🌿', label: 'Nature' },
    { value: 'adventure', emoji: '🏔️', label: 'Adventure' },
    { value: 'budget', emoji: '💰', label: 'Budget' },
    { value: 'relax', emoji: '🧘', label: 'Relax' },
];

function Dashboard() {
    const { state } = useTrip();
    const [selectedMood, setSelectedMood] = useState('city');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 17) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const userName = state.user?.displayName || state.user?.email?.split('@')[0] || 'Traveler';
    const userInitial = userName[0]?.toUpperCase() || 'T';

    return (
        <AnimatedPage className="max-w-7xl mx-auto px-4 py-6 pb-24 md:pb-8">
            {/* Greeting Section */}
            <motion.div
                className="flex items-center justify-between mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-primary-500/20">
                        {state.user?.photoURL ? (
                            <img src={state.user.photoURL} alt="" className="w-full h-full rounded-2xl object-cover" />
                        ) : userInitial}
                    </div>
                    <div>
                        <p className="text-surface-500 dark:text-surface-400 text-sm">{greeting} 👋</p>
                        <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">{userName}</h1>
                    </div>
                </div>
                <Link to="/plan" className="btn-primary flex items-center gap-2 text-sm">
                    <Plus size={18} />
                    <span className="hidden sm:inline">New Trip</span>
                </Link>
            </motion.div>

            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Quick Planner Card */}
                    <motion.div variants={staggerItem}>
                        <Link to="/plan">
                            <GlassCard className="relative overflow-hidden group" hover>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 dark:from-primary-500/10 dark:to-accent-500/10" />
                                <div className="relative flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20 flex-shrink-0">
                                        <Map size={24} className="text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                                            Plan Your Next Trip
                                        </h3>
                                        <p className="text-surface-500 dark:text-surface-400 text-sm">
                                            AI-powered itinerary generation in seconds
                                        </p>
                                    </div>
                                    <ChevronRight size={20} className="text-surface-400 group-hover:text-primary-500 transition-colors" />
                                </div>
                            </GlassCard>
                        </Link>
                    </motion.div>

                    {/* Mood Selector */}
                    <motion.div variants={staggerItem}>
                        <GlassCard hover={false}>
                            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
                                <Heart size={18} className="text-pink-500" />
                                What's your travel mood?
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {moodOptions.map(mood => (
                                    <motion.button
                                        key={mood.value}
                                        onClick={() => setSelectedMood(mood.value)}
                                        whileTap={{ scale: 0.92 }}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${selectedMood === mood.value
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-sm'
                                                : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
                                            }`}
                                    >
                                        <span className="text-xl">{mood.emoji}</span>
                                        <span className={`text-sm font-medium ${selectedMood === mood.value ? 'text-primary-600 dark:text-primary-400' : 'text-surface-600 dark:text-surface-300'
                                            }`}>{mood.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Recent Trips */}
                    <motion.div variants={staggerItem}>
                        <GlassCard hover={false}>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                                    <Clock size={18} className="text-blue-500" />
                                    Recent Trips
                                </h3>
                                <Link to="/plan" className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
                                    View all
                                </Link>
                            </div>

                            {state.savedTrips.length > 0 ? (
                                <div className="space-y-3">
                                    {state.savedTrips.slice(0, 3).map((trip, i) => (
                                        <Link key={trip.trip_id || i} to={`/itinerary?trip=${trip.trip_id}`}
                                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white flex-shrink-0">
                                                <MapPin size={18} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-surface-900 dark:text-surface-100 truncate">
                                                    {trip.destination || trip.city || 'Trip'}
                                                </p>
                                                <p className="text-xs text-surface-400 flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {trip.days || trip.duration || '?'} days
                                                </p>
                                            </div>
                                            <ChevronRight size={16} className="text-surface-400" />
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-2xl bg-surface-100 dark:bg-surface-800 flex items-center justify-center mx-auto mb-3">
                                        <Compass size={28} className="text-surface-400" />
                                    </div>
                                    <p className="text-surface-500 dark:text-surface-400 text-sm">No trips yet</p>
                                    <Link to="/plan" className="text-primary-600 dark:text-primary-400 text-sm font-medium hover:underline mt-1 inline-block">
                                        Create your first trip →
                                    </Link>
                                </div>
                            )}
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Budget Preview */}
                    <motion.div variants={staggerItem}>
                        <GlassCard hover={false}>
                            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
                                <Wallet size={18} className="text-emerald-500" />
                                Budget Overview
                            </h3>
                            <div className="flex items-center justify-center py-4">
                                <div className="relative w-32 h-32">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8"
                                            className="text-surface-200 dark:text-surface-700" />
                                        <circle cx="50" cy="50" r="42" fill="none" strokeWidth="8"
                                            strokeDasharray="264" strokeDashoffset="66"
                                            strokeLinecap="round"
                                            className="text-emerald-500"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-surface-900 dark:text-surface-100">75%</span>
                                        <span className="text-xs text-surface-400">Available</span>
                                    </div>
                                </div>
                            </div>
                            <Link to="/budget" className="block text-center text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
                                View details →
                            </Link>
                        </GlassCard>
                    </motion.div>

                    {/* Safety Score */}
                    <motion.div variants={staggerItem}>
                        <GlassCard hover={false}>
                            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                                <Shield size={18} className="text-violet-500" />
                                Safety Index
                            </h3>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                                    <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">A+</span>
                                </div>
                                <div>
                                    <p className="font-medium text-surface-900 dark:text-surface-100">Excellent</p>
                                    <p className="text-xs text-surface-400">Safety features active</p>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Hidden Gems Preview */}
                    <motion.div variants={staggerItem}>
                        <GlassCard hover={false}>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                                    <Star size={18} className="text-amber-500" />
                                    Hidden Gems
                                </h3>
                                <Link to="/hidden-gems" className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline">
                                    Explore →
                                </Link>
                            </div>
                            <div className="space-y-2">
                                {['Secret viewpoint in Bali', 'Local café in Tokyo', 'Hidden beach, Santorini'].map((gem, i) => (
                                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors cursor-pointer">
                                        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center">
                                            <Sparkles size={14} className="text-amber-500" />
                                        </div>
                                        <span className="text-sm text-surface-700 dark:text-surface-300">{gem}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div variants={staggerItem}>
                        <GlassCard hover={false}>
                            <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-3 flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500" />
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'Safety Tips', icon: Shield, to: '/safety', color: 'text-rose-500' },
                                    { label: 'AI Assistant', icon: Sparkles, to: '/chatbot', color: 'text-violet-500' },
                                    { label: 'My Notes', icon: Clock, to: '/notes', color: 'text-blue-500' },
                                ].map((action, i) => (
                                    <Link key={i} to={action.to}
                                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <action.icon size={18} className={action.color} />
                                        <span className="text-sm font-medium text-surface-700 dark:text-surface-300">{action.label}</span>
                                        <ChevronRight size={14} className="ml-auto text-surface-400" />
                                    </Link>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </StaggerContainer>
        </AnimatedPage>
    );
}

export default Dashboard;
