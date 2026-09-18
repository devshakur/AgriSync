import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptTransportRequest, getTransportRequestById } from "../api";
import type { AvailableTransportRequest } from "../types";
import {
  ONGOING_DELIVERY_QUERY_KEY,
  writeStoredOngoingDelivery,
} from "../lib/ongoing-delivery";

export const useAcceptTransportRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["driver-available-requests", "accept"],
    mutationFn: async (requestId: string) => {
      const data = await acceptTransportRequest(requestId);
      if (data.transportRequest) return data.transportRequest;

      try {
        return await getTransportRequestById(requestId);
      } catch {
        const list = queryClient.getQueryData<AvailableTransportRequest[]>([
          "driver-available-requests",
          "list",
        ]);
        const fromList = list?.find((request) => request._id === requestId);
        if (fromList) return { ...fromList, isAccepted: true };
        throw new Error("Accepted request details were unavailable.");
      }
    },
    onSuccess: (request) => {
      const accepted = { ...request, isAccepted: true };
      writeStoredOngoingDelivery(accepted);
      queryClient.setQueryData(ONGOING_DELIVERY_QUERY_KEY, accepted);

      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "driver-available-requests",
      });
    },
  });
};
