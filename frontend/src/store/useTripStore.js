// Trip Store - Zustand
import { create } from 'zustand';

const useTripStore = create((set, get) => ({
    currentTrip: null,
    savedTrips: [],
    notes: [],
    isGenerating: false,

    setCurrentTrip: (trip) => set({ currentTrip: trip }),

    setSavedTrips: (trips) => set({ savedTrips: trips }),

    addTrip: (trip) => set((state) => ({
        savedTrips: [...state.savedTrips, trip],
    })),

    updateTrip: (updatedTrip) => set((state) => ({
        savedTrips: state.savedTrips.map((trip) =>
            trip.trip_id === updatedTrip.trip_id ? updatedTrip : trip
        ),
        currentTrip: state.currentTrip?.trip_id === updatedTrip.trip_id
            ? updatedTrip
            : state.currentTrip,
    })),

    deleteTrip: (tripId) => set((state) => ({
        savedTrips: state.savedTrips.filter((trip) => trip.trip_id !== tripId),
        currentTrip: state.currentTrip?.trip_id === tripId ? null : state.currentTrip,
    })),

    setNotes: (notes) => set({ notes }),

    addNote: (note) => set((state) => ({
        notes: [...state.notes, note],
    })),

    deleteNote: (noteId) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
    })),

    setIsGenerating: (generating) => set({ isGenerating: generating }),

    clearCurrentTrip: () => set({ currentTrip: null }),
}));

export default useTripStore;
