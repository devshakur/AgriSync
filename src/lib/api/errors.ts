import axios, { type AxiosError } from "axios";

export type ApiErrorPayload = {
  message?: string;
  error?: string;
  errors?: Record<string, string[] | string> | string[];
  [key: string]: unknown;
};

export class ApiError extends Error {
  status?: number;
  code?: string;
  data?: unknown;
  cause?: unknown;

  constructor(
    message: string,
    options: {
      status?: number;
      code?: string;
      data?: unknown;
      cause?: unknown;
    } = {},
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.data = options.data;
    this.cause = options.cause;
  }
}

const getAxiosMessage = (error: AxiosError<ApiErrorPayload>) => {
  const payload = error.response?.data;

  if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (typeof payload?.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    const first = payload.errors[0];
    return typeof first === "string" ? first : "Request failed";
  }

  if (payload && typeof payload.errors === "object") {
    const firstEntry = Object.values(payload.errors)[0];
    if (Array.isArray(firstEntry) && firstEntry.length > 0) {
      return firstEntry[0];
    }
    if (typeof firstEntry === "string" && firstEntry.trim()) {
      return firstEntry;
    }
  }

  // No response body (timeout, network failure, aborted request) — the raw
  // axios message (e.g. "timeout of 15000ms exceeded") isn't user-friendly.
  return "An error occurred. Please try again.";
};

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) {
    return error;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const code = error.code ?? "API_ERROR";
    const message = getAxiosMessage(error);

    return new ApiError(message, {
      status,
      code,
      data: error.response?.data,
      cause: error,
    });
  }

  if (error instanceof Error) {
    return new ApiError(error.message, {
      cause: error,
    });
  }

  return new ApiError("An unexpected API error occurred.", {
    cause: error,
  });
};

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

export const getErrorMessage = (error: unknown): string =>
  normalizeApiError(error).message;
