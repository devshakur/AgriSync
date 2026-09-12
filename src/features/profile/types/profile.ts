import type { User } from "@/features/auth/types";

export type UpdateProfilePayload = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  location?: string;
};

export type ProfileFieldKey =
  | "fullName"
  | "email"
  | "phone"
  | "location"
  | "createdAt"
  | "referralCode"
  | "dateOfBirth"
  | "gender"
  | "role";

export type EditableProfileValues = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  location: string;
};

export type ProfileQueryData = User;
