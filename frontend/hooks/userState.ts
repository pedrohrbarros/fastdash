import { create } from "zustand";
import { User } from "../entities/user";

interface UserState extends User {
  setFirstName: (firstname: string) => void;
  setLastName: (lastName: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPassword: (password: string) => void;
}
export const userStore = create<UserState>()((set) => ({
  id: "0",
  firstname: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",

  setFirstName: (firstname: string) => set(() => ({ firstname: firstname })),
  setLastName: (lastName: string) => set(() => ({ lastName: lastName })),
  setEmail: (email: string) => set(() => ({ email: email })),
  setPassword: (password: string) => set(() => ({ password: password })),
  setPhone: (phone: string) => set(() => ({ phone: phone })),
}));
