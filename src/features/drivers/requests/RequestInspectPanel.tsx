"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { MapPin, Navigation } from "lucide-react";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { EmptyState, ErrorState } from "@/shared/ui/empty-state";
import { TablePulse } from "@/widgets/dashboard/ui/table";
import { getErrorMessage } from "@/lib/api";
import {
  useAcceptTransportRequest,
  useTransportRequest,
} from "@/features/drivers/dashboard/hooks";
import type { TransportRequestDetails } from "@/features/drivers/dashboard/types";
import {
  driverStatusStyles,
  shortRequestId,
  type DriverRequestStatus,
} from "@/features/drivers/dashboard/shared/DriverRequestsTable";

type RequestInspectPanelProps = {
  requestId: string | null;
  onRejected?: (id: string) => void;
};

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const shortPlace = (value: string) => value.split(",")[0]?.trim() || value || "—";

const getStatus = (request: TransportRequestDetails): DriverRequestStatus => {
  if (request.isDelivered) return "Delivered";
  if (request.isInTransit) return "In Transit";
  if (request.isAccepted) return "Accepted";
  return "New";
};

const DetailBlock = ({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={className}>
    <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
    <p className="mt-1 text-sm font-medium wrap-break-word text-gray-900">{value}</p>
  </div>
);

const RouteSchematic = ({ pickup, destination }: { pickup: string; destination: string }) => (
  <div className="relative h-48 overflow-hidden rounded-2xl border border-black/6 bg-[#E8F3EC]">
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(27,90,59,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(27,90,59,0.18) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    />
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 400 192"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M 48 142 C 140 40, 260 168, 352 58"
        fill="none"
        stroke="#1B5A3B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M 48 142 C 140 40, 260 168, 352 58"
        fill="none"
        stroke="#7CDBA8"
        strokeWidth="3"
        strokeDasharray="6 8"
        strokeLinecap="round"
      />
    </svg>

    <div className="absolute bottom-4 left-4 max-w-[46%]">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1B5A3B] text-white shadow-md">
        <MapPin className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[#1B5A3B]">Pickup</p>
      <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">{shortPlace(pickup)}</p>
    </div>
    <div className="absolute top-4 right-4 max-w-[46%] text-right">
      <span className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#C77A09] text-white shadow-md">
        <Navigation className="h-4 w-4" strokeWidth={2.25} />
      </span>
      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.08em] text-[#C77A09]">Destination</p>
      <p className="mt-0.5 truncate text-sm font-semibold text-gray-900">{shortPlace(destination)}</p>
    </div>
  </div>
);

const InspectSkeleton = () => (
  <div className="space-y-4">
    <TablePulse className="h-44 w-full rounded-2xl" />
    <div className="grid grid-cols-2 gap-3">
      <TablePulse className="h-12 w-full" />
      <TablePulse className="h-12 w-full" />
      <TablePulse className="h-12 w-full" />
      <TablePulse className="h-12 w-full" />
    </div>
    <TablePulse className="h-16 w-full" />
    <TablePulse className="h-16 w-full" />
  </div>
);

const RequestInspectPanel = ({ requestId, onRejected }: RequestInspectPanelProps) => {
  const queryClient = useQueryClient();
  const acceptMutation = useAcceptTransportRequest();
  const [pendingAction, setPendingAction] = useState<"accept" | "reject" | null>(null);
  const {
    data: request,
    isFetching,
    isError,
    error,
  } = useTransportRequest(requestId ?? undefined, Boolean(requestId));

  const status = request ? getStatus(request) : "New";
  const canAct = Boolean(request && !request.isAccepted && !request.isInTransit && !request.isDelivered);
  const requestSummary = request
    ? `${request.productType} (${request.quantity}kg) from ${request.pickupLocation} to ${request.deliveryLocation}.`
    : "";

  const handleConfirm = () => {
    if (!request || !pendingAction) return;

    if (pendingAction === "reject") {
      onRejected?.(request._id);
      setPendingAction(null);
      return;
    }

    acceptMutation.mutate(request._id, {
      onSuccess: () => {
        setPendingAction(null);
        void queryClient.invalidateQueries({ queryKey: ["transport-request", "detail", request._id] });
      },
    });
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-black/6 bg-white">
      <div className="border-b border-black/6 px-4 py-4 sm:px-5">
        <h2 className="font-heading text-sm font-semibold text-gray-900 sm:text-base">Request details</h2>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {requestId ? "Pickup, destination, and job information." : "Click a request to inspect it here."}
        </p>
      </div>

      <div className="p-4 sm:p-5">
        {!requestId ? (
          <EmptyState
            icon={MapPin}
            title="Select a request"
            description="Click a row to see pickup, destination, and job details."
            className="min-h-70 px-0 py-8"
          />
        ) : isFetching && !request ? (
          <InspectSkeleton />
        ) : isError ? (
          <ErrorState
            title="Unable to load request"
            description={getErrorMessage(error)}
            onAction={() => window.location.reload()}
            className="min-h-45 px-0 py-6"
          />
        ) : request ? (
          <div>
            <RouteSchematic pickup={request.pickupLocation} destination={request.deliveryLocation} />

            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] font-medium text-muted-foreground">{shortRequestId(request._id)}</p>
                <p className="mt-1 font-heading text-base font-semibold text-gray-900">{request.productType}</p>
              </div>
              <span className={`inline-flex rounded-md px-2.5 py-1 text-[9px] font-medium ${driverStatusStyles[status]}`}>
                {status}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
              <DetailBlock label="Quantity" value={`${request.quantity}kg`} />
              <DetailBlock label="Preferred pickup" value={formatDate(request.preferredPickupDate)} />
              <DetailBlock label="Requested on" value={formatDate(request.requestDate)} className="col-span-2" />
              <DetailBlock label="Pickup location" value={request.pickupLocation} className="col-span-2" />
              <DetailBlock label="Delivery location" value={request.deliveryLocation} className="col-span-2" />
            </div>

            {canAct ? (
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPendingAction("accept")}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#1B5A3B] text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={() => setPendingAction("reject")}
                  className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-red-200 bg-white text-sm font-semibold text-red-700 transition hover:bg-red-50"
                >
                  Reject
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <ConfirmDialog
        open={pendingAction === "accept"}
        title="Accept this delivery request?"
        description={requestSummary ? `You're about to accept this request: ${requestSummary}` : undefined}
        confirmLabel="Accept"
        cancelLabel="Cancel"
        isConfirming={acceptMutation.isPending}
        errorMessage={acceptMutation.isError ? getErrorMessage(acceptMutation.error) : undefined}
        onConfirm={handleConfirm}
        onCancel={() => setPendingAction(null)}
      />

      <ConfirmDialog
        open={pendingAction === "reject"}
        title="Reject this delivery request?"
        description={requestSummary ? `You're about to reject this request: ${requestSummary}` : undefined}
        confirmLabel="Reject"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setPendingAction(null)}
      />
    </section>
  );
};

export { RequestInspectPanel };
