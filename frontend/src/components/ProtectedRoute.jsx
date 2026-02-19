// Protected Route Component
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }) {
  const { state } = useTrip();
  const location = useLocation();
  
  // Show loading while checking auth state
  if (state.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary-500" />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!state.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Render protected content
  return children;
}

export default ProtectedRoute;
