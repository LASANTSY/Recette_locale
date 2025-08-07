import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Shield, ExternalLink } from 'lucide-react'
import { useUserContext } from '../context/UserContext'
import { Role } from '../types'
import RoleForm from './RoleForm'

export default function RolesTab() {
  const { roles, deleteRole } = useUserContext()
  const [showForm, setShowForm] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const handleEdit = (role: Role) => {
    setEditingRole(role)
    setShowForm(true)
  }

  const handleDelete = (roleId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
      deleteRole(roleId)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingRole(null)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestion des Rôles
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Rôle</span>
        </motion.button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {roles.map((role) => (
            <motion.div
              key={role.role_id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {role.role_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {role.application.app_name}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(role)}
                    className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(role.role_id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ExternalLink className="w-4 h-4" />
                  <a
                    href={role.application.app_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {role.application.app_url}
                  </a>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs text-gray-500 mb-2">Permissions:</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions?.slice(0, 3).map((permission) => (
                    <span
                      key={permission.permission_id}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                    >
                      {permission.permission_label}
                    </span>
                  ))}
                  {role.permissions && role.permissions.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{role.permissions.length - 3} autres
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <RoleForm
            role={editingRole}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
