"use client";

import { ArrowLeft, CheckCircle2, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import type { Driver, RequestValues } from "../../../features/farmers/request-driver/types";

type TransactionCompletedProps = {
  driver: Driver;
  request: RequestValues;
  onBackHome: () => void;
};

const TransactionCompleted = ({ driver, request, onBackHome }: TransactionCompletedProps) => {
  return (
    <div className="mx-auto max-w-xl rounded-xl border border-black/[0.07] bg-white p-5 text-center shadow-sm sm:p-8">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DFF0E4] text-primary">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h2 className="mt-4 font-heading text-xl font-bold text-muted-foreground">Transaction Completed!</h2>
      <p className="mx-auto mt-2 max-w-sm text-xs text-muted-foreground">Your driver has delivered your goods successfully.</p>
      <div className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-xl bg-[#FAF7EF] p-3 text-left">
        <div className="relative h-11 w-11 overflow-hidden rounded-full"><Image src={driver.image} alt={driver.name} fill sizes="44px" className="object-cover" /></div>
        <div className="flex-1"><p className="text-sm font-semibold text-muted-foreground">{driver.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{driver.rating} rating · {driver.trips} trips</p></div>
        <p className="text-sm font-bold text-primary">{driver.price}</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-left">
        <div className="rounded-lg border border-black/[0.07] p-3"><p className="text-[10px] text-muted-foreground">Produce</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{request.produce}</p></div>
        <div className="rounded-lg border border-black/[0.07] p-3"><p className="text-[10px] text-muted-foreground">Quantity</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{request.quantity} {request.unit}</p></div>
        <div className="rounded-lg border border-black/[0.07] p-3"><p className="text-[10px] text-muted-foreground">Pickup</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{request.pickup}</p></div>
        <div className="rounded-lg border border-black/[0.07] p-3"><p className="text-[10px] text-muted-foreground">Delivered</p><p className="mt-1 text-xs font-semibold text-muted-foreground">11:45 AM</p></div>
      </div>
      <div className="mt-6 border-t border-black/[0.07] pt-5">
        <p className="text-sm font-semibold text-muted-foreground">Rate Your Experience</p>
        <div className="mt-3 flex justify-center gap-1">{[1, 2, 3, 4, 5].map((star) => <button type="button" key={star} aria-label={`Rate ${star} stars`}><Star className="h-6 w-6 fill-[#E2911F] text-[#E2911F]" /></button>)}</div>
        <p className="mt-2 text-[10px] text-muted-foreground">Help us improve our service</p>
      </div>
      <Button label="Back to Home" onClick={onBackHome} size="md" className="mt-6 w-full rounded-lg" />
      <button type="button" onClick={onBackHome} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"><ArrowLeft className="h-3 w-3" /> Back to dashboard</button>
    </div>
  );
};

export { TransactionCompleted };
