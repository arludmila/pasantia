import React, { useEffect, useState } from 'react';
import TableCRUD from '../../components/TableCRUD';
import NavbarDashboard from '../../components/NavBarDashboard';

function AdminDashboard() {
  const [backendData, setBackendData] = useState([]);
  
  useEffect(() => {
    // TODO: aca faltaria desde la API traer a las carreras(endpoint --> carreras/institucion/:institucion_id)).
    fetch("http://localhost:3000/api/administradores")
      .then(response => response.json())
      .then(data => setBackendData(data))
      .catch(error => console.error('Error fetching data:', error));
      console.log(backendData);

  }, []);
  const links = [
    { name: 'Instituciones', path: '/dashboard/carreras' },
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

export default AdminDashboard; 
