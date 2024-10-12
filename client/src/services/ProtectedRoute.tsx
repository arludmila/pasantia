import React from 'react';
import { Navigate } from 'react-router-dom';
import { getDecodedToken } from './Token';

interface ProtectedRouteProps {
  component: React.FC;
  roles?: ('Admin' | 'SuperUser')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, roles, ...rest }) => {
  const decoded = getDecodedToken();

  if (!decoded) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(decoded.rol)) {
    return <Navigate to="/unauthorized" />;
  }
  // TODO: armar el unautorized???????
  return <Component {...rest}/>;
};

export default ProtectedRoute;
