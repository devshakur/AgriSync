const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export type AuthTokens = {
  token?: string;
  refreshToken?: string;
};

export const hasStoredAccessToken = (): boolean => {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(ACCESS_TOKEN_KEY));
};

export const setTokens = (tokens: AuthTokens): void => {
  if (typeof window === "undefined") return;

  if (tokens.token) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.token);
  }
  if (tokens.refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
};

export const clearTokens = (): void => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};
