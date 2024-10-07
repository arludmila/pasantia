import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import logo from './logo.svg';
import './App.css';
import CarrerasPage from './components/Carreras';

function App() {
  return (
    <ChakraProvider>
      <CarrerasPage />
    </ChakraProvider>
  );
}

export default App;
