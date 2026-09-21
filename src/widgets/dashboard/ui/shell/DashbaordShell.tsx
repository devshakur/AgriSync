"use client";
import { ReactNode } from "react";
import { useState } from "react";
import { useAuth } from "@/features/auth/context";
import { DashboardHeader } from "../header";
import { DashboardSidebar, MobileSidebar } from "../sidebar";
import { ProduceModal } from "../produce-modal";

type DashboardShellProps = {
  children: ReactNode;
};

const  DashboardShell = ({ children }: DashboardShellProps) => {
  const { user } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isProduceModalOpen, setIsProduceModalOpen] = useState(false);

  return (
    <div className="h-dvh overflow-y-auto hide-scrollbar bg-background">
      <DashboardSidebar />

      <div className="lg:pl-62.5">
        <DashboardHeader 
        name={user?.fullName ?? ""}
         notificationCount={3}
        onMenuOpen={() => setIsMobileSidebarOpen(true)}
        onListProduce={() => {
          setIsProduceModalOpen(true);
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

      <ProduceModal
        key={isProduceModalOpen ? "create-open" : "create-closed"}
        open={isProduceModalOpen}
        onClose={() => setIsProduceModalOpen(false)}
      />
    </div>
  );
}

export { DashboardShell };