"use client";

import Link from "next/link";
import { Truck } from "lucide-react";
import { EmptyState, ErrorState } from "@/shared/ui/empty-state";
import { getErrorMessage } from "@/lib/api";
import { useAvailableTransportRequests } from "@/features/drivers/dashboard/hooks";
import { useState } from "react";
import { TablePagination } from "@/widgets/dashboard/ui/table";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function DriversRequestsPage() {
  const {
    data: requests,
    isPending,
    isError,
    error,
  } = useAvailableTransportRequests();

  const availableRequests = Array.isArray(requests) ? requests : [];
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const totalPages = Math.max(1, Math.ceil(availableRequests.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleRequests = availableRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Delivery Requests</h2>
        <Link href="/drivers" className="text-sm text-muted-foreground">Back to dashboard</Link>
      </div>

      {isPending ? (
        <div className="flex min-h-52 items-center justify-center rounded-lg border border-black/[0.07] bg-white p-4 text-sm text-muted-foreground">
          Loading available requests...
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-black/[0.07] bg-white">
          <ErrorState
            title="Unable to load requests"
            description={getErrorMessage(error)}
            onAction={() => window.location.reload()}
            className="min-h-52"
          />
        </div>
      ) : availableRequests.length === 0 ? (
        <div className="rounded-lg border border-black/[0.07] bg-white">
          <EmptyState
            icon={Truck}
            title="No delivery requests"
            description="Open requests for drivers will appear here once they are available."
            className="min-h-52"
          />
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {visibleRequests.map((request) => (
              <div key={request._id} className="rounded-lg border border-black/[0.07] bg-white p-4 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-gray-900">{request.productType} - {request.quantity}kg</p>
                    <p className="text-sm text-muted-foreground">{request.pickupLocation} → {request.deliveryLocation}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Pickup: {formatDate(request.preferredPickupDate)}</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="rounded-md bg-emerald-700 px-3 py-2 text-sm font-medium text-white">Accept</button>
                    <button className="rounded-md border border-emerald-700 px-3 py-2 text-sm font-medium text-emerald-700">View</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <TablePagination
              page={currentPage}
              pageSize={pageSize}
              totalItems={availableRequests.length}
              itemLabel="requests"
              onPageChange={(next) => setPage(Math.max(1, Math.min(next, totalPages)))}
            />
          </div>
        </>
      )}
    </div>
  );
}
