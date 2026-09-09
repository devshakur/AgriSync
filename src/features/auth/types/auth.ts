export const userRoles = ["farmer", "buyer", "driver"] as const;

export type AuthRole = (typeof userRoles)[number];

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: AuthRole;
  location: string;
  city: string;
};

export type SigninPayload = {
  phone: string;
  password: string;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: AuthRole;
  createdAt: string;
};

export type SignupResponse = {
  user?: User;
  message?: string;
  token?: string;
  refreshToken?: string;
};

export type SigninResponse = {
  user?: User;
  message?: string;
  token?: string;
  refreshToken?: string;
};

export type MeResponse = {
  user?: User;
  message?: string;
};

