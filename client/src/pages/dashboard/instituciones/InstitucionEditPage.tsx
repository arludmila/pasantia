import React, { useRef, useState } from 'react';
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
  Image,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiResponse from '../../../services/ApiResponse';
import {Institucion} from '../../../services/models/Institucion';
import SuperUserDashboard from '../SuperUserDashboard';
import LogoFileInput from '../../../components/LogoFileInput';
// TODO: editar logo?
const InstitucionEditPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const institucionToEdit = location.state as Institucion;
  const toast = useToast();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const logoFile = logoRef.current?.files?.[0];
    const token = localStorage.getItem('token');
    
    // Crear un FormData para el envío del PATCH
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
    
    // Si hay un nuevo archivo de logo, agregarlo
    if (logoFile) {
      formData.append('logo', logoFile);
    }
    
    try {
      const response = await fetch(`http://localhost:3000/api/instituciones/${institucionToEdit.id}`, {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Error updating institution');
      }
  
      toast({
        title: 'Institución actualizada',
        description: 'La institución fue actualizada con éxito.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
  
      navigate('/dashboard/instituciones');
    } catch (error) {
      toast({
        title: 'Error al actualizar',
        description: `Ocurrió un error: ${error}`,
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
              <Input type="text" ref={cueRef} defaultValue={institucionToEdit.cue} />
            </FormControl>

            <FormControl id="cueanexo">
              <FormLabel>CUE Anexo</FormLabel>
              <Input type="text" ref={cueanexoRef} defaultValue={institucionToEdit.cueanexo || ''} />
            </FormControl>

            <FormControl id="nombre" isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input type="text" ref={nombreRef} defaultValue={institucionToEdit.nombre} />
            </FormControl>

            <FormControl id="direccion" isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input type="text" ref={direccionRef} defaultValue={institucionToEdit.direccion} />
            </FormControl>

            <FormControl id="ubicacion_lat">
              <FormLabel>Ubicación Latitud</FormLabel>
              <Input type="number" step="any" ref={ubicacionLatRef} defaultValue={institucionToEdit.ubicacion_lat || undefined} />
            </FormControl>

            <FormControl id="ubicacion_long">
              <FormLabel>Ubicación Longitud</FormLabel>
              <Input type="number" step="any" ref={ubicacionLongRef} defaultValue={institucionToEdit.ubicacion_long || undefined} />
            </FormControl>

            <FormControl id="tel">
              <FormLabel>Teléfono</FormLabel>
              <Input type="text" ref={telRef} defaultValue={institucionToEdit.tel || ''} />
            </FormControl>

            <FormControl id="pagina">
              <FormLabel>Página Web</FormLabel>
              <Input type="text" ref={paginaRef} defaultValue={institucionToEdit.pagina || ''} />
            </FormControl>

            <FormControl id="gestion" isRequired>
              <FormLabel>Gestión</FormLabel>
              <Select ref={gestionRef} defaultValue={institucionToEdit.gestion || 'Publica'}>
                <option value="Publica">Pública</option>
                <option value="Privada">Privada</option>
              </Select>
            </FormControl>
            <VStack align="center" spacing={0}> 
            
                            {institucionToEdit.logo && ( 
                              <div>
                                <Text fontSize="lg" fontWeight="bold">
                              Logo actual:
                            </Text>
                              <Image 
                                src={`http://localhost:3000${institucionToEdit.logo}`} 
                                alt={`Logo de ${institucionToEdit.nombre}`} 
                                boxSize="40px" 
                                objectFit="cover" 
                                mt={2} 
                              />
                              </div>
                            )}
                            
                          </VStack>
            <LogoFileInput logoRef={logoRef}></LogoFileInput>

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
