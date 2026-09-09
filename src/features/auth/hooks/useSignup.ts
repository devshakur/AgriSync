import { useMutation } from "@tanstack/react-query";

import { signup } from "../api";
import type { SignupPayload } from "../types";

export const useSignup = () =>
  useMutation({
    mutationKey: ["auth", "signup"],
    mutationFn: (payload: SignupPayload) => signup(payload),
  });
