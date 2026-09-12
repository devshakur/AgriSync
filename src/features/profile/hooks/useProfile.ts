import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/context";
import { getNormalizedProfileUser } from "../api";

export const profileQueryKey = ["auth", "profile"] as const;

/**
 * Profile query backed by GET /auth/profile.
 * Seeded from AuthContext when available to avoid a redundant loading flash.
 */
export const useProfile = () => {
  const { user, isLoading: isAuthLoading } = useAuth();

  return useQuery({
    queryKey: profileQueryKey,
    queryFn: getNormalizedProfileUser,
    enabled: !isAuthLoading,
    initialData: user ?? undefined,
    staleTime: 60_000,
    refetchOnMount: user ? false : "always",
  });
};
