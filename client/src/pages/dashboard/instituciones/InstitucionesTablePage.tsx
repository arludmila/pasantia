import React, { useEffect, useState } from 'react';
import TableCRUD from '../../../components/TableCRUD';
import Institucion from '../../../services/models/Institucion';
import ApiResponse from '../../../services/ApiResponse';
import SuperUserDashboard from '../SuperUserDashboard';

function InstitucionesTablePage() {
  const headers = ['ID', 'CUE', 'CUE Anexo', 'Nombre', 'Dirección', 'Ubicación Lat', 'Ubicación Long', 'Teléfono', 'Página', 'Gestión', 'Estado'];
  
  const [response, setResponse] = useState(new ApiResponse<Institucion[]>());
  console.log(localStorage.getItem('token'));
  useEffect(() => {
    const fetchInstituciones = async () => {
      const apiResponse = new ApiResponse<Institucion[]>();
      await apiResponse.fetchData('/instituciones', 'GET');
      setResponse(apiResponse); 
    };

    fetchInstituciones();
  }, []);

  if (response.loading) return <p>Loading...</p>;
  if (response.error) return <p>Error: {response.error}</p>;

  return (
    <div>
      <SuperUserDashboard>
      <TableCRUD
              tableName="Instituciones"
              headers={headers}
              data={response.data || []} 
            />
      </SuperUserDashboard>
    </div>
  );
}

export default InstitucionesTablePage;
