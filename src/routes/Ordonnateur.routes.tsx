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

const OrdonnateurRoutes: Route[] = [
  {
    path: '/ordonnateur',
    element: <TableauDeBord />,
    index: true,
  },
  {
    path: '/ordonnateur/tableau_de_bord',
    element: <TableauDeBord />,
  },
  {
    path: '/ordonnateur/configuration',
    element: <Configuration />,
  },
  {
    path: '/ordonnateur/utilisateurs',
    element: <Utilisateurs />,
  },
  {
    path: '/ordonnateur/transactions',
    element: <Transactions />,
  },
  {
    path: '/ordonnateur/rapport',
    element: <Rapport />,
  },
];

export default OrdonnateurRoutes;