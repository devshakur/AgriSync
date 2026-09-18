"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { ArrowRight, Check, MoreHorizontal, Truck, X } from "lucide-react";
import { EmptyState, ErrorState } from "@/shared/ui/empty-state";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { getErrorMessage } from "@/lib/api";
import { TablePagination } from "@/widgets/dashboard/ui/table";
import {
  useAcceptTransportRequest,
  useAvailableTransportRequests,
  useTransportRequest,
} from "../hooks";
import type { AvailableTransportRequest } from "../types";
import { RequestDetailsModal } from "./RequestDetailsModal";

type NearbyRequest = {
  id: string;
  produce: string;
  quantity: string;
  pickup: string;
  destination: string;
  preferredPickupDate: string;
  isAccepted: boolean;
  isInTransit: boolean;
  isDelivered: boolean;
};

type RequestStatus = "New" | "Accepted" | "In Transit" | "Delivered";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const toNearbyRequest = (request: AvailableTransportRequest): NearbyRequest => ({
  id: request._id,
  produce: request.productType,
  quantity: `${request.quantity}kg`,
  pickup: request.pickupLocation,
  destination: request.deliveryLocation,
  preferredPickupDate: formatDate(request.preferredPickupDate),
  isAccepted: request.isAccepted,
  isInTransit: request.isInTransit,
  isDelivered: request.isDelivered,
});

const shortId = (id: string) => `#${id.slice(-6).toUpperCase()}`;

const getStatus = (request: NearbyRequest): RequestStatus => {
  if (request.isDelivered) return "Delivered";
  if (request.isInTransit) return "In Transit";
  if (request.isAccepted) return "Accepted";
  return "New";
};

const statusStyles: Record<RequestStatus, string> = {
  New: "bg-[#FFF5DF] text-[#C77A09]",
  Accepted: "bg-[#E7F5EC] text-[#2D8A54]",
  "In Transit": "bg-[#E8F0FA] text-[#3B6FA8]",
  Delivered: "bg-[#E7F5EC] text-[#2D8A54]",
};

const mobileBarStyles: Record<RequestStatus, string> = {
  New: "bg-[#E2911F]",
  Accepted: "bg-[#1B5A3B]",
  "In Transit": "bg-[#3B6FA8]",
  Delivered: "bg-[#1B5A3B]",
};

const GRID =
  "grid-cols-[0.9fr_1.1fr_0.7fr_1.4fr_1fr_0.8fr_40px]";

type RequestActionsProps = {
  request: NearbyRequest;
  onAccept: (request: NearbyRequest) => void;
  onReject: (request: NearbyRequest) => void;
};

const MENU_WIDTH = 128;
const MENU_HEIGHT = 84;

