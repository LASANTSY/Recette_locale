import AdministrateurRoutes from './Administrateur.routes';
import SuperAdministrateurRoutes from './SuperAdministrateur.routes';
import { ContribuableRoutes, MaireRoutes, OrdonnateurRoutes, PercepteurRoutes, TresorierRoutes } from './defaultRoutes';

export interface Route {
  index?: boolean;
  path: string;
  element: React.ReactNode;
}

export interface RouteConfig {
  [key: string]: Route[];
}

// Fonction pour obtenir la route par défaut d'un rôle
export const getDefaultRouteForRole = (role: string): string => {
  switch (role) {
    case 'Administrateur':
      return AdministrateurRoutes.find(route => route.index)?.path || '/administrateur';
    case 'SuperAdministrateur':
      return SuperAdministrateurRoutes.find(route => route.index)?.path || '/superadmin';
    case 'Caissier':
      return '/caissier';
    case 'Maire':
      return MaireRoutes.find(route => route.index)?.path || '/maire';
    case 'Ordonnateur':
      return OrdonnateurRoutes.find(route => route.index)?.path || '/ordonnateur';
    case 'Percepteur':
      return PercepteurRoutes.find(route => route.index)?.path || '/percepteur';
    case 'Tresorier':
      return TresorierRoutes.find(route => route.index)?.path || '/tresorier';
    case 'Contribuable':
      return ContribuableRoutes.find(route => route.index)?.path || '/contribuable';
    default:
      return '/';
  }
};

export const routes: RouteConfig = {
  administrateur: AdministrateurRoutes,
  superadministrateur: SuperAdministrateurRoutes,
  contribuable: ContribuableRoutes,
  maire: MaireRoutes,
  ordonnateur: OrdonnateurRoutes,
  percepteur: PercepteurRoutes,
  tresorier: TresorierRoutes,
};
