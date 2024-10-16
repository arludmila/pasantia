import React, { useEffect, useState } from 'react'
import AdminDashboard from '../AdminDashboard '
import ApiResponse from '../../../services/ApiResponse';
import Carrera from '../../../services/models/Carrera';
import TableCRUD from '../../../components/TableCRUD';
import { getDecodedToken, TokenPayload } from '../../../services/Token';
import { Flex, Spinner } from '@chakra-ui/react';

function CarrerasTablePage() {
  const headers = ['ID', 'Nombre', 'Tipo', 'Descripción', 'Plan de Estudio', 'Modalidad', 'Cupo', 'Duración Años', 'Duración Meses', 'Fecha de Inscripción', 'Observación', 'ID Institucion', 'Estado', 'Prioridad'];
  const [response, setResponse] = useState(new ApiResponse<Carrera[]>());
  const decoded = getDecodedToken();
  useEffect(() => {
    const fetchInstituciones = async () => {
      const apiResponse = new ApiResponse<Carrera[]>();
      await apiResponse.useFetch(`carreras/institucion/${decoded?.id_institucion}`, 'GET');
      setResponse(apiResponse); 
    };

    fetchInstituciones();
  }, []);
  return (
    <AdminDashboard>
      {response.loading ? (
        <Flex 
          justify="center" 
          align="center" 
          height="100vh" 
        >
          <Spinner size="xl" thickness="4px" speed="0.65s" color="green.300" />
        </Flex>
      ) : response.error ? (
        <p>Error: {response.error}</p>
      ) : (
        <TableCRUD
          tableName="Carreras"
          headers={headers}
          data={response.data || []} 
        />
      )}
    </AdminDashboard>
  );
  
}
export default CarrerasTablePage;