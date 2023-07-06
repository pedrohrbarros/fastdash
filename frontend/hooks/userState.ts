import { create } from "zustand";
import { User } from "../entities/user";

interface UserState extends User {
  setFirstName: (firstname: string) => void;
  setLastName: (lastname: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string | undefined | null) => void;
  setPassword: (password: string) => void;
}
export const userStore = create<UserState>()((set) => ({
  id: "0",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  phone: undefined,

  setFirstName: (firstname: string) => set(() => ({ firstname: firstname })),
  setLastName: (lastname: string) => set(() => ({ lastname: lastname })),
  setEmail: (email: string) => set(() => ({ email: email })),
  setPassword: (password: string) => set(() => ({ password: password })),
  setPhone: (phone: string | undefined | null) => set(() => ({ phone: phone })),
}));
