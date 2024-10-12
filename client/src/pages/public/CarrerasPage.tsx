import { useEffect, useState } from 'react';
import {
  Box, Heading, Input, Grid, GridItem, VStack, Text, Button
} from '@chakra-ui/react';

import Carrera from '../../services/models/Carrera'; 
import NavbarHome from '../../components/NavbarHome';
import ApiResponse from '../../services/ApiResponse';

const CarrerasPage = () => {
  const endpoint = 'carreras';
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState(new ApiResponse<Carrera[]>());

  useEffect(() => {
    const fetchCarreras = async () => {
      const apiResponse = new ApiResponse<Carrera[]>();
      await apiResponse.useFetch(`/${endpoint}`, 'GET');
      setResponse(apiResponse); 
    };

    fetchCarreras();
  }, []);

  if (response.loading) return <p>Loading...</p>;
  if (response.error) return <p>Error: {response.error}</p>;

  const normalizeText = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };  
  const filteredCarreras = response.data
  ? response.data.filter(carrera => 
      normalizeText(carrera.nombre).includes(normalizeText(searchTerm))
    )
  : [];

  return (
   <div>
     <NavbarHome/>
     <Box p={5}>
       <Heading mb={5}>Formación Académica en Goya</Heading>
       <Input
         placeholder="Buscar por nombre de carrera..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         mb={5}
       /> 
       
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
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
      </Grid> 
    </Box>
   </div>
  );
};

export default CarrerasPage;
