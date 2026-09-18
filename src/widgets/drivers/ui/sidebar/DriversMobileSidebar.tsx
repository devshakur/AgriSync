"use client";

import { DriversSidebarPanel } from "./DriversSidebarPanel";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => (
  <>
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300 lg:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    />

    <aside
      className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-60 max-w-[75vw] touch-none flex-col overflow-hidden overscroll-none shadow-[12px_0_45px_rgba(16,77,55,0.25)] transition-transform duration-300 ease-out lg:hidden ${
        open ? "pointer-events-auto translate-x-0" : "pointer-events-none -translate-x-full"
      }`}
    >
      <DriversSidebarPanel onNavigate={onClose} onClose={onClose} />
    </aside>
  </>
);

export { MobileSidebar };
