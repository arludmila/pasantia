import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Heading,
  Spacer,
  Box,
} from '@chakra-ui/react';

function SuperUserDashboard() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3050/api/instituciones")
      .then(response => response.json())
      .then(data => setBackendData(data))
      .catch(error => console.error('Error fetching data:', error)); // Manejo de errores
  }, []);
  
  return (
    <ChakraProvider>
      <Box p={5} m={10}>
        <Flex mb={4}>
          <Heading size="lg">Instituciones</Heading>
          <Spacer />
          <Button colorScheme="green">Agregar+</Button>
        </Flex>
        
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th>CUE</Th>
                <Th>CUE Anexo</Th>
                <Th>Nombre</Th>
                <Th>Dirección</Th>
                <Th>Teléfono</Th>
                <Th>Página</Th>
                <Th>Gestión</Th>
                <Th>Estado</Th>
                <Th>Acciones</Th> 
              </Tr>
            </Thead>
            <Tbody>
              {backendData.map((institucion) => (
                <Tr key={institucion.id}>
                  <Td>{institucion.cue}</Td>
                  <Td>{institucion.cueanexo || 'N/A'}</Td>
                  <Td>{institucion.nombre}</Td>
                  <Td>{institucion.direccion}</Td>
                  <Td>{institucion.tel || 'N/A'}</Td>
                  <Td>{institucion.pagina || 'N/A'}</Td>
                  <Td>{institucion.gestion}</Td>
                  <Td>{institucion.estado}</Td>
                  <Td>
                    <Button colorScheme="orange" size="sm">Editar</Button>
                  </Td> 
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </ChakraProvider>
  );
}

export default SuperUserDashboard; // Asegúrate de que el nombre del componente coincida
