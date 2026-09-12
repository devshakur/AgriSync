
"use client";
import { useAuth } from "@/features/auth/context/AuthContext";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Route,
  Truck,
  Wallet,
  Settings,
  MessagesSquare,
  Bell,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Phone,
  CircleDollarSign,
  ClipboardCheck,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import router from "next/dist/shared/lib/router/router";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
};

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
};

const workspaceNavigation: NavItem[] = [
  {
    label: "Overview",
    href: "/drivers",
    icon: LayoutDashboard,
    description: "Your daily activity",
  },
  {
    label: "Requests",
    href: "/drivers/requests",
    icon: ClipboardCheck,
    description: "Find delivery jobs",
    badge: "4",
  },
  {
    label: "Deliveries",
    href: "/drivers/deliveries",
    icon: Truck,
    description: "Manage your trips",
  },
  {
    label: "Earnings",
    href: "/drivers/earnings",
    icon: CircleDollarSign,
    description: "Track your income",
  },
];

const accountNavigation: NavItem[] = [
  {
    label: "Messages",
    href: "/drivers/messages",
    icon: MessagesSquare,
  },
  {
    label: "Notifications",
    href: "/drivers/notifications",
    icon: Bell,
    badge: "3",
  },
  {
    label: "Settings",
    href: "/drivers/settings",
    icon: Settings,
  },
];

