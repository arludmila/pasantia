import React from 'react';
import {
    Box,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Image,
    Text,
    Link,
    Button,
    Grid,
    GridItem,
    VStack,
  } from '@chakra-ui/react';

const Home = () => {
    const instituciones = [
        {
          id: 1,
          nombre: 'Institución Ejemplo 1',
          direccion: 'Calle Falsa 123',
          tel: '123-456-7890',
          pagina: 'www.ejemplo1.com',
          gestion: 'Pública',
        },
        {
          id: 2,
          nombre: 'Institución Ejemplo 2',
          direccion: 'Avenida Siempre Viva 742',
          tel: '098-765-4321',
          pagina: 'www.ejemplo2.com',
          gestion: 'Privada',
        },
        {
          id: 3,
          nombre: 'Institución Ejemplo 3',
          direccion: 'Boulevard de los Sueños Rotos 456',
          tel: '',
          pagina: '',
          gestion: 'Pública',
        },
        {
          id: 4,
          nombre: 'Institución Ejemplo 4',
          direccion: 'Paseo de la Fama 999',
          tel: '321-654-9870',
          pagina: 'www.ejemplo4.com',
          gestion: 'Privada',
        },
      ];
  return (
    
    <Box p={5}>
      <Heading mb={5}>Formación Académica en Goya</Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
        {instituciones.map((institucion) => (
          <GridItem key={institucion.id}>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <VStack align="left" spacing={0}>
                        <Text fontSize="sm">{institucion.ciudad}</Text>
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
  );
};

export default Home;
