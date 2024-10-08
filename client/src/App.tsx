import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import InstitucionesPage from './pages/public/InstitucionesPage';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/public/HomePage';
import SuperUserDashboard from './pages/dashboard/SuperUserDashboard';
import AddPage from './pages/dashboard/instituciones/AddPage';

function App() {
  return (
    
    <ChakraProvider>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/instituciones" element={<InstitucionesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<SuperUserDashboard />} />
        <Route path="/dashboard/instituciones-crear" element={<AddPage />} />
        </Routes>
      </BrowserRouter>
      
    </ChakraProvider>
  );

}

export default App;
