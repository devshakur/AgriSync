import { apiClient } from "@/lib/api";
import type {
  DeleteTransportRequestResponse,
  TransportRequest,
  TransportRequestPayload,
  TransportRequestResponse,
  TransportRequestsListResponse,
} from "../types";

export const createTransportRequest = async (
  payload: TransportRequestPayload,
): Promise<TransportRequestResponse> => {
  const response = await apiClient.post<TransportRequestResponse>("/transports", payload);
  return response.data;
};

export const getTransportRequests = async (): Promise<TransportRequest[]> => {
  const response = await apiClient.get<TransportRequestsListResponse>("/transports");
  return response.data.transportRequests;
};

export const deleteTransportRequest = async (
  id: string,
): Promise<DeleteTransportRequestResponse> => {
  const response = await apiClient.delete<DeleteTransportRequestResponse>(`/transports/${id}`);
  return response.data;
};
