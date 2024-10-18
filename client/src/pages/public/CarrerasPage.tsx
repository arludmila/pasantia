import { useEffect, useRef, useState } from 'react';
import {
  Box, Heading, Input, VStack, Text, Button,
  Flex,
  RadioGroup,
  Radio,
  Spinner,
  IconButton
} from '@chakra-ui/react';
import NavbarHome from '../../components/NavbarHome';
import ApiResponse from '../../services/ApiResponse';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { Carrera } from '../../services/models/Carrera';

const CarrerasPage = () => {
  const endpoint = 'carreras';
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [response, setResponse] = useState(new ApiResponse<Carrera[]>());
  const [selectedModalidad, setSelectedModalidad] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [filteredCarreras, setFilteredCarreras] = useState<Carrera[]>([]); 
  const modalidadOptions = ['Todas', 'Presencial', 'Virtual', 'Semipresencial'];

  useEffect(() => {
    const fetchCarreras = async () => {
      const apiResponse = new ApiResponse<Carrera[]>();
      await apiResponse.useFetch(`${endpoint}`, 'GET');
      setResponse(apiResponse);
      setFilteredCarreras(apiResponse.data || []); 
    };

    fetchCarreras();
  }, []);

  const normalizeText = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  const handleSearch = () => {
    if (searchInputRef.current) {
      const searchTerm = normalizeText(searchInputRef.current.value);
      const filtered = response.data?.filter(carrera =>
        normalizeText(carrera.nombre).includes(searchTerm) &&
        (selectedModalidad ? carrera.modalidad === selectedModalidad : true)
      ) || [];
      setFilteredCarreras(filtered);
      setCurrentPage(1); 
    }
  };

  useEffect(() => {
    const searchTerm = searchInputRef.current ? normalizeText(searchInputRef.current.value) : '';
    const filtered = response.data?.filter(carrera =>
      normalizeText(carrera.nombre).includes(searchTerm) &&
      (selectedModalidad ? carrera.modalidad === selectedModalidad : true)
    ) || [];
    setFilteredCarreras(filtered);
    setCurrentPage(1); 
  }, [selectedModalidad, response.data]);

  const indexOfLastCarrera = currentPage * resultsPerPage;
  const indexOfFirstCarrera = indexOfLastCarrera - resultsPerPage;
  const currentCarreras = filteredCarreras.slice(indexOfFirstCarrera, indexOfLastCarrera);
  const totalPages = Math.ceil(filteredCarreras.length / resultsPerPage);

  return (
    <div>
      <NavbarHome />
      <Box p={5}>
        {response.loading ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="xl" thickness="4px" speed="0.65s" color="green.300" />
          </Flex>
        ) : response.error ? (
          <Text>Error: {response.error}</Text>
        ) : (
          <>
            <Heading mb={5}>Formación Académica en Goya</Heading>
            <Flex mb={5}>
              <Input
                placeholder="Buscar por nombre de carrera..."
                ref={searchInputRef}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                mb={5}
              /> 
              <Button 
                onClick={handleSearch} 
                colorScheme="teal" 
                ml={2}
              >
                Buscar
              </Button>
            </Flex>

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
                {currentCarreras.length === 0 ? (
                  <Text fontWeight="medium" color="red.600">No se encontraron resultados.</Text> 
                ) : (currentCarreras.map((carrera) => (
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
                    </Box>
                    <Box>
                      <Button 
                        onClick={() => navigate(`/${endpoint}/${carrera.id}`)} 
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

            {currentCarreras.length > 0 && (
              <Flex justify="center" align="center" mt={4}>
                <IconButton
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  isDisabled={currentPage === 1}
                  icon={<ArrowLeftIcon />}
                  aria-label="Página anterior"
                />
                <Text mr={5} ml={5}>Página {currentPage} de {totalPages}</Text>
                
                <IconButton
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  icon={<ArrowRightIcon />}
                  aria-label="Siguiente página"
                  isDisabled={currentPage === totalPages}
                />
              </Flex>
            )}

          </>
        )}
      </Box>
    </div>
  );
};

export default CarrerasPage;
