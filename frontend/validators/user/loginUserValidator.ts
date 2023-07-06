import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email({ message: "An e-mail adress is required" }),
  password: z.string()
})