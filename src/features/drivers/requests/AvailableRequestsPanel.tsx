"use client";

import { useState } from "react";
import Image from "next/image";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { ErrorState } from "@/shared/ui/empty-state";
import { getErrorMessage } from "@/lib/api";
import { useAuth } from "@/features/auth/context";
import { DEFAULT_DRIVER_AVATAR } from "@/features/profile/lib/profile-utils";
import {
  useAcceptTransportRequest,
  useAvailableTransportRequests,
} from "@/features/drivers/dashboard/hooks";
import type { AvailableTransportRequest } from "@/features/drivers/dashboard/types";
import {
  DriverRequestsTable,
  getDriverRequestStatus,
  type DriverRequestRow,
} from "@/features/drivers/dashboard/shared/DriverRequestsTable";

type AvailableRequestsPanelProps = {
  selectedId: string | null;
  rejectedIds: string[];
  onSelect: (id: string) => void;
  onRejected: (id: string) => void;
};

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

const AvailableRequestsPanel = ({
  selectedId,
  rejectedIds,
  onSelect,
  onRejected,
}: AvailableRequestsPanelProps) => {
  const { user } = useAuth();
  const { data: requests, isPending, isError, error } = useAvailableTransportRequests();
  const acceptMutation = useAcceptTransportRequest();
  const [pendingAction, setPendingAction] = useState<{
    type: "accept" | "reject";
    request: DriverRequestRow;
  } | null>(null);

  const deliveryRequests = (Array.isArray(requests) ? requests.map(toDriverRequestRow) : []).filter(
    (request) => !rejectedIds.includes(request.id),
  );

  const newCount = deliveryRequests.filter((request) => getDriverRequestStatus(request) === "New").length;
  const acceptedCount = deliveryRequests.filter((request) => getDriverRequestStatus(request) === "Accepted").length;
  const asOfToday = new Date().toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const pendingRequest = pendingAction?.request;
  const requestSummary = pendingRequest
    ? `${pendingRequest.produce} (${pendingRequest.quantity}) from ${pendingRequest.pickup} to ${pendingRequest.destination} on ${pendingRequest.preferredPickupDate}.`
    : "";

  const handleConfirm = () => {
    if (!pendingAction) return;

    if (pendingAction.type === "reject") {
      onRejected(pendingAction.request.id);
      setPendingAction(null);
      return;
    }

    acceptMutation.mutate(pendingAction.request.id, {
      onSuccess: () => setPendingAction(null),
    });
  };

  const locationLabel = [user?.city, user?.location].filter(Boolean).join(", ") || "—";

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-black/6 bg-white">
      <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#E7F5EC]">
            <Image
              src={user?.avatarUrl || DEFAULT_DRIVER_AVATAR}
              alt={user?.fullName || "Driver"}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate font-heading text-base font-semibold text-gray-900">
              {user?.fullName || "Driver"}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{user?.email || "—"}</p>
          </div>
        </div>

        <div className="shrink-0 text-left text-xs text-muted-foreground sm:text-right">
          <p>{user?.phone || "—"}</p>
          <p className="mt-0.5">{locationLabel}</p>
        </div>
      </div>

      <div className="mx-4 mb-5 rounded-2xl bg-[#0E4A38] px-4 py-4 text-white sm:mx-5 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/70">Available jobs</p>
            <p className="mt-1 font-heading text-2xl font-semibold">
              {isPending ? "—" : deliveryRequests.length}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-white/70">As of today</p>
            <p className="mt-1 text-sm text-white/90">{asOfToday}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-6 text-sm">
          <p>
            <span className="text-white/70">New</span>{" "}
            <span className="font-semibold">{isPending ? "—" : newCount}</span>
          </p>
          <p>
            <span className="text-white/70">Accepted</span>{" "}
            <span className="font-semibold">{isPending ? "—" : acceptedCount}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-black/6 px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-sm font-semibold text-gray-900">Available Requests</h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Select a request to inspect it on the right.</p>
          </div>
        </div>

        {isError ? (
          <ErrorState
            title="Unable to load requests"
            description={getErrorMessage(error)}
            onAction={() => window.location.reload()}
            className="min-h-45 px-0 py-8"
          />
        ) : (
          <DriverRequestsTable
            requests={deliveryRequests}
            isLoading={isPending}
            embedded
            variant="compact"
            selectedId={selectedId}
            emptyTitle="No delivery requests"
            emptyDescription="Open requests for drivers will appear here once they are available."
            onRowClick={(request) => onSelect(request.id)}
            onAccept={(item) => setPendingAction({ type: "accept", request: item })}
            onReject={(item) => setPendingAction({ type: "reject", request: item })}
          />
        )}
      </div>

      <ConfirmDialog
        open={pendingAction?.type === "accept"}
        title="Accept this delivery request?"
        description={
          pendingRequest ? `You're about to accept this request: ${requestSummary}` : undefined
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
          pendingRequest ? `You're about to reject this request: ${requestSummary}` : undefined
        }
        confirmLabel="Reject"
        cancelLabel="Cancel"
        onConfirm={handleConfirm}
        onCancel={() => setPendingAction(null)}
      />
    </section>
  );
};

export { AvailableRequestsPanel };
