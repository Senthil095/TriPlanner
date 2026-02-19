// MapView Component - Google Maps integration with route polyline
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { MapPin } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: 48.8566,
  lng: 2.3522,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

function MapView({ places = [], center, onPlaceSelect, selectedDay }) {
  const [map, setMap] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });
  
  // Calculate bounds to fit all markers
  useEffect(() => {
    if (map && places.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (place.location) {
          bounds.extend({
            lat: place.location.lat,
            lng: place.location.lng,
          });
        }
      });
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [map, places]);
  
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);
  
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);
  
  // Create path for polyline
  const routePath = places
    .filter((p) => p.location)
    .map((p) => ({
      lat: p.location.lat,
      lng: p.location.lng,
    }));
  
  // Calculate center from places or use default
  const mapCenter = center || (places.length > 0 && places[0].location
    ? { lat: places[0].location.lat, lng: places[0].location.lng }
    : defaultCenter);
  
  if (loadError) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin size={48} className="mx-auto mb-2 opacity-50" />
          <p>Unable to load map</p>
          <p className="text-sm">Please check your API key</p>
        </div>
      </div>
    );
  }
  
  if (!isLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center animate-pulse">
        <div className="text-center text-gray-400">
          <MapPin size={48} className="mx-auto mb-2 animate-bounce" />
          <p>Loading map...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full rounded-xl overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        {/* Route polyline */}
        {routePath.length > 1 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: '#0ea5e9',
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true,
            }}
          />
        )}
        
        {/* Place markers */}
        {places.map((place, index) => (
          place.location && (
            <Marker
              key={place.id || index}
              position={{
                lat: place.location.lat,
                lng: place.location.lng,
              }}
              label={{
                text: String(index + 1),
                color: 'white',
                fontWeight: 'bold',
              }}
              onClick={() => {
                setSelectedPlace(place);
                onPlaceSelect?.(place);
              }}
            />
          )
        ))}
        
        {/* Info window for selected place */}
        {selectedPlace && selectedPlace.location && (
          <InfoWindow
            position={{
              lat: selectedPlace.location.lat,
              lng: selectedPlace.location.lng,
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-semibold text-gray-900">{selectedPlace.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedPlace.description}</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                <span>{selectedPlace.recommended_time}</span>
                <span>•</span>
                <span>${selectedPlace.cost_estimate}</span>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapView;
