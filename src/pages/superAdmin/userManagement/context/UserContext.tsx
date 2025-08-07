import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { User, Role, Permission, Citoyen, Application } from '../types/index'

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
  },
  {
  id_citizen: "a1c95ed2-1111-487a-b699-86e4cc5d6504",
  citizen_name: "LASANTSY",
  citizen_lastname: "Fleury",
  citizen_date_of_birth: "1980-10-10",
  citizen_location_of_birth: "Fianarantsoa",
  citizen_photo: "/citizen-marc.png",
  citizen_national_card_number: 112233445,
  citizen_adress: "Route RN7",
  citizen_city: "Fianarantsoa",
  fokotany_id: 4,
  citizen_work: "Développeur",
  citizen_father: "Jean Andrianina",
  citizen_mother: "Marie Rasoanaivo",
  citizen_national_card_location: "Fianarantsoa Bureau",
  citizen_national_card_date: "2000-01-01"
},
{
  id_citizen: "b2c95ed2-2222-487a-b699-86e4cc5d6505",
  citizen_name: "Hanta",
  citizen_lastname: "Rakoto",
  citizen_date_of_birth: "1992-08-08",
  citizen_location_of_birth: "Toamasina",
  citizen_photo: "/citizen-hanta.png",
  citizen_national_card_number: 998877665,
  citizen_adress: "Rue Mangarivotra",
  citizen_city: "Toamasina",
  fokotany_id: 5,
  citizen_work: "Caissière",
  citizen_father: "Joseph Rakoto",
  citizen_mother: "Lucie Rasoa",
  citizen_national_card_location: "Toamasina Office",
  citizen_national_card_date: "2012-09-09"
},
{
  id_citizen: "c3c95ed2-3333-487a-b699-86e4cc5d6506",
  citizen_name: "Tahina",
  citizen_lastname: "Randriamalala",
  citizen_date_of_birth: "1988-04-04",
  citizen_location_of_birth: "Antsirabe",
  citizen_photo: "/citizen-tahina.png",
  citizen_national_card_number: 556677889,
  citizen_adress: "Lot II",
  citizen_city: "Antsirabe",
  fokotany_id: 6,
  citizen_work: "Ordonnateur",
  citizen_father: "Ndranto",
  citizen_mother: "Mireille",
  citizen_national_card_location: "Antsirabe Office",
  citizen_national_card_date: "2010-11-11"
},
{
  id_citizen: "d4c95ed2-4444-487a-b699-86e4cc5d6507",
  citizen_name: "Faniry",
  citizen_lastname: "Rasolo",
  citizen_date_of_birth: "1995-12-12",
  citizen_location_of_birth: "Mahajanga",
  citizen_photo: "/citizen-faniry.png",
  citizen_national_card_number: 223344556,
  citizen_adress: "Mahajanga centre",
  citizen_city: "Mahajanga",
  fokotany_id: 7,
  citizen_work: "Responsable",
  citizen_father: "Victor",
  citizen_mother: "Odile",
  citizen_national_card_location: "Mahajanga Office",
  citizen_national_card_date: "2014-06-06"
},
{
  id_citizen: "e5c95ed2-5555-487a-b699-86e4cc5d6508",
  citizen_name: "Lova",
  citizen_lastname: "Ravelomanana",
  citizen_date_of_birth: "1975-03-03",
  citizen_location_of_birth: "Antananarivo",
  citizen_photo: "/citizen-lova.png",
  citizen_national_card_number: 334455667,
  citizen_adress: "Analakely",
  citizen_city: "Antananarivo",
  fokotany_id: 1,
  citizen_work: "Maire",
  citizen_father: "Edgar",
  citizen_mother: "Soa",
  citizen_national_card_location: "Antananarivo Office",
  citizen_national_card_date: "1995-02-02"
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
    role_name: "Administrateur",
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
  },
  {
    role_id: 26,
    role_name: "SuperAdministrateur",
    role_slug: "super-admin",
    application: mockApplications[0],
    permissions: [...mockPermissions, 
      {
        permission_id: 255,
        permission_label: "Gérer tous les aspects système",
        permission_slug: "manage-system"
      }
    ]
  },
  {
    role_id: 27,
    role_name: "Caissier",
    role_slug: "cashier",
    application: mockApplications[1],
    permissions: [
      {
        permission_id: 256,
        permission_label: "Gérer les transactions financières",
        permission_slug: "manage-transactions"
      },
      {
        permission_id: 257,
        permission_label: "Émettre des reçus",
        permission_slug: "issue-receipts"
      }
    ]
  },
  {
    role_id: 28,
    role_name: "Ordonnateur",
    role_slug: "order-officer",
    application: mockApplications[1],
    permissions: [
      {
        permission_id: 258,
        permission_label: "Approuver les dépenses",
        permission_slug: "approve-expenses"
      },
      {
        permission_id: 259,
        permission_label: "Ordonnancer les paiements",
        permission_slug: "order-payments"
      }
    ]
  },
  {
    role_id: 29,
    role_name: "Responsable Communal",
    role_slug: "municipal-manager",
    application: mockApplications[0],
    permissions: [
      {
        permission_id: 260,
        permission_label: "Gérer les services communaux",
        permission_slug: "manage-municipal-services"
      },
      {
        permission_id: 261,
        permission_label: "Superviser les activités",
        permission_slug: "supervise-activities"
      }
    ]
  },
  {
    role_id: 30,
    role_name: "Maire",
    role_slug: "mayor",
    application: mockApplications[0],
    permissions: [
      {
        permission_id: 262,
        permission_label: "Accès à toutes les fonctionnalités",
        permission_slug: "full-access"
      },
      {
        permission_id: 263,
        permission_label: "Prendre des décisions exécutives",
        permission_slug: "executive-decisions"
      }
    ]
  }
]

