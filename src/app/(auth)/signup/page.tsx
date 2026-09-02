import { Suspense } from "react";
import { SignUp } from "@/features/auth/signup";

export default function RolePage() {
  return (
    <Suspense fallback={null}>
      <SignUp />
    </Suspense>
  );
}
