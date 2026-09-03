"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,

  Settings,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  Phone,
  MessagesSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  role?: "Farmer" | "Buyer" | "Driver";
};

const navigation: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard/farmer",
    icon: LayoutDashboard,
  },
  {
    label: "My Produce",
    href: "/dashboard/farmer/produce",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/dashboard/farmer/orders",
    icon: ShoppingBag,
    badge: "8",
  },
  {
    label: "Deliveries",
    href: "/dashboard/farmer/deliveries",
    icon: Truck,
  },
];

const accountNavigation: NavItem[] = [
  {
    label: "Messages",
    href: "/dashboard/farmer/messages",
    icon: MessagesSquare,
  },
  {
    label: "Settings",
    href: "/dashboard/farmer/settings",
    icon: Settings,
  },
];

const    MobileSidebar = ({
  open,
  onClose,
  role = "Farmer",
}: MobileSidebarProps) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/dashboard/farmer") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[88%] max-w-97.5 flex-col overflow-y-auto bg-[#FAF7EF] shadow-[10px_0_40px_rgba(33,31,26,0.12)] transition-transform duration-300 ease-out sm:w-92.5 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 pt-6">
          <Link
            href="/dashboard/farmer"
            onClick={onClose}
            className="flex items-center gap-3"
          >
           
               <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src="/assests/logo/Agricsync-short-logo.png"
                          alt="Farmer"
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
           

            <div>
                <h2 className="font-heading text-xl font-bold tracking-tight text-primary">
                    AgriSync
                </h2>

              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {role} Dashboard
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/5 bg-white text-foreground shadow-sm transition hover:bg-muted"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Account verification card */}
        <div className="mx-5 mt-2 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src="/assests/images/farmer.jpg"
                            alt="Farmer"
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>

              <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#E3F2E7]">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-heading text-sm font-semibold text-gray-800">
              Abdulshakur Dauda
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Verified farmer
              </p>
            </div>

            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Verification status */}
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#E3F2E7] px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>

            <div>
              <p className="text-xs font-semibold text-primary">
                Account verified
              </p>

              <p className="text-[11px] text-primary/70">
                You can list and sell produce
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 pb-6 pt-7">
          {/* Workspace */}
          <div>
            <p className="mb-3 px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Workspace
            </p>

            <div className="grid grid-cols-2 gap-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`group relative flex min-h-21.5 flex-col shadow-md justify-between rounded-2xl border p-4 transition duration-200 ${
                      active
                        ? "border-primary/10 bg-primary text-white shadow-[0_8px_20px_rgba(27,90,59,0.16)]"
                        : "border-black/5 bg-white text-foreground shadow-mdhover:-translate-y-0.5 hover:border-primary/10 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                          active
                            ? "bg-white/15"
                            : "bg-[#F3EDDD] group-hover:bg-[#E3F2E7]"
                        }`}
                      >
                        <Icon
                          className={`h-4.5 w-4.5 ${
                            active
                              ? "text-white"
                              : "text-primary"
                          }`}
                        />
                      </div>

                      {item.badge && (
                        <span
                          className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[9px] font-semibold ${
                            active
                              ? "bg-white text-primary"
                              : "bg-[#FFF4DC] text-[#9A6411]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`text-sm font-semibold ${
                          active
                            ? "text-green-800"
                            : "text-gray-800"
                        }`}
                      >
                        {item.label}
                      </span>

                      <ChevronRight
                        className={`h-3.5 w-3.5 transition ${
                          active
                            ? "text-white/70"
                            : "text-muted-foreground opacity-0 group-hover:opacity-100"
                        }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Account */}
          <div className="mt-8">
            <p className="mb-3 px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Account
            </p>

            <div className="space-y-2">
              {accountNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition ${
                      active
                        ? "border-primary/10 bg-[#E3F2E7] text-primary"
                        : "border-black/5 bg-white text-foreground hover:bg-muted"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active ? "bg-white" : "bg-muted"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5 text-primary" />
                    </div>

                    <span className="flex-1 text-sm font-semibold text-gray-800">
                      {item.label}
                    </span>

                    <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Help */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-3 rounded-2xl bg-primary p-4 text-white">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
              <HelpCircle className="h-5 w-5" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold">Need help?</p>
              <p className="mt-0.5 text-xs text-white/70">
                Contact AgriSync support
              </p>
            </div>

            <Phone className="h-4 w-4 text-white/60" />
          </div>
        </div>
      </aside>
    </>
  );
}

export { MobileSidebar };