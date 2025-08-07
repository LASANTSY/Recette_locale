import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useUserContext } from '../context/UserContext'
import { Permission } from '../types'

interface PermissionFormProps {
  permission?: Permission | null
  onClose: () => void
}

export default function PermissionForm({ permission, onClose }: PermissionFormProps) {
  const { addPermission, updatePermission } = useUserContext()
  const [formData, setFormData] = useState({
    permission_label: '',
    permission_slug: ''
  })

  useEffect(() => {
    if (permission) {
      setFormData({
        permission_label: permission.permission_label,
        permission_slug: permission.permission_slug
      })
    }
  }, [permission])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const permissionData: Permission = {
      permission_id: permission?.permission_id || 0,
      permission_label: formData.permission_label,
      permission_slug: formData.permission_slug || formData.permission_label.toLowerCase().replace(/\s+/g, '-')
    }

    if (permission) {
      updatePermission(permission.permission_id, permissionData)
    } else {
      addPermission(permissionData)
    }
    
    onClose()
  }

  const handleLabelChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      permission_label: value,
      permission_slug: prev.permission_slug || value.toLowerCase().replace(/\s+/g, '-')
    }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg border border-gray-300 shadow-xl max-w-md w-full"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <h3 className="text-lg font-semibold">
            {permission ? 'Modifier la permission' : 'Nouvelle permission'}
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
              Libellé de la permission
            </label>
            <input
              type="text"
              value={formData.permission_label}
              onChange={(e) => handleLabelChange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="ex: Voir les utilisateurs"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug de la permission
            </label>
            <input
              type="text"
              value={formData.permission_slug}
              onChange={(e) => setFormData(prev => ({ ...prev, permission_slug: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="ex: view-users"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Le slug est généré automatiquement à partir du libellé
            </p>
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
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              {permission ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
