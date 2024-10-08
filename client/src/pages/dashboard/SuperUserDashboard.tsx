import React, { useEffect, useState } from 'react';
import TableCRUD from '../../components/TableCRUD';
import NavbarDashboard from '../../components/NavBarDashboard';

function SuperUserDashboard() {
    // TODO: arreglar aca para que use el metodo que arme.
  const [backendData, setBackendData] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3000/api/instituciones")
      .then(response => response.json())
      .then(data => setBackendData(data))
      .catch(error => console.error('Error fetching data:', error));
      console.log(backendData);

  }, []);
  const links = [
    { name: 'Administradores', path: '/dashboard/administradores' },
    { name: 'Instituciones', path: '/dashboard/instituciones' },
  ];
  const headers = ['ID', 'CUE', 'CUE Anexo', 'Nombre', 'Dirección', 'Ubicación Lat', 'Ubicación Long', 'Teléfono', 'Página', 'Gestión', 'Estado'];

  return (
    <div>
        <NavbarDashboard links={links} />
            <TableCRUD
            tableName="Instituciones"
            headers={headers}
            data={backendData}
        />
    </div>
  );
}

export default SuperUserDashboard; 
