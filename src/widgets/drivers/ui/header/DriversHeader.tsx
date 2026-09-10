"use client";

import { useState, useEffect } from "react";
import { Bell, TextAlignEnd, Search, } from "lucide-react";

interface DriversHeaderProps {
  name: string;
  notificationCount?: number;
  onMenuOpen?: () => void;
}

const DriversHeader = ({ name, notificationCount = 0, onMenuOpen }: DriversHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      aria-label={`Welcome ${name}`}
      className={`fixed inset-x-0 top-0 z-50 flex items-center gap-4 px-4 py-4 transition ${
        isScrolled ? "bg-emerald-50" : "bg-emerald-50"
      } lg:left-64 lg:w-auto`}
    >
      <div className="flex w-full items-center justify-between gap-3">
        <div className="w-full flex justify-between items-center gap-3">
          {/* Mobile menu button */}
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-tight text-gray-800">Welcome, {name}</h1>
          </div>
          <button onClick={onMenuOpen} aria-label="Open menu" className="flex h-10 w-10 items-center justify-center text-gray-800 lg:hidden">
            <TextAlignEnd className="h-5 w-5" />
          </button>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input className="h-10 w-52 rounded-xl shadow-md bg-transparent pl-10 pr-3 text-sm text-muted-foreground" placeholder="Search requests..." />
          </div>

          <button className="relative hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-emerald-100 lg:flex">
            <Bell size={20} className="text-gray-800" />
            {notificationCount > 0 && (
              <span className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
                {notificationCount > 9 ? "9+" : notificationCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export { DriversHeader };
