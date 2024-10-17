import React, { useEffect, useState } from 'react';
import TableCRUD from '../../../components/TableCRUD';
import Institucion from '../../../services/models/Institucion';
import ApiResponse from '../../../services/ApiResponse';
import SuperUserDashboard from '../SuperUserDashboard';
import { Flex, Spinner } from '@chakra-ui/react';

function InstitucionesTablePage() {
  const headers = ['ID', 'CUE', 'CUE Anexo', 'Nombre', 'Dirección', 'Ubicación Lat', 'Ubicación Long', 'Logo', 'Teléfono', 'Página', 'Gestión', 'Estado'];
  
  const [response, setResponse] = useState(new ApiResponse<Institucion[]>());
  useEffect(() => {
    const fetchInstituciones = async () => {
      const apiResponse = new ApiResponse<Institucion[]>();
      await apiResponse.useFetch('instituciones', 'GET');
      if (apiResponse.data) {
        apiResponse.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
      }
      setResponse(apiResponse); 
    };

    fetchInstituciones();
  }, []);

  return (
    <SuperUserDashboard>
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
          tableName="Instituciones"
          headers={headers}
          data={response.data || []} 
          infoColumn='nombre'
        />
      )}
    </SuperUserDashboard>
  );
}

export default InstitucionesTablePage;
