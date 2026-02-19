// GlassCard - Glassmorphism card component
import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({
    children,
    className = '',
    hover = true,
    as = 'div',
    animate = true,
    delay = 0,
    onClick,
    ...props
}) {
    const Component = animate ? motion.div : as;

    const baseClasses = `glass-card p-6 ${hover ? 'card-hover cursor-pointer' : ''} ${className}`;

    if (animate) {
        return (
            <Component
                className={baseClasses}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay, ease: 'easeOut' }}
                whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
                onClick={onClick}
                {...props}
            >
                {children}
            </Component>
        );
    }

    return (
        <div className={baseClasses} onClick={onClick} {...props}>
            {children}
        </div>
    );
}
