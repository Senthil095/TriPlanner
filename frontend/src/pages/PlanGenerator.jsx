// PlanGenerator Page - Multi-step trip planning form
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Heart,
  DollarSign,
  Sparkles,
  Users,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Globe,
  Compass,
  Sun,
  Mountain,
  Building2,
  Utensils,
  Camera,
  Music,
  TreePine,
  PlaneTakeoff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTrip } from "../context/TripContext";
import { itineraryApi, plansApi } from "../services/api";
import AnimatedPage from "../components/ui/AnimatedPage";
import RouteVisualizer from "../components/RouteVisualizer";
import { mapService } from "../services/mapService";

const interests = [
  { id: "culture", label: "Culture", icon: "🏛️" },
  { id: "food", label: "Food", icon: "🍜" },
  { id: "nature", label: "Nature", icon: "🌿" },
  { id: "adventure", label: "Adventure", icon: "🧗" },
  { id: "nightlife", label: "Nightlife", icon: "🌙" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "photography", label: "Photography", icon: "📸" },
  { id: "wellness", label: "Wellness", icon: "🧘" },
  { id: "history", label: "History", icon: "📜" },
  { id: "art", label: "Art", icon: "🎨" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "music", label: "Music", icon: "🎵" },
];

const moods = [
  {
    id: "chill",
    label: "Chill & Relax",
    emoji: "🧘",
    desc: "Take it easy, no rush",
  },
  {
    id: "explorer",
    label: "City Explorer",
    emoji: "🏙️",
    desc: "See every corner",
  },
  {
    id: "adventure",
    label: "Adventure Seeker",
    emoji: "🏔️",
    desc: "Thrill and excitement",
  },
  {
    id: "culture",
    label: "Culture Buff",
    emoji: "🎭",
    desc: "Deep dive into local culture",
  },
  {
    id: "foodie",
    label: "Foodie Journey",
    emoji: "🍽️",
    desc: "Taste everything",
  },
  {
    id: "budget",
    label: "Budget Explorer",
    emoji: "💰",
    desc: "Max fun, min spend",
  },
];

const budgetOptions = [
  {
    id: "budget",
    label: "Budget",
    range: "$50-100/day",
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "moderate",
    label: "Moderate",
    range: "$100-250/day",
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: "luxury",
    label: "Luxury",
    range: "$250+/day",
    color: "from-amber-400 to-orange-500",
  },
];

