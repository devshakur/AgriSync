"use client";

import type { LucideIcon } from "lucide-react";
import { Button } from "@/shared/ui/button";

type ErrorStateProps = {
  /** Optional icon to display */
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

const ErrorState = ({
  icon: Icon,
  title = "Something went wrong",
  description = "An error occurred while loading data. Please try again.",
  actionLabel = "Retry",
  onAction,
  className = "",
}: ErrorStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-6 text-center ${className}`}>
      {Icon ? (
        <span className="relative flex h-32 w-32 items-center justify-center rounded-full bg-red-50">
          <Icon className="relative h-10 w-10 text-red-600" strokeWidth={1.75} />
        </span>
      ) : (
        <span className="relative flex h-32 w-32 items-center justify-center rounded-full bg-red-50">
          <span className="text-red-600">!</span>
        </span>
      )}

      <p className="mt-4 text-base font-semibold text-gray-900">{title}</p>

      {description && (
        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">{description}</p>
      )}

      {actionLabel && onAction && (
        <div className="mt-3">
          <Button label={actionLabel} onClick={onAction} />
        </div>
      )}
    </div>
  );
};

export { ErrorState };
