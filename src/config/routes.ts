// Types des rôles disponibles dans l'application
export type UserRole = 
  | 'Administrateur'
  | 'SuperAdministrateur'
  | 'Caissier'
  | 'Maire'
  | 'Ordonnateur'
  | 'Percepteur'
  | 'Tresorier'
  | 'Contribuable';

// Configuration des routes par rôle
export const ROLE_ROUTES: Record<UserRole, { 
  base: string;
  default: string;
  routes: Record<string, string>;
}> = {
  Administrateur: {
    base: '/administrateur',
    default: '/administrateur/tableau_de_brd',
    routes: {
      tableau_de_bord: '/administrateur/tableau_de_brd',
      utilisateurs: '/administrateur/utilisateurs',
      configuration: '/administrateur/configuration',
      transactions: '/administrateur/transactions',
    }
  },
  SuperAdministrateur: {
    base: '/superadmin',
    default: '/superadmin/configuration',
    routes: {
      configuration: '/superadmin/configuration',
      utilisateurs: '/superadmin/utilisateurs',
    }
  },
  Caissier: {
    base: '/caissier',
    default: '/caissier/tableau_de_bord',
    routes: {
      tableau_de_bord: '/caissier/tableau_de_bord',
      transactions: '/caissier/transactions',
    }
  },
  Maire: {
    base: '/maire',
    default: '/maire/tableau_de_bord',
    routes: {
      tableau_de_bord: '/maire/tableau_de_bord',
    }
  },
  Ordonnateur: {
    base: '/ordonnateur',
    default: '/ordonnateur/tableau_de_bord',
    routes: {
      tableau_de_bord: '/ordonnateur/tableau_de_bord',
    }
  },
  Percepteur: {
    base: '/percepteur',
    default: '/percepteur/tableau_de_bord',
    routes: {
      tableau_de_bord: '/percepteur/tableau_de_bord',
    }
  },
  Tresorier: {
    base: '/tresorier',
    default: '/tresorier/tableau_de_bord',
    routes: {
      tableau_de_bord: '/tresorier/tableau_de_bord',
    }
  },
  Contribuable: {
    base: '/contribuable',
    default: '/contribuable/tableau_de_bord',
    routes: {
      tableau_de_bord: '/contribuable/tableau_de_bord',
    }
  }
};

// Fonctions utilitaires pour la gestion des routes
export const getRouteForRole = (role: UserRole, route?: keyof typeof ROLE_ROUTES[UserRole]['routes']) => {
  const roleConfig = ROLE_ROUTES[role];
  if (!roleConfig) return '/';
  
  if (route && roleConfig.routes[route]) {
    return roleConfig.routes[route];
  }
  
  return roleConfig.default;
};

// Vérifier si une route est autorisée pour un rôle
export const isRouteAllowedForRole = (role: UserRole, path: string): boolean => {
  const roleConfig = ROLE_ROUTES[role];
  if (!roleConfig) return false;
  
  return path.startsWith(roleConfig.base);
};
