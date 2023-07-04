import { z } from "zod";

export const userInfoSchema = z.object({
  firstname: z.string().toUpperCase().min(1, { message: "Minimum length: 1" }),
  lastName: z.string().toUpperCase().min(1, { message: "Minimum length: 1" }),
  email: z.string().email({ message: "An e-mail adress is required" }),
  phone: z
    .string()
    .max(16, { message: "Max length of phone number is 16 digits" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Minimum length of password is 8 digits" })
    .refine(
      (value) =>
        /^(?=.*[A-Z])(?=.*[a-z]{3,})(?=.*\d)(?=.*[^A-Za-z0-9])/.test(value),
      {
        message:
          "Password must contain at least 1 uppercase letter, 3 lowercase letters, 1 number and 1 symbol",
      }
    ),
});
