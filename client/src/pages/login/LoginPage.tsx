import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { usePost } from '../../services/ApiResponse';
import LoginResponse from '../../services/models/LoginResponse';
import LoginRequest from '../../services/models/LoginRequest';

const LoginPage = () => {
const [formData, setFormData] = useState<LoginRequest>({ correo: '', clave: '' });
  const [post, { error, loading, response, data }] = usePost<LoginRequest, LoginResponse>('administradores/login');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await post(formData);
  };

  useEffect(() => {
    if (response) {
      if (response.ok && data) {
        toast({
          title: 'Inicio de sesión exitoso.',
          description: `Bienvenido ${formData.correo}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        const token = data.token; 
        localStorage.setItem('token', token);
        navigate('/dashboard'); 
      } else if (error) {
        toast({
          title: 'Error en el inicio de sesión.',
          description: error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [response, data, error, formData.correo, navigate, toast]);

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
                            value={formData.correo} 
                            onChange={(e) => setFormData(prevState => ({
                                ...prevState,
                                correo: e.target.value,
                            }))}
                        />
                    </FormControl>
                    <FormControl id="clave" isRequired>
                        <FormLabel>Contraseña</FormLabel>
                        <Input 
                            type="password" 
                            placeholder="******" 
                            value={formData.clave} 
                            onChange={(e) => setFormData(prevState => ({
                                ...prevState,
                                clave: e.target.value,
                            }))} 
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="full" isLoading={loading}>
                        Iniciar Sesión
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default LoginPage;
