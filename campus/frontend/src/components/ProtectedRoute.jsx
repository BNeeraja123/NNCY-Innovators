import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ roles = [], children }) {
  const { loading, user, hasRole, isAuthenticated } = useAuth();

  if (loading) return null;
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (roles.length && !hasRole(roles)) return <Navigate to="/" replace />;

  return children;
}
