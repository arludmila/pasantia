import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ApiResponse from '../../../services/ApiResponse';
import { Administrador, Rol } from '../../../services/models/Administrador';
import SuperUserDashboard from '../SuperUserDashboard';
import { IoEye, IoEyeOff } from "react-icons/io5";

const AdminAddPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  // TODO: en vez de pedir el id de la institucion mostrar lista? select de instituciones? o no (tmb en edit)
  const nombreRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const rolRef = useRef<HTMLSelectElement>(null);
  const idInstitucionRef = useRef<HTMLInputElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);
  const estadoRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);
  const handlePasswordToggle = () => setShow(!show);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData: Omit<Administrador, 'id'> = {
      nombre: nombreRef.current?.value || '',
      correo: correoRef.current?.value || '',
      rol: rolRef.current?.value as Rol,
      id_institucion: idInstitucionRef.current?.value
        ? parseInt(idInstitucionRef.current.value)
        : undefined,
      clave: claveRef.current?.value || '',
      estado: estadoRef.current?.value ? parseInt(estadoRef.current.value) : 1,
    };

    const apiResponse = new ApiResponse<Administrador>();
    await apiResponse.useFetch('administradores', 'POST', formData);

    if (apiResponse.error == null) {
      toast({
        title: 'Administrador creado',
        description: 'El administrador fue creado con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard/administradores');
    } else {
      toast({
        title: 'Error',
        description: `Ocurrió un error: ${apiResponse.error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div>
      <SuperUserDashboard />
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <Heading mb={6} textAlign="center" size="lg">
          Crear Administrador
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" ref={nombreRef} defaultValue="" />
            </FormControl>

            <FormControl id="correo" isRequired>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input type="email" ref={correoRef} defaultValue="" />
            </FormControl>

            <FormControl id="rol" isRequired>
              <FormLabel>Rol</FormLabel>
              <Select ref={rolRef} defaultValue={Rol.Admin}>
                <option value={Rol.Admin}>Admin</option>
                <option value={Rol.SuperUser}>SuperUser</option>
              </Select>
            </FormControl>

            <FormControl id="id_institucion">
              <FormLabel>ID Institución</FormLabel>
              <Input type="number" ref={idInstitucionRef} defaultValue="" />
            </FormControl>

            <FormControl id="clave" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  ref={claveRef}
                  defaultValue=""
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordToggle}>
                    {show ? <IoEyeOff /> : <IoEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="estado" isRequired>
              <FormLabel>Estado</FormLabel>
              <Input type="number" ref={estadoRef} defaultValue="1" />
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Crear Administrador
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default AdminAddPage;
