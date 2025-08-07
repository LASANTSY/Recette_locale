import type { AppRoute } from './types';
import Configuration from '../pages/superAdmin/Configuration';
import UserManagement from '../pages/superAdmin/userManagement/UserManagement';

const routes: AppRoute[] = [
  {
    path: '/super-administrateur/configuration',
    element: <Configuration />,
    index: true,
  },
  {
    path: '/super-administrateur/utilisateur',
    element: <UserManagement />,
  },
];

export default routes;