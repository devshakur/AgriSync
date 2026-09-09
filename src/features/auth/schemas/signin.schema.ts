import { z } from "zod";

export const signinSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^\d+$/, "Phone number must contain digits only."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(8, "Password must be at least 8 characters."),
});

export type SigninFormValues = z.infer<typeof signinSchema>;
