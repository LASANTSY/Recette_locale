import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  Shield, 
  ShieldOff, 
  X, 
  Save,
  AlertCircle,
  Check
} from 'lucide-react';
import mockUsers, { User } from '../../components/common/data/mockUsers';

interface Modal {
  type: 'add' | 'edit' | 'delete' | 'block' | 'alert' | null;
  user?: User;
}

const communes = [
  'Antananarivo',
  'Antsirabe',
  'Fianarantsoa',
  'Toamasina',
  'Mahajanga',
  'Antsiranana',
  'Toliara',
  'Morondava'
];

function Utilisateurs() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const [modal, setModal] = useState<Modal>({ type: null });
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    commune: communes[0]
  });
  const [alertMessage, setAlertMessage] = useState('');

  const openModal = (type: Modal['type'], user?: User) => {
    if (type === 'edit' && user) {
      setFormData({
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        commune: user.commune
      });
    } else if (type === 'add') {
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        commune: communes[0]
      });
    }
    setModal({ type, user });
  };

  const closeModal = () => {
    setModal({ type: null });
    setFormData({ nom: '', prenom: '', email: '', commune: communes[0] });
  };

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setModal({ type: 'alert' });
    setTimeout(() => setModal({ type: null }), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nom || !formData.prenom || !formData.email) {
      showAlert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (modal.type === 'add') {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData,
        role: 'Administrateur',
        statut: 'actif',
        dateCreation: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
      showAlert('Utilisateur ajouté avec succès');
    } else if (modal.type === 'edit' && modal.user) {
      setUsers(users.map(user => 
        user.id === modal.user!.id 
          ? { ...user, ...formData }
          : user
      ));
      showAlert('Utilisateur modifié avec succès');
    }
    
    closeModal();
  };

  const handleDelete = () => {
    if (modal.user) {
      setUsers(users.filter(user => user.id !== modal.user!.id));
      showAlert('Utilisateur supprimé avec succès');
      closeModal();
    }
  };

  const toggleUserStatus = (user: User) => {
    const newStatus = user.statut === 'actif' ? 'bloque' : 'actif';
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, statut: newStatus }
        : u
    ));
    showAlert(`Utilisateur ${newStatus === 'actif' ? 'débloqué' : 'bloqué'} avec succès`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* <Users className="w-8 h-8 text-blue-600" /> */}
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
          </div>
          <button
            onClick={() => openModal('add')}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Nouvel Utilisateur
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.statut === 'actif').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Utilisateurs Bloqués</p>
                <p className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.statut === 'bloque').length}
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <ShieldOff className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commune
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className="hover:bg-gray-50 transition-colors duration-200"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: 'fadeInUp 0.5s ease-out'
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                          {user.prenom.charAt(0)}{user.nom.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.prenom} {user.nom}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.commune}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.statut === 'actif' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.statut === 'actif' ? 'Actif' : 'Bloqué'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(user.dateCreation).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => openModal('edit', user)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Modifier"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleUserStatus(user)}
                          className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                            user.statut === 'actif'
                              ? 'text-red-600 hover:bg-red-100'
                              : 'text-green-600 hover:bg-green-100'
                          }`}
                          title={user.statut === 'actif' ? 'Bloquer' : 'Débloquer'}
                        >
                          {user.statut === 'actif' ? 
                            <ShieldOff className="w-4 h-4" /> : 
                            <Shield className="w-4 h-4" />
                          }
                        </button>
                        <button
                          onClick={() => openModal('delete', user)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {users.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun utilisateur trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {modal.type && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/10">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
            style={{ animation: 'modalFadeIn 0.3s ease-out' }}
          >
            {(modal.type === 'add' || modal.type === 'edit') && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {modal.type === 'add' ? 'Nouvel Utilisateur' : 'Modifier Utilisateur'}
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        value={formData.prenom}
                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Entrez le prénom"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={formData.nom}
                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Entrez le nom"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Entrez l'email"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commune *
                      </label>
                      <select
                        value={formData.commune}
                        onChange={(e) => setFormData({...formData, commune: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        required
                      >
                        {communes.map(commune => (
                          <option key={commune} value={commune}>
                            {commune}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Rôle:</span> Administrateur (par défaut)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {modal.type === 'add' ? 'Créer' : 'Modifier'}
                    </button>
                  </div>
                </div>
              </>
            )}

            {modal.type === 'delete' && modal.user && (
              <>
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Confirmer la suppression
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">
                        Êtes-vous sûr de vouloir supprimer cet utilisateur ?
                      </p>
                      <p className="text-sm text-gray-600">
                        {modal.user.prenom} {modal.user.nom} ({modal.user.email})
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-6">
                    Cette action est irréversible et supprimera définitivement l'utilisateur.
                  </p>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={closeModal}
                      className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleDelete}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </>
            )}

            {modal.type === 'alert' && (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-gray-900 font-medium">{alertMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
        
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default Utilisateurs;