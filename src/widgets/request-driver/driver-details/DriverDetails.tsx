"use client";

import { ArrowLeft, CheckCircle2, Star, Truck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import type { Driver, RequestValues } from "../../../features/farmers/request-driver/types";

type DriverDetailsProps = {
  driver: Driver;
  request: RequestValues;
  onBack: () => void;
  onProceed: () => void;
};

const DriverDetails = ({ driver, request, onBack, onProceed }: DriverDetailsProps) => {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary"><ArrowLeft className="h-3.5 w-3.5" /> Back to drivers</button>
      <section className="rounded-xl border border-black/[0.07] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3 border-b border-black/[0.07] pb-5">
          <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-[#E3F2E7]"><Image src={driver.image} alt={driver.name} fill sizes="56px" className="object-cover" /></div>
          <div className="min-w-0 flex-1"><div className="flex items-center gap-1.5"><h2 className="font-heading text-lg font-semibold text-muted-foreground">{driver.name}</h2><CheckCircle2 className="h-4 w-4 text-primary" /></div><p className="mt-1 text-xs text-muted-foreground">Verified driver · Active now</p><div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground"><Star className="h-3.5 w-3.5 fill-[#E2911F] text-[#E2911F]" /> {driver.rating} · {driver.trips} completed trips</div></div>
        </div>
        <div className="grid grid-cols-2 gap-3 py-5 text-xs"><div className="rounded-lg bg-[#FAF7EF] p-3"><p className="text-[10px] text-muted-foreground">Distance</p><p className="mt-1 font-semibold text-muted-foreground">{driver.distance}</p></div><div className="rounded-lg bg-[#FAF7EF] p-3"><p className="text-[10px] text-muted-foreground">Estimated pickup</p><p className="mt-1 font-semibold text-muted-foreground">{driver.eta}</p></div><div className="col-span-2 flex items-center gap-2 rounded-lg bg-[#FAF7EF] p-3"><Truck className="h-4 w-4 text-primary" /><span className="font-semibold text-muted-foreground">{driver.vehicle}</span><span className="text-muted-foreground">· {driver.capacity}</span></div></div>
        <div className="space-y-3 border-t border-black/[0.07] pt-5 text-xs"><div className="flex items-start justify-between gap-3"><span className="text-muted-foreground">Pickup and drop-off</span><span className="text-right font-medium text-muted-foreground">{request.pickup}<br />{request.dropoff}</span></div><div className="flex items-center justify-between"><span className="text-muted-foreground">Load</span><span className="font-medium text-muted-foreground">{request.produce} · {request.quantity} {request.unit}</span></div><div className="flex items-center justify-between border-t border-black/[0.07] pt-3"><span className="font-semibold text-muted-foreground">Transportation fee</span><span className="text-lg font-bold text-primary">{driver.price}</span></div></div>
        <Button label="Accept & Proceed to Chat" onClick={onProceed} size="lg" className="mt-5 w-full rounded-lg" />
      </section>
    </div>
  );
};

export { DriverDetails };
