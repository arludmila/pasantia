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
import { useNavigate, useLocation } from 'react-router-dom';
import ApiResponse from '../../../services/ApiResponse';
import AdminDashboard from '../AdminDashboard ';
import { Carrera } from '../../../services/models/Carrera';

const CarreraEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const carreraToEdit = location.state as Carrera;
  const toast = useToast();

  const nombreRef = useRef<HTMLInputElement>(null);
  const tipoRef = useRef<HTMLInputElement>(null);
  const descripcionRef = useRef<HTMLInputElement>(null);
  const planDeEstudioRef = useRef<HTMLInputElement>(null);
  const modalidadRef = useRef<HTMLSelectElement>(null);
  const cupoRef = useRef<HTMLInputElement>(null);
  const horaInscripcionRef = useRef<HTMLInputElement>(null);
  const duracionAniosRef = useRef<HTMLInputElement>(null);
  const duracionMesesRef = useRef<HTMLInputElement>(null);
  const fechaInscripcionRef = useRef<HTMLInputElement>(null);
  const observacionRef = useRef<HTMLInputElement>(null);
  const prioridadRef = useRef<HTMLInputElement>(null);

  const storedDate = carreraToEdit.fecha_inscripcion
  ? carreraToEdit.fecha_inscripcion.split('T')[0]
  : ''; 

const storedTime = carreraToEdit.fecha_inscripcion
  ? carreraToEdit.fecha_inscripcion.split('T')[1].substring(0, 5)
  : '00:00'; 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fecha = fechaInscripcionRef.current?.value; 
    const hora = horaInscripcionRef.current?.value || "00:00";
    const fechaHora =  new Date(`${fecha}T${hora}`);

    const formattedFechaHora = `${fechaHora.getFullYear()}-${(fechaHora.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${fechaHora
      .getDate()
      .toString()
      .padStart(2, '0')} ${fechaHora
      .getHours()
      .toString()
      .padStart(2, '0')}:${fechaHora
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${fechaHora
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;

    const formData = {
      ...carreraToEdit,
      nombre: nombreRef.current?.value || '',
      tipo: tipoRef.current?.value || '',
      descripcion: descripcionRef.current?.value || '',
      plan_de_estudio: planDeEstudioRef.current?.value || '',
      modalidad: modalidadRef.current?.value || '',
      cupo: cupoRef.current?.value || '',
      duracion_anios: Number(duracionAniosRef.current?.value) || 0,
      duracion_meses: Number(duracionMesesRef.current?.value) || 0,
      fecha_inscripcion: formattedFechaHora,
      observacion: observacionRef.current?.value || '',
      prioridad: Number(prioridadRef.current?.value) || 0,
    };

    const apiResponse = new ApiResponse<Carrera>();
    await apiResponse.useFetch(`carreras/${formData.id}`, 'PATCH', formData);

    if (apiResponse.error == null) {
      toast({
        title: 'Guardado correctamente',
        description: 'La carrera fue actualizada con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/dashboard/carreras');
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
    <AdminDashboard>
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <Heading mb={6} textAlign="center" size="lg">
          Editar Carrera
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" ref={nombreRef} defaultValue={carreraToEdit.nombre} />
            </FormControl>

            <FormControl id="tipo" isRequired>
              <FormLabel>Tipo</FormLabel>
              <Input type="text" ref={tipoRef} defaultValue={carreraToEdit.tipo} />
            </FormControl>

            <FormControl id="descripcion">
              <FormLabel>Descripción</FormLabel>
              <Input type="text" ref={descripcionRef} defaultValue={carreraToEdit.descripcion} />
            </FormControl>

            <FormControl id="plan_de_estudio">
              <FormLabel>Plan de Estudio</FormLabel>
              <Input type="text" ref={planDeEstudioRef} defaultValue={carreraToEdit.plan_de_estudio} />
            </FormControl>

            <FormControl id="modalidad" isRequired>
              <FormLabel>Modalidad</FormLabel>
              <Select ref={modalidadRef} defaultValue={carreraToEdit.modalidad}>
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
                <option value="Semipresencial">Semipresencial</option>
              </Select>
            </FormControl>

            <FormControl id="cupo">
              <FormLabel>Cupo</FormLabel>
              <Input type="text" ref={cupoRef} defaultValue={carreraToEdit.cupo} />
            </FormControl>

            <FormControl id="duracion_anios" isRequired>
              <FormLabel>Duración en Años</FormLabel>
              <Input type="number" ref={duracionAniosRef} defaultValue={carreraToEdit.duracion_anios} />
            </FormControl>

            <FormControl id="duracion_meses" isRequired>
              <FormLabel>Duración en Meses</FormLabel>
              <Input type="number" ref={duracionMesesRef} defaultValue={carreraToEdit.duracion_meses} />
            </FormControl>

            <FormControl id="fecha_inscripcion" isRequired>
              <FormLabel>Fecha de Inscripción</FormLabel>
              <VStack align="start">
                <Input 
                  type="date" 
                  ref={fechaInscripcionRef} 
                  defaultValue={storedDate} 
                  min={new Date().toISOString().split('T')[0]} 
                />
                <Input 
                  type="time" 
                  defaultValue={storedTime} 
                  ref={horaInscripcionRef} 
                />
              </VStack>
            </FormControl>

            <FormControl id="observacion">
              <FormLabel>Observación</FormLabel>
              <Input type="text" ref={observacionRef} defaultValue={carreraToEdit.observacion} />
            </FormControl>

            <FormControl id="prioridad">
              <FormLabel>Prioridad</FormLabel>
              <Input type="number" ref={prioridadRef} defaultValue={carreraToEdit.prioridad} />
            </FormControl>

            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Guardar Cambios
            </Button>
          </VStack>
        </form>
      </Box>
    </AdminDashboard>
  );
};

export default CarreraEditPage;
