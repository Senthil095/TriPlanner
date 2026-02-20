import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { Loader2, Car, Bike, Bus, Train, AlertCircle } from 'lucide-react';
import L from 'leaflet';

// Fix Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const createIcon = (color) => new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = createIcon('green');
const redIcon = createIcon('red');

// Component to fit map bounds
function MapBounds({ start, end }) {
    const map = useMap();
    useEffect(() => {
        if (start && end) {
            const bounds = L.latLngBounds([start, end]);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [start, end, map]);
    return null;
}

// Helper to decode OSRM polyline geometry (if using encoded strings, but we requested geojson)
// Since we requested geojson, we just need to reverse [lng, lat] to [lat, lng] for Leaflet
const processGeoJSON = (geometry) => {
    return geometry.coordinates.map(([lng, lat]) => [lat, lng]);
};

export default function RouteVisualizer({ startCoords, endCoords, comparisons, routeData, isLoading, error }) {
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-[400px] bg-surface-50 dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700">
                <Loader2 size={40} className="text-primary-500 animate-spin mb-4" />
                <p className="text-surface-600 dark:text-surface-300 font-medium">Calculating best route...</p>
                <p className="text-xs text-surface-400 mt-2">Connecting to OSRM satellites</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 h-[300px] bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800">
                <AlertCircle size={40} className="text-red-500 mb-4" />
                <p className="text-red-700 dark:text-red-300 font-medium text-center">{error}</p>
                <p className="text-xs text-red-500 mt-2">Please check the city names and try again.</p>
            </div>
        );
    }

    if (!routeData) return null;

    const routePositions = processGeoJSON(routeData.geometry);

    // Find best options
    const cheapest = comparisons.reduce((prev, curr) => prev.cost < curr.cost ? prev : curr);
    const fastest = comparisons.reduce((prev, curr) => prev.time < curr.time ? prev : curr);

    return (
        <div className="space-y-6">
            {/* Map Section */}
            <div className="h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-surface-200 dark:border-surface-700 z-0 relative">
                <MapContainer
                    center={[startCoords.lat, startCoords.lng]}
                    zoom={6}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[startCoords.lat, startCoords.lng]} icon={greenIcon}>
                        <Popup>{startCoords.name} (Start)</Popup>
                    </Marker>

                    <Marker position={[endCoords.lat, endCoords.lng]} icon={redIcon}>
                        <Popup>{endCoords.name} (Destination)</Popup>
                    </Marker>

                    <Polyline
                        positions={routePositions}
                        color="#6366f1"
                        weight={5}
                        opacity={0.7}
                        dashArray="10, 10"
                        dashOffset="0"
                    />

                    <MapBounds start={[startCoords.lat, startCoords.lng]} end={[endCoords.lat, endCoords.lng]} />
                </MapContainer>
            </div>

            {/* Comparisons Section */}
            <div>
                <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">
                    Travel Options
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {comparisons.map((option) => {
                        const isCheapest = option.mode === cheapest.mode;
                        const isFastest = option.mode === fastest.mode;

                        return (
                            <motion.div
                                key={option.mode}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl border ${isCheapest || isFastest
                                        ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10'
                                        : 'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'
                                    } relative overflow-hidden`}
                            >
                                {/* Badge */}
                                {(isCheapest || isFastest) && (
                                    <div className={`absolute top-0 right-0 px-2 py-1 text-[10px] font-bold text-white rounded-bl-lg ${isFastest ? 'bg-amber-500' : 'bg-emerald-500'
                                        }`}>
                                        {isFastest ? 'FASTEST' : 'CHEAPEST'}
                                    </div>
                                )}

                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-2xl">{option.icon}</div>
                                    <div>
                                        <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                                            {option.mode}
                                        </h4>
                                        <p className="text-xs text-surface-500">{option.details}</p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-surface-500">Duration</span>
                                        <span className="font-medium text-surface-900 dark:text-surface-100">
                                            {~~(option.time / 60)}h {~~(option.time % 60)}m
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-surface-500">Distance</span>
                                        <span className="font-medium text-surface-900 dark:text-surface-100">
                                            {option.distance.toFixed(1)} km
                                        </span>
                                    </div>
                                    <div className="pt-2 mt-2 border-t border-surface-200 dark:border-surface-700 flex justify-between items-center">
                                        <span className="text-xs text-surface-500">Est. Cost</span>
                                        <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                            ₹{Math.round(option.cost).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
