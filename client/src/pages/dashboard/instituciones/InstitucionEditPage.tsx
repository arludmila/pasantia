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
import Institucion from '../../../services/models/Institucion';
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
  const estadoRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      cue: Number(cueRef.current?.value || 0),
      cueanexo: Number(cueanexoRef.current?.value || undefined),
      nombre: nombreRef.current?.value || '',
      direccion: direccionRef.current?.value || '',
      ubicacion_lat: Number(ubicacionLatRef.current?.value || undefined),
      ubicacion_long: Number(ubicacionLongRef.current?.value || undefined),
      tel: telRef.current?.value || '',
      pagina: paginaRef.current?.value || '',
      gestion: gestionRef.current?.value || 'Publica',
      estado: Number(estadoRef.current?.value || '1'),
      id: institucionToEdit.id,
      logo: institucionToEdit.logo,
    };

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

            <FormControl id="estado" isRequired>
              <FormLabel>Estado</FormLabel>
              <Input type="number" ref={estadoRef} defaultValue={institucionToEdit.estado.toString()} />
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
