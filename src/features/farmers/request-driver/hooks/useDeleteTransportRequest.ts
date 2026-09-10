import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTransportRequest } from "../api";

export const useDeleteTransportRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["transport-requests", "delete"],
    mutationFn: (id: string) => deleteTransportRequest(id),
    onSuccess: () => {
      // Ensure dashboard and other consumers refetch fresh data after deletion
      queryClient.invalidateQueries({
        predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === "transport-requests",
      });
    },
  });
};
