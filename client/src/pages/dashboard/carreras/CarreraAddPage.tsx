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
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ApiResponse from '../../../services/ApiResponse';
import AdminDashboard from '../AdminDashboard ';
import { getDecodedToken } from '../../../services/Token';
import { Carrera, CarreraCreate, Modalidad } from '../../../services/models/Carrera';

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
  const horaInscripcionRef = useRef<HTMLInputElement>(null);
  const observacionRef = useRef<HTMLInputElement>(null);
  const prioridadRef = useRef<HTMLInputElement>(null);

  const [modalidad, setModalidad] = useState<Modalidad>(Modalidad.Presencial);

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

    const formData: CarreraCreate = {
      nombre: nombreRef.current?.value || '',
      tipo: tipoRef.current?.value || '',
      descripcion: descripcionRef.current?.value || undefined,  
      plan_de_estudio: planDeEstudioRef.current?.value || undefined,  
      modalidad: modalidad,  
      cupo: cupoRef.current?.value ? parseInt(cupoRef.current.value) : undefined,  
      duracion_anios: duracionAniosRef.current?.value ? parseInt(duracionAniosRef.current.value) : 0, 
      duracion_meses: duracionMesesRef.current?.value ? parseInt(duracionMesesRef.current.value) : 0,  
      fecha_inscripcion: formattedFechaHora,      
      observacion: observacionRef.current?.value || undefined, 
      institucion_id: decoded && decoded.id_institucion !== undefined ? decoded.id_institucion : 0, 
      prioridad: prioridadRef.current?.value ? parseInt(prioridadRef.current.value) : 0, 
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
              <Select 
              ref={modalidadRef} 
              value={modalidad} 
              defaultValue={Modalidad.Presencial} 
              onChange={(e) => setModalidad(e.target.value as Modalidad)}>
                <option value={Modalidad.Presencial}>Presencial</option>
                <option value={Modalidad.Virtual}>Virtual</option>
                <option value={Modalidad.Semipresencial}>Semipresencial</option>
              </Select>
            </FormControl>

            <FormControl id="cupo">
              <FormLabel>Cupo</FormLabel>
              <Input ref={cupoRef} type="number" defaultValue={0} />
            </FormControl>

            <FormControl id="duracion_anios" isRequired>
              <FormLabel>Duración en Años</FormLabel>
              <Input type="number" ref={duracionAniosRef} defaultValue={0} />
            </FormControl>

            <FormControl id="duracion_meses" isRequired>
              <FormLabel>Duración en Meses</FormLabel>
              <Input type="number" ref={duracionMesesRef} defaultValue={0} />
            </FormControl>

            <FormControl id="fecha_inscripcion" isRequired>
              <FormLabel>Fecha de Inscripción</FormLabel>
              <VStack align="start">
                <Input 
                  type="date" 
                  ref={fechaInscripcionRef} 
                  defaultValue="" 
                  min={new Date().toISOString().split('T')[0]} 
                />
                <Input 
                  type="time" 
                  ref={horaInscripcionRef} 
                  defaultValue="00:00"
                />
              </VStack>
            </FormControl>


            <FormControl id="observacion">
              <FormLabel>Observación</FormLabel>
              <Input ref={observacionRef} defaultValue="" />
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
