// TableCRUD.tsx
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
import { IoAdd } from "react-icons/io5";
interface TableCRUDProps {
  tableName: string;          
  headers: string[];          
  data: any[];                
}

const TableCRUD: React.FC<TableCRUDProps> = ({ tableName, headers, data }) => {
  return (
    <Box p={5} m={10}>
      <Flex mb={4}>
        <Heading size="lg">{tableName}</Heading>
        <Spacer />
        <Button as={Link} to="/dashboard/instituciones-crear" colorScheme="green">
            Agregar<IoAdd />
            </Button>
      </Flex>
      
      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
              <Th>Acciones</Th> {/* Actions column */}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item, index) => (
              <Tr key={index}>
                {Object.values(item).map((value, idx) => (
                  <Td key={idx}>{String(value || 'N/A')}</Td> // Render N/A for undefined values
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
