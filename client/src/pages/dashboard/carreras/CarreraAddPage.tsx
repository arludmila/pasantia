import React, { useRef } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ApiResponse from '../../../services/ApiResponse';
import Carrera from '../../../services/models/Carrera';
import AdminDashboard from '../AdminDashboard ';
import { getDecodedToken } from '../../../services/Token';

const CarreraAddPage = () => {
  const navigate = useNavigate();
  const decoded = getDecodedToken();

  const toast = useToast();

  const nombreRef = useRef<HTMLInputElement>(null);
  const tipoRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const planDeEstudioRef = useRef<HTMLInputElement>(null);
  const modalidadRef = useRef<HTMLSelectElement>(null);
  const cupoRef = useRef<HTMLInputElement>(null);
  const duracionAniosRef = useRef<HTMLInputElement>(null);
  const duracionMesesRef = useRef<HTMLInputElement>(null);
  const fechaInscripcionRef = useRef<HTMLInputElement>(null);
  const observacionRef = useRef<HTMLInputElement>(null);
  const estadoRef = useRef<HTMLInputElement>(null);
  const prioridadRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      nombre: nombreRef.current?.value || '',
      tipo: tipoRef.current?.value || '',
      descripcion: descripcionRef.current?.value || '',
      plan_de_estudio: planDeEstudioRef.current?.value || '',
      modalidad: modalidadRef.current?.value || 'Presencial',
      cupo: cupoRef.current?.value || '',
      duracion_anios: duracionAniosRef.current?.value || 1,
      duracion_meses: duracionMesesRef.current?.value || 1,
      fecha_inscripcion: fechaInscripcionRef.current?.value || '',
      observacion: observacionRef.current?.value || '',
      institucion_id: decoded && decoded.id_institucion !== undefined ? decoded.id_institucion : 0,
      estado: estadoRef.current?.value || 1,
      prioridad: prioridadRef.current?.value || 0,
    };

    const apiResponse = new ApiResponse<Carrera>();
    await apiResponse.useFetch('carreras', 'POST', formData);

    if (!apiResponse.error) {
      toast({
        title: 'Carrera creada.',
        description: 'La carrera ha sido creada exitosamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/dashboard/carreras');
    } else {
      toast({
        title: 'Error al crear la carrera.',
        description: apiResponse.error || 'Ocurrió un problema al crear la carrera.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
              <Input ref={nombreRef} defaultValue="" />
            </FormControl>

            <FormControl id="tipo" isRequired>
              <FormLabel>Tipo</FormLabel>
              <Input ref={tipoRef} defaultValue="" />
            </FormControl>

            <FormControl id="descripcion">
              <FormLabel>Descripción</FormLabel>
              <Input ref={descripcionRef} defaultValue="" />
            </FormControl>

            <FormControl id="plan_de_estudio">
              <FormLabel>Plan de Estudio</FormLabel>
              <Input ref={planDeEstudioRef} defaultValue="" />
            </FormControl>

            <FormControl id="modalidad" isRequired>
              <FormLabel>Modalidad</FormLabel>
              <Select ref={modalidadRef} defaultValue="Presencial">
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Semipresencial">Semipresencial</option>
              </Select>
            </FormControl>

            <FormControl id="cupo">
              <FormLabel>Cupo</FormLabel>
              <Input ref={cupoRef} defaultValue="" />
            </FormControl>

            <FormControl id="duracion_anios" isRequired>
              <FormLabel>Duración en Años</FormLabel>
              <Input type="number" ref={duracionAniosRef} defaultValue={1} />
            </FormControl>

            <FormControl id="duracion_meses" isRequired>
              <FormLabel>Duración en Meses</FormLabel>
              <Input type="number" ref={duracionMesesRef} defaultValue={1} />
            </FormControl>

            <FormControl id="fecha_inscripcion" isRequired>
              <FormLabel>Fecha de Inscripción</FormLabel>
              <Input type="date" ref={fechaInscripcionRef} defaultValue="" />
            </FormControl>

            <FormControl id="observacion">
              <FormLabel>Observación</FormLabel>
              <Input ref={observacionRef} defaultValue="" />
            </FormControl>

            <FormControl id="estado" isRequired>
              <FormLabel>Estado</FormLabel>
              <Input type="number" ref={estadoRef} defaultValue={1} />
            </FormControl>

            <FormControl id="prioridad">
              <FormLabel>Prioridad</FormLabel>
              <Input type="number" ref={prioridadRef} defaultValue={0} />
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
