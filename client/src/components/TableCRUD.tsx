import React from 'react';
import { Link } from 'react-router-dom';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Heading,
  Spacer,
  Box,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
interface TableCRUDProps {
  tableName: string;          
  headers: string[];          
  data: any[];                
}

const TableCRUD: React.FC<TableCRUDProps> = ({ tableName, headers, data }) => {
  return (
    <Box p={5} m={0}>
      <Flex mb={4}>
        <Heading size="lg">{tableName}</Heading>
        <Spacer />
        <Button as={Link} to="/dashboard/instituciones-crear" colorScheme="green" leftIcon={<AddIcon />}>
            Agregar
            </Button>
      </Flex>
      
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
              <Th>Acciones</Th> 
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <Td key={idx}>{String(value || 'N/A')}</Td> 
                ))}
                <Td>
                  <Button colorScheme="orange" size="sm" mr={2}>Editar</Button>
                  <Button colorScheme="red" size="sm">Borrar</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableCRUD;
