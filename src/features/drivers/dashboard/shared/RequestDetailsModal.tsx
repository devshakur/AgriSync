"use client";

import { useEffect } from "react";
import { Loader2, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ErrorState } from "@/shared/ui/empty-state";
import type { TransportRequestDetails } from "../types";

type RequestDetailsModalProps = {
  open: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  request?: TransportRequestDetails;
  onClose: () => void;
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

const getRequestStatusLabel = (request?: TransportRequestDetails) => {
  if (!request) return "—";
  if (request.isDelivered) return "Delivered";
  if (request.isInTransit) return "In transit";
  if (request.isAccepted) return "Accepted";
  return "Pending";
};

const RequestDetailsModal = ({
  open,
  isLoading = false,
  errorMessage,
  request,
  onClose,
}: RequestDetailsModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  if (!open) return null;

  const fields: Array<{ label: string; value: string }> = request
    ? [
        { label: "Produce", value: request.productType },
        { label: "Quantity", value: `${request.quantity}kg` },
        { label: "Pickup location", value: request.pickupLocation },
        { label: "Delivery location", value: request.deliveryLocation },
        { label: "Preferred pickup date", value: formatDate(request.preferredPickupDate) },
        { label: "Requested on", value: formatDate(request.requestDate) },
        { label: "Status", value: getRequestStatusLabel(request) },
      ]
    : [];

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/35 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-details-title"
        className="w-full max-w-md rounded-xl border border-black/8 bg-white p-5 shadow-[0_24px_70px_rgba(33,31,26,0.22)] sm:p-6"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id="request-details-title" className="font-heading text-base font-semibold text-muted-foreground">
            Request details
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-black/5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="mt-4 flex items-center justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-primary" strokeWidth={1.75} />
          </div>
        ) : errorMessage ? (
          <ErrorState
            title="Unable to load request"
            description={errorMessage}
            className="px-0 py-4"
          />
        ) : (
          <dl className="mt-4 space-y-3">
            {fields.map((field) => (
              <div key={field.label} className="flex items-start justify-between gap-4 text-sm">
                <dt className="text-muted-foreground">{field.label}</dt>
                <dd className="text-right font-medium text-[#211F1A]">{field.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 flex items-center justify-end">
          <Button label="Close" onClick={onClose} variant="outline" size="sm" />
        </div>
      </section>
    </div>
  );
};

export { RequestDetailsModal };
