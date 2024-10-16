import { useEffect, useState } from 'react';
import {
  Box, Heading, Input, Grid, GridItem, VStack, Text, Button,
  Flex,
  RadioGroup,
  Radio,
  Select,
  Spinner
} from '@chakra-ui/react';

import Carrera from '../../services/models/Carrera'; 
import NavbarHome from '../../components/NavbarHome';
import ApiResponse from '../../services/ApiResponse';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const CarrerasPage = () => {
  const endpoint = 'carreras';
  const navigator = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [response, setResponse] = useState(new ApiResponse<Carrera[]>());
  const [selectedModalidad, setSelectedModalidad] = useState('');
  // TODO: ?? terminar? 
  const [selectedDuracion, setSelectedDuracion] = useState<{ años: number; meses: number }>({
    años: 0,
    meses: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const modalidadOptions = ['Todas', 'Presencial', 'Virtual', 'Semipresencial'];
  useEffect(() => {
    const fetchCarreras = async () => {
      const apiResponse = new ApiResponse<Carrera[]>();
      await apiResponse.useFetch(`${endpoint}`, 'GET');
      setResponse(apiResponse); 
    };

    fetchCarreras();
  }, []);

  
  const handleMasInformacion = (id: number) => {
      navigator(`/${endpoint}/${id}`);
  }
  const normalizeText = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };  
  // TODO: ordenar A-Z
  const filteredCarreras = response.data
  ? response.data.filter(carrera => 
      normalizeText(carrera.nombre).includes(normalizeText(searchTerm)) &&
      (selectedModalidad ? (selectedModalidad === '' || carrera.modalidad === selectedModalidad) : true) &&
      (selectedDuracion.años > 0 ? carrera.duracion_anios === selectedDuracion.años : true) &&
      (selectedDuracion.meses > 0 ? carrera.duracion_meses === selectedDuracion.meses : true)
    )
  : [];
    const indexOfLastCarrera = currentPage * resultsPerPage;
    const indexOfFirstCarrera = indexOfLastCarrera - resultsPerPage;
    const currentCarreras = filteredCarreras.slice(indexOfFirstCarrera, indexOfLastCarrera);
    // TODO: terminar paginacion??
    const totalPages = Math.ceil(filteredCarreras.length / resultsPerPage);
    return (
      <div>
        <NavbarHome />
        <Box p={5}>
          {response.loading ? (
            <Flex 
              justify="center" 
              align="center" 
              height="100vh"
            >
              <Spinner size="xl" thickness="4px" speed="0.65s" color="green.300" />
            </Flex>
          ) : response.error ? (
            <Text>Error: {response.error}</Text>
          ) : (
            <>
              <Heading mb={5}>Formación Académica en Goya</Heading>
              <Input
                placeholder="Buscar por nombre de carrera..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={5}
              /> 
              
              <Flex mb={5}>
                <VStack align="start" mr={10}>
                  <Text fontWeight="bold">Filtrar por Modalidad:</Text>
                  <RadioGroup onChange={setSelectedModalidad} value={selectedModalidad}>
                    <Flex direction="column">
                      {modalidadOptions.map(option => (
                        <Radio colorScheme='teal' key={option} value={option === 'Todas' ? '' : option} mb={2}>
                          {option}
                        </Radio> 
                      ))}
                    </Flex>
                  </RadioGroup>
                </VStack>
    
                <Flex direction="column" flexGrow={1}>
                  {filteredCarreras.length === 0 ? (
                    <Text fontWeight="medium" color="red.600">No se encontraron resultados.</Text> 
                  ) : (filteredCarreras.map((carrera) => (
                    <Flex
                      key={carrera.id}
                      bg="gray.100"
                      p={4}
                      mb={2}
                      borderRadius="md"
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Text fontWeight="bold" fontSize="lg">{carrera.nombre}</Text>
                        <Text fontWeight="medium" color="teal.500">{carrera.institucion_nombre}</Text>
                        <Text>Tipo de carrera: {carrera.tipo}</Text>
                        <Text>
                          Duración:{" "}
                          {carrera.duracion_anios > 0 && `${carrera.duracion_anios} ${carrera.duracion_anios === 1 ? 'año' : 'años'}`}{' '}
                          {carrera.duracion_anios > 0 && carrera.duracion_meses > 0 && 'y '}
                          {carrera.duracion_meses > 0 && `${carrera.duracion_meses} ${carrera.duracion_meses === 1 ? 'mes' : 'meses'}`}
                        </Text>
                        <Text>Modalidad: {carrera.modalidad}</Text>
                        <Text>Inscripción: {new Date(carrera.fecha_inscripcion).toLocaleDateString()}</Text>
                      </Box>
                      <Box>
                        <Button 
                          onClick={() => handleMasInformacion(carrera.id)} 
                          leftIcon={<AddIcon />} 
                          colorScheme="teal" 
                          mb={2}
                        >
                          Información
                        </Button>
                      </Box>
                    </Flex>
                  )))}
                </Flex>
              </Flex>
            </>
          )}
        </Box>
      </div>
    );
};

export default CarrerasPage;
