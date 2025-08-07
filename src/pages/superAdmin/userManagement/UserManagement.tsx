import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Shield, Key } from 'lucide-react'
import UsersTab from './components/UsersTab'
import RolesTab from './components/RolesTab'
import PermissionsTab from './components/PermissionsTab'
import { UserProvider } from './context/UserContext'

type TabType = 'users' | 'roles' | 'permissions'

const tabs = [
  { id: 'users' as TabType, label: 'Utilisateurs', icon: Users },
  { id: 'roles' as TabType, label: 'Rôles', icon: Shield },
  { id: 'permissions' as TabType, label: 'Permissions', icon: Key },
]

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('users')

  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestion des Utilisateurs
            </h1>
            <p className="text-gray-600">
              Interface de gestion des utilisateurs, rôles et permissions
            </p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </div>
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                        />
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'users' && <UsersTab />}
                  {activeTab === 'roles' && <RolesTab />}
                  {activeTab === 'permissions' && <PermissionsTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </UserProvider>
  )
}
