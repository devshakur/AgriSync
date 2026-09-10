"use client";

import { StatCardsCarousel } from "@/widgets/dashboard/ui/statcard";
import { farmerStats, farmerProduce } from "../constant";
import { ProduceSection } from "@/widgets/dashboard/ui/producecard/ProduceSection";
import { DeliveryActivity } from "@/widgets/dashboard/ui/deliveryactivity";
import { OrdersSection, type Order, type OrderStatus } from "@/widgets/dashboard/ui/table";
import {
  BuyerPromoCarousel,
  EarningsOverview,
} from "@/widgets/dashboard/ui/dashboard-insights";
import { useTransportRequests } from "@/features/farmers/request-driver/hooks";
import { useRequestDriverState } from "@/features/farmers/request-driver/context/RequestDriverContext";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/api";
import type { TransportRequest } from "@/features/farmers/request-driver/types";

const getRequestStatus = (request: TransportRequest): OrderStatus => {
  if (request.isDelivered) return "Delivered";
  if (request.isInTransit) return "In Transit";
  return "Pending";
};

const toOrder = (request: TransportRequest): Order => ({
  id: `#${request._id.slice(-6).toUpperCase()}`,
  product: request.productType,
  quantity: `${request.quantity}`,
  route: `${request.pickupLocation.split(",")[0]} → ${request.deliveryLocation.split(",")[0]}`,
  pickupDate: new Date(request.preferredPickupDate).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  requestId: request._id,
  status: getRequestStatus(request),
});

const FarmersDashboard = () => {
  const {
    data: transportRequests,
    isPending: isLoadingRequests,
    isError: isRequestsError,
    error: requestsError,
  } = useTransportRequests();

  const recentOrders = (Array.isArray(transportRequests) ? transportRequests : []).map(toOrder);
  const router = useRouter();
  const { setRequest, setStage, setActiveRequestId, setDeliveryStatus } = useRequestDriverState();

  const handleOrderClick = (order: Order) => {
    if (!order.requestId) return;
    const request = Array.isArray(transportRequests) ? transportRequests.find((r) => r._id === order.requestId) : undefined;
    if (!request) return;

    const dt = new Date(request.preferredPickupDate);
    const date = dt.toISOString().split("T")[0];
    const time = dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

    setRequest({
      pickup: request.pickupLocation,
      dropoff: request.deliveryLocation,
      date,
      time,
      produce: request.productType,
      quantity: `${request.quantity}`,
      unit: "kg",
      packaging: "",
      notes: "",
    });

    setActiveRequestId(request._id);

    if (request.isDelivered) setStage("completed");
    else if (request.isInTransit) setStage("tracking");
    else if (request.isAccepted) setStage("selected");
    else setStage("drivers");

    if (request.isDelivered) setDeliveryStatus("Delivered");
    else if (request.isInTransit) setDeliveryStatus("Transporting");
    else if (request.isAccepted) setDeliveryStatus("Driver Accepted");
    else setDeliveryStatus("Requested");

    router.push('/farmer/request-driver');
  };

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
        {isLoadingRequests ? (
          <div className="flex min-h-45 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-sm text-muted-foreground">
            Loading recent requests...
          </div>
        ) : isRequestsError ? (
          <div className="flex min-h-45 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-sm text-red-500">
            {getErrorMessage(requestsError)}
          </div>
        ) : (
          <OrdersSection
            title="Recent Driver Requests"
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
            onOrderClick={handleOrderClick}
          />
        )}
      </div>
    </>
  );
};

export { FarmersDashboard };
