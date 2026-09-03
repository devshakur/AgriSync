"use client";

import { DashboardShell } from "@/widgets/dashboard";
import { StatCardsCarousel } from "@/widgets/dashboard/ui/carousel/StatCardCarousel";
import { Package, ShoppingBag, Truck, Wallet } from "lucide-react";


const FarmersDashboard = () => {
    const farmerStats = [
  {
    label: "Produce Listed",
    value: "12",
    description: "4 active listings",
    trend: "10% this month",
    trendDirection: "up" as const,
    icon: Package,
    iconType: "green" as const,
  },
  {
    label: "Active Orders",
    value: "8",
    description: "2 require action",
    trend: "15% this month",
    trendDirection: "up" as const,
    icon: ShoppingBag,
    iconType: "amber" as const,
  },
  {
    label: "In Delivery",
    value: "3",
    description: "Currently on the road",
    trend: "5% this month",
    trendDirection: "up" as const,
    icon: Truck,
    iconType: "clay" as const,
  },
  {
    label: "Total Earnings",
    value: "₦284,500",
    description: "This month",
    trend: "12.8% vs last month",
    trendDirection: "up" as const,
    icon: Wallet,
    iconType: "green" as const,
  },
];
  return (
   <DashboardShell >
     <article>
     <StatCardsCarousel cards={farmerStats} interval={3500} />
     </article>
   </DashboardShell>
  )
}

export { FarmersDashboard };