// Offline Storage Service using IndexedDB
import { openDB } from 'idb';

const DB_NAME = 'TravelPlannerDB';
const DB_VERSION = 1;

// Initialize the database
const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Trips store
      if (!db.objectStoreNames.contains('trips')) {
        const tripsStore = db.createObjectStore('trips', { keyPath: 'trip_id' });
        tripsStore.createIndex('destination', 'destination');
        tripsStore.createIndex('createdAt', 'created_at');
      }
      
      // Notes store
      if (!db.objectStoreNames.contains('notes')) {
        const notesStore = db.createObjectStore('notes', { keyPath: 'id' });
        notesStore.createIndex('tripId', 'trip_id');
      }
      
      // User preferences store
      if (!db.objectStoreNames.contains('preferences')) {
        db.createObjectStore('preferences', { keyPath: 'key' });
      }
      
      // Pending sync store (for offline changes)
      if (!db.objectStoreNames.contains('pendingSync')) {
        db.createObjectStore('pendingSync', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
};

// Trip operations
export const offlineTrips = {
  save: async (trip) => {
    const db = await initDB();
    await db.put('trips', trip);
  },
  
  get: async (tripId) => {
    const db = await initDB();
    return db.get('trips', tripId);
  },
  
  getAll: async () => {
    const db = await initDB();
    return db.getAll('trips');
  },
  
  delete: async (tripId) => {
    const db = await initDB();
    await db.delete('trips', tripId);
  },
  
  getByDestination: async (destination) => {
    const db = await initDB();
    const index = db.transaction('trips').store.index('destination');
    return index.getAll(destination);
  },
};

// Notes operations
export const offlineNotes = {
  save: async (note) => {
    const db = await initDB();
    await db.put('notes', note);
  },
  
  get: async (noteId) => {
    const db = await initDB();
    return db.get('notes', noteId);
  },
  
  getByTrip: async (tripId) => {
    const db = await initDB();
    const index = db.transaction('notes').store.index('tripId');
    return index.getAll(tripId);
  },
  
  delete: async (noteId) => {
    const db = await initDB();
    await db.delete('notes', noteId);
  },
  
  getAll: async () => {
    const db = await initDB();
    return db.getAll('notes');
  },
};

// User preferences
export const offlinePreferences = {
  set: async (key, value) => {
    const db = await initDB();
    await db.put('preferences', { key, value });
  },
  
  get: async (key) => {
    const db = await initDB();
    const result = await db.get('preferences', key);
    return result?.value;
  },
  
  delete: async (key) => {
    const db = await initDB();
    await db.delete('preferences', key);
  },
};

// Pending sync operations (for changes made while offline)
export const pendingSync = {
  add: async (action) => {
    const db = await initDB();
    await db.add('pendingSync', {
      ...action,
      timestamp: new Date().toISOString(),
    });
  },
  
  getAll: async () => {
    const db = await initDB();
    return db.getAll('pendingSync');
  },
  
  clear: async () => {
    const db = await initDB();
    await db.clear('pendingSync');
  },
  
  delete: async (id) => {
    const db = await initDB();
    await db.delete('pendingSync', id);
  },
};

// Check if online
export const isOnline = () => navigator.onLine;

// Sync pending changes when back online
export const syncPendingChanges = async (api) => {
  if (!isOnline()) return;
  
  const pendingActions = await pendingSync.getAll();
  
  for (const action of pendingActions) {
    try {
      switch (action.type) {
        case 'SAVE_TRIP':
          await api.plansApi.save(action.data);
          break;
        case 'DELETE_TRIP':
          await api.plansApi.delete(action.data.tripId);
          break;
        case 'SAVE_NOTE':
          await api.notesApi.create(action.data);
          break;
        case 'DELETE_NOTE':
          await api.notesApi.delete(action.data.noteId);
          break;
        default:
          console.log('Unknown action type:', action.type);
      }
      await pendingSync.delete(action.id);
    } catch (error) {
      console.error('Sync error:', error);
    }
  }
};

// Setup online/offline listeners
export const setupOfflineListeners = (onOnline, onOffline) => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
};

export default {
  offlineTrips,
  offlineNotes,
  offlinePreferences,
  pendingSync,
  isOnline,
  syncPendingChanges,
  setupOfflineListeners,
};
