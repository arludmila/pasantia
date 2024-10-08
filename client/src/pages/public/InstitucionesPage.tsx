import { useState } from 'react';
import {
  Box, Heading, Input, Grid, GridItem, VStack, Text, Button, Select, Image, AccordionPanel, Accordion, Link,AccordionItem, AccordionButton,AccordionIcon
} from '@chakra-ui/react';
import Institucion from '../../services/models/Institucion'; 
import NavbarHome from '../../components/NavbarHome';
import { useFetch } from '../../services/ApiResponse';

const InstitucionesPage = () => {
  const endpoint = 'instituciones';
  const { responseData, error, loading } = useFetch<Institucion[]>(endpoint); 

  if (loading) {
    return <Heading>Cargando...</Heading>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!responseData) {
    return <p>No hay información disponible</p>;
  }
  return (
   <div>
     <NavbarHome/>
    <Box p={5}>
      <Heading mb={5}>Instituciones en Goya</Heading>
        
      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {responseData.map((institucion) => (
          <GridItem key={institucion.id}>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <VStack align="left" spacing={0}>
                        <Text fontSize="lg" fontWeight="bold">
                          {institucion.nombre}
                        </Text>
                      </VStack>
                    </Box>
                    <Image
                      src="https://fakeimg.pl/50x50"
                      alt={institucion.nombre}
                      boxSize="50px"
                      mr={3}
                    />
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
                    Ver carreras
                  </Button>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </GridItem>
        ))}
      </Grid>


    </Box>
   </div>
  );
};
export default InstitucionesPage;
