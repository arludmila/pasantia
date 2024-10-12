import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Institucion from '../../../services/models/Institucion';
import ApiResponse from '../../../services/ApiResponse';

const InstitucionAddPage = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(new ApiResponse<Institucion>());
  const [formData, setFormData] = useState<Omit<Institucion, 'id'>>({
    cue: 0,
    cueanexo: undefined,
    nombre: '',
    direccion: '',
    ubicacion_lat: undefined,
    ubicacion_long: undefined,
    tel: '',
    pagina: '',
    gestion: 'Publica',
    estado: 1,
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

    console.log(formData);
    
    const apiResponse = new ApiResponse<Institucion>();
    await apiResponse.fetchData('/instituciones', 'POST', formData);
    setResponse(apiResponse);

    if (response.error == null) { 
      navigate('/dashboard/instituciones');
    } else {
   
      console.error(response.error);
    }
  };
  
  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={6} textAlign="center" size="lg">
        Crear Institución
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl id="cue" isRequired>
            <FormLabel>CUE</FormLabel>
            <Input
              type="number"
              name="cue"
              value={formData.cue}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="cueanexo">
            <FormLabel>CUE Anexo</FormLabel>
            <Input
              type="number"
              name="cueanexo"
              value={formData.cueanexo || ''}
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
            <FormLabel>Ubicación Latitud</FormLabel>
            <Input
              type="number"
              step="any"
              name="ubicacion_lat"
              value={formData.ubicacion_lat || ''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="ubicacion_long">
            <FormLabel>Ubicación Longitud</FormLabel>
            <Input
              type="number"
              step="any"
              name="ubicacion_long"
              value={formData.ubicacion_long || ''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="tel">
            <FormLabel>Teléfono</FormLabel>
            <Input
              type="text"
              name="tel"
              value={formData.tel || ''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="pagina">
            <FormLabel>Página Web</FormLabel>
            {/* TODO:Deberia ser url? guarda con http/https */}
            <Input
            
              type="text"
              name="pagina"
              value={formData.pagina || ''}
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
            Crear Institución
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default InstitucionAddPage;
