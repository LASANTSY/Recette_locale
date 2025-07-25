import { useState } from 'react';
import { Table } from '../../components/common/ux/IndexExport';

type Recette = {
  id: string;
  type: 'fiscale' | 'non-fiscale';
  libelle: string;
  montant: number;
  annee: number;
  tauxRealisation: number;
};

export default function Configuration() {
  const [selectedRecette, setSelectedRecette] = useState<Recette | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'fiscale' | 'non-fiscale'>('fiscale');

  // Données simulées - en pratique, vous les récupéreriez via une API
  const recettes: Recette[] = [
    {
      id: '1',
      type: 'fiscale',
      libelle: 'Taxe foncière sur les propriétés bâties',
      montant: 1250000,
      annee: 2023,
      tauxRealisation: 98.5,
    },
    {
      id: '2',
      type: 'fiscale',
      libelle: 'Taxe d\'habitation',
      montant: 850000,
      annee: 2023,
      tauxRealisation: 95.2,
    },
    {
      id: '3',
      type: 'fiscale',
      libelle: 'Cotisation foncière des entreprises',
      montant: 620000,
      annee: 2023,
      tauxRealisation: 102.1,
    },
    {
      id: '4',
      type: 'non-fiscale',
      libelle: 'Subventions d\'exploitation',
      montant: 320000,
      annee: 2023,
      tauxRealisation: 100.0,
    },
    {
      id: '5',
      type: 'non-fiscale',
      libelle: 'Produits des services',
      montant: 280000,
      annee: 2023,
      tauxRealisation: 97.8,
    },
    {
      id: '6',
      type: 'non-fiscale',
      libelle: 'Dotations et participations',
      montant: 1500000,
      annee: 2023,
      tauxRealisation: 99.3,
    },
  ];

  const columns: Column<Recette>[] = [
    {
      key: 'libelle',
      header: 'Libellé',
      sortable: true,
    },
    {
      key: 'montant',
      header: 'Montant (€)',
      sortable: true,
      render: (value) => value.toLocaleString('fr-FR'),
    },
    {
      key: 'tauxRealisation',
      header: 'Taux de réalisation (%)',
      sortable: true,
      render: (value) => (
        <span className={value >= 100 ? 'text-green-600' : 'text-yellow-600'}>
          {value.toFixed(1)}%
        </span>
      ),
    },
    {
      key: 'annee',
      header: 'Année',
      sortable: true,
    },
  ];

  const filteredData = recettes.filter((recette) => recette.type === activeTab);

  const handleRowClick = (row: Recette) => {
    setSelectedRecette(row);
  };

  const formatMontant = (montant: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(montant);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Recettes de la commune</h1>
      
      <div className="flex mb-6 border-b border-gray-200">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'fiscale' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('fiscale')}
        >
          Recettes fiscales
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'non-fiscale' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('non-fiscale')}
        >
          Recettes non-fiscales
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <Table
          columns={columns}
          data={filteredData}
          striped
          hoverable
          onRowClick={handleRowClick}
          loading={loading}
          emptyMessage={`Aucune recette ${activeTab === 'fiscale' ? 'fiscale' : 'non-fiscale'} disponible`}
        />
      </div>

      {selectedRecette && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Détails de la recette</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Libellé</p>
              <p className="font-medium">{selectedRecette.libelle}</p>
            </div>
            <div>
              <p className="text-gray-600">Type</p>
              <p className="font-medium">
                {selectedRecette.type === 'fiscale' ? 'Fiscale' : 'Non-fiscale'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Montant</p>
              <p className="font-medium">{formatMontant(selectedRecette.montant)}</p>
            </div>
            <div>
              <p className="text-gray-600">Taux de réalisation</p>
              <p className={`font-medium ${selectedRecette.tauxRealisation >= 100 ? 'text-green-600' : 'text-yellow-600'}`}>
                {selectedRecette.tauxRealisation.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-gray-600">Année</p>
              <p className="font-medium">{selectedRecette.annee}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Total {activeTab === 'fiscale' ? 'fiscal' : 'non-fiscal'}</h2>
        <p className="text-2xl font-bold text-blue-700">
          {formatMontant(
            filteredData.reduce((sum, recette) => sum + recette.montant, 0)
          )}
        </p>
      </div>
    </div>
  );
}

// Définition du type Column pour TypeScript
type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};