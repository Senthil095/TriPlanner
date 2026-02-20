// EmergencyButton.jsx - Floating SOS Emergency Button for Itinerary Page
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  X,
  Send,
  Loader2,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { emergencyApi } from "../services/api";
import { useTrip } from "../context/TripContext";

function EmergencyButton({ destination }) {
  const { state } = useTrip();
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [customMessage, setCustomMessage] = useState("");
  const [location, setLocation] = useState(null);
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const guardian = state?.guardianDetails;
  const user = state?.user;

  const handleGetLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setFetchingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setFetchingLocation(false);
      },
      () => {
        setFetchingLocation(false);
        setError("Unable to retrieve your location.");
      },
    );
  }, []);

  const handleSendSOS = async () => {
    if (!user?.uid) {
      setError("You must be logged in to send an SOS.");
      return;
    }
    if (!guardian?.guardianEmail) {
      setError(
        "No emergency contact found. Please add one in Dashboard → Guardian & Emergency Settings.",
      );
      return;
    }

    setIsSending(true);
    setError(null);
    try {
      await emergencyApi.triggerSOS({
        user_id: user.uid,
        user_name: user.displayName || user.email || "Unknown Traveler",
        destination: destination || "Unknown",
        latitude: location?.lat ?? null,
        longitude: location?.lng ?? null,
        custom_message: customMessage.trim() || null,
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setIsOpen(false);
        setCustomMessage("");
        setLocation(null);
      }, 4000);
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        "Failed to send SOS. Check your internet connection.";
      setError(detail);
    } finally {
      setIsSending(false);
    }
  };

  const handleClose = () => {
    if (isSending) return;
    setIsOpen(false);
    setError(null);
    setSent(false);
    setCustomMessage("");
    setLocation(null);
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* SOS Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-40 md:bottom-24 right-4 sm:right-6 z-50 w-80 sm:w-96 max-h-[70vh] overflow-y-auto"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="bg-white dark:bg-surface-900 rounded-2xl shadow-2xl border border-red-100 dark:border-red-900/30 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-rose-600 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <AlertTriangle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base leading-none">
                      Emergency SOS
                    </h3>
                    <p className="text-red-100 text-xs mt-0.5">
                      Alert your emergency contact
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  disabled={isSending}
                  className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors disabled:opacity-50"
                >
                  <X size={15} className="text-white" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Sent success */}
                {sent ? (
                  <motion.div
                    className="flex flex-col items-center gap-3 py-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <p className="text-surface-900 dark:text-surface-100 font-semibold text-center">
                      SOS Sent!
                    </p>
                    <p className="text-surface-500 dark:text-surface-400 text-sm text-center">
                      Alert sent to{" "}
                      <span className="font-medium">
                        {guardian?.guardianName || "your emergency contact"}
                      </span>
                      .
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {/* Guardian info */}
                    {guardian?.guardianEmail ? (
                      <div className="rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-800/30 px-4 py-3">
                        <p className="text-xs text-surface-500 dark:text-surface-400 mb-0.5">
                          Alert will be sent to
                        </p>
                        <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                          {guardian.guardianName || "Emergency Contact"}
                        </p>
                        <p className="text-xs text-surface-500 dark:text-surface-400">
                          {guardian.guardianEmail}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-800/30 px-4 py-3">
                        <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">
                          ⚠️ No emergency contact set.
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
                          Add one in Dashboard → Guardian &amp; Emergency
                          Settings.
                        </p>
                      </div>
                    )}

                    {/* Location row */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleGetLocation}
                        disabled={fetchingLocation || !!location}
                        className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {fetchingLocation ? (
                          <Loader2
                            size={13}
                            className="animate-spin text-primary-500"
                          />
                        ) : (
                          <MapPin
                            size={13}
                            className={
                              location ? "text-green-500" : "text-surface-400"
                            }
                          />
                        )}
                        {location
                          ? "Location attached ✓"
                          : fetchingLocation
                            ? "Getting location…"
                            : "Attach my location"}
                      </button>
                      {location && (
                        <button
                          onClick={() => setLocation(null)}
                          className="text-xs text-surface-400 hover:text-surface-600 dark:hover:text-surface-200"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Custom message */}
                    <div>
                      <label className="block text-xs font-medium text-surface-600 dark:text-surface-400 mb-1.5">
                        Message{" "}
                        <span className="text-surface-400 font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        rows={2}
                        maxLength={300}
                        className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 text-sm text-surface-900 dark:text-surface-100 px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-red-400 placeholder:text-surface-400"
                        placeholder="I need help, I am at…"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.p
                        className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 rounded-lg px-3 py-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Send button */}
                    <button
                      onClick={handleSendSOS}
                      disabled={isSending || !guardian?.guardianEmail}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold text-sm shadow-lg shadow-red-500/25 hover:from-red-600 hover:to-rose-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Sending SOS…
                        </>
                      ) : (
                        <>
                          <Send size={17} />
                          Send SOS Alert
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <motion.button
        onClick={() => {
          setIsOpen((v) => !v);
          setError(null);
        }}
        className={`fixed bottom-24 md:bottom-8 right-4 sm:right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-colors ${
          isOpen
            ? "bg-surface-700 shadow-surface-700/30"
            : "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/40"
        }`}
        whileTap={{ scale: 0.9 }}
        animate={
          !isOpen
            ? {
                boxShadow: [
                  "0 0 0 0px rgba(239,68,68,0.4)",
                  "0 0 0 12px rgba(239,68,68,0)",
                ],
              }
            : {}
        }
        transition={
          !isOpen ? { duration: 1.6, repeat: Infinity, ease: "easeOut" } : {}
        }
        title="Emergency SOS"
        aria-label="Emergency SOS"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="sos"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <AlertTriangle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

export default EmergencyButton;
