import TableauDeBord from '../pages/admin/Dashboard';
import Configuration from '../pages/admin/Setting';
import Utilisateurs from '../pages/admin/User';
import Transactions from '../pages/admin/Transaction';
import Rapport from '../pages/admin/Report'

const AdministrateurRoutes = [
    {
        index: true,
        path: '/administrateur/tableau_de_brd',
        element: <TableauDeBord/>
    },
    {
        path: '/administrateur/configuration',
        element: <Configuration/>
    },
    {
        path: '/administrateurs/utilisateurs',
        element: <Utilisateurs/>
    },
    {
        path: '/administrateurs/transactions',
        element: <Transactions/>
    },
    {
        path: '/administrateurs/rapport',
        element: <Rapport/>
    }
]

export default AdministrateurRoutes;