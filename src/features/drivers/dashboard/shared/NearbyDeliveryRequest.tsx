"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ErrorState } from "@/shared/ui/empty-state";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { getErrorMessage } from "@/lib/api";
import {
  useAcceptTransportRequest,
  useAvailableTransportRequests,
  useTransportRequest,
} from "../hooks";
import type { AvailableTransportRequest } from "../types";
import { RequestDetailsModal } from "./RequestDetailsModal";
import { DriverNearbyPromoCard } from "./DriverNearbyPromoCard";
import {
  DriverRequestsTable,
  type DriverRequestRow,
} from "./DriverRequestsTable";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const toDriverRequestRow = (request: AvailableTransportRequest): DriverRequestRow => ({
  id: request._id,
  produce: request.productType,
  quantity: `${request.quantity}kg`,
  pickup: request.pickupLocation,
  destination: request.deliveryLocation,
  preferredPickupDate: formatDate(request.preferredPickupDate),
  preferredPickupAt: request.preferredPickupDate,
  isAccepted: request.isAccepted,
  isInTransit: request.isInTransit,
  isDelivered: request.isDelivered,
});

const NearbyDeliveryRequests = () => {
  const { data: requests, isPending, isError, error } = useAvailableTransportRequests();
  const acceptMutation = useAcceptTransportRequest();
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    type: "accept" | "reject";
    request: DriverRequestRow;
  } | null>(null);
  const {
    data: requestDetails,
    isFetching: isLoadingDetails,
    isError: isDetailsError,
    error: detailsError,
  } = useTransportRequest(selectedRequestId ?? undefined, Boolean(selectedRequestId));

  const deliveryRequests = (Array.isArray(requests) ? requests.map(toDriverRequestRow) : []).filter(
    (request) => !rejectedIds.includes(request.id),
  );

  const pendingRequest = pendingAction?.request;
  const requestSummary = pendingRequest
    ? `${pendingRequest.produce} (${pendingRequest.quantity}) from ${pendingRequest.pickup} to ${pendingRequest.destination} on ${pendingRequest.preferredPickupDate}.`
    : "";

  const handleConfirm = () => {
    if (!pendingAction) return;

    if (pendingAction.type === "reject") {
      setRejectedIds((ids) => [...ids, pendingAction.request.id]);
      setPendingAction(null);
      return;
    }

    acceptMutation.mutate(pendingAction.request.id, {
      onSuccess: () => setPendingAction(null),
    });
  };

  return (
    <section className="w-full max-w-full min-w-0">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="min-w-0">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-heading text-lg font-semibold tracking-tight text-[#1B5A3B] sm:text-xl">
              Nearby Delivery Requests
            </h2>
            <Link
              href="/drivers/requests"
              className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-[#1B5A3B] transition hover:text-[#15492F] sm:text-sm"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {isError ? (
            <div className="w-full overflow-hidden rounded-2xl border border-black/6 bg-white">
              <ErrorState
                title="Unable to load requests"
                description={getErrorMessage(error)}
                onAction={() => window.location.reload()}
                className="min-h-45 px-5 py-10"
              />
            </div>
          ) : (
            <DriverRequestsTable
              requests={deliveryRequests}
              isLoading={isPending}
              variant="compact"
              emptyTitle="No nearby requests"
              emptyDescription="New delivery requests will appear here when they become available."
              onRowClick={(request) => setSelectedRequestId(request.id)}
              onAccept={(item) => setPendingAction({ type: "accept", request: item })}
              onReject={(item) => setPendingAction({ type: "reject", request: item })}
            />
          )}
        </div>

        <aside className="min-w-0 lg:sticky lg:top-3">
          <DriverNearbyPromoCard />
        </aside>
      </div>

      <RequestDetailsModal
        open={Boolean(selectedRequestId)}
        isLoading={isLoadingDetails}
        errorMessage={isDetailsError ? getErrorMessage(detailsError) : undefined}
        request={requestDetails}
        onClose={() => setSelectedRequestId(null)}
      />

      <ConfirmDialog
        open={pendingAction?.type === "accept"}
        title="Accept this delivery request?"
        description={
          pendingRequest
            ? `You're about to accept this request: ${requestSummary}`
            : undefined
        }
        confirmLabel="Accept"
        cancelLabel="Cancel"
        isConfirming={acceptMutation.isPending}
        errorMessage={acceptMutation.isError ? getErrorMessage(acceptMutation.error) : undefined}
        onConfirm={handleConfirm}
        onCancel={() => setPendingAction(null)}
      />

      <ConfirmDialog
        open={pendingAction?.type === "reject"}
        title="Reject this delivery request?"
        description={
          pendingRequest
            ? `You're about to reject this request: ${requestSummary}`
            : undefined
        }
        confirmLabel="Reject"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setPendingAction(null)}
      />
    </section>
  );
};

export { NearbyDeliveryRequests };
