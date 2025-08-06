import type { AppRoute } from './types';
import Configuration from '../pages/superAdmin/Configuration';
import Utilisateurs from '../pages/superAdmin/Utilisateurs';

const routes: AppRoute[] = [
  {
    path: '/super-administrateur/configuration',
    element: <Configuration />,
    index: true,
  },
  {
    path: '/super-administrateur/utilisateur',
    element: <Utilisateurs />,
  },
];

export default routes;