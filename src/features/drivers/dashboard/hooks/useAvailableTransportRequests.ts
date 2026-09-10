import { useQuery } from "@tanstack/react-query";

import { getAvailableTransportRequests } from "../api";

export const useAvailableTransportRequests = () =>
  useQuery({
    queryKey: ["driver-available-requests", "list"],
    queryFn: getAvailableTransportRequests,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
  });
