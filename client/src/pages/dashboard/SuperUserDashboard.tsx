import React from 'react';
import NavbarDashboard from '../../components/NavBarDashboard';

interface DashboardProps {
  children?: React.ReactNode;
}

function SuperUserDashboard({ children }: DashboardProps) {
  const links = [
    { name: 'Administradores', path: '/dashboard/administradores' },
    { name: 'Instituciones', path: '/dashboard/instituciones' },
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

export default SuperUserDashboard;
