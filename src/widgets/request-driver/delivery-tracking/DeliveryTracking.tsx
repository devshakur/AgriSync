"use client";

import { Check, MapPin, Truck } from "lucide-react";
import { Button } from "@/shared/ui/button";
import type { DeliveryStatus, Driver, RequestValues } from "../../../features/farmers/request-driver/types";

type DeliveryTrackingProps = {
  driver: Driver;
  request: RequestValues;
  status: DeliveryStatus;
  onStatusChange: (status: DeliveryStatus) => void;
  onBack: () => void;
  onComplete: () => void;
};

const statuses: DeliveryStatus[] = [
  "Requested",
  "Driver Accepted",
  "Driver Arrived",
  "Transporting",
  "Delivered",
];

const DeliveryTracking = ({
  driver,
  request,
  status,
  onStatusChange,
  onBack,
  onComplete,
}: DeliveryTrackingProps) => {
  const currentIndex = statuses.indexOf(status);
  const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <button type="button" onClick={onBack} className="text-xs font-semibold text-primary">
        Back to chat
      </button>
      <section className="rounded-xl border border-black/[0.07] bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-heading text-lg font-semibold text-muted-foreground">
              Delivery in Progress
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Track your produce from the farm to its destination.
            </p>
          </div>
          <span className="rounded-full bg-[#FFF4DC] px-2.5 py-1 text-[10px] font-semibold text-[#9A6411]">
            {status}
          </span>
        </div>

        <div className="mt-6 overflow-x-auto pb-2">
          <div className="flex min-w-135 items-start">
            {statuses.map((item, index) => {
              const done = index <= currentIndex;

              return (
                <div key={item} className="flex flex-1 items-start">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                        done
                          ? "border-primary bg-primary text-white"
                          : "border-black/10 bg-background text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" /> : <span className="text-[10px]">{index + 1}</span>}
                    </div>
                    <span
                      className={`whitespace-nowrap text-[9px] ${
                        done ? "font-semibold text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                  {index < statuses.length - 1 && (
                    <div className={`mt-4 h-px flex-1 ${index < currentIndex ? "bg-primary" : "bg-black/10"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-4 flex h-48 items-center justify-center overflow-hidden rounded-xl border border-black/[0.07] bg-[#EAF4EE]">
          <div className="absolute inset-5 rounded-lg border border-dashed border-primary/30" />
          <MapPin className="absolute left-1/4 top-1/3 h-7 w-7 text-primary" />
          <Truck className="relative z-10 h-10 w-10 rounded-full bg-white p-2 text-primary shadow-md" />
          <MapPin className="absolute bottom-1/3 right-1/4 h-7 w-7 text-red-500" />
          <div className="absolute bottom-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium text-primary">
            Live location tracking
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-[#FAF7EF] p-3"><p className="text-[10px] text-muted-foreground">Driver</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{driver.name}</p></div>
          <div className="rounded-lg bg-[#FAF7EF] p-3"><p className="text-[10px] text-muted-foreground">Vehicle</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{driver.vehicle}</p></div>
          <div className="rounded-lg bg-[#FAF7EF] p-3"><p className="text-[10px] text-muted-foreground">Produce</p><p className="mt-1 truncate text-xs font-semibold text-muted-foreground">{request.quantity} {request.unit}</p></div>
          <div className="rounded-lg bg-[#FAF7EF] p-3"><p className="text-[10px] text-muted-foreground">Fee</p><p className="mt-1 text-xs font-semibold text-primary">{driver.price}</p></div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs"><span className="text-muted-foreground">Estimated delivery</span><span className="font-semibold text-muted-foreground">11:45 AM</span></div>
        <Button
          label={status === "Transporting" ? "Mark as Delivered" : `Advance to ${nextStatus}`}
          onClick={() => {
            if (status === "Transporting") onComplete();
            else onStatusChange(nextStatus);
          }}
          size="md"
          className="mt-5 w-full rounded-lg"
        />
      </section>
    </div>
  );
};

export { DeliveryTracking };
