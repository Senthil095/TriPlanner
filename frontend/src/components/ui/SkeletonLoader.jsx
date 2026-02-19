// SkeletonLoader - Theme-aware shimmer loading placeholders
import React from 'react';

export function SkeletonLine({ width = '100%', height = '1rem', className = '' }) {
    return (
        <div
            className={`skeleton rounded-lg ${className}`}
            style={{ width, height }}
        />
    );
}

export function SkeletonCard({ className = '' }) {
    return (
        <div className={`card p-6 space-y-4 ${className}`}>
            <SkeletonLine width="60%" height="1.5rem" />
            <SkeletonLine width="100%" />
            <SkeletonLine width="80%" />
            <div className="flex gap-3 pt-2">
                <SkeletonLine width="4rem" height="2rem" className="rounded-full" />
                <SkeletonLine width="4rem" height="2rem" className="rounded-full" />
            </div>
        </div>
    );
}

export function SkeletonAvatar({ size = '3rem', className = '' }) {
    return (
        <div
            className={`skeleton rounded-full ${className}`}
            style={{ width: size, height: size }}
        />
    );
}

export function SkeletonList({ count = 3, className = '' }) {
    return (
        <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <SkeletonAvatar size="2.5rem" />
                    <div className="flex-1 space-y-2">
                        <SkeletonLine width="70%" />
                        <SkeletonLine width="40%" height="0.75rem" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SkeletonCard;
