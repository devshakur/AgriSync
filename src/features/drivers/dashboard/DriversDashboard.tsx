"use client";

import { stats } from "@/features/drivers/constant";
import { useAuth } from "@/features/auth/context";
import { DriversDashboardBanner, DriversMobileGreeting } from "@/widgets/drivers/ui/header/DriversHeader";
import { DriverStatCard } from "./shared/DriverStatCard";
import { DriverStatsPromoCard } from "./shared/DriverStatsPromoCard";
import { OngoingDeliveryCard } from "./shared/OngoingDeliveryCard";
import { RecentActivity } from "./shared/RecentActivity";
import { QuickFilters } from "./shared/QuickFilters";
import { NearbyDeliveryRequests } from "./shared/NearbyDeliveryRequest";

const DriversDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <DriversDashboardBanner fullName={user?.fullName ?? ""} />
      <DriversMobileGreeting fullName={user?.fullName ?? ""} />
      <div className="p-3">
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-[1fr_1fr_1fr_1fr_1.35fr] lg:gap-4">
          {stats.map((stat) => (
            <DriverStatCard key={stat.label} {...stat} />
          ))}
          <div className="col-span-2 lg:col-span-1">
            <DriverStatsPromoCard />
          </div>
        </section>

        <section className="mt-4 grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
          <div className="min-w-0">
            <OngoingDeliveryCard />
          </div>
          <div className="order-3 min-w-0 lg:order-0">
            <RecentActivity />
          </div>
          <div className="order-2 min-w-0 lg:order-0">
            <QuickFilters />
          </div>
        </section>

        <section className="mt-4">
          <NearbyDeliveryRequests />
        </section>
      </div>
    </>
  );
};

export { DriversDashboard };
