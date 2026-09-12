import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/features/auth/context";
import { normalizeUser } from "@/features/auth/lib/normalize-user";
import { updateProfile } from "../api";
import type { UpdateProfilePayload } from "../types";
import { profileQueryKey } from "./useProfile";

/**
 * Mutation hook for profile updates.
 * Ready to wire once `updateProfile` in profile.api.ts points at a real endpoint.
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationKey: ["auth", "profile", "update"],
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (response) => {
      const nextUser = normalizeUser(response.user);
      if (nextUser) {
        updateUser(nextUser);
        queryClient.setQueryData(profileQueryKey, nextUser);
      }
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "auth" && query.queryKey[1] === "profile",
      });
    },
  });
};
