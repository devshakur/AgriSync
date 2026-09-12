import { z } from "zod";

export const editProfileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^[\d+\s()-]+$/, "Enter a valid phone number."),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
});

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;
