import { useEffect, useState } from 'react';
import {
  Box, Heading, Grid, GridItem, VStack, Text, Button, Image, Accordion, 
  AccordionPanel, AccordionItem, AccordionButton, AccordionIcon,
  Flex,
  Spinner
} from '@chakra-ui/react';
import Institucion from '../../services/models/Institucion'; 
import NavbarHome from '../../components/NavbarHome';
import ApiResponse from '../../services/ApiResponse';

const InstitucionesPage = () => {
  const endpoint = 'instituciones';
  const [response, setResponse] = useState(new ApiResponse<Institucion[]>());

  useEffect(() => {
    const fetchInstituciones = async () => {
      const apiResponse = new ApiResponse<Institucion[]>();
      await apiResponse.useFetch(`${endpoint}`, 'GET');
      setResponse(apiResponse); 
    };

    fetchInstituciones();
  }, []);

  return (
    <div>
      <NavbarHome />
      <Box p={5}>
        {response.loading ? (
          <Flex 
            justify="center" 
            align="center" 
            height="100vh"
          >
            <Spinner size="xl" thickness="4px" speed="0.65s" color="green.300" />
          </Flex>
        ) : response.error ? (
          <Text>Error: {response.error}</Text>
        ) : (
          <>
            <Heading mb={5}>Instituciones en Goya</Heading>
            
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
              {response.data?.map((institucion) => (
                <GridItem key={institucion.id}>
                  <Accordion allowToggle>
                    <AccordionItem>
                      <h2>
                      <AccordionButton minHeight="100px" maxHeight="100px">
                        <Box 
                          flex="1" 
                          display="flex"        
                          alignItems="center"   
                          justifyContent="center" 
                          textAlign="left"
                        >
                          <VStack align="center" spacing={0}> 
                            {institucion.logo && ( 
                              <Image 
                                src={`http://localhost:3000${institucion.logo}`} 
                                alt={`Logo de ${institucion.nombre}`} 
                                boxSize="40px" 
                                objectFit="cover" 
                                mt={2} 
                              />
                            )}
                            <Text fontSize="lg" fontWeight="bold">
                              {institucion.nombre}
                            </Text>
                          </VStack>
                        </Box>
                        
                        <AccordionIcon />
                      </AccordionButton>

                      </h2>
                      <AccordionPanel pb={4}>
                       <Text><b>Dirección:</b> {institucion.direccion}</Text>
                  {institucion.tel && <Text><b>Teléfono:</b> {institucion.tel}</Text>}
                  {institucion.gestion && <Text><b>Tipo de Gestión:</b> {institucion.gestion}</Text>}

                  {institucion.pagina && (
                        <Button
                          mt={3}
                          colorScheme="teal"
                          width="full"
                          onClick={() => window.open(`http://${institucion.pagina}`, '_blank')}
                        >
                          Visitar Página Web
                        </Button>
                      )}

                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </GridItem>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </div>
  );
};

export default InstitucionesPage;
