// UI Store - Zustand
import { create } from 'zustand';

const useUIStore = create((set) => ({
    isOnline: navigator.onLine,
    isMobileMenuOpen: false,
    activeModal: null,
    toasts: [],

    setOnlineStatus: (online) => set({ isOnline: online }),

    toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
    closeMobileMenu: () => set({ isMobileMenuOpen: false }),

    openModal: (modalId) => set({ activeModal: modalId }),
    closeModal: () => set({ activeModal: null }),

    addToast: (toast) => set((state) => ({
        toasts: [...state.toasts, { id: Date.now(), ...toast }],
    })),

    removeToast: (toastId) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== toastId),
    })),
}));

export default useUIStore;
