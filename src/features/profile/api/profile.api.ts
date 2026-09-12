import { me } from "@/features/auth/api";
import type { MeResponse } from "@/features/auth/types";
import { normalizeUser } from "@/features/auth/lib/normalize-user";
import type { UpdateProfilePayload } from "../types";

/**
 * Fetches the current user profile.
 * Uses the existing session endpoint: GET /auth/profile
 */
export const getProfile = async (): Promise<MeResponse> => me();

export const getNormalizedProfileUser = async () => {
  const response = await getProfile();
  return normalizeUser(response.user);
};

/**
 * Integration point for profile updates.
 *
 * Backend update endpoint is not available yet — do not invent a URL.
 * When the API is ready, replace the body with something like:
 *
 *   const response = await apiClient.patch<MeResponse>("/auth/profile", payload);
 *   return response.data;
 */
export const UPDATE_PROFILE_AVAILABLE = false;

export const updateProfile = async (
  payload: UpdateProfilePayload,
): Promise<MeResponse> => {
  void payload;
  throw new Error(
    "Profile updates are not available yet. The update endpoint has not been connected.",
  );
};
