// import React, { useEffect, useState } from 'react';
// import {
//   ChakraProvider,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   Box,
//   TableContainer,
//   Button,
//   Flex,
//   Heading,
//   Spacer,
// } from '@chakra-ui/react';

// function App() {
//   const [backendData, setBackendData] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3050/api/instituciones")
//       .then(response => response.json())
//       .then(data => setBackendData(data)); 
//   }, []);
  

//   return (
//     <ChakraProvider>
//       <Box p={5} m={10}>
//         <Flex mb={4}>
//           <Heading size="lg">Instituciones</Heading>
//           <Spacer />
//           <Button colorScheme="green">Agregar+</Button>
//         </Flex>
        
//         <TableContainer>
//           <Table variant="simple" size="lg">
//             <Thead>
//               <Tr>
//                 <Th>CUE</Th>
//                 <Th>CUE Anexo</Th>
//                 <Th>Nombre</Th>
//                 <Th>Dirección</Th>
//                 <Th>Teléfono</Th>
//                 <Th>Página</Th>
//                 <Th>Gestión</Th>
//                 <Th>Estado</Th>
//                 <Th>Acciones</Th> 
//               </Tr>
//             </Thead>
//             <Tbody>
//             {backendData.map((institucion) => (
//               <Tr key={institucion.id}>
//                 <Td>{institucion.cue}</Td>
//                 <Td>{institucion.cueanexo || 'N/A'}</Td>
//                 <Td>{institucion.nombre}</Td>
//                 <Td>{institucion.direccion}</Td>
//                 <Td>{institucion.tel || 'N/A'}</Td>
//                 <Td>{institucion.pagina || 'N/A'}</Td>
//                 <Td>{institucion.gestion}</Td>
//                 <Td>{institucion.estado}</Td>
//                 <Td>
//                   <Button colorScheme="orange" size="sm">Editar</Button>
//                 </Td> 
//               </Tr>
//             ))}

//             </Tbody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </ChakraProvider>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';

const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
      <Route path="/login" element={<LoginPage />} /> 
      </Routes>
    </BrowserRouter>
  );
};

export default App;