const mockUsers: User[] = [
  {
    user_id: "user-1",
    user_pseudo: "JohnDoe",
    user_email: "johndoe@example.com",
    user_password: "password123",
    user_phone: "1234567890",
    municipality_id: "xxxx-xxxx-xxxx-xxxx",
    id_citizen: "8ec95ed2-78bd-487a-b699-86e4cc5d6502",
    citizen: mockCitoyens[0],
    roles: [mockRoles[0]]
  },
  {
    user_id: "user-2",
    user_pseudo: "JaneSmith",
    user_email: "janesmith@example.com",
    user_password: "password456",
    user_phone: "0987654321",
    municipality_id: "yyyy-yyyy-yyyy-yyyy",
    id_citizen: "9fc95ed2-78bd-487a-b699-86e4cc5d6503",
    citizen: mockCitoyens[1],
    roles: [mockRoles[1]]
  },
  {
  user_id: "user-3",
  user_pseudo: "LASANTSY",
  user_email: "lasantsy@gmail.com",
  user_password: "root1234",
  user_phone: "0321234567",
  municipality_id: "aaaa-bbbb-cccc-dddd",
  id_citizen: "a1c95ed2-1111-487a-b699-86e4cc5d6504",
  citizen: mockCitoyens[2],
  roles: [mockRoles[2]] // SuperAdministrateur
},
{
  user_id: "user-4",
  user_pseudo: "HantaCashier",
  user_email: "hanta.cashier@example.com",
  user_password: "cashierpass",
  user_phone: "0337654321",
  municipality_id: "eeee-ffff-gggg-hhhh",
  id_citizen: "b2c95ed2-2222-487a-b699-86e4cc5d6505",
  citizen: mockCitoyens[3],
  roles: [mockRoles[3]] // Caissier
},
{
  user_id: "user-5",
  user_pseudo: "TahinaOrder",
  user_email: "tahina.order@example.com",
  user_password: "orderpass",
  user_phone: "0349876543",
  municipality_id: "iiii-jjjj-kkkk-llll",
  id_citizen: "c3c95ed2-3333-487a-b699-86e4cc5d6506",
  citizen: mockCitoyens[4],
  roles: [mockRoles[4]] // Ordonnateur
},
{
  user_id: "user-6",
  user_pseudo: "FaniryManager",
  user_email: "faniry.manager@example.com",
  user_password: "managerpass",
  user_phone: "0323344556",
  municipality_id: "mmmm-nnnn-oooo-pppp",
  id_citizen: "d4c95ed2-4444-487a-b699-86e4cc5d6507",
  citizen: mockCitoyens[5],
  roles: [mockRoles[5]] // Responsable Communal
},
{
  user_id: "user-7",
  user_pseudo: "LovaMayor",
  user_email: "lova.mayor@example.com",
  user_password: "mayorpass",
  user_phone: "0331122334",
  municipality_id: "qqqq-rrrr-ssss-tttt",
  id_citizen: "e5c95ed2-5555-487a-b699-86e4cc5d6508",
  citizen: mockCitoyens[6],
  roles: [mockRoles[6]] // Maire
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