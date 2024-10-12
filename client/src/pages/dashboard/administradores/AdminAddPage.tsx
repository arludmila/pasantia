import React, { useState } from 'react';
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
import ApiResponse from '../../../services/ApiResponse';
import { Administrador, Rol } from '../../../services/models/Administrador';

const AdminAddPage = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(new ApiResponse<Administrador>());

  const [formData, setFormData] = useState<Omit<Administrador, 'id'>>({
    rol: Rol.Admin, 
    nombre: '',
    correo: '',
    id_institucion: undefined,
    clave: '',
    estado: 1,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'estado' ? Number(value) : value, 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    const apiResponse = new ApiResponse<Administrador>();
    await apiResponse.fetchData('/administradores', 'POST', formData);
    setResponse(apiResponse);

    if (response.error == null) {
      navigate('/dashboard/administradores');
    } else {
      console.error(response.error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
      <Heading mb={6} textAlign="center" size="lg">
        Crear Administrador
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl id="nombre" isRequired>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="correo" isRequired>
            <FormLabel>Correo Electrónico</FormLabel>
            <Input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="rol" isRequired>
            <FormLabel>Rol</FormLabel>
            <Select
              name="rol"
              value={formData.rol}
              onChange={handleInputChange}
            >
              <option value={Rol.Admin}>Admin</option>
              <option value={Rol.SuperUser}>SuperUser</option>
            </Select>
          </FormControl>

          <FormControl id="id_institucion">
            <FormLabel>ID Institución</FormLabel>
            <Input
              type="number"
              name="id_institucion"
              value={formData.id_institucion || ''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl id="clave" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              name="clave"
              value={formData.clave}
              onChange={handleInputChange}
            />
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
            Crear Administrador
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AdminAddPage;
