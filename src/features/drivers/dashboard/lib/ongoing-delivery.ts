import type { AvailableTransportRequest } from "../types";

export const ONGOING_DELIVERY_QUERY_KEY = ["driver-ongoing-delivery"] as const;

const STORAGE_KEY = "agrilink.driver.ongoing-delivery";

export const isActiveOngoingDelivery = (
  request?: AvailableTransportRequest | null,
): request is AvailableTransportRequest => {
  if (!request || request.isDelete || request.isDelivered) return false;
  return request.isAccepted || request.isInTransit;
};

export const getOngoingStep = (request: AvailableTransportRequest) => {
  if (request.isDelivered) return 3;
  if (request.isInTransit) return 1;
  return 0;
};

export const readStoredOngoingDelivery = (): AvailableTransportRequest | null => {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as AvailableTransportRequest;
    return isActiveOngoingDelivery(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const writeStoredOngoingDelivery = (request: AvailableTransportRequest | null) => {
  if (typeof window === "undefined") return;

  try {
    if (!request || !isActiveOngoingDelivery(request)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(request));
  } catch {
    // Ignore storage failures (private mode, quota, etc.)
  }
};
