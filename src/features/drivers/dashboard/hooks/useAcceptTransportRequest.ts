import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptTransportRequest } from "../api";

export const useAcceptTransportRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["driver-available-requests", "accept"],
    mutationFn: (requestId: string) => acceptTransportRequest(requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "driver-available-requests",
      });
    },
  });
};
