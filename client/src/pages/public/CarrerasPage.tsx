import { useState } from 'react';
import {
  Box, Heading, Input, Grid, GridItem, VStack, Text, Button, Select
} from '@chakra-ui/react';

import Carrera from '../../services/models/Carrera'; 
//import { useFetch } from '../../services/ApiResponse';

const CarrerasPage = () => {
  const endpoint = 'carreras';
 /*  const [searchTerm, setSearchTerm] = useState('');
  const { data, error, loading } = useFetch<Carrera[]>(endpoint); 

  if (loading) {
    return <Heading>Cargando...</Heading>;
  }

  if (error) {
    return <p>Error: {error}</p>; 
  }

  if (!data) { 
    return <p>No hay información disponible</p>;
  }

  const filteredCarreras = data.filter(carrera => 
    carrera.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  ); */
  return (
   <div>
    <Box p={5}>
      <Heading mb={5}>Formación Académica en Goya</Heading>
     {/*  <Input
        placeholder="Buscar por nombre de carrera..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={5}
      /> */}
        
    {/*   <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {filteredCarreras.map(carrera => (
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
      </Grid> */}
    </Box>
   </div>
  );
};
export default CarrerasPage;
