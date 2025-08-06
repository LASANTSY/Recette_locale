// Types partagés pour l'utilisateur (nouveau format)
export type User = {
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
};
