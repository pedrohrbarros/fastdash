import { create } from 'zustand'

interface FormState {
  role: string
  setRole: (role: string) => void
}

export const formStore = create<FormState>()((set) => ({
  role: 'login',
  setRole: (role: string) => set(() => ({ role: role }))
}))