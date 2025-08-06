// mockUsers.ts
// Données fictives pour les utilisateurs (super admin)

export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  commune?: string;
  role: string;
  statut?: 'actif' | 'bloque';
  dateCreation?: string;
  userName?: string;
  password?: string;
  userAvatar?: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    nom: 'Rakoto',
    prenom: 'Jean',
    email: 'jean.rakoto@email.com',
    commune: 'Antananarivo',
    role: 'Administrateur',
    statut: 'actif',
    dateCreation: '2024-01-15',
    userName: 'Rakoto Jean',
    password: 'admin123',
    userAvatar: undefined
  },
  {
    id: 2,
    nom: 'Razafy',
    prenom: 'Marie',
    email: 'marie.razafy@email.com',
    commune: 'Antsirabe',
    role: 'Administrateur',
    statut: 'bloque',
    dateCreation: '2024-02-20',
    userName: 'Razafy Marie',
    password: 'admin456',
    userAvatar: undefined
  },
  {
    id: 3,
    nom: 'LASANTSY',
    prenom: 'Fleury',
    email: 'lasantsy@admin.com',
    commune: 'Antananarivo',
    role: 'Administrateur',
    statut: 'actif',
    dateCreation: '2024-03-01',
    userName: 'LASANTSY Andry',
    password: 'admin123',
    userAvatar: undefined
  },
  {
    id: 4,
    nom: 'RABEARISOA',
    prenom: 'Miora Ny Aina',
    email: 'rabearisoa@admin.com',
    commune: 'Fianarantsoa',
    role: 'SuperAdministrateur',
    statut: 'actif',
    dateCreation: '2024-03-02',
    userName: 'RABEARISOA Miora Ny Aina',
    password: 'admin456',
    userAvatar: undefined
  },
  {
    id: 5,
    nom: 'Sissie',
    prenom: 'Téphanie',
    email: 'sissie@caisse.com',
    commune: 'Toamasina',
    role: 'Caissier',
    statut: 'actif',
    dateCreation: '2024-03-03',
    userName: 'Sissie Téphanie',
    password: 'caisse123',
    userAvatar: undefined
  },
  {
    id: 6,
    nom: 'Louise',
    prenom: 'Florida',
    email: 'louise@maire.com',
    commune: 'Mahajanga',
    role: 'Maire',
    statut: 'actif',
    dateCreation: '2024-03-04',
    userName: 'Louise Florida',
    password: 'maire123',
    userAvatar: undefined
  }
];

export default mockUsers;
