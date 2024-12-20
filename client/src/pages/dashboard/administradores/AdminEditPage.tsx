import React, { useEffect, useRef, useState } from 'react';
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
import { Administrador, AdministradorUpdate, Roles } from '../../../services/models/Administrador';
import SuperUserDashboard from '../SuperUserDashboard';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Institucion } from '../../../services/models/Institucion';
import { ApiValidationResponse } from '../../../services/models/ApiValidationResponse';
import handleApiError from '../../../utils/ApiErrorHandler';
const AdminEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [instituciones, setInstituciones] = useState<Institucion[]>([]);
  const [rol, setRol] = useState<Roles>(Roles.Admin); 
  const [loading, setLoading] = useState(true);

  const administradorToEdit = location.state as Administrador;
  const toast = useToast();

  const nombreRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const rolRef = useRef<HTMLSelectElement>(null);
  const idInstitucionRef = useRef<HTMLSelectElement>(null);
  const claveRef = useRef<HTMLInputElement>(null);

  const [show, setShow] = useState(false);
  const handlePasswordToggle = () => setShow(!show);

  useEffect(() => {
    const fetchInstituciones = async () => {
      const apiInstitucionesResponse = new ApiResponse();
      await apiInstitucionesResponse.useFetch('instituciones', 'GET');

      if (apiInstitucionesResponse.error == null && Array.isArray(apiInstitucionesResponse.data)) {
        setInstituciones(apiInstitucionesResponse.data);
      } else {
        toast({
          title: 'Error',
          description: `Ocurrió un error al cargar las instituciones: ${apiInstitucionesResponse.error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    };

    fetchInstituciones();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();



   const formData: AdministradorUpdate = {
      nombre: nombreRef.current?.value || '',
      correo: correoRef.current?.value || '',
      id_institucion: Number(idInstitucionRef.current?.value) || undefined,
      ...(claveRef.current?.value ? { clave: claveRef.current.value } : {}),
      rol: rolRef.current?.value as Roles,
    };

    const apiPatchResponse = new ApiResponse<Administrador>();
    await apiPatchResponse.useFetch(`administradores/${administradorToEdit.id}`, 'PATCH', formData);

if (apiPatchResponse.error == null) {
  toast({
    title: 'Guardado correctamente',
    description: 'El administrador fue actualizado con éxito.',
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
  navigate('/dashboard/administradores');
} else {
  if (typeof apiPatchResponse.error === 'object' && apiPatchResponse.error !== null) {
    if ('errors' in apiPatchResponse.error) {
      handleApiError(apiPatchResponse.error as ApiValidationResponse, toast);
    } 
    else if ('message' in apiPatchResponse.error) {
      const { message } = apiPatchResponse.error;
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } 
    else {
      toast({
        title: 'Error desconocido',
        description: 'Ocurrió un problema inesperado.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  } else {
    toast({
      title: 'Error al actualizar el administrador.',
      description: apiPatchResponse.error || 'Ocurrió un problema al actualizar el administrador.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }
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
                onChange={(e) => setRol(e.target.value as Roles)} 
                
              >
                <option value={Roles.Admin}>Admin</option>
                <option value={Roles.SuperUser}>SuperUser</option>
              </Select>
            </FormControl>

            <FormControl id="id_institucion" isRequired={rol === Roles.Admin}>
              <FormLabel>Institución {rol === Roles.Admin}</FormLabel>
              <Select ref={idInstitucionRef} defaultValue={administradorToEdit.id_institucion} isDisabled={loading}>
                {instituciones.map((institucion) => (
                  <option key={institucion.id} value={institucion.id}>
                    {institucion.nombre}
                  </option>
                ))}
              </Select>
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
