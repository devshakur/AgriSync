import { useMutation } from "@tanstack/react-query";

import { signin } from "../api";
import type { SigninPayload } from "../types";

export const useSignin = () =>
  useMutation({
    mutationKey: ["auth", "signin"],
    mutationFn: (payload: SigninPayload) => signin(payload),
  });
