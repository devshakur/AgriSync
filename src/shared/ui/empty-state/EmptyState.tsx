import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";

type EmptyStateProps = {
  /** Path to an illustration under /public. Takes priority over `icon`. */
  image?: string;
  imageAlt?: string;
  /** Fallback illustration when no `image` is supplied. */
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
};

const EmptyState = ({
  image,
  imageAlt = "",
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = "",
}: EmptyStateProps) => {
  return (
    <div className={`flex flex-col items-center justify-center px-6 py-4 text-center ${className}`}>
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          width={160}
          height={160}
          className="h-40 w-40 object-contain"
        />
      ) : Icon ? (
        <span className="relative flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
          <span className="absolute inset-3 rounded-full bg-primary/10" />
          <Icon className="relative h-10 w-10 text-primary" strokeWidth={1.75} />
        </span>
      ) : null}

      <p className="mt-6 text-base font-semibold text-gray-900">{title}</p>

      {description && (
        <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {actionLabel && (onAction || actionHref) && (
        <div className="mt-5">
          <Button
            label={actionLabel}
            onClick={onAction}
            href={actionHref}
            variant="primary"
            size="md"
          />
        </div>
      )}
    </div>
  );
};

export { EmptyState };
