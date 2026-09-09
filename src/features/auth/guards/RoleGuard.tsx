"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import type { AuthRole } from "../types";
import { useAuth } from "../context";

type RoleGuardProps = {
  allowedRoles: AuthRole[];
  children: ReactNode;
};

/**
 * Protects a route subtree: unauthenticated users are sent to /login,
 * authenticated users whose role isn't allowed are sent to their own dashboard.
 */
export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const isForbidden = Boolean(user) && !allowedRoles.includes(user!.role);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (isForbidden) {
      router.replace(`/${user!.role}`);
    }
  }, [isLoading, isAuthenticated, isForbidden, user, router]);

  if (isLoading || !isAuthenticated || isForbidden) {
    return null;
  }

  return <>{children}</>;
}
