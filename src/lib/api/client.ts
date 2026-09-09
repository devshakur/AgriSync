import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Prevent multiple refresh requests from running at the same time.
 *
 * If a refresh request is already running, other requests will
 * wait for the same promise instead of starting another refresh.
 */
let refreshPromise: Promise<string> | null = null;

/**
 * Get a new access token using the refresh token.
 */
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = window.localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api"}/auth/refresh`,
    {
      headers: {
        refreshToken,
      },
    },
  );

  const newAccessToken = response.data.accessToken;

  if (!newAccessToken) {
    throw new Error("Refresh response did not contain an access token");
  }

  window.localStorage.setItem("accessToken", newAccessToken);

  return newAccessToken;
};

/**
 * Request interceptor
 *
 * Attach the access token to every API request.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const accessToken = window.localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `${accessToken}`;
      }
    }

    return config;
  },
);

/**
 * Response interceptor
 *
 * If a request returns 401:
 *
 * 1. Check if this request has already been retried.
 * 2. Get/create one shared refresh request.
 * 3. Wait for the refresh request.
 * 4. Retry the original request with the new access token.
 *
 * Multiple requests receiving 401 at the same time will share
 * the same refreshPromise.
 */
apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    const originalRequest =
      error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

    /**
     * Only handle 401 responses.
     */
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    /**
     * Prevent infinite loops.
     *
     * If the retried request itself returns 401,
     * don't attempt another refresh.
     */
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    /**
     * Mark this request as retried.
     */
    originalRequest._retry = true;

    try {
      /**
       * If another request is already refreshing the token,
       * wait for that same refresh request.
       *
       * Otherwise, start a new refresh request.
       */
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      /**
       * Update the original request with the new token.
       */
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      /**
       * Retry the original request.
       */
      return apiClient(originalRequest);
    } catch (refreshError) {
      /**
       * Refresh token is invalid/expired or refresh failed.
       *
       * At this point the user needs to authenticate again.
       */
      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");

      return Promise.reject(refreshError);
    }
  },
);

export { apiClient };
export default apiClient;