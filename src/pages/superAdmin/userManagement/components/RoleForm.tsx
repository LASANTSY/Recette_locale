import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useUserContext } from '../context/UserContext'
import { Role } from '../types'

interface RoleFormProps {
  role?: Role | null
  onClose: () => void
}

export default function RoleForm({ role, onClose }: RoleFormProps) {
  const { applications, permissions, addRole, updateRole } = useUserContext()
  const [formData, setFormData] = useState({
    role_name: '',
    app_id: 0,
    permission_ids: [] as number[]
  })

  useEffect(() => {
    if (role) {
      setFormData({
        role_name: role.role_name,
        app_id: role.application.app_id,
        permission_ids: role.permissions?.map(p => p.permission_id) || []
      })
    }
  }, [role])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedApp = applications.find(a => a.app_id === formData.app_id)
    const selectedPermissions = permissions.filter(p => formData.permission_ids.includes(p.permission_id))
    
    if (!selectedApp) return

    const roleData: Role = {
      role_id: role?.role_id || 0,
      role_name: formData.role_name,
      role_slug: formData.role_name.toLowerCase().replace(/\s+/g, '-'),
      application: selectedApp,
      permissions: selectedPermissions
    }

    if (role) {
      updateRole(role.role_id, roleData)
    } else {
      addRole(roleData)
    }
    
    onClose()
  }

  const handlePermissionToggle = (permissionId: number) => {
    setFormData(prev => ({
      ...prev,
      permission_ids: prev.permission_ids.includes(permissionId)
        ? prev.permission_ids.filter(id => id !== permissionId)
        : [...prev.permission_ids, permissionId]
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
            {role ? 'Modifier le rôle' : 'Nouveau rôle'}
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
              Nom du rôle
            </label>
            <input
              type="text"
              value={formData.role_name}
              onChange={(e) => setFormData(prev => ({ ...prev, role_name: e.target.value }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Application
            </label>
            <select
              value={formData.app_id}
              onChange={(e) => setFormData(prev => ({ ...prev, app_id: parseInt(e.target.value) }))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value={0}>Sélectionner une application</option>
              {applications.map((app) => (
                <option key={app.app_id} value={app.app_id}>
                  {app.app_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
              {permissions.map((permission) => (
                <label key={permission.permission_id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.permission_ids.includes(permission.permission_id)}
                    onChange={() => handlePermissionToggle(permission.permission_id)}
                    className="mr-2"
                  />
                  <span className="text-sm">{permission.permission_label}</span>
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
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              {role ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
