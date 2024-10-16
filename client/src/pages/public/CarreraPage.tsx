import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Link, Spinner, VStack, HStack, Grid, Image } from '@chakra-ui/react';
import NavbarHome from '../../components/NavbarHome';
import ApiResponse from '../../services/ApiResponse';
import Carrera from '../../services/models/Carrera';


function CarreraPage() {
  const endpoint = 'carreras';
  const { id } = useParams();
  const [response, setResponse] = useState(new ApiResponse<Carrera>());

  useEffect(() => {
    const fetchCarrera = async () => {
      const apiResponse = new ApiResponse<Carrera>();
      await apiResponse.useFetch(`${endpoint}/${id}`, 'GET');
      setResponse(apiResponse);
    };

    fetchCarrera();
  }, []); 

  if (response.loading) return <Spinner size="xl" />;
  if (response.error) return <Text color="red.500">Error: {response.error}</Text>;

  const { data } = response;

  return (
      <div>
        <NavbarHome />
      <Box m={5}>
      {data && (
        <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6} p={5}>
        <Box borderWidth="1px"  borderRadius="lg" p={4} boxShadow="md">
          <Heading as="h1" size="xl" mb={4}>{data.nombre}</Heading>
          <Image src="https://placehold.co/300x200" alt={data.nombre} borderRadius="md" mb={4} />
          <Text fontWeight="bold">Tipo de Carrera:</Text>
          <Text>{data.tipo}</Text>
          
          <Text fontWeight="bold">Descripción:</Text>
          <Text>{data.descripcion}</Text>
      
          <Text fontWeight="bold">Plan de Estudio:</Text>
          <Text>{data.plan_de_estudio}</Text>
      
          <Text fontWeight="bold">Modalidad:</Text>
          <Text>{data.modalidad}</Text>
      
          <Text fontWeight="bold">Cupo:</Text>
          <Text>{data.cupo} alumnos</Text>
      
          <Text fontWeight="bold">Duración:</Text>
          <Text>
            {data.duracion_anios > 0 && `${data.duracion_anios} ${data.duracion_anios === 1 ? 'año' : 'años'}`}{' '}
            {data.duracion_anios > 0 && data.duracion_meses > 0 && 'y '}
            {data.duracion_meses > 0 && `${data.duracion_meses} ${data.duracion_meses === 1 ? 'mes' : 'meses'}`}
          </Text>
      
          <Text fontWeight="bold">Fecha de Inscripción:</Text>
          <Text>{new Date(data.fecha_inscripcion).toLocaleDateString()}</Text>
        </Box>
      
        <Box borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
          <Image src="https://placehold.co/300x200" alt={data.institucion_nombre} borderRadius="md" mb={4} />
          <Text fontWeight="bold">Institución:</Text>
          <Text>{data.institucion_nombre}</Text>
      
          <Text fontWeight="bold">Dirección:</Text>
          <Text>{data.institucion_direccion}</Text>
      
          <Text fontWeight="bold">Teléfono:</Text>
          <Text>{data.institucion_tel}</Text>
      
          <Text fontWeight="bold">Página Web:</Text>
          <Link href={`https://${data.institucion_pagina}`} isExternal color="blue.500">
            {data.institucion_pagina}
          </Link>
        </Box>
      </Grid>
      )}
      </Box>
      </div>
  );
}

export default CarreraPage;
