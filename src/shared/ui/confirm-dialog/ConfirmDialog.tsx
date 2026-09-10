"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
  errorMessage?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isConfirming = false,
  errorMessage,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancel, open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/35 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isConfirming) onCancel();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-sm rounded-xl border border-black/8 bg-white p-5 shadow-[0_24px_70px_rgba(33,31,26,0.22)] sm:p-6"
      >
        <h2 id="confirm-dialog-title" className="font-heading text-base font-semibold text-muted-foreground">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}

        {errorMessage && (
          <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <Button
            label={cancelLabel}
            onClick={onCancel}
            variant="outline"
            size="sm"
            disabled={isConfirming}
          />
          <Button
            label={confirmLabel}
            onClick={onConfirm}
            variant="primary"
            size="sm"
            loading={isConfirming}
            disabled={isConfirming}
          />
        </div>
      </section>
    </div>
  );
};

export { ConfirmDialog };
