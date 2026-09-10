"use client";

import { StatCard, StatCardsCarousel } from "@/widgets/dashboard/ui/statcard";
import type { DashboardStat } from "@/widgets/dashboard/ui/statcard/StatCardCarousel";
import { Users, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { stats } from "@/features/drivers/constant";
import DriverDeliveryBanner from "./shared/DriverDeliveryBanner";
import { NearbyDeliveryRequests } from "./shared/NearbyDeliveryRequest";
import { RecentActivity } from "./shared/RecentActivity";

const driverStats: DashboardStat[] = [
  {
    label: "Nearby Drivers",
    value: "5",
    description: "Within 5 km",
    icon: Users,
    iconType: "green",
  },
  {
    label: "Sourcing",
    value: "2",
    description: "Requests being sourced",
    icon: MapPin,
    iconType: "amber",
  },
  {
    label: "Pending Offers",
    value: "1",
    description: "Awaiting driver confirmation",
    icon: Clock,
    iconType: "clay",
  },
  {
    label: "Completed",
    value: "24",
    description: "Deliveries this month",
    icon: CheckCircle2,
    iconType: "green",
  },
];

const DriversDashboard = () => {
  return (
    <div className="p-3">
      <div className="block sm:hidden mt-6">
        <StatCardsCarousel cards={driverStats} interval={3500} />
      </div>

      {/* Grid on sm+ screens */}
      <div className="hidden sm:grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            iconType={stat.iconType}
          />
        ))}
      </div>
      <div className="mt-6">
        <DriverDeliveryBanner />
      </div>
      <section className="sm:grid sm:grid-cols-[1fr_320px] gap-4 py-6">
        <NearbyDeliveryRequests />
        <RecentActivity />
      </section>
    </div>
  );
};

export { DriversDashboard };
