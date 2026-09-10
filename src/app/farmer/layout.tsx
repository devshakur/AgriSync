import type { ReactNode } from "react";
import { DashboardShell } from "@/widgets/dashboard";
import { RoleGuard } from "@/features/auth/guards";
import { RequestDriverProvider } from "@/features/farmers/request-driver/context";

type FarmerLayoutProps = {
  children: ReactNode;
};

export default function FarmerLayout({ children }: FarmerLayoutProps) {
  return (
    <RoleGuard allowedRoles={["farmer"]}>
      <RequestDriverProvider>
        <DashboardShell>{children}</DashboardShell>
      </RequestDriverProvider>
    </RoleGuard>
  );
}
