"use client";


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

const navigation = [
  {
    label: "Overview",
    href: "/dashboard/farmer",
    icon: House,
  },
  {
    label: "My Produce",
    href: "/dashboard/farmer/produce",
    icon: Sprout,
  },
  {
    label: "Orders",
    href: "/dashboard/farmer/orders",
    icon: PaperBag,
  },
  {
    label: "Deliveries",
    href: "/dashboard/farmer/deliveries",
    icon: Truck,
  },
  {
    label: "Message",
    href: "/dashboard/farmer/messages",
    icon: MessagesSquare,
  },
  {
    label: "Settings",
    href: "/dashboard/farmer/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-62.5  shadow-lg border-black/5 bg-[#FAF7EF] lg:flex lg:flex-col">
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
          {navigation.map((item, index) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  index === 0
                    ? "bg-[#E3F2E7] text-primary"
                    : "text-muted-foreground hover:bg-primary hover:text-foreground"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {item.label}
              </a>
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
              Abdulshakur
            </p>

            <p className="truncate text-xs flex items-center gap-2 text-muted-foreground">
              Verified farmer{" "}
              <CircleCheck className="h-3 w-3 bg-primary rounded-full text-white" />
            </p>
          </div>

          <button className="text-muted-foreground transition hover:text-foreground">
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
