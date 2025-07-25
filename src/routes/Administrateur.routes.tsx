import React from 'react';
import TableauDeBord from '../pages/admin/Dashboard';
import Configuration from '../pages/admin/Setting';
import Utilisateurs from '../pages/admin/User';
import Transactions from '../pages/admin/Transaction';
import Rapport from '../pages/admin/Report';

interface Route {
  index?: boolean;
  path?: string;
  element: React.ReactNode;
}

const AdministrateurRoutes: Route[] = [
  {
    index: true,
    path: 'tableau_de_bord',
    element: <TableauDeBord />,
  },
  {
    path: 'configuration',
    element: <Configuration />,
  },
  {
    path: 'utilisateurs',
    element: <Utilisateurs />,
  },
  {
    path: 'transactions',
    element: <Transactions />,
  },
  {
    path: 'rapport',
    element: <Rapport />,
  },
];

export default AdministrateurRoutes;