"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, TextAlignEnd } from "lucide-react";

export const DRIVER_HEADER_BANNER_IMAGES = [
  "/assests/images/driver-sidebar-truck.jpg",
  "/assests/images/delivery-bike.jpg",
  "/assests/images/hero-farm.jpg",
] as const;

const SLIDE_MS = 5000;

type DriversHeaderProps = {
  notificationCount?: number;
  onMenuOpen?: () => void;
};

type DriversDashboardBannerProps = {
  fullName: string;
};

const getFirstName = (fullName: string) => {
  const first = fullName.trim().split(/\s+/)[0];
  return first || "Driver";
};

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const NotificationBell = ({
  notificationCount,
  className,
  iconClassName,
}: {
  notificationCount: number;
  className: string;
  iconClassName: string;
}) => (
  <button type="button" aria-label="Notifications" className={className}>
    <Bell className={iconClassName} />
    {notificationCount > 0 ? (
      <span className="absolute right-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
    ) : null}
  </button>
);

const DriversHeader = ({
  notificationCount = 0,
  onMenuOpen,
}: DriversHeaderProps) => {
  return (
    <header className="z-30 flex w-full shrink-0 items-center justify-between gap-3 bg-[#0E4A38] px-4 py-3 lg:hidden">
      <Link href="/drivers" className="flex min-w-0 items-center gap-2">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg bg-white">
          <Image
            src="/assests/logo/Agricsync-short-logo.png"
            alt="AgriSync"
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="font-heading text-base font-bold text-white">AgriSync</span>
      </Link>

      <div className="flex shrink-0 items-center">
        <NotificationBell
          notificationCount={notificationCount}
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-white"
          iconClassName="h-5 w-5"
        />
        <button
          type="button"
          onClick={onMenuOpen}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center text-white"
        >
          <TextAlignEnd className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

const DriversDashboardBanner = ({ fullName }: DriversDashboardBannerProps) => {
  const firstName = getFirstName(fullName);
  const greeting = getTimeGreeting();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % DRIVER_HEADER_BANNER_IMAGES.length);
    }, SLIDE_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="-mx-4 hidden sm:-mx-6 lg:-mx-8 lg:block">
      <div className="relative h-40 w-full overflow-hidden">
        {DRIVER_HEADER_BANNER_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            className={`object-cover object-[center_55%] transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            sizes="100vw"
          />
        ))}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black/25 shadow-[inset_0_70px_80px_-12px_rgba(0,0,0,0.72)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/70 via-black/25 to-black/45"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/50 via-black/15 to-transparent"
        />

        <div className="relative z-10 flex h-full items-center px-8">
          <div className="min-w-0">
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-white drop-shadow-md">
              {greeting}, {firstName} <span aria-hidden="true">👋</span>
            </h1>
            <p className="mt-1 text-sm text-white/85 drop-shadow-sm">
              Here&apos;s what&apos;s happening with your deliveries today.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

const DriversMobileGreeting = ({ fullName }: DriversDashboardBannerProps) => {
  const firstName = getFirstName(fullName);
  const greeting = getTimeGreeting();

  return (
    <div className="rounded-b-2xl bg-[#0E4A38] px-4 pb-5 pt-0 sm:-mx-6 sm:px-6 lg:hidden">
      <h1 className="font-heading text-xl font-semibold tracking-tight text-white">
        {greeting}, {firstName}
      </h1>
    </div>
  );
};

export { DriversHeader, DriversDashboardBanner, DriversMobileGreeting };
