import { apiClient } from "@/lib/api";

import type {
  MeResponse,
  SigninPayload,
  SigninResponse,
  SignupPayload,
  SignupResponse,
} from "../types";

export const signup = async (payload: SignupPayload): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>("/auth/signup", payload);
  return response.data;
};

export const signin = async (payload: SigninPayload): Promise<SigninResponse> => {
  const response = await apiClient.post<SigninResponse>("/auth/signin", payload);
  return response.data;
};

/**
 * Single source of truth for the current session; called once on app
 * start/refresh, never after login (login already returns the user).
 */
export const me = async (): Promise<MeResponse> => {
  const response = await apiClient.get<MeResponse>("/auth/profile");
  return response.data;
};