const RequestActions = ({ request, onAccept, onReject }: RequestActionsProps) => {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const canAct = !request.isAccepted && !request.isInTransit && !request.isDelivered;

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;

      const spaceBelow = window.innerHeight - rect.bottom;
      const openUp = spaceBelow < MENU_HEIGHT + 8;

      setMenuPos({
        top: openUp ? rect.top - MENU_HEIGHT - 4 : rect.bottom + 4,
        left: Math.max(8, Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8)),
      });
    };

    updatePosition();

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClick);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("scroll", updatePosition, true);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  if (!canAct) {
    return <span className="inline-block w-7" />;
  }

  return (
    <div
      className="relative shrink-0"
      onClick={(event) => event.stopPropagation()}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Actions for ${shortId(request.id)}`}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-emerald-50 hover:text-[#1B5A3B]"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open
        ? createPortal(
            <div
              ref={menuRef}
              role="menu"
              style={{ top: menuPos.top, left: menuPos.left }}
              className="fixed z-[80] w-32 overflow-hidden rounded-lg border border-black/8 bg-white p-1 shadow-[0_12px_30px_rgba(33,31,26,0.14)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onAccept(request);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-[#1B5A3B] transition hover:bg-emerald-50"
              >
                <Check className="h-3.5 w-3.5" />
                Accept
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  onReject(request);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-red-700 transition hover:bg-red-50"
              >
                <X className="h-3.5 w-3.5" />
                Reject
              </button>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};

const NearbyDeliveryRequests = () => {
  const { data: requests, isPending, isError, error } = useAvailableTransportRequests();
  const acceptMutation = useAcceptTransportRequest();
  const [page, setPage] = useState(1);
  const [rejectedIds, setRejectedIds] = useState<string[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    type: "accept" | "reject";
    request: NearbyRequest;
  } | null>(null);
  const {
    data: requestDetails,
    isFetching: isLoadingDetails,
    isError: isDetailsError,
    error: detailsError,
  } = useTransportRequest(selectedRequestId ?? undefined, Boolean(selectedRequestId));

  const deliveryRequests = (Array.isArray(requests) ? requests.map(toNearbyRequest) : []).filter(
    (request) => !rejectedIds.includes(request.id),
  );
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(deliveryRequests.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visible = deliveryRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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

      <div className="w-full max-w-full min-w-0 overflow-visible rounded-2xl border-0 bg-white md:border md:border-black/6">
        {isPending ? (
          <div className="flex min-h-45 items-center justify-center px-5 py-10 text-sm text-muted-foreground">
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
            <div className="hidden md:block">
              <div
                className={`grid ${GRID} items-center border-b border-black/6 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground lg:px-5`}
              >
                <span>Request ID</span>
                <span>Produce</span>
                <span>Quantity</span>
                <span>Route</span>
                <span>Pickup Date</span>
                <span>Status</span>
                <span />
              </div>

              {visible.map((request) => {
                const status = getStatus(request);
                return (
                  <div
                    key={request.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRequestId(request.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedRequestId(request.id);
                      }
                    }}
                    className={`grid ${GRID} cursor-pointer items-center border-b border-black/6 px-4 py-3.5 text-left last:border-0 hover:bg-emerald-50/70 lg:px-5`}
                  >
                    <span className="font-mono text-[11px] font-medium text-muted-foreground">
                      {shortId(request.id)}
                    </span>
                    <span className="truncate pr-2 text-xs font-medium text-gray-800">{request.produce}</span>
                    <span className="text-xs text-muted-foreground">{request.quantity}</span>
                    <span className="min-w-0 truncate pr-2 text-xs text-muted-foreground">
                      {request.pickup} → {request.destination}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {request.preferredPickupDate}
                    </span>
                    <span>
                      <span
                        className={`inline-flex rounded-md px-2.5 py-1 text-[9px] font-medium ${statusStyles[status]}`}
                      >
                        {status}
                      </span>
                    </span>
                    <RequestActions
                      request={request}
                      onAccept={(item) => setPendingAction({ type: "accept", request: item })}
                      onReject={(item) => setPendingAction({ type: "reject", request: item })}
                    />
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 md:hidden">
              {visible.map((request) => {
                const status = getStatus(request);
                return (
                  <div
                    key={request.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedRequestId(request.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedRequestId(request.id);
                      }
                    }}
                    className="flex w-full max-w-full min-w-0 cursor-pointer items-center gap-3 rounded-xl border border-black/6 bg-white px-4 py-4 text-left shadow-sm transition hover:bg-emerald-50/70"
                  >
                    <div className={`h-9 w-1 shrink-0 rounded-full ${mobileBarStyles[status]}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-mono text-[10px] font-semibold text-muted-foreground">
                          {shortId(request.id)}
                        </span>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <span
                            className={`rounded-md px-2 py-1 text-[9px] font-medium ${statusStyles[status]}`}
                          >
                            {status}
                          </span>
                          <RequestActions
                            request={request}
                            onAccept={(item) => setPendingAction({ type: "accept", request: item })}
                            onReject={(item) => setPendingAction({ type: "reject", request: item })}
                          />
                        </div>
                      </div>
                      <p className="mt-1.5 truncate text-xs font-semibold text-[#1B5A3B]">{request.produce}</p>
                      <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                        <span>{request.quantity}</span>
                        <span className="px-1.5 text-muted-foreground/50">·</span>
                        <span>
                          {request.pickup} → {request.destination}
                        </span>
                      </p>
                      <p className="mt-1.5 font-mono text-[11px] text-muted-foreground">
                        {request.preferredPickupDate}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <TablePagination
              page={currentPage}
              pageSize={pageSize}
              totalItems={deliveryRequests.length}
              itemLabel="requests"
              onPageChange={(next) => setPage(Math.max(1, Math.min(next, totalPages)))}
            />
          </>
        ) : (
          <EmptyState
            icon={Truck}
            title="No nearby requests"
            description="New delivery requests will appear here when they become available."
            className="min-h-45 px-5 py-10"
          />
        )}
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
        errorMessage={
          acceptMutation.isError ? getErrorMessage(acceptMutation.error) : undefined
        }
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
