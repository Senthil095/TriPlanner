// ItineraryView Page - Day-wise itinerary display with map
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Map,
  List,
  Wallet,
  Share2,
  RefreshCw,
  Save,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";
import DayCard from "../components/DayCard";
import MapView from "../components/MapView";
import ChatWidget from "../components/ChatWidget";
import EmergencyButton from "../components/EmergencyButton";
import { useTrip } from "../context/TripContext";
import { plansApi, itineraryApi, chatApi } from "../services/api";

function ItineraryView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state, actions } = useTrip();

  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'
  const [selectedDay, setSelectedDay] = useState(0);
  const [isReplanning, setIsReplanning] = useState(false);
  const [skippedPlaces, setSkippedPlaces] = useState([]);

  const itinerary = state.currentTrip;

  useEffect(() => {
    // Load trip if coming from URL
    const tripId = location.state?.tripId;
    if (tripId && !itinerary) {
      loadTrip(tripId);
    }
  }, [location.state]);

  const loadTrip = async (tripId) => {
    try {
      const trip = await plansApi.get(tripId);
      actions.setCurrentTrip(trip.itinerary || trip);
    } catch (error) {
      console.error("Failed to load trip:", error);
    }
  };

  const handlePlaceSkip = async (placeId) => {
    setSkippedPlaces([...skippedPlaces, placeId]);
  };

  const handleReplan = async () => {
    if (skippedPlaces.length === 0) return;

    setIsReplanning(true);
    try {
      const updatedItinerary = await itineraryApi.replan({
        trip_id: itinerary.trip_id,
        skipped_places: skippedPlaces,
        skipped_days: [],
      });

      actions.updateTrip(updatedItinerary);
      setSkippedPlaces([]);
    } catch (error) {
      console.error("Failed to replan:", error);
    } finally {
      setIsReplanning(false);
    }
  };

  const handleSave = async () => {
    try {
      await plansApi.save({
        user_id: state.user?.uid || "anonymous",
        itinerary: itinerary,
        destination: itinerary.destination,
        duration: itinerary.duration,
      });
      alert("Trip saved successfully!");
    } catch (error) {
      console.error("Failed to save trip:", error);
    }
  };

  const handleQuickAction = async (actionId) => {
    try {
      const response = await chatApi.quickAction(actionId, itinerary.trip_id);
      // Handle response - could show in a modal or navigate to chat
      alert(response.response);
    } catch (error) {
      console.error("Quick action failed:", error);
    }
  };

  const currentDayPlaces = itinerary?.days?.[selectedDay]?.places || [];

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading your itinerary...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {itinerary.destination}
              </h1>
              <p className="text-gray-600">
                {itinerary.duration} days •{" "}
                {itinerary.days?.reduce(
                  (acc, day) => acc + (day.places?.length || 0),
                  0,
                )}{" "}
                places
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                    viewMode === "list" ? "bg-white shadow-sm" : "text-gray-600"
                  }`}
                >
                  <List size={18} />
                  <span className="hidden sm:inline">List</span>
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                    viewMode === "map" ? "bg-white shadow-sm" : "text-gray-600"
                  }`}
                >
                  <Map size={18} />
                  <span className="hidden sm:inline">Map</span>
                </button>
              </div>

              {/* Action buttons */}
              <button
                onClick={handleSave}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Save trip"
              >
                <Save size={20} className="text-gray-600" />
              </button>
              <button
                onClick={() =>
                  navigate("/budget", { state: { budget: itinerary.budget } })
                }
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-600"
                title="View budget breakdown"
              >
                <Wallet size={18} className="text-emerald-500" />
                <span className="hidden sm:inline">Budget</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Replan banner */}
      {skippedPlaces.length > 0 && (
        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <p className="text-yellow-800">
              You've skipped {skippedPlaces.length} place(s). Want to reorganize
              your itinerary?
            </p>
            <button
              onClick={handleReplan}
              disabled={isReplanning}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isReplanning ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Replanning...
                </>
              ) : (
                <>
                  <RefreshCw size={16} />
                  Replan Itinerary
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Day selector */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button
            onClick={() => setSelectedDay(Math.max(0, selectedDay - 1))}
            disabled={selectedDay === 0}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2 overflow-x-auto">
            {itinerary.days?.map((day, index) => (
              <button
                key={index}
                onClick={() => setSelectedDay(index)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedDay === index
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Calendar size={14} className="inline mr-1" />
                Day {day.day_number}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setSelectedDay(
                Math.min((itinerary.days?.length || 1) - 1, selectedDay + 1),
              )
            }
            disabled={selectedDay >= (itinerary.days?.length || 1) - 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === "list" ? (
          <div className="space-y-4">
            {itinerary.days?.map((day, index) => (
              <DayCard
                key={index}
                day={day}
                onPlaceSkip={handlePlaceSkip}
                onPlaceSelect={(place) => console.log("Selected:", place)}
              />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map */}
            <div className="h-[500px] lg:h-[700px] rounded-xl overflow-hidden">
              <MapView
                places={currentDayPlaces}
                selectedDay={selectedDay}
                onPlaceSelect={(place) => console.log("Map selected:", place)}
              />
            </div>

            {/* Day details */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  Day {selectedDay + 1}: {itinerary.days?.[selectedDay]?.theme}
                </h3>
                <div className="space-y-3">
                  {currentDayPlaces.map((place, index) => (
                    <div
                      key={place.id || index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {place.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {place.recommended_time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Chat widget */}
      <ChatWidget
        tripId={itinerary.trip_id}
        onQuickAction={handleQuickAction}
      />

      {/* Emergency SOS floating button */}
      <EmergencyButton destination={itinerary.destination} />
    </div>
  );
}

export default ItineraryView;
