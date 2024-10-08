// SuperUserDashboard.tsx
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

  const headers = ['CUE', 'CUE Anexo', 'Nombre', 'Dirección', 'Teléfono', 'Página', 'Gestión', 'Estado'];

  return (
    <TableCRUD
    tableName="Instituciones"
    headers={headers}
    data={backendData}
    keyField="id"
  />
  );
}

export default SuperUserDashboard; 
