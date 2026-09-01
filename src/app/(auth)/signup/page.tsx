import { Suspense } from "react";
import { SignUp } from "@/features/auth/signup/Signup";

export default function RolePage() {
  return (
    <Suspense fallback={null}>
      <SignUp />
    </Suspense>
  );
}
