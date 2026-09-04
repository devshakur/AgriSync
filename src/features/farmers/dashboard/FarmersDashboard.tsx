"use client";

import { DashboardShell } from "@/widgets/dashboard";
import { StatCardsCarousel } from "@/widgets/dashboard/ui/statcard/StatCardCarousel";
import { farmerStats, farmerProduce } from "../constant";
import { ProduceSection } from "@/widgets/dashboard/ui/producecard/ProduceSection";
import { DeliveryActivity } from "@/widgets/dashboard/ui/deliveryactivity";

const FarmersDashboard = () => {
   
  return (
   <DashboardShell >
     <p className="mb-3 text-sm text-gray-500">
       Here&apos;s what&apos;s happening on your farm today.
     </p>
     <article>
     <StatCardsCarousel cards={farmerStats} interval={3500} />
     </article>
     <div>
        <ProduceSection
        products={farmerProduce.slice(0, 2)}
        sideContent={<DeliveryActivity />}
  onViewAll={() => {
    console.log("View all produce");
  }}
  onEdit={(id) => {
    console.log("Edit produce:", id);
  }}
  onMenuClick={(id) => {
    console.log("Menu:", id);
  }}
/>
     </div>
   </DashboardShell>
  )
}

export { FarmersDashboard };