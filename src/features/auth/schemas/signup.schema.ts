import { z } from "zod";

import { userRoles } from "../types";

export const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Full name must be at least 2 characters."),
    email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirm your password."),
    phone: z
      .string()
      .trim()
      .min(1, "Phone number is required.")
      .regex(/^\d+$/, "Phone number must contain digits only."),
    role: z.enum(userRoles),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
