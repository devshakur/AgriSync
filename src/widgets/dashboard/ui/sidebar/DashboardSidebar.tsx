"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  House,
  Truck,
  Settings,
  LogOut,
  
  Sprout,
  PaperBag,
  MessagesSquare,
  CircleCheck,
  PhoneCall,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/features/auth";


const navigation = [
  {
      label: "Overview",
      href: "/farmer",
    icon: House,
  },
  {
    label: "Request Driver",
    href: "/farmer/request-driver",
    icon: Truck,
  },
  {
    label: "My Produce",
      href: "/farmer/produce",
    icon: Sprout,
  },
  {
    label: "Orders",
      href: "/farmer/orders",
    icon: PaperBag,
  },
  
  {
    label: "Message",
      href: "/farmer/messages",
    icon: MessagesSquare,
  },
  {
    label: "Profile",
      href: "/farmer/profile",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/farmer") {
      return pathname === href;
    }

    return pathname.startsWith(href);
  };
  const router = useRouter();
  const {user, logout} = useAuth();

    const handleLogout = () => {
      logout();
      router.push("/");
    };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-62.5 border-black/5 bg-background shadow-lg lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center px-6">
        <div className="flex items-center gap-2.5">
          
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
            <p className="font-heading text-lg font-bold text-primary">
              AgriSync
            </p>

            <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Farmer
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 ">
        <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Workspace
        </p>

        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-[#E3F2E7] text-primary"
                    : "text-muted-foreground hover:bg-primary hover:text-white"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Farmer profile */}
      <div className="px-3">
        <div className="flex items-center gap-3 rounded-xl bg-background shadow-sm p-3">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/assests/images/farmer.jpg"
              alt="Farmer"
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-mono font-medium text-gray-800">
              {user?.fullName}
            </p>

            <p className="truncate text-xs flex items-center gap-2 text-muted-foreground">
              Verified farmer{" "}
              <CircleCheck className="h-3 w-3 bg-primary rounded-full text-white" />
            </p>
          </div>

          <button   onClick={handleLogout} className="text-muted-foreground cursor-pointer transition hover:text-white">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
      {/* Contact Support*/}
      <div className="p-3">
        <div className="flex items-center gap-3 rounded-xl bg-background shadow-sm p-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs  text-gray-800">Need help ?</p>

            <p className="truncate text-xs flex gap-2 text-muted-foreground">
              Contact support
            </p>
          </div>

          <button className="text-muted-foreground bg-primary-foreground cursor-pointer">
            <PhoneCall className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export { DashboardSidebar };
