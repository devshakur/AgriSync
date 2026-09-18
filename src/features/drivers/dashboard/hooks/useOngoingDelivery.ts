import { useQuery } from "@tanstack/react-query";
import { useAvailableTransportRequests } from "./useAvailableTransportRequests";
import {
  isActiveOngoingDelivery,
  ONGOING_DELIVERY_QUERY_KEY,
  readStoredOngoingDelivery,
} from "../lib/ongoing-delivery";

export const useOngoingDelivery = () => {
  const storedQuery = useQuery({
    queryKey: ONGOING_DELIVERY_QUERY_KEY,
    queryFn: async () => readStoredOngoingDelivery(),
    initialData: () => readStoredOngoingDelivery() ?? undefined,
    staleTime: Infinity,
  });

  const availableQuery = useAvailableTransportRequests();
  const acceptedFromList = (availableQuery.data ?? []).find(isActiveOngoingDelivery);

  return {
    ...storedQuery,
    data: storedQuery.data ?? acceptedFromList ?? null,
  };
};
