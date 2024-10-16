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
import { useNavigate, useLocation } from 'react-router-dom';
import ApiResponse from '../../../services/ApiResponse';
import { Administrador, Rol } from '../../../services/models/Administrador';
import SuperUserDashboard from '../SuperUserDashboard';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const AdminEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const administradorToEdit = location.state as Administrador;
  const toast = useToast();

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

    const formData = {
      id: administradorToEdit.id,
      nombre: nombreRef.current?.value || '',
      correo: correoRef.current?.value || '',
      id_institucion: Number(idInstitucionRef.current?.value) || null,
      clave: claveRef.current?.value || '',
      rol: rolRef.current?.value as Rol,
      estado: Number(estadoRef.current?.value) || 0,
    };

    const apiResponse = new ApiResponse<Administrador>();
    await apiResponse.useFetch(`administradores/${formData.id}`, 'PATCH', formData);

    if (apiResponse.error == null) {
      toast({
        title: 'Guardado correctamente',
        description: 'El administrador fue actualizado con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard/administradores');
    } else {
      toast({
        title: 'Error al guardar',
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
          Editar Administrador
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                defaultValue={administradorToEdit.nombre}
                ref={nombreRef}
              />
            </FormControl>

            <FormControl id="correo" isRequired>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input
                type="email"
                defaultValue={administradorToEdit.correo}
                ref={correoRef}
              />
            </FormControl>

            <FormControl id="rol" isRequired>
              <FormLabel>Rol</FormLabel>
              <Select
                defaultValue={administradorToEdit.rol}
                ref={rolRef}
              >
                <option value={Rol.Admin}>Admin</option>
                <option value={Rol.SuperUser}>SuperUser</option>
              </Select>
            </FormControl>

            <FormControl id="id_institucion">
              <FormLabel>ID Institución</FormLabel>
              <Input
                type="number"
                defaultValue={administradorToEdit.id_institucion || ''}
                ref={idInstitucionRef}
              />
            </FormControl>

            <FormControl id="clave">
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  defaultValue={administradorToEdit.clave}
                  ref={claveRef}
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
              <Input
                type="number"
                defaultValue={administradorToEdit.estado}
                ref={estadoRef}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Guardar Cambios
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default AdminEditPage;
