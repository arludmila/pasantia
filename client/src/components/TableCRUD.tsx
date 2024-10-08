import React from 'react';
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

interface TableCRUDProps<T> {
  tableName: string;         
  headers: Array<keyof T>;    
  data: T[];                 
  keyField: keyof T;         
}

const TableCRUD = <T,>({ tableName, headers, data, keyField }: TableCRUDProps<T>) => {
  return (
    <Box p={5} m={10}>
      <Flex mb={4}>
        <Heading size="lg">{tableName}</Heading>
        <Spacer />
        <Button colorScheme="green">Agregar+</Button>
      </Flex>
      
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={String(header)}>{String(header)}</Th> 
              ))}
              <Th>Acciones</Th> 
            </Tr>
          </Thead>
          <Tbody>
  {data.map((item) => (
    <Tr key={String(item[keyField])}>
      {headers.map((header, idx) => (
        <Td key={idx}>{item[header] !== undefined ? String(item[header]) : 'N/A'}</Td> // Check if item[header] is defined
      ))}
      <Td>
        <Button colorScheme="orange" size="sm">Editar</Button>
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
