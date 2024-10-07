import { useState } from 'react';
import {
  Box, Heading, Input, Grid, GridItem, VStack, Text, Button, Select
} from '@chakra-ui/react';
import Fetch from '../services/Fetch';

// Placeholder para las carreras, reemplázalo con los datos de tu BBDD
const carreras = [
  {
    id: 1,
    nombre: "Ingeniería en Sistemas",
    modalidad: "Presencial",
    duracion_anios: 5,
    duracion_meses: 0,
    institucion: "Universidad Nacional de Goya"
  },
  {
    id: 2,
    nombre: "Marketing Digital",
    modalidad: "Virtual",
    duracion_anios: 3,
    duracion_meses: 6,
    institucion: "Universidad de Corrientes"
  },
  // Agregar más carreras...
];

const CarrerasPage = () => {
  const [searchTerm, setSearchTerm ] = useState('');
  const [carreras, setCarreras] = useState('');
  const [error, setError] = useState(null);
  const handleSuccess = (result) => {
    setCarreras(result); // Guardamos el resultado cuando llega
  };

  const handleError = (errorMessage) => {
    setError(errorMessage); // Guardamos el error si ocurre
  };
  // Filtra las carreras según el término de búsqueda
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box p={5}>
      <Heading mb={5}>Formación Académica en Goya</Heading>
      {/* Input de búsqueda */}
      <Input
        placeholder="Buscar por nombre de carrera..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={5}
      />

      {/* Lista de carreras */}
      <Fetch endpoint="/carreras" onSuccess={handleSuccess} onError={handleError} />      
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {carreras.map(carrera => (
          <GridItem key={carrera.id} borderWidth="1px" borderRadius="lg" p={4}>
            <VStack align="start">
              <Text fontSize="lg" fontWeight="bold">{carrera.nombre}</Text>
              <Text>Modalidad: {carrera.modalidad}</Text>
              <Text>Duración: {carrera.duracion_anios} años {carrera.duracion_meses > 0 && `y ${carrera.duracion_meses} meses`}</Text>
              <Text>Institución: {carrera.institucion_id}</Text>
              <Button colorScheme="teal" mt={3} width="full">Ver más detalles</Button>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default CarrerasPage;
