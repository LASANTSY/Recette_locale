import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useUserContext } from '../context/UserContext'
import { User, Citoyen, Role } from '../types'

interface UserFormProps {
  user?: User | null
  onClose: () => void
}

export default function UserForm({ user, onClose }: UserFormProps) {
  const { citoyens, roles, addUser, updateUser } = useUserContext()
  const [formData, setFormData] = useState({
    user_email: '',
    user_phone: '',
    municipality_id: '',
    citizen_id: '',
    role_ids: [] as number[]
  })

  useEffect(() => {
    if (user) {
      setFormData({
        user_email: user.user_email,
        user_phone: user.user_phone,
        municipality_id: user.municipality_id,
        citizen_id: user.citizen?.id_citizen || '',
        role_ids: user.roles?.map(r => r.role_id) || []
      })
    }
  }, [user])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedCitizen = citoyens.find(c => c.id_citizen === formData.citizen_id)
    const selectedRoles = roles.filter(r => formData.role_ids.includes(r.role_id))
    
    const userData: User = {
      user_email: formData.user_email,
      user_phone: formData.user_phone,
      municipality_id: formData.municipality_id,
      citizen: selectedCitizen,
      roles: selectedRoles
    }

    if (user) {
      updateUser(user.user_id!, userData)
    } else {
      addUser(userData)
    }
    
    onClose()
  }

  const handleRoleToggle = (roleId: number) => {
    setFormData(prev => ({
      ...prev,
      role_ids: prev.role_ids.includes(roleId)
        ? prev.role_ids.filter(id => id !== roleId)
        : [...prev.role_ids, roleId]
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">
            {user ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Citoyen
            </label>
            <select
              value={formData.citizen_id}
              onChange={(e) => setFormData(prev => ({ ...prev, citizen_id: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner un citoyen</option>
              {citoyens.map((citoyen) => (
                <option key={citoyen.id_citizen} value={citoyen.id_citizen}>
                  {citoyen.citizen_name} {citoyen.citizen_lastname}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.user_email}
              onChange={(e) => setFormData(prev => ({ ...prev, user_email: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.user_phone}
              onChange={(e) => setFormData(prev => ({ ...prev, user_phone: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Municipalité
            </label>
            <input
              type="text"
              value={formData.municipality_id}
              onChange={(e) => setFormData(prev => ({ ...prev, municipality_id: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rôles
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {roles.map((role) => (
                <label key={role.role_id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.role_ids.includes(role.role_id)}
                    onChange={() => handleRoleToggle(role.role_id)}
                    className="mr-2"
                  />
                  <span className="text-sm">{role.role_name}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    ({role.application.app_name})
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {user ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
