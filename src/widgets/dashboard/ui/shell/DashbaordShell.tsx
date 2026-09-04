"use client";
import { ReactNode } from "react";
import { useState } from "react";
import { DashboardHeader } from "../header";
import { DashboardSidebar, MobileSidebar } from "../sidebar";

type DashboardShellProps = {
  children: ReactNode;
};

const  DashboardShell = ({ children }: DashboardShellProps) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="lg:pl-62.5">
        <DashboardHeader 
        name="Abdulshakur"
         notificationCount={3}
        onMenuOpen={() => setIsMobileSidebarOpen(true)}
        onListProduce={() => {
          console.log("Open list produce");
        }}    
        />

        <main className="px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pt-24">
          <div className="w-full">{children}</div>
        </main>
      </div>

      <MobileSidebar
        open={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
    </div>
  );
}

export { DashboardShell };