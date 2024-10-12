import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import InstitucionesPage from './pages/public/InstitucionesPage';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/public/HomePage';
import SuperUserDashboard from './pages/dashboard/SuperUserDashboard';
import InstitucionAddPage from './pages/dashboard/instituciones/InstitucionAddPage';
import ProtectedRoute from './services/ProtectedRoute';
import InstitucionesTablePage from './pages/dashboard/instituciones/InstitucionesTablePage';
import AdminsTablePage from './pages/dashboard/administradores/AdminsTablePage';
import AdminAddPage from './pages/dashboard/administradores/AdminAddPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instituciones" element={<InstitucionesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute  component={SuperUserDashboard} roles={['SuperUser']} />

            }
          />
          <Route
            path="/dashboard/instituciones"
            element={
              <ProtectedRoute
                
                component={
                  
                    InstitucionesTablePage
                 
                }
                roles={['SuperUser']}
              />
            }
          />
          <Route
            path="/dashboard/administradores"
            element={
              <ProtectedRoute
                
                component={
                  
                    AdminsTablePage
                 
                }
                roles={['SuperUser']}
              />
            }
          />
          <Route
            path="/dashboard/instituciones-crear"
            element={
              <ProtectedRoute
                component={
                  InstitucionAddPage
                }
                roles={['SuperUser']}
              />
            }
          />
          <Route
            path="/dashboard/administradores-crear"
            element={
              <ProtectedRoute
                component={
                  AdminAddPage
                }
                roles={['SuperUser']}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
