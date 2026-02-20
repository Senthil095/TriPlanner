import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Map / GIS stack
          "leaflet-vendor": ["leaflet", "react-leaflet", "@react-leaflet/core"],

          // Animation stack
          "framer-motion": ["framer-motion"],

          // React core
          "react-vendor": ["react", "react-dom"],

          // Routing
          router: ["react-router-dom"],

          // UI utilities
          "ui-vendor": ["lucide-react", "@tanstack/react-query", "axios"],

          // Firebase (auth only — used on the client)
          firebase: ["firebase/app", "firebase/auth"],
        },
      },
    },
  },
});
