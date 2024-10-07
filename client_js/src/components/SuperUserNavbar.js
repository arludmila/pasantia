/*import React from 'react';
import { Box, Flex, Button, Stack, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const SuperUserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    console.log('Cerrando sesión...');
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  return (
    <Box bg="teal.500" p={4}>
      <Flex align="center" justify="space-between">
        <Stack direction="row" spacing={4}>
          <Link color="white" href="/administradores">
            Administradores
          </Link>
          <Link color="white" href="/instituciones">
            Instituciones
          </Link>
        </Stack>
        <Button colorScheme="teal" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Flex>
    </Box>
  );
};

export default SuperUserNavbar;
*/