import {
  House,
  Inbox,
  Truck,
  Wallet,
  MessageSquare,
  UserRound,
  Settings,
  type LucideIcon,
} from "lucide-react";

export const DRIVER_SIDEBAR_TRUCK_IMAGE = "/assests/images/driver-sidebar-truck.jpg";
export const DRIVER_RATING_PLACEHOLDER = "4.8";

export type DriverNavMatch = "exact" | "prefix" | "none";

export type DriverNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  match: DriverNavMatch;
  badgeKey?: "availableRequests";
};

export const driverSidebarNav: DriverNavItem[] = [
  { label: "Dashboard", href: "/drivers", icon: House, match: "exact" },
  {
    label: "Available Requests",
    href: "/drivers/requests",
    icon: Inbox,
    match: "prefix",
    badgeKey: "availableRequests",
  },
  { label: "My Deliveries", href: "/drivers/deliveries", icon: Truck, match: "prefix" },
  { label: "Wallet", href: "/drivers/earnings", icon: Wallet, match: "prefix" },
  { label: "Messages", href: "/drivers/messages", icon: MessageSquare, match: "prefix" },
  { label: "Profile", href: "/drivers/profile", icon: UserRound, match: "exact" },
  { label: "Settings", href: "/drivers/profile", icon: Settings, match: "none" },
];

export const isDriverNavActive = (pathname: string, item: DriverNavItem) => {
  if (item.match === "none") return false;
  if (item.match === "exact" || item.href === "/drivers") {
    return pathname === item.href;
  }
  return pathname.startsWith(item.href);
};
