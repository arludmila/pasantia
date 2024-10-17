import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiResponse from '../../../services/ApiResponse';
import Institucion from '../../../services/models/Institucion';
import SuperUserDashboard from '../SuperUserDashboard';
// TODO: editar logo?
const InstitucionEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const institucionToEdit = location.state as Institucion;
  const toast = useToast();

  const [formData, setFormData] = useState<Institucion>({
    ...institucionToEdit
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiResponse = new ApiResponse<Institucion>();
    await apiResponse.useFetch(`instituciones/${formData.id}`, 'PATCH', formData); 

    if (apiResponse.error == null) {
      toast({
        title: 'Guardado correctamente',
        description: 'La institución fue actualizada con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/dashboard/instituciones');
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
    <SuperUserDashboard>
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <Heading mb={6} textAlign="center" size="lg">
          Editar Institución
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="cue" isRequired>
              <FormLabel>CUE</FormLabel>
              <Input
                type="text"
                name="cue"
                value={formData.cue}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="cueanexo">
              <FormLabel>CUE Anexo</FormLabel>
              <Input
                type="text"
                name="cueanexo"
                value={formData.cueanexo}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="direccion" isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="ubicacion_lat">
              <FormLabel>Ubicación Lat</FormLabel>
              <Input
                type="text"
                name="ubicacion_lat"
                value={formData.ubicacion_lat}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="ubicacion_long">
              <FormLabel>Ubicación Long</FormLabel>
              <Input
                type="text"
                name="ubicacion_long"
                value={formData.ubicacion_long}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="tel">
              <FormLabel>Teléfono</FormLabel>
              <Input
                type="text"
                name="tel"
                value={formData.tel}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="pagina">
              <FormLabel>Página</FormLabel>
              <Input
                type="text"
                name="pagina"
                value={formData.pagina}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="gestion" isRequired>
            <FormLabel>Gestión</FormLabel>
            <Select
              name="gestion"
              value={formData.gestion}
              onChange={handleInputChange}
            >
              <option value="Publica">Pública</option>
              <option value="Privada">Privada</option>
            </Select>
          </FormControl>

            <FormControl id="estado" isRequired>
              <FormLabel>Estado</FormLabel>
              <Input
                type="number"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Guardar Cambios
            </Button>
          </VStack>
        </form>
      </Box>
    </SuperUserDashboard>
  );
};

export default InstitucionEditPage;
