import { useState } from 'react';
import { Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import { mockRecettesListe } from '../../components/common/data/mockRecettesListe';
import { Table, Badge, Button } from '../../components/common/ux/IndexExport';

// Modern Toggle Switch Component
function ToggleSwitch({ checked, onChange, id, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={`${id}-label`}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-all duration-300 ease-in-out
        ${checked ? 'bg-emerald-500' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white shadow-lg
          transition-transform duration-300 ease-in-out
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}

// Modern Badge Component
function Badge({ variant, children, className = '' }) {
  const variants = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    inactive: 'bg-gray-50 text-gray-600 border-gray-200'
  };
  
  return (
    <span className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
      ${variants[variant] || variants.info} ${className}
    `}>
      {children}
    </span>
  );
}

// Modern Modal Component
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="px-6 py-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// Modern Input Component
function Input({ label, type = 'text', value, onChange, placeholder, disabled = false, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border border-gray-200 rounded-xl
          transition-all duration-200 ease-in-out
          ${disabled 
            ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
            : 'bg-white focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500'
          }
        `}
      />
    </div>
  );
}

// Modern Select Component
function Select({ label, value, onChange, options, disabled = false, className = '' }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border border-gray-200 rounded-xl
          transition-all duration-200 ease-in-out
          ${disabled 
            ? 'bg-gray-50 text-gray-500 cursor-not-allowed' 
            : 'bg-white focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500'
          }
        `}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Modern Button Component
function Button({ variant = 'primary', size = 'md', children, onClick, disabled = false, className = '' }) {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} ${sizes[size]}
        font-medium rounded-xl transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-3 focus:ring-blue-500/20
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105 active:scale-95'}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

// Action Button Component (for edit/delete icons)
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
      <div className="text-sm text-gray-500">
        Page {currentPage} sur {totalPages} ({filteredData.length} résultat{filteredData.length > 1 ? 's' : ''})
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Précédent
        </button>
        
        {getVisiblePages().map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...'}
            className={`
              px-3 py-1 text-sm rounded-lg transition-colors
              ${page === currentPage
                ? 'bg-blue-600 text-white'
                : page === '...'
                ? 'cursor-default text-gray-400'
                : 'border border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            {page}
          </button>
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
function ActionButton({ onClick, color, icon: Icon, label }) {
  const colors = {
    blue: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
    red: 'text-red-600 hover:text-red-700 hover:bg-red-50'
  };
  
  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-lg transition-all duration-200 ease-in-out
        ${colors[color]}
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-current
      `}
      title={label}
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function Configuration() {
  const [selectedRecette, setSelectedRecette] = useState(null);
  const [activeTab, setActiveTab] = useState('fiscale');
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecette, setEditRecette] = useState(null);
  const [recettes, setRecettes] = useState(mockRecettesListe);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const filteredData = recettes.filter(r => r.type === activeTab && (
    r.libelle.toLowerCase().includes(search.toLowerCase()) ||
    r.codeRecette.toLowerCase().includes(search.toLowerCase()) ||
    r.categorie.toLowerCase().includes(search.toLowerCase())
  ));

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  // Remplir avec des lignes vides pour maintenir la hauteur constante
  const emptyRows = Array(Math.max(0, itemsPerPage - paginatedData.length)).fill(null);

  function handleRowClick(row) {
    setSelectedRecette(row);
  }

  function handleDelete(id) {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
      setRecettes(recettes.filter(r => r.id !== id));
      if (selectedRecette?.id === id) {
        setSelectedRecette(null);
      }
      // Ajuster la page courante si nécessaire
      const newFilteredData = recettes.filter(r => r.id !== id && r.type === activeTab);
      const newTotalPages = Math.ceil(newFilteredData.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    }
  }

  // Reset page when tab or search changes
  function handleTabChange(tab) {
    setActiveTab(tab);
    setCurrentPage(1);
    setSelectedRecette(null);
  }

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleModalClose() {
    setModalOpen(false);
    setEditRecette(null);
  }

  function handleSave() {
    if (!editRecette.codeRecette || !editRecette.libelle || !editRecette.categorie) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (editRecette.id) {
      const updatedRecettes = recettes.map(r => r.id === editRecette.id ? editRecette : r);
      setRecettes(updatedRecettes);
      if (selectedRecette?.id === editRecette.id) {
        setSelectedRecette(editRecette);
      }
    } else {
      const newRecette = { ...editRecette, id: Date.now().toString() };
      setRecettes([...recettes, newRecette]);
    }
    handleModalClose();
  }

  function openEditModal(recette = null) {
    setEditRecette(recette || {
      codeRecette: '',
      libelle: '',
      categorie: '',
      type: activeTab,
      montant: 0,
      frequence: '',
      active: true
    });
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recettes de la commune</h1>
          <p className="text-gray-600">Gestion des recettes fiscales et non-fiscales</p>
        </div>

        {/* Navigation & Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => handleTabChange('fiscale')}
                className={`
                  px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${activeTab === 'fiscale'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                Recettes fiscales
              </button>
              <button
                onClick={() => handleTabChange('non-fiscale')}
                className={`
                  px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${activeTab === 'non-fiscale'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                Recettes non-fiscales
              </button>
            </div>

            {/* Search and Add */}
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Rechercher une recette..."
                  value={search}
                  onChange={e => handleSearchChange(e.target.value)}
                  className="pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 w-64 transition-all duration-200"
                />
              </div>
              <Button
                onClick={() => openEditModal()}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Table */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <Table
                data={paginatedData}
                columns={[
                  {
                    key: 'codeRecette',
                    label: 'Code',
                    width: 'w-32',
                  },
                  {
                    key: 'libelle',
                    label: 'Libellé',
                    width: 'w-48',
                  },
                  {
                    key: 'categorie',
                    label: 'Catégorie',
                    width: 'w-48',
                  },
                  {
                    key: 'montant',
                    label: 'Montant',
                    width: 'w-32',
                    render: (value) => <span className="text-sm font-semibold text-gray-900">{value.toLocaleString('fr-FR')} €</span>,
                  },
                  {
                    key: 'active',
                    label: 'Statut',
                    width: 'w-32',
                    render: (value) => <Badge variant={value ? 'success' : 'inactive'}>{value ? 'Actif' : 'Inactif'}</Badge>,
                  },
                  {
                    key: 'actions',
                    label: 'Actions',
                    width: 'w-40',
                    render: (_, row) => (
                      <div className="flex justify-center gap-1" onClick={e => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(row)}
                          className="flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(row.id)}
                          className="flex items-center gap-2 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ),
                  },
                ]}
                onRowClick={handleRowClick}
                selectedRowId={selectedRecette?.id}
              />
            </div>
          </div>

          {/* Details Panel */}
          <div className="xl:col-span-1">
            {selectedRecette ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Détails de la recette</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(selectedRecette)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Code</p>
                      <p className="text-sm font-mono font-semibold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                        {selectedRecette.codeRecette}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Statut</p>
                      <Badge variant={selectedRecette.active ? 'success' : 'inactive'}>
                        {selectedRecette.active ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Libellé</p>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {selectedRecette.libelle}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Catégorie</p>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {selectedRecette.categorie}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Type</p>
                    <Badge variant={selectedRecette.type === 'fiscale' ? 'info' : 'warning'}>
                      {selectedRecette.type === 'fiscale' ? 'Fiscale' : 'Non-fiscale'}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Montant</p>
                    <p className="text-lg font-bold text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {selectedRecette.montant.toLocaleString('fr-FR')} €
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Fréquence</p>
                    <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                      {selectedRecette.frequence}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-gray-400 py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8" />
                  </div>
                  <p className="text-lg font-medium text-gray-600 mb-2">Aucune sélection</p>
                  <p className="text-sm text-gray-500">Cliquez sur une recette pour voir les détails</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          title={editRecette?.id ? 'Modifier la recette' : 'Nouvelle recette'}
        >
          <div className="max-h-[60vh] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Code de la recette *"
                value={editRecette?.codeRecette || ''}
                onChange={e => setEditRecette({ ...editRecette, codeRecette: e.target.value })}
                placeholder="Ex: RF001"
                disabled={!!editRecette?.id}
              />
              
              <Select
                label="Type *"
                value={editRecette?.type || activeTab}
                onChange={e => setEditRecette({ ...editRecette, type: e.target.value })}
                disabled={!!editRecette?.id}
                options={[
                  { value: 'fiscale', label: 'Fiscale' },
                  { value: 'non-fiscale', label: 'Non-fiscale' },
                ]}
              />
              
              <div className="md:col-span-2">
                <Input
                  label="Libellé *"
                  value={editRecette?.libelle || ''}
                  onChange={e => setEditRecette({ ...editRecette, libelle: e.target.value })}
                  placeholder="Ex: Taxe foncière"
                  disabled={!!editRecette?.id}
                />
              </div>
              
              <Input
                label="Catégorie *"
                value={editRecette?.categorie || ''}
                onChange={e => setEditRecette({ ...editRecette, categorie: e.target.value })}
                placeholder="Ex: Impôts locaux"
                disabled={!!editRecette?.id}
              />

              <Input
                label="Fréquence *"
                value={editRecette?.frequence || ''}
                onChange={e => setEditRecette({ ...editRecette, frequence: e.target.value })}
                placeholder="Ex: Annuelle, Mensuelle"
              />

              <div className="md:col-span-2">
                <Input
                  label="Montant (€) *"
                  type="number"
                  value={editRecette?.montant || ''}
                  onChange={e => setEditRecette({ ...editRecette, montant: Number(e.target.value) })}
                  placeholder="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Statut de la recette</label>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <ToggleSwitch
                    id="modal-status"
                    checked={editRecette?.active || false}
                    onChange={checked => setEditRecette({ ...editRecette, active: checked })}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {editRecette?.active ? 'Recette active' : 'Recette inactive'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {editRecette?.active 
                        ? 'Cette recette sera prise en compte dans les calculs' 
                        : 'Cette recette sera ignorée dans les calculs'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
            <Button variant="secondary" onClick={handleModalClose}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              {editRecette?.id ? 'Enregistrer les modifications' : 'Créer la recette'}
            </Button>
          </div>
        </Modal>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}