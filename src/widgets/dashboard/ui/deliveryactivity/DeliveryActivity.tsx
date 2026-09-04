"use client";

import {
  Check,
  Clock3,
  PackageCheck,
  Truck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DeliveryActivityItem = {
  order: string;
  description: string;
  time: string;
  icon: LucideIcon;
  tone: "green" | "orange";
};

type DeliveryActivityProps = {
  items?: DeliveryActivityItem[];
  onViewAll?: () => void;
};

const defaultItems: DeliveryActivityItem[] = [
  {
    order: "Order #AG-1047",
    description: "Driver assigned",
    time: "10:30 AM",
    icon: PackageCheck,
    tone: "green",
  },
  {
    order: "Order #AG-1043",
    description: "Picked up from farm",
    time: "Yesterday, 4:20 PM",
    icon: Truck,
    tone: "green",
  },
  {
    order: "Order #AG-1042",
    description: "On the way to buyer",
    time: "Yesterday, 2:10 PM",
    icon: Clock3,
    tone: "orange",
  },
  {
    order: "Order #AG-1041",
    description: "Delivered successfully",
    time: "Yesterday, 1:45 PM",
    icon: Check,
    tone: "green",
  },
];

const DeliveryActivity = ({
  items = defaultItems,
  onViewAll,
}: DeliveryActivityProps) => {
  return (
    <section className="min-h-85 rounded-2xl border border-black/[0.07] bg-background p-5 shadow-md">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-heading text-md font-semibold tracking-tight text-gray-700">
          Delivery Activity
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="shrink-0 text-xs font-semibold text-primary transition hover:text-primary/80"
        >
          View all
        </button>
      </div>

      <div className="mt-6">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === items.length - 1;
          const iconColor =
            item.tone === "orange"
              ? "bg-secondary text-white"
              : "bg-primary text-white";

          return (
            <div key={item.order} className="relative flex gap-3">
              {!isLast && (
                <span
                  className={`absolute left-3.25 top-7 h-[calc(100%-4px)] w-px ${
                    item.tone === "orange" ? "bg-secondary/60" : "bg-primary/60"
                  }`}
                />
              )}

              <div
                className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${iconColor}`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
              </div>

              <div className="flex min-w-0 flex-1 items-start justify-between gap-2 mb-6 pb-5 last:pb-0">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-500">
                    {item.order}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <time className="shrink-0 pt-0.5 text-[10px] text-muted-foreground">
                  {item.time}
                </time>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export { DeliveryActivity };
