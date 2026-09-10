import { apiClient } from "@/lib/api";
import type {
  AcceptTransportRequestResponse,
  AvailableTransportRequest,
  TransportRequestDetails,
} from "../types";

export const getAvailableTransportRequests = async (): Promise<AvailableTransportRequest[]> => {
  const response = await apiClient.get<AvailableTransportRequest[]>("/driver/available");
  return response.data;
};

export const getTransportRequestById = async (id: string): Promise<TransportRequestDetails> => {
  const response = await apiClient.get<{ transportRequest: TransportRequestDetails }>(
    `/transports/${id}`,
  );
  return response.data.transportRequest;
};

export const acceptTransportRequest = async (
  requestId: string,
): Promise<AcceptTransportRequestResponse> => {
  const response = await apiClient.patch<AcceptTransportRequestResponse>(
    `/driver/accept/${requestId}`,
  );
  return response.data;
};
