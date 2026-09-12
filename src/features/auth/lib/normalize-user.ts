import type { ProfileUserPayload, User } from "../types";

/**
 * Normalizes the backend profile payload into the frontend `User` shape.
 * Handles `_id` vs `id` and keeps optional fields extendable.
 */
export const normalizeUser = (
  payload: ProfileUserPayload | User | null | undefined,
): User | null => {
  if (!payload) return null;

  const id =
    ("id" in payload && payload.id) ||
    ("_id" in payload && typeof payload._id === "string" ? payload._id : "") ||
    "";

  if (!id || !payload.fullName || !payload.email || !payload.phone || !payload.role) {
    return null;
  }

  return {
    id,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    role: payload.role,
    createdAt: payload.createdAt,
    location: payload.location ?? null,
    city: payload.city ?? null,
    dateOfBirth: payload.dateOfBirth ?? null,
    gender: payload.gender ?? null,
    referralCode: payload.referralCode ?? null,
    avatarUrl: payload.avatarUrl ?? null,
    isVerified: payload.isVerified,
    isDeleted: payload.isDeleted,
  };
};
