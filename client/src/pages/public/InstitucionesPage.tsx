import { useEffect, useState } from 'react';
import {
  Box, Heading, Grid, GridItem, VStack, Text, Button, Image, Accordion, Link,
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
                      <AccordionButton minHeight="60px" maxHeight="60px">
                        <Box flex="1" textAlign="left">
                          <VStack align="left" spacing={0}>
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
                      {institucion.pagina && (
                        <Text>
                          <b>Página Web:</b>{' '}
                          <Link href={`http://${institucion.pagina}`} isExternal color="blue.500">
                            {institucion.pagina}
                          </Link>
                        </Text>
                      )}
                      <Button
                        mt={3}
                        colorScheme="teal"
                        width="full"
                        onClick={() => alert(`Ver carreras de ${institucion.nombre}`)}
                      >
                        Ver Carreras
                      </Button>
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
