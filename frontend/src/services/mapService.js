import axios from 'axios';

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_BASE_URL = 'https://router.project-osrm.org/route/v1/driving';

export const mapService = {
    // Geocode a city name to coordinates
    getCoordinates: async (city) => {
        try {
            const response = await axios.get(NOMINATIM_BASE_URL, {
                params: {
                    q: city,
                    format: 'json',
                    limit: 1,
                },
            });

            if (response.data && response.data.length > 0) {
                const { lat, lon, display_name } = response.data[0];
                return {
                    lat: parseFloat(lat),
                    lng: parseFloat(lon),
                    name: display_name.split(',')[0], // Extract just the city name part
                    fullName: display_name,
                };
            }
            throw new Error(`Location not found: ${city}`);
        } catch (error) {
            console.error('Geocoding error:', error);
            throw error;
        }
    },

    // Get route between two coordinates
    getRoute: async (startCoords, endCoords) => {
        try {
            // OSRM requires lng,lat format
            const query = `${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}`;
            const response = await axios.get(`${OSRM_BASE_URL}/${query}`, {
                params: {
                    overview: 'full',
                    geometries: 'geojson',
                },
            });

            if (response.data && response.data.routes && response.data.routes.length > 0) {
                const route = response.data.routes[0];
                return {
                    distance: route.distance, // in meters
                    duration: route.duration, // in seconds
                    geometry: route.geometry, // GeoJSON
                };
            }
            throw new Error('No route found');
        } catch (error) {
            console.error('Routing error:', error);
            throw error;
        }
    },

    // Calculate travel comparisons based on distance (meters) and duration (seconds)
    calculateComparisons: (distanceMeters, durationSeconds) => {
        const distanceKm = distanceMeters / 1000;
        const durationMin = durationSeconds / 60;

        // Base values
        const carTime = durationMin;
        const carCost = distanceKm * 12;

        return [
            {
                mode: 'Car',
                icon: '🚗',
                distance: distanceKm,
                time: carTime,
                cost: carCost,
                details: 'Fastest & Private',
            },
            {
                mode: 'Bike',
                icon: '🏍️',
                distance: distanceKm,
                time: carTime * 1.1, // 10% slower assumes breaks/traffic
                cost: distanceKm * 5,
                details: 'Cheapest for solo',
            },
            {
                mode: 'Bus',
                icon: '🚌',
                distance: distanceKm,
                time: carTime * 1.25, // 25% slower
                cost: distanceKm * 3,
                details: 'Budget friendly',
            },
            {
                mode: 'Train',
                icon: '🚆',
                distance: distanceKm,
                time: (distanceKm / 70) * 60 + 20, // 70km/h avg + 20m buffer
                cost: distanceKm * 2,
                details: 'Scenic & Relaxed',
            },
        ];
    },
};
