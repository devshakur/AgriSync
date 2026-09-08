"use client";

import { CheckCircle2, MapPin, Star, Truck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import type { Driver } from "../../../features/farmers/request-driver/types";

type DriverCardProps = {
  driver: Driver;
  onSelect: (driver: Driver) => void;
};

const DriverCard = ({ driver, onSelect }: DriverCardProps) => {
  return (
    <article className={`relative rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${driver.bestMatch ? "border-primary" : "border-black/[0.07]"}`}>
      {driver.bestMatch && <span className="absolute right-3 top-3 rounded-full bg-[#E3F2E7] px-2.5 py-1 text-[9px] font-semibold text-primary">Best Match</span>}
      <div className="flex items-start gap-3">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-[#E3F2E7]">
          <Image src={driver.image} alt={driver.name} fill sizes="44px" className="object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-sm font-semibold text-muted-foreground">{driver.name}</h3>
            {driver.verified && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Star className="h-3 w-3 fill-[#E2911F] text-[#E2911F]" /> {driver.rating}</span>
            <span>{driver.trips} trips</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {driver.distance}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-[#FAF7EF] p-3 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1.5"><Truck className="h-3.5 w-3.5 text-primary" /> {driver.vehicle}</span>
        <span>{driver.capacity}</span>
        <span>{driver.eta}</span>
        <span className="font-semibold text-primary">{driver.price}</span>
      </div>
      <Button label="Select Driver" onClick={() => onSelect(driver)} size="sm" className="mt-3 w-full rounded-lg" />
    </article>
  );
};

export { DriverCard };
