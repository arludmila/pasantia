// TODO: manejar error de si ya existe el mismo mail!!! --> = edit
import React, { useRef, useState, useEffect } from 'react';
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
import { Administrador, AdministradorCreate, Roles } from '../../../services/models/Administrador';
import SuperUserDashboard from '../SuperUserDashboard';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Institucion } from '../../../services/models/Institucion';

const AdminAddPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [instituciones, setInstituciones] = useState<Institucion[]>([]);
  const [rol, setRol] = useState<Roles>(Roles.Admin); 
  const [loading, setLoading] = useState(true);

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

    const idInstitucion = rol === Roles.Admin && idInstitucionRef.current?.value
      ? parseInt(idInstitucionRef.current?.value)
      : undefined;

      const formData: AdministradorCreate = {
        nombre: nombreRef.current?.value || '',
        correo: correoRef.current?.value || '',
        rol: rol,
        id_institucion: idInstitucion,
        clave: claveRef.current?.value || '',
      };

    const apiPostResponse = new ApiResponse<Administrador>();
    await apiPostResponse.useFetch('administradores', 'POST', formData);

    if (apiPostResponse.error == null) {
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
        description: `Ocurrió un error: ${apiPostResponse.error}`,
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
              <Select
                ref={rolRef}
                value={rol}
                onChange={(e) => setRol(e.target.value as Roles)} 
                defaultValue={Roles.Admin}
              >
                <option value={Roles.Admin}>Admin</option>
                <option value={Roles.SuperUser}>SuperUser</option>
              </Select>
            </FormControl>

            {rol === Roles.Admin && (
          <FormControl id="id_institucion" isRequired>
            <FormLabel>Institución</FormLabel>
            <Select ref={idInstitucionRef} placeholder="Selecciona una institución" isDisabled={loading}>
              {instituciones.map((institucion) => (
                <option key={institucion.id} value={institucion.id}>
                  {institucion.nombre}
                </option>
              ))}
            </Select>
          </FormControl>
        )}

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

           

            <Button type="submit" colorScheme="teal" size="lg" width="full" isLoading={loading}>
              Crear Administrador
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default AdminAddPage;
