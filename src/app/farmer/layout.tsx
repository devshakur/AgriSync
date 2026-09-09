import type { ReactNode } from "react";
import { DashboardShell } from "@/widgets/dashboard";
import { RoleGuard } from "@/features/auth/guards";

type FarmerLayoutProps = {
  children: ReactNode;
};

export default function FarmerLayout({ children }: FarmerLayoutProps) {
  return (
    <RoleGuard allowedRoles={["farmer"]}>
      <DashboardShell>{children}</DashboardShell>
    </RoleGuard>
  );
}
