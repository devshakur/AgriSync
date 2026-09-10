import { useQuery } from "@tanstack/react-query";

import { getTransportRequests } from "../api";

export const useTransportRequests = () =>
  useQuery({
    queryKey: ["transport-requests", "list"],
    queryFn: getTransportRequests,
    // Always refetch when the component mounts (e.g., navigating back to dashboard)
    refetchOnMount: "always",
    // Also refetch when the user focuses the window to ensure fresh data
    refetchOnWindowFocus: true,
  });
