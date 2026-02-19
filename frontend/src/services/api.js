// API Service for Backend Communication
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Itinerary API
export const itineraryApi = {
  generate: async (data) => {
    const response = await api.post('/generate-itinerary', data);
    return response.data;
  },
  
  replan: async (data) => {
    const response = await api.post('/replan', data);
    return response.data;
  },
  
  getSafetyInfo: async (city) => {
    const response = await api.get(`/safety-info/${encodeURIComponent(city)}`);
    return response.data;
  },
  
  getCulturalTips: async (destination) => {
    const response = await api.get(`/cultural-tips/${encodeURIComponent(destination)}`);
    return response.data;
  },
};

// Plans API
export const plansApi = {
  save: async (data) => {
    const response = await api.post('/save-plan', data);
    return response.data;
  },
  
  get: async (tripId) => {
    const response = await api.get(`/get-plan/${tripId}`);
    return response.data;
  },
  
  getUserPlans: async (userId) => {
    const response = await api.get(`/user-plans/${userId}`);
    return response.data;
  },
  
  delete: async (tripId) => {
    const response = await api.delete(`/delete-plan/${tripId}`);
    return response.data;
  },
};

// Notes API
export const notesApi = {
  create: async (data) => {
    const response = await api.post('/notes', data);
    return response.data;
  },
  
  getByTrip: async (tripId) => {
    const response = await api.get(`/notes/${tripId}`);
    return response.data;
  },
  
  delete: async (noteId) => {
    const response = await api.delete(`/notes/${noteId}`);
    return response.data;
  },
};

// Guides API
export const guidesApi = {
  getByCity: async (city) => {
    const response = await api.get(`/guides/${encodeURIComponent(city)}`);
    return response.data;
  },
  
  register: async (data) => {
    const response = await api.post('/guides/register', data);
    return response.data;
  },
  
  getProfile: async (guideId) => {
    const response = await api.get(`/guides/profile/${guideId}`);
    return response.data;
  },
  
  getCities: async () => {
    const response = await api.get('/guides/cities');
    return response.data;
  },
};

// Hidden Gems API
export const hiddenGemsApi = {
  getByCity: async (city, limit = 20) => {
    const response = await api.get(`/hidden-gems/${encodeURIComponent(city)}?limit=${limit}`);
    return response.data;
  },
  
  submit: async (data) => {
    const response = await api.post('/hidden-gems', data);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/hidden-gems/categories');
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await api.get('/hidden-gems/featured');
    return response.data;
  },
};

// Chatbot API
export const chatApi = {
  send: async (data) => {
    const response = await api.post('/chat', data);
    return response.data;
  },
  
  quickAction: async (action, tripId) => {
    const response = await api.post(`/chat/quick-action?action=${action}&trip_id=${tripId}`);
    return response.data;
  },
  
  getSuggestions: async () => {
    const response = await api.get('/chat/suggestions');
    return response.data;
  },
};

export default api;
