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
import SuperUserDashboard from '../SuperUserDashboard';
import { LogoUploadResponse } from '../../../services/models/LogoUploadResponse';
import LogoFileInput from '../../../components/LogoFileInput';
import { Institucion, InstitucionCrear } from '../../../services/models/Institucion';

const InstitucionAddPage = () => {
  // TODO: aca deberia poder dejarme elegir con un mapita? la direccion? para poner automaticamente la ubicacion lat y long
  const navigate = useNavigate();
  const cueRef = useRef<HTMLInputElement>(null);
  const cueanexoRef = useRef<HTMLInputElement>(null);
  const nombreRef = useRef<HTMLInputElement>(null);
  const direccionRef = useRef<HTMLInputElement>(null);
  const ubicacionLatRef = useRef<HTMLInputElement>(null);
  const ubicacionLongRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const paginaRef = useRef<HTMLInputElement>(null);
  const gestionRef = useRef<HTMLSelectElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
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

      formData.append('gestion', gestionRef.current?.value || 'Publica');

    
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
        throw new Error('Error creating institution');
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
              <Input type="number" ref={cueRef} defaultValue={0} />
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

            <FormControl id="ubicacion_lat">
              <FormLabel>Ubicación Latitud</FormLabel>
              <Input type="number" step="any" ref={ubicacionLatRef} defaultValue={undefined} />
            </FormControl>

            <FormControl id="ubicacion_long">
              <FormLabel>Ubicación Longitud</FormLabel>
              <Input type="number" step="any" ref={ubicacionLongRef} defaultValue={undefined} />
            </FormControl>

            <FormControl id="tel">
              <FormLabel>Teléfono</FormLabel>
              <Input type="text" ref={telRef} defaultValue="" />
            </FormControl>

            <FormControl id="pagina">
              <FormLabel>Página Web</FormLabel>
              <Input type="text" ref={paginaRef} defaultValue="" />
            </FormControl>

            <FormControl id="gestion" isRequired>
              <FormLabel>Gestión</FormLabel>
              <Select ref={gestionRef} defaultValue="Publica">
                <option value="Publica">Pública</option>
                <option value="Privada">Privada</option>
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
