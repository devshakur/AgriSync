"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LogOut, Star, X } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { DEFAULT_DRIVER_AVATAR } from "@/features/profile/lib/profile-utils";
import { useAvailableTransportRequests } from "@/features/drivers/dashboard/hooks";
import {
  DRIVER_RATING_PLACEHOLDER,
  DRIVER_SIDEBAR_TRUCK_IMAGE,
  driverSidebarNav,
  isDriverNavActive,
} from "./DriversSidebarNav";

type DriversSidebarPanelProps = {
  onNavigate?: () => void;
  onClose?: () => void;
};

const DriversSidebarPanel = ({ onNavigate, onClose }: DriversSidebarPanelProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { data: availableRequests } = useAvailableTransportRequests();
  const availableCount = availableRequests?.length ?? 0;

  const handleLogout = () => {
    logout();
    onNavigate?.();
    router.push("/login");
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden bg-[#0E4A38]">
      <div className="flex shrink-0 items-start justify-between gap-2 px-4 pb-3 pt-5">
        <Link href="/drivers" onClick={onNavigate} className="flex min-w-0 items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white">
            <Image
              src="/assests/logo/Agricsync_logo.png"
              alt="AgriSync_logo"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-heading text-base font-bold leading-tight text-white">AgriSync</p>
            <p className="mt-0.5 truncate text-[10px] leading-tight text-emerald-200/80">
              Move Produce. Build Tomorrow.
            </p>
          </div>
        </Link>

        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <nav className="shrink-0 px-3 pb-3" aria-label="Driver navigation">
        <ul className="space-y-0.5">
          {driverSidebarNav.map((item) => {
            const Icon = item.icon;
            const active = isDriverNavActive(pathname, item);
            const showBadge = item.badgeKey === "availableRequests" && availableCount > 0;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-[#1A6B50] text-white"
                      : "text-emerald-50/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" strokeWidth={1.75} />
                  <span className="min-w-0 flex-1 truncate">{item.label}</span>
                  {showBadge ? (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#4ADE80]" aria-label={`${availableCount} available requests`} />
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative mt-auto min-h-0 flex-1 overflow-hidden">
        <Image
          src={DRIVER_SIDEBAR_TRUCK_IMAGE}
          alt="AgriSync delivery truck on a rural road"
          fill
          draggable={false}
          className="pointer-events-none select-none object-cover object-[center_72%]"
          sizes="256px"
          priority
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "linear-gradient(to bottom, #0E4A38 0%, rgba(14,74,56,0.88) 10%, rgba(14,74,56,0.28) 24%, transparent 38%)",
              "linear-gradient(to top, #0E4A38 0%, rgba(14,74,56,0.92) 14%, rgba(14,74,56,0.35) 28%, transparent 42%)",
              "linear-gradient(to right, #0E4A38 0%, transparent 8%, transparent 92%, #0E4A38 100%)",
              "radial-gradient(ellipse 150% 130% at 50% 58%, transparent 64%, rgba(14,74,56,0.22) 86%, #0E4A38 100%)",
            ].join(", "),
          }}
        />

        <div className="absolute inset-x-0 bottom-0 px-3 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image
                src={user?.avatarUrl || DEFAULT_DRIVER_AVATAR}
                alt={user?.fullName ?? "Driver"}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{user?.fullName ?? "Driver"}</p>
              <div className="flex gap-2">
              <p className="text-xs text-emerald-100/80">Driver</p>
                <span className="flex items-center gap-1 text-xs font-medium text-white">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                {DRIVER_RATING_PLACEHOLDER}
              </span>
              </div>
            </div>

           

            <div className="flex shrink-0 flex-col items-end gap-1">
            
               <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-emerald-100/90 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
            </button>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { DriversSidebarPanel };
