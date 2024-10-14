import React, { useEffect, useState } from 'react';
import TableCRUD from '../../../components/TableCRUD';
import ApiResponse from '../../../services/ApiResponse';
import SuperUserDashboard from '../SuperUserDashboard';
import { Administrador } from '../../../../../server/src/models/administrador.model';
import { Flex, Skeleton, Spinner, Stack } from '@chakra-ui/react';

function AdminsTablePage() {
  const headers = ['ID', 'Rol', 'Nombre', 'Correo', 'ID Institución', 'Estado', 'Nombre Institución'];

  const [response, setResponse] = useState(new ApiResponse<Administrador[]>());

  useEffect(() => {
    const fetchAdministradores = async () => {
      const apiResponse = new ApiResponse<Administrador[]>();
      await apiResponse.useFetch('/administradores', 'GET');
      setResponse(apiResponse); 
    };

    fetchAdministradores();
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
          tableName="Administradores"
          headers={headers}
          data={response.data || []} 
        />
      )}
    </SuperUserDashboard>
  );
}

export default AdminsTablePage;