const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  const pathname = usePathname();
  const {user,logout} = useAuth();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/drivers") {
      return pathname === "/drivers";
    }

    return pathname.startsWith(href);
  };

   const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-[3px] transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[90%] max-w-105 flex-col overflow-y-auto bg-[#104D37] shadow-[12px_0_45px_rgba(16,77,55,0.25)] transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Subtle background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#E2911F]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-5 pb-5 pt-6">
          <Link
            href="/drivers"
            onClick={onClose}
            className="flex items-center gap-3"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-[14px] bg-white shadow-sm">
              <Image
                src="/assests/logo/Agricsync-short-logo.png"
                alt="AgriSync"
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold tracking-tight text-white">
                AgriSync
              </h2>

              <div className="mt-0.5 flex items-center gap-1.5">
                <Truck className="h-3 w-3 text-[#E2911F]" />

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9DED4]">
                  Driver Portal
                </p>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white transition hover:bg-white/15 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Driver profile / availability */}
        <div className="relative mx-5 rounded-2xl border border-white/10 bg-[#0C432F] p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/20">
                <Image
                  src="/assests/images/farmer.jpg"
                  alt="Driver profile"
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>

              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#0C432F] bg-[#49B77A]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-semibold text-white">
                {user?.fullName}
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="text-xs text-[#C9DED4]">
                  Verified driver
                </span>

                <CheckCircle2 className="h-3.5 w-3.5 text-[#E2911F]" />
              </div>
            </div>

            <ChevronRight className="h-4 w-4 text-white/40" />
          </div>

          {/* Availability */}
          <div className="mt-4 flex items-center justify-between rounded-xl border border-[#49B77A]/20 bg-[#49B77A]/10 px-3 py-2.5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#49B77A]/15">
                <Route className="h-4 w-4 text-[#70D49A]" />
              </div>

              <div>
                <p className="text-xs font-semibold text-white">
                  You &apos;re online
                </p>

                <p className="text-[10px] text-[#A9C9BA]">
                  Ready for delivery requests
                </p>
              </div>
            </div>

            {/* Status indicator */}
            <div className="flex items-center gap-1.5 rounded-full bg-[#49B77A]/15 px-2.5 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#70D49A]" />
              <span className="text-[10px] font-semibold text-[#70D49A]">
                ON
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 px-5 pb-6 pt-7">
          {/* Workspace */}
          <div>
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9EBBAE]">
                Driver workspace
              </p>

              <span className="h-px flex-1 ml-3 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {workspaceNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`group relative flex min-h-27 flex-col justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-200 active:scale-[0.98] ${
                      active
                        ? "border-white/10 bg-[#FAF7EF] text-[#1B5A3B] shadow-[0_10px_30px_rgba(0,0,0,0.14)]"
                        : "border-white/10 bg-[#155A40] text-white hover:-translate-y-0.5 hover:border-white/15 hover:bg-[#196047]"
                    }`}
                  >
                    {/* Orange accent for active card */}
                    {active && (
                      <div className="absolute right-0 top-0 h-16 w-16 translate-x-7 -translate-y-7 rounded-full bg-[#E2911F]/15" />
                    )}

                    <div className="relative flex items-start justify-between">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                          active
                            ? "bg-[#E3F2E7] text-[#1B5A3B]"
                            : "bg-white/10 text-[#DDEDE4] group-hover:bg-white/15"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      {item.badge && (
                        <span
                          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[9px] font-bold ${
                            active
                              ? "bg-[#E2911F] text-white"
                              : "bg-[#E2911F] text-white"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-semibold ${
                            active ? "text-[#211F1A]" : "text-white"
                          }`}
                        >
                          {item.label}
                        </span>

                        <ChevronRight
                          className={`h-3.5 w-3.5 transition-all ${
                            active
                              ? "text-[#1B5A3B]"
                              : "text-white/40 group-hover:translate-x-0.5 group-hover:text-white/80"
                          }`}
                        />
                      </div>

                      {item.description && (
                        <p
                          className={`mt-1 text-[10px] leading-4 ${
                            active
                              ? "text-[#5B584C]"
                              : "text-[#A9C9BA]"
                          }`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Account */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9EBBAE]">
                Account
              </p>

              <span className="ml-3 h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-2">
              {accountNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-2xl border px-3.5 py-3 transition-all duration-200 active:scale-[0.99] ${
                      active
                        ? "border-white/10 bg-[#FAF7EF]"
                        : "border-white/10 bg-[#155A40] hover:bg-[#196047]"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        active
                          ? "bg-[#E3F2E7]"
                          : "bg-white/10"
                      }`}
                    >
                      <Icon
                        className={`h-4.5 w-4.5 ${
                          active ? "text-[#1B5A3B]" : "text-[#DDEDE4]"
                        }`}
                      />
                    </div>

                    <span
                      className={`flex-1 text-sm font-semibold ${
                        active ? "text-[#211F1A]" : "text-white"
                      }`}
                    >
                      {item.label}
                    </span>

                    {item.badge && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E2911F] px-1.5 font-mono text-[9px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}

                    <ChevronRight
                      className={`h-4 w-4 transition ${
                        active
                          ? "text-[#5B584C]"
                          : "text-white/30 group-hover:translate-x-0.5 group-hover:text-white/70"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

                
<div className="px-5 pb-6">
  <button
    type="button"
    onClick={handleLogout}
    className="group flex w-full items-center gap-4 rounded-2xl border border-black/5 bg-[#1B5A3B] px-4 py-3.5 text-left transition hover:border-red-100 hover:bg-red-50"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted transition group-hover:bg-red-100">
      <LogOut className="h-4.5 w-4.5 text-muted-foreground transition group-hover:text-red-600" />
    </div>

    <span className="flex-1 text-sm font-semibold text-white transition group-hover:text-red-600">
      Log out
    </span>

    <LogOut className="h-4 w-4 text-white transition group-hover:translate-x-0.5 group-hover:text-red-500" />
  </button>
</div>

        {/* Help */}
        <div className="relative px-5 pb-5">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0C432F] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E2911F]/15">
                <HelpCircle className="h-5 w-5 text-[#F0B34F]" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  Need help?
                </p>

                <p className="mt-0.5 text-[10px] text-[#A9C9BA]">
                  AgriSync driver support
                </p>
              </div>

              <Phone className="h-4 w-4 text-[#9EBBAE]" />
            </div>
          </div>

          <p className="mt-3 text-center text-[9px] font-medium uppercase tracking-[0.16em] text-white/25">
            AgriSync · Driver Portal
          </p>
        </div>
      </aside>
    </>
  );
};

export { MobileSidebar };

