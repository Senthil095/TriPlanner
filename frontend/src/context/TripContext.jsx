// Trip Context - Global State Management
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { offlineTrips, offlineNotes, isOnline, setupOfflineListeners } from '../services/offlineStorage';
import { auth, logoutUser } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  currentTrip: null,
  savedTrips: [],
  notes: [],
  isOnline: true,
  isLoading: false,
  error: null,
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_CURRENT_TRIP: 'SET_CURRENT_TRIP',
  SET_SAVED_TRIPS: 'SET_SAVED_TRIPS',
  ADD_TRIP: 'ADD_TRIP',
  UPDATE_TRIP: 'UPDATE_TRIP',
  DELETE_TRIP: 'DELETE_TRIP',
  SET_NOTES: 'SET_NOTES',
  ADD_NOTE: 'ADD_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
  SET_ONLINE_STATUS: 'SET_ONLINE_STATUS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
function tripReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };
    
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        currentTrip: null,
        savedTrips: [],
        notes: [],
      };
    
    case ActionTypes.SET_CURRENT_TRIP:
      return {
        ...state,
        currentTrip: action.payload,
      };
    
    case ActionTypes.SET_SAVED_TRIPS:
      return {
        ...state,
        savedTrips: action.payload,
      };
    
    case ActionTypes.ADD_TRIP:
      return {
        ...state,
        savedTrips: [...state.savedTrips, action.payload],
      };
    
    case ActionTypes.UPDATE_TRIP:
      return {
        ...state,
        savedTrips: state.savedTrips.map((trip) =>
          trip.trip_id === action.payload.trip_id ? action.payload : trip
        ),
        currentTrip: state.currentTrip?.trip_id === action.payload.trip_id
          ? action.payload
          : state.currentTrip,
      };
    
    case ActionTypes.DELETE_TRIP:
      return {
        ...state,
        savedTrips: state.savedTrips.filter((trip) => trip.trip_id !== action.payload),
        currentTrip: state.currentTrip?.trip_id === action.payload ? null : state.currentTrip,
      };
    
    case ActionTypes.SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    
    case ActionTypes.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    
    case ActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    
    case ActionTypes.SET_ONLINE_STATUS:
      return {
        ...state,
        isOnline: action.payload,
      };
    
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    
    default:
      return state;
  }
}

// Create context
const TripContext = createContext(null);

// Provider component
export function TripProvider({ children }) {
  const [state, dispatch] = useReducer(tripReducer, initialState);
  
  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: ActionTypes.SET_USER,
          payload: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          },
        });
      } else {
        dispatch({ type: ActionTypes.SET_USER, payload: null });
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  // Online/offline listener
  useEffect(() => {
    const cleanup = setupOfflineListeners(
      () => dispatch({ type: ActionTypes.SET_ONLINE_STATUS, payload: true }),
      () => dispatch({ type: ActionTypes.SET_ONLINE_STATUS, payload: false })
    );
    
    // Set initial online status
    dispatch({ type: ActionTypes.SET_ONLINE_STATUS, payload: isOnline() });
    
    return cleanup;
  }, []);
  
  // Load saved trips from offline storage
  useEffect(() => {
    const loadOfflineTrips = async () => {
      try {
        const trips = await offlineTrips.getAll();
        dispatch({ type: ActionTypes.SET_SAVED_TRIPS, payload: trips });
      } catch (error) {
        console.error('Error loading offline trips:', error);
      }
    };
    
    loadOfflineTrips();
  }, []);
  
  // Actions
  const actions = {
    setCurrentTrip: (trip) => {
      dispatch({ type: ActionTypes.SET_CURRENT_TRIP, payload: trip });
    },
    
    saveTrip: async (trip) => {
      dispatch({ type: ActionTypes.ADD_TRIP, payload: trip });
      await offlineTrips.save(trip);
    },
    
    updateTrip: async (trip) => {
      dispatch({ type: ActionTypes.UPDATE_TRIP, payload: trip });
      await offlineTrips.save(trip);
    },
    
    deleteTrip: async (tripId) => {
      dispatch({ type: ActionTypes.DELETE_TRIP, payload: tripId });
      await offlineTrips.delete(tripId);
    },
    
    addNote: async (note) => {
      dispatch({ type: ActionTypes.ADD_NOTE, payload: note });
      await offlineNotes.save(note);
    },
    
    deleteNote: async (noteId) => {
      dispatch({ type: ActionTypes.DELETE_NOTE, payload: noteId });
      await offlineNotes.delete(noteId);
    },
    
    loadNotes: async (tripId) => {
      const notes = await offlineNotes.getByTrip(tripId);
      dispatch({ type: ActionTypes.SET_NOTES, payload: notes });
    },
    
    setLoading: (loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    },
    
    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },
    
    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    },
    
    logout: async () => {
      try {
        await logoutUser();
        dispatch({ type: ActionTypes.LOGOUT });
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
  };
  
  return (
    <TripContext.Provider value={{ state, actions, dispatch }}>
      {children}
    </TripContext.Provider>
  );
}

// Custom hook for using trip context
export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}

export default TripContext;
