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
import Carrera from '../../../services/models/Carrera';
import AdminDashboard from '../AdminDashboard ';
import { getDecodedToken } from '../../../services/Token';

const CarreraAddPage = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(new ApiResponse<Carrera>());
  const decoded = getDecodedToken();
  const [formData, setFormData] = useState<Omit<Carrera, 'id'>>({
    nombre: '',
    tipo: '',
    descripcion: '',
    plan_de_estudio: '',
    modalidad: 'Presencial', 
    cupo: '',
    duracion_anios: 1,
    duracion_meses: 1,
    fecha_inscripcion: '',
    observacion: '',
    institucion_id: decoded && decoded.id_institucion !== undefined ? decoded.id_institucion : 0,
    estado: 1,
    prioridad: 0,
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

    const apiResponse = new ApiResponse<Carrera>();
    await apiResponse.fetchData('/carreras', 'POST', formData);
    setResponse(apiResponse);

    if (response.error == null) {
      navigate('/dashboard/carreras');
    } else {
      console.error(response.error);
    }
  };
  return (
    <AdminDashboard>
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
  <Heading mb={6} textAlign="center" size="lg">
    Crear Carrera
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

      <FormControl id="tipo" isRequired>
        <FormLabel>Tipo</FormLabel>
        <Input
          type="text"
          name="tipo"
          value={formData.tipo}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="descripcion">
        <FormLabel>Descripción</FormLabel>
        <Input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="plan_de_estudio">
        <FormLabel>Plan de Estudio</FormLabel>
        <Input
          type="text"
          name="plan_de_estudio"
          value={formData.plan_de_estudio}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="modalidad" isRequired>
        <FormLabel>Modalidad</FormLabel>
        <Select
          name="modalidad"
          value={formData.modalidad}
          onChange={handleInputChange}
        >
          <option value="Presencial">Presencial</option>
          <option value="Virtual">Virtual</option>
          <option value="Semipresencial">Semipresencial</option>
        </Select>
      </FormControl>

      <FormControl id="cupo">
        <FormLabel>Cupo</FormLabel>
        <Input
          type="text"
          name="cupo"
          value={formData.cupo}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="duracion_anios" isRequired>
        <FormLabel>Duración en Años</FormLabel>
        <Input
          type="number"
          name="duracion_anios"
          value={formData.duracion_anios}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="duracion_meses" isRequired>
        <FormLabel>Duración en Meses</FormLabel>
        <Input
          type="number"
          name="duracion_meses"
          value={formData.duracion_meses}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="fecha_inscripcion" isRequired>
        <FormLabel>Fecha de Inscripción</FormLabel>
        <Input
          type="date"
          name="fecha_inscripcion"
          value={formData.fecha_inscripcion}
          onChange={handleInputChange}
        />
      </FormControl>

      <FormControl id="observacion">
        <FormLabel>Observación</FormLabel>
        <Input
          type="text"
          name="observacion"
          value={formData.observacion}
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

      <FormControl id="prioridad">
        <FormLabel>Prioridad</FormLabel>
        <Input
          type="number"
          name="prioridad"
          value={formData.prioridad || ''}
          onChange={handleInputChange}
        />
      </FormControl>

      <Button type="submit" colorScheme="teal" size="lg" width="full">
        Crear Carrera
      </Button>
    </VStack>
  </form>
    </Box>
    </AdminDashboard>

  );
};

export default CarreraAddPage;
