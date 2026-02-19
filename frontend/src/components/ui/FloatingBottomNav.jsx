// FloatingBottomNav - Mobile floating bottom navigation
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Map, Shield, Star, MessageCircle } from 'lucide-react';

const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/plan', label: 'Plan', icon: Map },
    { path: '/safety', label: 'Safety', icon: Shield },
    { path: '/hidden-gems', label: 'Gems', icon: Star },
    { path: '/chatbot', label: 'Chat', icon: MessageCircle },
];

export default function FloatingBottomNav() {
    const location = useLocation();

    // Hide on auth pages
    const hiddenPaths = ['/login', '/signup', '/onboarding'];
    if (hiddenPaths.some(p => location.pathname.startsWith(p))) {
        return null;
    }

    return (
        <motion.nav
            className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 25 }}
        >
            <div className="glass rounded-2xl px-2 py-2 flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path ||
                        (item.path !== '/' && location.pathname.startsWith(item.path));

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200"
                        >
                            {isActive && (
                                <motion.div
                                    className="absolute inset-0 bg-primary-500/10 dark:bg-primary-400/15 rounded-xl"
                                    layoutId="bottomNavIndicator"
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            <Icon
                                size={20}
                                className={`relative z-10 transition-colors duration-200 ${isActive
                                        ? 'text-primary-500 dark:text-primary-400'
                                        : 'text-surface-400 dark:text-surface-500'
                                    }`}
                            />
                            <span
                                className={`relative z-10 text-[10px] font-medium transition-colors duration-200 ${isActive
                                        ? 'text-primary-600 dark:text-primary-400'
                                        : 'text-surface-400 dark:text-surface-500'
                                    }`}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </motion.nav>
    );
}
