import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import InstitucionesPage from './pages/public/InstitucionesPage';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/public/HomePage';
import ProtectedRoute from './services/ProtectedRoute';
import InstitucionesTablePage from './pages/dashboard/instituciones/InstitucionesTablePage';
import AdminAddPage from './pages/dashboard/administradores/AdminAddPage';
import DashboardRoutes from './pages/dashboard/DashboardRoutes';
import InstitucionAddPage from './pages/dashboard/instituciones/InstitucionAddPage';
import CarrerasTablePage from './pages/dashboard/carreras/CarrerasTablePage';
import CarreraAddPage from './pages/dashboard/carreras/CarreraAddPage';
import CarrerasPage from './pages/public/CarrerasPage';
import CarreraPage from './pages/public/CarreraPage';
import CarreraEditPage from './pages/dashboard/carreras/CarreraEditPage';
import InstitucionEditPage from './pages/dashboard/instituciones/InstitucionEditPage';
import AdminEditPage from './pages/dashboard/administradores/AdminEditPage';
import AdminsTablePage from './pages/dashboard/administradores/AdminsTablePage';
// TODO: IMPORTANTE --> arreglar todos los forms EDIT Y ADD, mandar formData con el model correspondiente y arreglar forms en general (sacar estado x ej)
// hecho ✅ --> AdminAddPage, CarreraAddPage
function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/carreras" element={<CarrerasPage />} />
          <Route path="/carreras/:id" element={<CarreraPage />} />
          <Route path="/instituciones" element={<InstitucionesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<div>Acceso no autorizado</div>} />

          <Route
            path="/dashboard/*"
            element={<DashboardRoutes />} 
          />

          <Route
            path="/dashboard/instituciones"
            element={
              <ProtectedRoute roles={['SuperUser']}>
                <InstitucionesTablePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/instituciones-crear"
            element={
              <ProtectedRoute roles={['SuperUser']}>
                <InstitucionAddPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/instituciones-editar/:id"
            element={
              <ProtectedRoute roles={['SuperUser']}>
                <InstitucionEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/administradores"
            element={
              <ProtectedRoute roles={['SuperUser']}>
                <AdminsTablePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/administradores-crear"
            element={
              <ProtectedRoute roles={['SuperUser']}>
                <AdminAddPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/administradores-editar/:id"
            element={
              <ProtectedRoute roles={['SuperUser']}>
                <AdminEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/carreras"
            element={
              <ProtectedRoute roles={['Admin']}>
                <CarrerasTablePage />
              </ProtectedRoute>
            }
          />
           <Route
            path="/dashboard/carreras-crear"
            element={
              <ProtectedRoute roles={['Admin']}>
                <CarreraAddPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/carreras-editar/:id"
            element={
              <ProtectedRoute roles={['Admin']}>
                <CarreraEditPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
