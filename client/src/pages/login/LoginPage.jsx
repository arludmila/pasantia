import React, { useState }  from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Stack,
  useToast,
} from '@chakra-ui/react';

const LoginPage = () => {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const toast = useToast(); // Para mostrar notificaciones
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log("Correo:", correo);
      console.log("Clave:", clave);
      // Crea el objeto JSON a enviar
      const data = {
        correo: correo,
        clave: clave,
      };
  
      try {
        const response = await fetch('http://localhost:3050/api/administradores/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Si la autenticación es exitosa
          toast({
            title: 'Inicio de sesión exitoso.',
            description: `Bienvenido ${correo}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          // Aquí puedes redirigir al usuario o guardar el token
        } else {
          // Si hay un error en la autenticación
          toast({
            title: 'Error en el inicio de sesión.',
            description: result.message || 'Credenciales incorrectas',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Error de red.',
          description: 'No se pudo conectar con el servidor.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
  };

  return (
    <Box maxW="md" mx="auto" mt="100px" p={5} borderWidth={1} borderRadius="lg">
      <Heading mb={4}>Iniciar Sesión</Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="correo" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input 
              type="email" 
              placeholder="correo@ejemplo.com" 
              value={correo} 
              onChange={(e) => setCorreo(e.target.value)} // Enlazar al estado
            />
          </FormControl>
          <FormControl id="clave" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input 
              type="password" 
              placeholder="******" 
              value={clave} 
              onChange={(e) => setClave(e.target.value)} // Enlazar al estado
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full">
            Iniciar Sesión
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginPage;
