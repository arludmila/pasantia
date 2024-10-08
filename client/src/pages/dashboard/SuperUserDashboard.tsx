import React, { useEffect, useState } from 'react';
import TableCRUD from '../../components/TableCRUD';

function SuperUserDashboard() {
  const [backendData, setBackendData] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/api/instituciones")
      .then(response => response.json())
      .then(data => setBackendData(data))
      .catch(error => console.error('Error fetching data:', error));
      console.log(backendData);

  }, []);

  const headers = ['ID', 'CUE', 'CUE Anexo', 'Nombre', 'Dirección', 'Ubicación Lat', 'Ubicación Long', 'Teléfono', 'Página', 'Gestión', 'Estado'];

  return (
    <TableCRUD
    tableName="Instituciones"
    headers={headers}
    data={backendData}
  />
  );
}

export default SuperUserDashboard; 
