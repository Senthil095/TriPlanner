// Dashboard.jsx - Central hub for user's travel plans
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Map,
    Calendar,
    DollarSign,
    Shield,
    Plus,
    Clock,
    ChevronRight,
    TrendingUp,
    MapPin
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import AnimatedPage from '../components/ui/AnimatedPage';
import GlassCard from '../components/ui/GlassCard';

export default function Dashboard() {
    const { state } = useTrip();
    const navigate = useNavigate();
    const { user, currentTrip, savedTrips } = state;

    // Calculate quick stats
    const totalTrips = savedTrips.length + (currentTrip ? 1 : 0);
    const upcomingTrips = savedTrips.filter(t => new Date(t.startDate) > new Date()).length;

    return (
        <AnimatedPage className="py-8 px-4 max-w-7xl mx-auto space-y-8">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-surface-100"
                    >
                        Welcome back, {user?.displayName?.split(' ')[0] || 'Traveler'}! 👋
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-surface-500 dark:text-surface-400 mt-1"
                    >
                        Ready to plan your next adventure?
                    </motion.p>
                </div>

                <Link to="/plan">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-primary flex items-center gap-2 shadow-lg shadow-primary-500/30"
                    >
                        <Plus size={20} />
                        New Trip
                    </motion.button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* BIG CARD: Current Active Trip or CTA */}
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-surface-800 dark:text-surface-200">
                        <Map className="text-primary-500" size={20} />
                        Current Trip
                    </h2>

                    {currentTrip ? (
                        <GlassCard className="h-full flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Map size={120} />
                            </div>

                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-300 text-xs font-semibold mb-2">
                                            Active Plan
                                        </span>
                                        <h3 className="text-3xl font-bold text-surface-900 dark:text-surface-100">
                                            {currentTrip.destination}
                                        </h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-surface-500 dark:text-surface-400">Duration</p>
                                        <p className="font-semibold text-surface-900 dark:text-surface-100">
                                            {currentTrip.days} Days
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                                    <div className="bg-surface-50 dark:bg-surface-800/50 p-3 rounded-xl">
                                        <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400 text-sm mb-1">
                                            <Calendar size={14} /> Dates
                                        </div>
                                        <p className="font-medium text-surface-900 dark:text-surface-100">
                                            {currentTrip.startDate ? new Date(currentTrip.startDate).toLocaleDateString() : 'TBD'}
                                        </p>
                                    </div>
                                    <div className="bg-surface-50 dark:bg-surface-800/50 p-3 rounded-xl">
                                        <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400 text-sm mb-1">
                                            <DollarSign size={14} /> Budget
                                        </div>
                                        <p className="font-medium text-surface-900 dark:text-surface-100">
                                            {currentTrip.budget || 'Flexible'}
                                        </p>
                                    </div>
                                    <div className="bg-surface-50 dark:bg-surface-800/50 p-3 rounded-xl">
                                        <div className="flex items-center gap-2 text-surface-500 dark:text-surface-400 text-sm mb-1">
                                            <Shield size={14} /> Safety
                                        </div>
                                        <p className="font-medium text-green-600 dark:text-green-400">
                                            Verified
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-surface-200 dark:border-surface-700 flex gap-3">
                                <Link to="/itinerary" className="flex-1">
                                    <button className="w-full btn-primary py-2 text-sm">
                                        View Itinerary
                                    </button>
                                </Link>
                                <Link to="/budget" className="flex-1">
                                    <button className="w-full btn-secondary py-2 text-sm">
                                        Manage Budget
                                    </button>
                                </Link>
                            </div>
                        </GlassCard>
                    ) : (
                        <GlassCard className="h-64 flex flex-col items-center justify-center text-center p-8 border-dashed border-2 border-surface-300 dark:border-surface-600 bg-surface-50/50 dark:bg-surface-900/50">
                            <div className="w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center mb-4">
                                <MapPin size={32} className="text-surface-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-2">
                                No Active Trip
                            </h3>
                            <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-sm mx-auto">
                                You haven't started planning a trip yet. Let's find your next destination!
                            </p>
                            <Link to="/plan">
                                <button className="btn-primary text-sm px-6">
                                    Start Planning
                                </button>
                            </Link>
                        </GlassCard>
                    )}
                </div>

                {/* SIDEBAR: Stats & Quick Links */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <GlassCard className="p-5">
                        <h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
                            Overview
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <Map size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-surface-900 dark:text-surface-100">{totalTrips}</p>
                                        <p className="text-xs text-surface-500">Total Trips</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <Calendar size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-surface-900 dark:text-surface-100">{upcomingTrips}</p>
                                        <p className="text-xs text-surface-500">Upcoming</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp size={18} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-surface-900 dark:text-surface-100">Level 3</p>
                                        <p className="text-xs text-surface-500">Traveler Rank</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Quick Actions */}
                    <GlassCard className="p-0 overflow-hidden">
                        <h3 className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider p-5 pb-2">
                            Quick Links
                        </h3>
                        <div className="divide-y divide-surface-100 dark:divide-surface-700/50">
                            <Link to="/budget-calculator" className="flex items-center gap-3 p-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                                <DollarSign size={18} className="text-green-500" />
                                <span className="text-sm font-medium text-surface-700 dark:text-surface-200">Budget Calculator</span>
                                <ChevronRight size={16} className="ml-auto text-surface-400" />
                            </Link>
                            <Link to="/safety" className="flex items-center gap-3 p-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                                <Shield size={18} className="text-rose-500" />
                                <span className="text-sm font-medium text-surface-700 dark:text-surface-200">Safety Check</span>
                                <ChevronRight size={16} className="ml-auto text-surface-400" />
                            </Link>
                            <Link to="/hidden-gems" className="flex items-center gap-3 p-4 hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors">
                                <MapPin size={18} className="text-amber-500" />
                                <span className="text-sm font-medium text-surface-700 dark:text-surface-200">Hidden Gems</span>
                                <ChevronRight size={16} className="ml-auto text-surface-400" />
                            </Link>
                        </div>
                    </GlassCard>
                </div>
            </div>

            {/* SAVED TRIPS SECTION */}
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-surface-800 dark:text-surface-200">
                    <Clock className="text-accent-500" size={20} />
                    Saved Trips
                </h2>

                {savedTrips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {savedTrips.map((trip) => (
                            <GlassCard
                                key={trip.trip_id}
                                onClick={() => navigate('/itinerary', { state: { tripId: trip.trip_id } })}
                                className="group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                                <h3 className="font-bold text-lg text-surface-900 dark:text-surface-100 mb-1 max-w-[80%] truncate">
                                    {trip.destination}
                                </h3>
                                <p className="text-xs text-surface-500 dark:text-surface-400 mb-3">
                                    {new Date(trip.created_at || Date.now()).toLocaleDateString()}
                                </p>

                                <div className="flex items-center gap-2 mt-4 text-sm text-primary-600 dark:text-primary-400 font-medium group-hover:translate-x-1 transition-transform">
                                    View Plan <ChevronRight size={16} />
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-surface-50 dark:bg-surface-900/30 rounded-2xl border border-surface-200 dark:border-surface-700/50">
                        <p className="text-surface-500 dark:text-surface-400">No saved trips found.</p>
                    </div>
                )}
            </div>

        </AnimatedPage>
    );
}