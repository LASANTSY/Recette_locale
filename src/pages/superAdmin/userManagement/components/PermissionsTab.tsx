import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit, Trash2, Key } from 'lucide-react'
import { useUserContext } from '../context/UserContext'
import { Permission } from '../types'
import PermissionForm from './PermissionForm'

export default function PermissionsTab() {
  const { permissions, roles, deletePermission } = useUserContext()
  const [showForm, setShowForm] = useState(false)
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null)

  const handleEdit = (permission: Permission) => {
    setEditingPermission(permission)
    setShowForm(true)
  }

  const handleDelete = (permissionId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette permission ?')) {
      deletePermission(permissionId)
    }
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPermission(null)
  }

  const getPermissionRoles = (permissionId: number) => {
    return roles.filter(role => 
      role.permissions?.some(p => p.permission_id === permissionId)
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Gestion des Permissions
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Permission</span>
        </motion.button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {permissions.map((permission) => {
            const associatedRoles = getPermissionRoles(permission.permission_id)
            
            return (
              <motion.div
                key={permission.permission_id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Key className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {permission.permission_label}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {permission.permission_slug}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(permission)}
                      className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(permission.permission_id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500 mb-2">
                    Utilisée dans les rôles:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {associatedRoles.length > 0 ? (
                      associatedRoles.map((role) => (
                        <span
                          key={role.role_id}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                        >
                          {role.role_name}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400 italic">
                        Aucun rôle assigné
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showForm && (
          <PermissionForm
            permission={editingPermission}
            onClose={handleCloseForm}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
