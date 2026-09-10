"use client";

import { useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { getErrorMessage } from "@/lib/api";
import { useDeleteTransportRequest } from "@/features/farmers/request-driver/hooks";
import type { RequestValues } from "../../../features/farmers/request-driver/types";

type AvailableDriversProps = {
  request: RequestValues;
  requestId: string | null;
  onBack: () => void;
  onCancelled: () => void;
};

const AvailableDrivers = ({ request, requestId, onBack, onCancelled }: AvailableDriversProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { mutate: deleteTransportRequest, isPending: isCancelling, isError, error } = useDeleteTransportRequest();

  const handleConfirmCancel = () => {
    if (!requestId) {
      onCancelled();
      return;
    }

    deleteTransportRequest(requestId, {
      onSuccess: () => {
        setIsConfirmOpen(false);
        onCancelled();
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-muted-foreground">Sourcing a Driver</h2>
          <p className="mt-1 text-xs text-muted-foreground">Hang tight while we match you with a trusted nearby driver.</p>
        </div>
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:opacity-80"><ArrowLeft className="h-3.5 w-3.5" /> Edit request</button>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-black/[0.07] bg-white p-3 text-center sm:p-4">
        <div><p className="text-[10px] text-muted-foreground">Produce</p><p className="mt-1 truncate text-xs font-semibold text-muted-foreground">{request.produce}</p></div>
        <div><p className="text-[10px] text-muted-foreground">Load</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{request.quantity} {request.unit}</p></div>
        <div><p className="text-[10px] text-muted-foreground">Route</p><p className="mt-1 truncate text-xs font-semibold text-muted-foreground">{request.pickup.split(",")[0]} → {request.dropoff.split(",")[0]}</p></div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-black/[0.07] bg-white px-6 py-16 text-center">
        <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/10" />
          <Loader2 className="relative h-9 w-9 animate-spin text-primary" strokeWidth={1.75} />
        </span>

        <div>
          <p className="text-base font-semibold text-gray-900">Looking for a nearby driver...</p>
          <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
            We&apos;re matching your request with a trusted driver nearby. This usually only takes a few moments.
          </p>
        </div>

        <Button label="Cancel request" onClick={() => setIsConfirmOpen(true)} variant="outline" size="sm" />
      </div>

      <ConfirmDialog
        open={isConfirmOpen}
        title="Cancel this request?"
        description="You're about to cancel this transport request. This can't be undone."
        confirmLabel="Yes, cancel request"
        cancelLabel="Keep request"
        isConfirming={isCancelling}
        errorMessage={isError ? getErrorMessage(error) : undefined}
        onConfirm={handleConfirmCancel}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export { AvailableDrivers };
