import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User, Role, Permission, Citoyen, Application } from '../types'

interface UserContextType {
  users: User[]
  roles: Role[]
  permissions: Permission[]
  citoyens: Citoyen[]
  applications: Application[]
  addUser: (user: User) => void
  updateUser: (id: string, user: User) => void
  deleteUser: (id: string) => void
  addRole: (role: Role) => void
  updateRole: (id: number, role: Role) => void
  deleteRole: (id: number) => void
  addPermission: (permission: Permission) => void
  updatePermission: (id: number, permission: Permission) => void
  deletePermission: (id: number) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock data
const mockCitoyens: Citoyen[] = [
  {
    id_citizen: "8ec95ed2-78bd-487a-b699-86e4cc5d6502",
    citizen_name: "John",
    citizen_lastname: "Doe",
    citizen_date_of_birth: "1990-01-01",
    citizen_location_of_birth: "Paris",
    citizen_photo: "/abstract-profile.png",
    citizen_national_card_number: 123456789,
    citizen_adress: "123 Rue",
    citizen_city: "Paris",
    fokotany_id: 2,
    citizen_work: "Engineer",
    citizen_father: "Father Name",
    citizen_mother: "Mother Name",
    citizen_national_card_location: "Paris Office",
    citizen_national_card_date: "2010-05-15"
  },
  {
    id_citizen: "9fc95ed2-78bd-487a-b699-86e4cc5d6503",
    citizen_name: "Jane",
    citizen_lastname: "Smith",
    citizen_date_of_birth: "1985-05-15",
    citizen_location_of_birth: "Lyon",
    citizen_photo: "/woman-profile.png",
    citizen_national_card_number: 987654321,
    citizen_adress: "456 Avenue",
    citizen_city: "Lyon",
    fokotany_id: 3,
    citizen_work: "Doctor",
    citizen_father: "Father Smith",
    citizen_mother: "Mother Smith",
    citizen_national_card_location: "Lyon Office",
    citizen_national_card_date: "2008-03-20"
  }
]

const mockApplications: Application[] = [
  {
    app_id: 1,
    app_name: "Anjaranaka",
    app_slug: "anjaranaka",
    app_url: "http://173.249.25.94:4005"
  },
  {
    app_id: 2,
    app_name: "Admin Recette locale",
    app_slug: "admin-recette-locale",
    app_url: "http://173.249.25.94:4005/admin/dashboard"
  }
]

const mockPermissions: Permission[] = [
  {
    permission_id: 251,
    permission_label: "Voir les utilisateurs",
    permission_slug: "view-users"
  },
  {
    permission_id: 252,
    permission_label: "Créer des utilisateurs",
    permission_slug: "create-users"
  },
  {
    permission_id: 253,
    permission_label: "Modifier les utilisateurs",
    permission_slug: "edit-users"
  },
  {
    permission_id: 254,
    permission_label: "Supprimer les utilisateurs",
    permission_slug: "delete-users"
  }
]

const mockRoles: Role[] = [
  {
    role_id: 24,
    role_name: "Admin",
    role_slug: "admin",
    application: mockApplications[0],
    permissions: mockPermissions
  },
  {
    role_id: 25,
    role_name: "Utilisateur",
    role_slug: "user",
    application: mockApplications[0],
    permissions: [mockPermissions[0]]
  }
]

const mockUsers: User[] = [
  {
    user_id: "user-1",
    user_email: "johndoe1@example.com",
    user_phone: "1234567890",
    municipality_id: "1",
    citizen: mockCitoyens[0],
    roles: [mockRoles[0]]
  },
  {
    user_id: "user-2",
    user_email: "janesmith@example.com",
    user_phone: "0987654321",
    municipality_id: "2",
    citizen: mockCitoyens[1],
    roles: [mockRoles[1]]
  }
]

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [permissions, setPermissions] = useState<Permission[]>(mockPermissions)
  const [citoyens] = useState<Citoyen[]>(mockCitoyens)
  const [applications] = useState<Application[]>(mockApplications)

  const addUser = (user: User) => {
    const newUser = { ...user, user_id: `user-${Date.now()}` }
    setUsers(prev => [...prev, newUser])
  }

  const updateUser = (id: string, user: User) => {
    setUsers(prev => prev.map(u => u.user_id === id ? { ...user, user_id: id } : u))
  }

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.user_id !== id))
  }

  const addRole = (role: Role) => {
    const newRole = { ...role, role_id: Date.now() }
    setRoles(prev => [...prev, newRole])
  }

  const updateRole = (id: number, role: Role) => {
    setRoles(prev => prev.map(r => r.role_id === id ? { ...role, role_id: id } : r))
  }

  const deleteRole = (id: number) => {
    setRoles(prev => prev.filter(r => r.role_id !== id))
  }

  const addPermission = (permission: Permission) => {
    const newPermission = { ...permission, permission_id: Date.now() }
    setPermissions(prev => [...prev, newPermission])
  }

  const updatePermission = (id: number, permission: Permission) => {
    setPermissions(prev => prev.map(p => p.permission_id === id ? { ...permission, permission_id: id } : p))
  }

  const deletePermission = (id: number) => {
    setPermissions(prev => prev.filter(p => p.permission_id !== id))
  }

  return (
    <UserContext.Provider value={{
      users,
      roles,
      permissions,
      citoyens,
      applications,
      addUser,
      updateUser,
      deleteUser,
      addRole,
      updateRole,
      deleteRole,
      addPermission,
      updatePermission,
      deletePermission
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
