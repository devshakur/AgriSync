"use client";

import Link from "next/link";
import { ChevronRight, Truck } from "lucide-react";
import { EmptyState, ErrorState } from "@/shared/ui/empty-state";
import { getErrorMessage } from "@/lib/api";
import { useAvailableTransportRequests } from "../hooks";
import type { AvailableTransportRequest } from "../types";
import { DeliveryRequestCard, type DeliveryRequest } from "./DeliveryRequestCard";
import { useState } from "react";
import { TablePagination } from "@/widgets/dashboard/ui/table";

const toDeliveryRequest = (
  request: AvailableTransportRequest,
): DeliveryRequest => ({
  id: request._id,
  produce: request.productType,
  quantity: `${request.quantity}kg`,
  pickup: request.pickupLocation,
  destination: request.deliveryLocation,
  preferredPickupDate: new Date(request.preferredPickupDate).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
  postedAt: new Date(request.requestDate).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
});

const NearbyDeliveryRequests = () => {
  const {
    data: requests,
    isPending,
    isError,
    error,
  } = useAvailableTransportRequests();

  const deliveryRequests = Array.isArray(requests) ? requests.map(toDeliveryRequest) : [];
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(deliveryRequests.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = deliveryRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleAccept = (request: DeliveryRequest) => {
    console.log("Accepted request:", request.id);
  };

  return (
    <section className="w-full overflow-hidden rounded-xl border border-[#E7E2D7] bg-[#E3F2E7]">
      <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5 sm:px-5">
        <h2 className="font-heading text-sm font-semibold tracking-tight text-[#211F1A] sm:text-base">
          Nearby Delivery Requests
        </h2>

        <Link
          href="/drivers/requests"
          className="group flex items-center gap-0.5 text-[9px] font-semibold text-[#1B5A3B] transition-colors hover:text-[#15492F] sm:text-[10px]"
        >
          View all
          <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mx-4 h-px bg-[#EAE6DC] sm:mx-5" />

      {isPending ? (
        <div className="flex min-h-45 items-center justify-center px-5 py-10 text-sm text-[#5B584C]">
          Loading available requests...
        </div>
      ) : isError ? (
        <ErrorState
          title="Unable to load requests"
          description={getErrorMessage(error)}
          onAction={() => window.location.reload()}
          className="min-h-45 px-5 py-10"
        />
      ) : deliveryRequests.length > 0 ? (
        <>
          <div>
            {visible.map((request) => (
              <DeliveryRequestCard
                key={request.id}
                request={request}
                onAccept={handleAccept}
              />
            ))}
          </div>

          <div className="mt-2">
            <TablePagination
              page={currentPage}
              pageSize={pageSize}
              totalItems={deliveryRequests.length}
              itemLabel="requests"
              onPageChange={(next) => setPage(Math.max(1, Math.min(next, totalPages)))}
            />
          </div>
        </>
      ) : (
        <EmptyState
          icon={Truck}
          title="No nearby requests"
          description="New delivery requests will appear here when they become available."
          className="min-h-45 px-5 py-10"
        />
      )}
    </section>
  );
};

export { NearbyDeliveryRequests };
