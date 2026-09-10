import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTransportRequest } from "../api";
import type { TransportRequestPayload } from "../types";

export const useCreateTransportRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["transport-requests", "create"],
    mutationFn: (payload: TransportRequestPayload) => createTransportRequest(payload),
    onSuccess: () => {
      // Ensure dashboard and other consumers refetch fresh data
      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "transport-requests",
      });
    },
  });
};
