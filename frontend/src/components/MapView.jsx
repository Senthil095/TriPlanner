// MapView Component - Leaflet and Geoapify integration with route polyline
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix Leaflet's default icon path issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultCenter = [48.8566, 2.3522];
const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY || '4d5816d856ed45c295789e4e00fb8509';

// A component to handle map bounds when places change
function ChangeView({ places }) {
  const map = useMap();
  useEffect(() => {
    if (places && places.length > 0) {
      const validPlaces = places.filter(p => p.location && p.location.lat && p.location.lng);
      if (validPlaces.length > 0) {
        const bounds = L.latLngBounds(validPlaces.map(p => [p.location.lat, p.location.lng]));
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [places, map]);
  return null;
}

function MapView({ places = [], center, onPlaceSelect, selectedDay }) {
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Create path for polyline
  const routePath = places
    .filter((p) => p.location && p.location.lat && p.location.lng)
    .map((p) => [p.location.lat, p.location.lng]);

  // Calculate center from places or use default
  const mapCenter = center
    ? [center.lat, center.lng]
    : (places.length > 0 && places[0].location
      ? [places[0].location.lat, places[0].location.lng]
      : defaultCenter);

  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg relative z-0">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={true}
      >
        <ChangeView places={places} />

        <TileLayer
          attribution='&copy; <a href="https://www.geoapify.com/">Geoapify</a> | &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://maps.geoapify.com/v1/tile/osm-liberty/{z}/{x}/{y}.png?apiKey=${GEOAPIFY_API_KEY}`}
        />

        {/* Route polyline */}
        {routePath.length > 1 && (
          <Polyline
            positions={routePath}
            pathOptions={{
              color: '#0ea5e9',
              opacity: 0.8,
              weight: 4,
            }}
          />
        )}

        {/* Place markers */}
        {places.map((place, index) => (
          place.location && place.location.lat && place.location.lng && (
            <Marker
              key={place.id || index}
              position={[place.location.lat, place.location.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedPlace(place);
                  onPlaceSelect?.(place);
                },
              }}
            >
              <Popup onClose={() => setSelectedPlace(null)}>
                <div className="p-1 max-w-xs">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{place.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span>{place.recommended_time}</span>
                    <span>•</span>
                    <span>${place.cost_estimate}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
