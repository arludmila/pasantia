import React from 'react';
import { Navigate } from 'react-router-dom';
import { getDecodedToken } from '../../services/Token';
import LoginPage from '../login/LoginPage';
import SuperUserDashboard from './SuperUserDashboard';
import AdminDashboard from './AdminDashboard ';

function DashboardRoutes() {
  const decoded = getDecodedToken();

  if (!decoded) {
    return <Navigate to="/login" />;
  }

  if (decoded.rol === 'SuperUser') {
    return <SuperUserDashboard />;
  } else if (decoded.rol === 'Admin') {
    return <AdminDashboard />;
  } else {
    return <Navigate to="/unauthorized" />;
  }
}

export default DashboardRoutes;
