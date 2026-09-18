"use client";

import { DriversSidebarPanel } from "./DriversSidebarPanel";

const DriversSidebar = () => (
  <aside className="hidden h-full w-64 shrink-0 overflow-hidden overscroll-none touch-none lg:flex lg:flex-col">
    <DriversSidebarPanel />
  </aside>
);

export { DriversSidebar };
