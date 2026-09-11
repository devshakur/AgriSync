"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home as HomeIcon,
  Truck,
  Package,
  Wallet,
  Settings,
  MessageSquare,
  LogOut,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/features/auth/context/AuthContext";

const navigation = [
  { label: "Overview", href: "/drivers", icon: HomeIcon },
  { label: "Delivery Requests", href: "/drivers/requests", icon: Truck },
  { label: "My Deliveries", href: "/drivers/deliveries", icon: Package },
  { label: "Earnings", href: "/drivers/earnings", icon: Wallet },
  { label: "Messages", href: "/drivers/messages", icon: MessageSquare },
  { label: "Settings", href: "/", icon: Settings },
];

const DriversSidebar = () => {
  const pathname = usePathname();
  const {logout} = useAuth();

  const isActive = (href: string) => {
    if (href === "/drivers") return pathname === href;
    return pathname.startsWith(href);
  };
    const router = useRouter();
  
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-emerald-800 shadow-lg lg:flex lg:flex-col">
      <div className="flex h-20 items-center px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src="/assests/logo/Agricsync-short-logo.png" alt="AgriSync" fill className="object-cover" sizes="40px" />
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-white">AgriSync</p>
            <p className="text-[10px] uppercase tracking-[0.12em] text-emerald-200">Driver</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">Workspace</p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon as any;
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium transition ${
                  active ? "bg-emerald-700 text-white" : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-3 pb-6">
        <div className="flex items-center gap-3 rounded-xl bg-emerald-900 p-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src="/assests/images/farmer.jpg" alt="Driver" fill className="object-cover" sizes="40px" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-mono font-medium text-white">Amina Yusuf</p>
            <p className="truncate text-xs text-emerald-200">Online</p>
          </div>

          <button onClick={handleLogout} className="text-emerald-100 hover:text-white">
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-3">
          <button  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white">
            <PhoneCall className="h-4 w-4" /> Contact Support
          </button>
        </div>
      </div>
    </aside>
  );
};

export { DriversSidebar };
