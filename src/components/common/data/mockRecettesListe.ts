type TypeRecette = "fiscale" | "non-fiscale";

interface Recette {
  id: string;
  codeRecette: string;
  libelle: string;
  categorie: string;
  type: TypeRecette;
  montant: number;
  frequence: string;
  active: boolean;
}

export const mockRecettesListe: Recette[] = [
  {
    id: '1',
    codeRecette: 'FISC-001',
    libelle: 'Impôt foncier',
    categorie: 'Taxes immobilières',
    type: 'fiscale',
    montant: 100000,
    frequence: 'Mensuelle',
    active: true,
  },
  {
    id: '2',
    codeRecette: 'TVA-202',
    libelle: 'TVA',
    categorie: 'Taxe sur consommation',
    type: 'fiscale',
    montant: 250000,
    frequence: 'Trimestrielle',
    active: true,
  },
  {
    id: '3',
    codeRecette: 'PAT-330',
    libelle: 'Patente',
    categorie: 'Taxe professionnelle',
    type: 'fiscale',
    montant: 75000,
    frequence: 'Annuelle',
    active: false,
  },
  {
    id: '4',
    codeRecette: 'DOM-404',
    libelle: 'Droit de douane',
    categorie: 'Import/Export',
    type: 'fiscale',
    montant: 500000,
    frequence: 'Ponctuelle',
    active: true,
  },
  {
    id: '5',
    codeRecette: 'SERV-550',
    libelle: 'Frais de service',
    categorie: 'Services administratifs',
    type: 'non-fiscale',
    montant: 120000,
    frequence: 'Mensuelle',
    active: true,
  },
  {
    id: '6',
    codeRecette: 'ECO-660',
    libelle: 'Ecotaxe',
    categorie: 'Environnement',
    type: 'fiscale',
    montant: 30000,
    frequence: 'Semestrielle',
    active: true,
  },
  {
    id: '7',
    codeRecette: 'LOIS-770',
    libelle: 'Droit de licence',
    categorie: 'Activités réglementées',
    type: 'non-fiscale',
    montant: 150000,
    frequence: 'Annuelle',
    active: false,
  },
  {
    id: '8',
    codeRecette: 'AMEN-880',
    libelle: 'Amende',
    categorie: 'Sanctions',
    type: 'non-fiscale',
    montant: 50000,
    frequence: 'Ponctuelle',
    active: true,
  },
];