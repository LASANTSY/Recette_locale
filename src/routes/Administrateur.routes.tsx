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
    path: '/administrateur',
    element: <TableauDeBord />,
    index: true,
  },
  {
    path: '/administrateur/tableau_de_bord',
    element: <TableauDeBord />,
  },
  {
    path: '/administrateur/configuration',
    element: <Configuration />,
  },
  {
    path: '/administrateur/utilisateurs',
    element: <Utilisateurs />,
  },
  {
    path: '/administrateur/transactions',
    element: <Transactions />,
  },
  {
    path: '/administrateur/rapport',
    element: <Rapport />,
  },
];

export default AdministrateurRoutes;