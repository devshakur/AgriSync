export const userRoles = ["farmer", "buyer", "driver"] as const;

export type AuthRole = (typeof userRoles)[number];

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: AuthRole;
  location?: string;
  city?: string;
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
  /** Optional fields — backend may add these over time */
  location?: string | null;
  city?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  referralCode?: string | null;
  avatarUrl?: string | null;
  isVerified?: boolean;
  isDeleted?: boolean;
};

/** Raw profile payload as returned by the API (may use `_id`). */
export type ProfileUserPayload = Omit<User, "id"> & {
  id?: string;
  _id?: string;
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
  user?: ProfileUserPayload | User;
  message?: string;
};

