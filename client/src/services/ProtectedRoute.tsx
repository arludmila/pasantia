import React from 'react';
import { Navigate } from 'react-router-dom';
import { getDecodedToken } from './Token';

interface ProtectedRouteProps {
  children: React.ReactNode; 
  roles?: ('Admin' | 'SuperUser')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const decoded = getDecodedToken();

  if (!decoded) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(decoded.rol)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>; 
};

export default ProtectedRoute;
