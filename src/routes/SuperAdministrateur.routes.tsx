import Configuration from '../pages/superAdmin/Configuration';
import Utilisateurs from '../pages/superAdmin/Utilisateurs';

const SuperAdministrateurRoutes = [
    {
        index: true,
        path: '/administrateur/configuration',
        element: <Configuration/>
    },
    {
        path: '/administrateurs/utilisateurs',
        element: <Utilisateurs/>
    }
]

export default SuperAdministrateurRoutes;