import type { ReactNode } from "react";
import { DashboardShell } from "@/widgets/dashboard";

type FarmerLayoutProps = {
  children: ReactNode;
};

export default function FarmerLayout({ children }: FarmerLayoutProps) {
  return <DashboardShell>{children}</DashboardShell>;
}
