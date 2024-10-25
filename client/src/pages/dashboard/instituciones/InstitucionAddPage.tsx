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
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SuperUserDashboard from '../SuperUserDashboard';
import { Gestiones } from '../../../services/models/Institucion';
import LogoFileInput from '../../../components/LogoFileInput';
import PhoneNumberInputArg from '../../../components/PhoneNumberInputArg';
import UrlInput from '../../../components/UrlInput';

const InstitucionAddPage = () => {
  const navigate = useNavigate();
  const cueRef = useRef<HTMLInputElement>(null);
  const cueanexoRef = useRef<HTMLInputElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const direccionRef = useRef<HTMLInputElement>(null);
  const ubicacionLatRef = useRef<HTMLInputElement>(null);
  const ubicacionLongRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const paginaRef = useRef<HTMLInputElement>(null);
  const [gestion, setGestion] = useState<Gestiones>(Gestiones.Publica);
  const gestionRef = useRef<HTMLSelectElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const [latError, setLatError] = useState('');
  const [longError, setLongError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lat = parseFloat(ubicacionLatRef.current?.value || '');
    const long = parseFloat(ubicacionLongRef.current?.value || '');
    let valid = true;

    if (lat && (isNaN(lat) || lat < -90 || lat > 90)) {
      setLatError('La latitud debe estar entre -90 y 90.');
      valid = false;
    } else {
      setLatError('');
    }

    if (long && (isNaN(long) || long < -180 || long > 180)) {
      setLongError('La longitud debe estar entre -180 y 180.');
      valid = false;
    } else {
      setLongError('');
    }

    if (!valid) {
      return;
    }

    const logoFile = logoRef.current?.files?.[0];
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('cue', cueRef.current?.value || '0');

    if (cueanexoRef.current?.value) {
      formData.append('cueanexo', cueanexoRef.current.value);
    }
    formData.append('nombre', nombreRef.current?.value || '');
    formData.append('direccion', direccionRef.current?.value || '');
    if (ubicacionLatRef.current?.value) {
      formData.append('ubicacion_lat', ubicacionLatRef.current.value);
    }
    if (ubicacionLongRef.current?.value) {
      formData.append('ubicacion_long', ubicacionLongRef.current.value);
    }
    if (telRef.current?.value) {
      formData.append('tel', telRef.current.value);
    }
    if (paginaRef.current?.value) {
      formData.append('pagina', paginaRef.current.value);
    }

    formData.append('gestion', gestionRef.current?.value || Gestiones.Publica);

    if (logoFile) {
      formData.append('logo', logoFile);
    }

    try {
      const response = await fetch('http://localhost:3000/api/instituciones', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al crear la institución');
      }

      toast({
        title: 'Institución creada',
        description: 'La institución fue creada con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/dashboard/instituciones');
    } catch (error) {
      toast({
        title: 'Error al crear',
        description: `Ocurrió un error: ${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setLatError(''); 
    } else {
      const lat = parseFloat(value);
      if (isNaN(lat) || lat < -90 || lat > 90) {
        setLatError('La latitud debe estar entre -90 y 90.');
      } else {
        setLatError('');
      }
    }
  };

  const handleLongChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setLongError('');  
    } else {
      const long = parseFloat(value);
      if (isNaN(long) || long < -180 || long > 180) {
        setLongError('La longitud debe estar entre -180 y 180.');
      } else {
        setLongError('');
      }
    }
  };

  return (
    <div>
      <SuperUserDashboard />
      <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="lg">
        <Heading mb={6} textAlign="center" size="lg">
          Crear Institución
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={5}>
            <FormControl id="cue" isRequired>
              <FormLabel>CUE</FormLabel>
              <Input type="number" ref={cueRef} defaultValue={undefined} />
            </FormControl>

            <FormControl id="cueanexo">
              <FormLabel>CUE Anexo</FormLabel>
              <Input type="number" ref={cueanexoRef} defaultValue={undefined} />
            </FormControl>

            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" ref={nombreRef} defaultValue="" />
            </FormControl>

            <FormControl id="direccion" isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input type="text" ref={direccionRef} defaultValue="" />
            </FormControl>

            <FormControl id="ubicacion_lat" isInvalid={!!latError}>
              <FormLabel>Ubicación Latitud</FormLabel>
              <Input
                type="number"
                step="any"
                ref={ubicacionLatRef}
                defaultValue={undefined}
                onChange={handleLatChange} 
              />
              {latError && <Text color="red.500">{latError}</Text>}
            </FormControl>

            <FormControl id="ubicacion_long" isInvalid={!!longError}>
              <FormLabel>Ubicación Longitud</FormLabel>
              <Input
                type="number"
                step="any"
                ref={ubicacionLongRef}
                defaultValue={undefined}
                onChange={handleLongChange} 
              />
              {longError && <Text color="red.500">{longError}</Text>}
            </FormControl>

            <PhoneNumberInputArg telRef={telRef}></PhoneNumberInputArg>

            <UrlInput paginaRef={paginaRef}></UrlInput>

            <FormControl id="gestion" isRequired>
              <FormLabel>Gestión</FormLabel>
              <Select ref={gestionRef} value={gestion} onChange={(e) => setGestion(e.target.value as Gestiones)}>
                <option value={Gestiones.Publica}>Pública</option>
                <option value={Gestiones.Privada}>Privada</option>
                <option value={Gestiones.Mixta}>Mixta</option>
              </Select>
            </FormControl>

            <LogoFileInput logoRef={logoRef}></LogoFileInput>

            <Button type="submit" colorScheme="teal" size="lg" width="full">
              Crear Institución
            </Button>
          </VStack>
        </form>
      </Box>
    </div>
  );
};

export default InstitucionAddPage;
