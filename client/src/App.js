import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import SuperUserDashboard from './pages/dashboard/SuperUserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/public/Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí puedes agregar lógica para validar el token si es necesario
      setIsAuthenticated(true);
    }
  }, []);
  return ( 
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<SuperUserDashboard />} isAuthenticated={isAuthenticated} />} />
      </Routes>
    </BrowserRouter>

  );
};

export default App;
