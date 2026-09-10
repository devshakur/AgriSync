import type { ReactNode } from "react";
import { DriversShell } from "@/widgets/drivers";
import { RoleGuard } from "@/features/auth/guards";

type DriversLayoutProps = { children: ReactNode };

export default function DriversLayout({ children }: DriversLayoutProps) {
  return (
    <RoleGuard allowedRoles={["driver"]}>
      <DriversShell>{children}</DriversShell>
    </RoleGuard>
  );
}
