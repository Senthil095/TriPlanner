// Auth Store - Zustand
import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
    user: null,
    isAuthenticated: false,
    onboardingComplete: false,
    userProfile: null,
    isLoading: true,

    setUser: (user) => set({
        user,
        isAuthenticated: !!user,
        isLoading: false,
    }),

    setOnboardingComplete: (complete) => set({ onboardingComplete: complete }),

    setUserProfile: (profile) => set({
        userProfile: profile,
        onboardingComplete: profile?.onboardingComplete || false,
    }),

    logout: () => set({
        user: null,
        isAuthenticated: false,
        onboardingComplete: false,
        userProfile: null,
    }),

    setLoading: (loading) => set({ isLoading: loading }),
}));

export default useAuthStore;
