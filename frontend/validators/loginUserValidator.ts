import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email({ message: "An e-mail adress is required" }),
  password: z.string().min(8, { message: "Minimum length of password is 8 digits" }).refine((value) => /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[^A-Za-z0-9])/.test(value), { message: "Password must contain at least 1 uppercase letter, 3 lowercase letters, 1 number and 1 symbol" })
})