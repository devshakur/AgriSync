"use client";

import { useEffect, useState } from "react";
import { Bell, Plus, Search, TextAlignEnd } from "lucide-react";
import { AnimatedSearchPlaceholder } from "@/shared/ui";

interface DashboardHeaderProps {
  name: string;
  notificationCount?: number;
  onMenuOpen?: () => void;
  onListProduce?: () => void;
}

const DashboardHeader = ({
  name,
  notificationCount = 0,
  onMenuOpen,
  onListProduce,
}: DashboardHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 flex w-full flex-col gap-4  px-4 py-4  transition-colors sm:px-6 lg:left-62.5 lg:w-auto lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-7 ${isScrolled ? "bg-[#f9f7f0]" : "bg-background"}`}>
      {/* Greeting */}
      <div className="flex w-full min-w-0 items-center justify-between gap-3 lg:w-auto">
        <div className="w-full min-w-0 lg:w-auto">
          <div className="flex w-full items-center justify-between gap-3">
            <h1 className="text-lg font-semibold tracking-tight text-gray-800 md:text-xl">
              Welcome, {name}.
            </h1>

            <div className="flex shrink-0 items-center gap-1 lg:hidden">
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-gray-100"
              >
                <Bell size={22} strokeWidth={1.8} className="text-gray-900" />

                {notificationCount > 0 && (
                  <span className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onMenuOpen}
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center text-gray-800"
              >
                <TextAlignEnd className="h-5 w-5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile search */}
      {/* <div className="relative w-full md:w-69 md:self-end lg:hidden">
        <Search
          size={20}
          strokeWidth={2}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <input
          type="search"
          placeholder="Search anything..."
          className="h-11 w-full rounded-xl border-gray-200 bg-background pl-4 pr-12 text-sm text-muted-foreground shadow-sm outline-none transition placeholder:text-muted-foreground focus:border-gray-400"
        />
      </div> */}

      {/* Right side */}
      <div className="hidden w-full items-center justify-end gap-3 lg:flex lg:w-auto lg:gap-8">
        {/* Search */}
        <div className="relative hidden w-69 md:block">
          <Search
            size={20}
            strokeWidth={2}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <AnimatedSearchPlaceholder
            value={search}
            phrases={["Search for produce...", "Search for drivers...", "Search for orders..."]}
            className="left-4 right-12 text-sm text-muted-foreground"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder=""
            aria-label="Search dashboard"
            className="relative z-10 h-11 w-full rounded-xl border-gray-200 bg-transparent pl-4 pr-12 text-sm text-muted-foreground shadow-md outline-none transition placeholder:text-muted-foreground focus:border-gray-400"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative hidden h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-gray-100 lg:flex"
        >
          <Bell size={22} strokeWidth={1.8} className="text-gray-900" />

          {notificationCount > 0 && (
            <span className="absolute right-0.5 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* List Produce */}
        <button
          type="button"
          onClick={onListProduce}
          className="hidden h-11 items-center gap-2 rounded-xl bg-green-800 px-5 text-sm font-medium text-white transition hover:bg-green-900 lg:flex"
        >
          <Plus size={19} strokeWidth={2} />
          <span>List Produce</span>
        </button>
      </div>
    </header>
  );
}

export {DashboardHeader};