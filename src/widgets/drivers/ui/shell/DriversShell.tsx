"use client";

import { ReactNode, useState } from "react";
import { DriversHeader } from "../header/DriversHeader";
import { DriversSidebar } from "../sidebar/DriversSidebar";
import { MobileSidebar } from "@/widgets/drivers/ui/sidebar/DriversMobileSidebar";

type DriversShellProps = { children: ReactNode };

const DriversShell = ({ children }: DriversShellProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-dvh overflow-hidden bg-white">
      <DriversSidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <DriversHeader
          notificationCount={2}
          onMenuOpen={() => setIsMobileSidebarOpen(true)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-6 pt-0 sm:px-6 lg:px-8">
          <div className="w-full">{children}</div>
        </main>
      </div>

      <MobileSidebar open={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
    </div>
  );
};

export { DriversShell };
