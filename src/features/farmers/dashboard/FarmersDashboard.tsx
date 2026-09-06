"use client";

import { StatCardsCarousel } from "@/widgets/dashboard/ui/statcard/StatCardCarousel";
import { farmerStats, farmerProduce, recentOrders } from "../constant";
import { ProduceSection } from "@/widgets/dashboard/ui/producecard/ProduceSection";
import { DeliveryActivity } from "@/widgets/dashboard/ui/deliveryactivity";
import { OrdersSection } from "@/widgets/dashboard/ui/table/OrdersSection";
import {
  BuyerPromoCarousel,
  EarningsOverview,
} from "@/widgets/dashboard/ui/dashboard-insights";

const FarmersDashboard = () => {
  return (
    <>
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
      <div>
        <OrdersSection
          title="Recent Orders"
          orders={recentOrders}
          sideContent={
            <div className="flex h-full flex-col gap-4">
              <EarningsOverview />
              <BuyerPromoCarousel />
            </div>
          }
          onViewAll={() => {
            console.log("View all orders");
          }}
          onOrderClick={(order) => {
            console.log("Selected order:", order);
          }}
        />
      </div>
    </>
  );
};

export { FarmersDashboard };
