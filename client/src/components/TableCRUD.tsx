import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  IconButton,
  Text,
  Input,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import ApiResponse from '../services/ApiResponse';

interface TableCRUDProps {
  tableName: string;
  headers: string[];
  data: any[];
  infoColumn: string; 
}

const TableCRUD: React.FC<TableCRUDProps> = ({ tableName, headers, data, infoColumn }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(data);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const rowsPerPage = 10;
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filterHeaders = headers.filter(header => !header.toLowerCase().includes('id'));

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (indexOfLastRow < filteredData.length) setCurrentPage(currentPage + 1);
  };

  const handleSearch = () => {
    const searchTerm = searchInputRef.current?.value || '';
    const normalizedSearchTerm = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const result = data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' &&
        value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(normalizedSearchTerm.toLowerCase())
      )
    );
    setFilteredData(result);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    if (itemToDelete) {
      const apiResponse = new ApiResponse();
      await apiResponse.useFetch(`${tableName.toLocaleLowerCase()}/${itemToDelete.id}`, 'DELETE');

      if (apiResponse.error == null) {
        setFilteredData(filteredData.filter(item => item.id !== itemToDelete.id));
        toast({
          title: "Borrado exitoso.",
          description: "El elemento ha sido borrado.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error al borrar.",
          description: "No se pudo borrar el elemento.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      onClose();
      setItemToDelete(null);
    }
  };

  return (
    <Box p={5} m={0}>
      <Flex mb={4}>
        <Heading size="lg">{tableName}</Heading>
        <Spacer />
        <Button as={Link} to={`/dashboard/${tableName.toLowerCase()}-crear`} colorScheme="green" leftIcon={<AddIcon />}>
          Agregar
        </Button>
      </Flex>

      <Flex mb={4}>
        <Input
          placeholder="Buscar..."
          ref={searchInputRef}
          mr={4}
          flex="1"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch} colorScheme="blue">Buscar</Button>
      </Flex>

      <TableContainer>
        <Table variant="simple" size="lg">
          <Thead>
            <Tr>
              {filterHeaders.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentRows.map((item, index) => (
              <Tr key={index}>
                {Object.entries(item)
                  .filter(([key]) => !key.toLowerCase().includes('id'))
                  .map(([key, value], idx) => (
                    <Td key={idx}>
                      {typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)
                        ? new Date(value).toLocaleDateString('es-AR')
                        : String(value || 'N/A')}
                    </Td>
                  ))}

                <Td>
                  <Button onClick={() => navigate(`/dashboard/${tableName.toLowerCase()}-editar/${item.id}`, { state: item })} colorScheme="orange" size="sm" mr={2}>
                    Editar
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => {
                    setItemToDelete(item);
                    onOpen(); 
                  }}>
                    Borrar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Flex justify="center" align="center" mt={4}>
        <IconButton
          onClick={prevPage}
          icon={<ArrowLeftIcon />}
          aria-label="Página anterior"
          isDisabled={currentPage === 1}
        />
        <Text mr={5} ml={5}><b>Página {currentPage}</b></Text>
        <IconButton
          onClick={nextPage}
          icon={<ArrowRightIcon />}
          aria-label="Siguiente página"
          isDisabled={indexOfLastRow >= filteredData.length}
        />
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Borrar Elemento
            </AlertDialogHeader>

            <AlertDialogBody>
              {`¿Estás seguro de que deseas borrar ${itemToDelete?.[infoColumn]} de ${tableName}?`} {/* Display column info */}
              No podrás deshacer esta acción.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Borrar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default TableCRUD;
