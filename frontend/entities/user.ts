export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'operational' | 'manager'
}