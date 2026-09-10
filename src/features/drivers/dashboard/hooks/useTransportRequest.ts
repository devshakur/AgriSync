import { useQuery } from "@tanstack/react-query";

import { getTransportRequestById } from "../api";

export const useTransportRequest = (id?: string, enabled = true) =>
  useQuery({
    queryKey: ["transport-request", "detail", id],
    queryFn: () => getTransportRequestById(id as string),
    enabled: Boolean(id) && enabled,
  });
