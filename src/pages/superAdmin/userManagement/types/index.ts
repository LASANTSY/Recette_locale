export interface Citoyen {
  id_citizen: string
  citizen_name: string
  citizen_lastname: string
  citizen_date_of_birth: string
  citizen_location_of_birth: string
  citizen_photo: string
  citizen_national_card_number: number
  citizen_adress: string
  citizen_city: string
  fokotany_id: number
  citizen_work: string
  citizen_father: string
  citizen_mother: string
  citizen_national_card_location: string
  citizen_national_card_date: string
}

export interface User {
  user_id?: string
  user_email: string
  user_phone: string
  municipality_id: string
  citizen?: Citoyen
  roles?: Role[]
}

export interface Role {
  role_id: number
  role_name: string
  role_slug: string
  application: Application
  permissions?: Permission[]
}

export interface Permission {
  permission_id: number
  permission_label: string
  permission_slug: string
  roles?: Role[]
}

export interface Application {
  app_id: number
  app_name: string
  app_slug: string
  app_url: string
}

export interface UserRole {
  user_id: string
  role_id: number
}

export interface RolePermission {
  role_id: number
  permission_id: number
}
