import React, { useEffect, useState } from 'react';
import TableCRUD from '../../../components/TableCRUD';
import ApiResponse from '../../../services/ApiResponse';
import SuperUserDashboard from '../SuperUserDashboard';
import { Administrador } from '../../../../../server/src/models/administrador.model';

function AdminsTablePage() {
  const headers = ['ID', 'Rol', 'Nombre', 'Correo', 'ID Institución', 'Estado', 'Nombre Institución'];
  
  const [response, setResponse] = useState(new ApiResponse<Administrador[]>());
  console.log(localStorage.getItem('token'));
  useEffect(() => {
    const fetchAdministradores = async () => {
      const apiResponse = new ApiResponse<Administrador[]>();
      await apiResponse.fetchData('/administradores', 'GET');
      setResponse(apiResponse); 
    };

    fetchAdministradores();
  }, []);

  if (response.loading) return <p>Loading...</p>;
  if (response.error) return <p>Error: {response.error}</p>;

  return (
    <div>
      <SuperUserDashboard>
      <TableCRUD
              tableName="Administradores"
              headers={headers}
              data={response.data || []} 
            />
      </SuperUserDashboard>
    </div>
  );
}

export default AdminsTablePage;
