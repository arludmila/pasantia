import React, { useEffect, useState } from 'react';
import NavbarDashboard from '../../components/NavBarDashboard';


interface DashboardProps {
  children?: React.ReactNode;
}

function AdminDashboard({ children }: DashboardProps){
  const links = [
    { name: 'Carreras', path: '/dashboard/carreras' },
  ];

  return (
    <div>
        <NavbarDashboard links={links} />
        <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
}

export default AdminDashboard; 