function PlanGenerator() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { dispatch, state } = useTrip();
  const currentUser = state?.user;

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    destination: searchParams.get("destination") || "",
    origin: "",
    days: 3,
    interests: [],
    mood: "",
    budget: "moderate",
    travelers: "solo",
    specialRequests: "",
  });
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'saved' | 'error'

  // Route Preview State
  const [showPreview, setShowPreview] = useState(false);
  const [routeData, setRouteData] = useState({
    startCoords: null,
    endCoords: null,
    route: null,
    comparisons: []
  });
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleInterest = (id) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const handlePreview = async () => {
    if (!formData.origin || !formData.destination) {
      return;
    }

    setIsRouting(true);
    setRouteError(null);
    setShowPreview(true);

    try {
      const [start, end] = await Promise.all([
        mapService.getCoordinates(formData.origin),
        mapService.getCoordinates(formData.destination)
      ]);

      const route = await mapService.getRoute(start, end);
      const comparisons = mapService.calculateComparisons(route.distance, route.duration);

      setRouteData({
        startCoords: start,
        endCoords: end,
        route: route,
        comparisons: comparisons
      });

    } catch (error) {
      console.error("Preview failed:", error);
      setRouteError(error.message || "Failed to calculate route. Please check the city names.");
    } finally {
      setIsRouting(false);
    }
  };

  const nextStep = () => {
    // Auto-trigger preview when moving from Step 1 (Destination/Origin)
    if (step === 1 && formData.origin && formData.destination) {
      handlePreview();
    }

    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  };
  const prevStep = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSaveStatus(null);
    dispatch({ type: "SET_GENERATING", payload: true });
    try {
      const response = await itineraryApi.generate({
        city: formData.destination,
        days: formData.days,
        interests: formData.interests,
        mood: formData.mood,
        budget: formData.budget,
        travelers: formData.travelers,
        special_requests: formData.specialRequests,
        origin: formData.origin || null,
      });
      dispatch({ type: "SET_CURRENT_TRIP", payload: response });

      setSaveStatus("saving");
      plansApi
        .save({
          user_id: currentUser?.uid || "anonymous",
          itinerary: response,
          destination: response.destination || formData.destination,
          duration: response.duration || formData.days,
        })
        .then(() => setSaveStatus("saved"))
        .catch((saveErr) => {
          console.warn("Auto-save failed (non-critical):", saveErr);
          setSaveStatus("error");
        });

      navigate("/itinerary", { state: { tripId: response.trip_id } });
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
      dispatch({ type: "SET_GENERATING", payload: false });
    }
  };

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 250 : -250, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? 250 : -250, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-surface-950 dark:via-surface-900 dark:to-primary-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-400/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent-400/5 blur-3xl" />
      </div>

      <AnimatedPage className="relative max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary-500/20">
            <Sparkles size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
            Plan Your Trip
          </h1>
          <p className="text-surface-500 dark:text-surface-400 mt-1 text-sm">
            AI will craft the perfect itinerary for you
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${s <= step
                ? "w-12 bg-primary-500"
                : "w-8 bg-surface-200 dark:bg-surface-700"
                }`}
            />
          ))}
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8 min-h-[400px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {/* Step 1: Destination & Duration */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                    <MapPin size={20} className="text-primary-500" />
                    Where & When
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Destination
                    </label>
                    <div className="relative">
                      <Globe
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400"
                      />
                      <input
                        type="text"
                        value={formData.destination}
                        onChange={(e) =>
                          updateField("destination", e.target.value)
                        }
                        className="input-field pl-11"
                        placeholder="e.g. Tokyo, Paris, Bangkok..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Origin City / Country
                      <span className="ml-1.5 text-xs text-surface-400 font-normal">
                        (for flight & visa estimates)
                      </span>
                    </label>
                    <div className="relative">
                      <PlaneTakeoff
                        size={18}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400"
                      />
                      <input
                        type="text"
                        value={formData.origin}
                        onChange={(e) => updateField("origin", e.target.value)}
                        className="input-field pl-11"
                        placeholder="e.g. Mumbai, India / New York, USA..."
                      />
                    </div>
                    {formData.origin && (
                      <div className="mt-1.5">
                        <p className="text-xs text-primary-500 flex items-center gap-1">
                          <Sparkles size={11} />
                          AI will estimate flights, visa &amp; insurance from{" "}
                          {formData.origin}
                        </p>

                        {/* Preview Button for Step 1 */}
                        {formData.destination && (
                          <button
                            onClick={handlePreview}
                            className="mt-2 text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-1"
                          >
                            <MapPin size={14} />
                            Preview Route & Travel Costs
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Duration:{" "}
                      <span className="text-primary-600 dark:text-primary-400 font-bold">
                        {formData.days} days
                      </span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="14"
                      value={formData.days}
                      onChange={(e) =>
                        updateField("days", parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-surface-400 mt-1">
                      <span>1 day</span>
                      <span>1 week</span>
                      <span>2 weeks</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Travelers
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: "solo", label: "Solo", emoji: "🧑" },
                        { id: "couple", label: "Couple", emoji: "👫" },
                        { id: "group", label: "Group", emoji: "👨‍👩‍👧‍👦" },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => updateField("travelers", t.id)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${formData.travelers === t.id
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10"
                            : "border-surface-200 dark:border-surface-700"
                            }`}
                        >
                          <span className="text-2xl block">{t.emoji}</span>
                          <span className="text-xs font-medium mt-1 block text-surface-700 dark:text-surface-300">
                            {t.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Mood & Budget */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                    <Heart size={20} className="text-pink-500" />
                    Mood & Budget
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                      Travel Mood
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {moods.map((m) => (
                        <motion.button
                          key={m.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateField("mood", m.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${formData.mood === m.id
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-sm"
                            : "border-surface-200 dark:border-surface-700"
                            }`}
                        >
                          <span className="text-2xl">{m.emoji}</span>
                          <div className="text-left">
                            <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                              {m.label}
                            </p>
                            <p className="text-xs text-surface-400">{m.desc}</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                      Budget Level
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {budgetOptions.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => updateField("budget", b.id)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${formData.budget === b.id
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10"
                            : "border-surface-200 dark:border-surface-700"
                            }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center mx-auto mb-2`}
                          >
                            <DollarSign size={18} className="text-white" />
                          </div>
                          <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                            {b.label}
                          </p>
                          <p className="text-xs text-surface-400 mt-0.5">
                            {b.range}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Interests & Special Requests */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                    <Compass size={20} className="text-blue-500" />
                    Interests & Details
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                      Select your interests{" "}
                      <span className="text-surface-400">(pick 3+)</span>
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {interests.map((i) => (
                        <motion.button
                          key={i.id}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => toggleInterest(i.id)}
                          className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${formData.interests.includes(i.id)
                            ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10"
                            : "border-surface-200 dark:border-surface-700"
                            }`}
                        >
                          <span className="text-xl">{i.icon}</span>
                          <span className="text-xs font-medium text-surface-700 dark:text-surface-300">
                            {i.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Special Requests{" "}
                      <span className="text-surface-400">(optional)</span>
                    </label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) =>
                        updateField("specialRequests", e.target.value)
                      }
                      className="input-field min-h-[100px] resize-none"
                      placeholder="Any dietary restrictions, mobility needs, must-see spots..."
                      rows={4}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="btn-secondary flex items-center gap-2 disabled:opacity-30"
          >
            <ChevronLeft size={18} />
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              disabled={step === 1 && !formData.destination.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              Next
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !formData.destination.trim()}
              className="btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate Itinerary
                </>
              )}
            </button>
          )}
        </div>

        {/* Route Visualization Area */}
        {showPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                <MapPin className="text-primary-500" />
                Journey Preview
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-sm text-surface-500 hover:text-red-500"
              >
                Close Preview
              </button>
            </div>

            <RouteVisualizer
              startCoords={routeData.startCoords}
              endCoords={routeData.endCoords}
              routeData={routeData.route}
              comparisons={routeData.comparisons}
              isLoading={isRouting}
              error={routeError}
            />
          </motion.div>
        )}

      </AnimatedPage>
    </div>
  );
}

export default PlanGenerator;
