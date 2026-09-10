"use client";

import { ReactNode, useState } from "react";
import { DriversHeader } from "../header/DriversHeader";
import { DriversSidebar } from "../sidebar/DriversSidebar";
import { MobileSidebar } from "@/widgets/drivers/ui/sidebar/DriversMobileSidebar";
import { useAuth } from "@/features/auth/context";

type DriversShellProps = { children: ReactNode };

const DriversShell = ({ children }: DriversShellProps) => {
  const { user } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-emerald-50">
      <DriversSidebar />

      <div className="lg:pl-64">
        <DriversHeader name={user?.fullName ?? ""} notificationCount={2} onMenuOpen={() => setIsMobileSidebarOpen(true)} />

        <main className="px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pt-24">
          <div className="w-full">{children}</div>
        </main>
      </div>

      <MobileSidebar open={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </div>
  );
};

export { DriversShell };
