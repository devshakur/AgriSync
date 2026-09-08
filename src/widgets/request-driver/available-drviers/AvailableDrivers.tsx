"use client";

import { ArrowLeft, SlidersHorizontal, Users } from "lucide-react";
import { DriverCard } from "../driverscard";
import type { Driver, RequestValues } from "../../../features/farmers/request-driver/types";

type AvailableDriversProps = {
  request: RequestValues;
  drivers: Driver[];
  onBack: () => void;
  onSelect: (driver: Driver) => void;
};

const AvailableDrivers = ({ request, drivers, onBack, onSelect }: AvailableDriversProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-lg font-semibold text-muted-foreground">Available Drivers</h2>
          <p className="mt-1 text-xs text-muted-foreground">We found drivers who can transport your produce.</p>
        </div>
        <button type="button" onClick={onBack} className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:opacity-80"><ArrowLeft className="h-3.5 w-3.5" /> Edit request</button>
      </div>
      <div className="grid grid-cols-3 gap-2 rounded-xl border border-black/[0.07] bg-white p-3 text-center sm:grid-cols-4 sm:p-4">
        <div><p className="text-[10px] text-muted-foreground">Produce</p><p className="mt-1 truncate text-xs font-semibold text-muted-foreground">{request.produce}</p></div>
        <div><p className="text-[10px] text-muted-foreground">Load</p><p className="mt-1 text-xs font-semibold text-muted-foreground">{request.quantity} {request.unit}</p></div>
        <div><p className="text-[10px] text-muted-foreground">Route</p><p className="mt-1 truncate text-xs font-semibold text-muted-foreground">{request.pickup.split(",")[0]} → {request.dropoff.split(",")[0]}</p></div>
        <div className="hidden sm:block"><p className="text-[10px] text-muted-foreground">Drivers</p><p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary"><Users className="h-3 w-3" /> {drivers.length} nearby</p></div>
      </div>
      <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">Compare price, rating, vehicle and proximity.</p><button type="button" className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"><SlidersHorizontal className="h-3.5 w-3.5" /> Sort by match</button></div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">{drivers.map((driver) => <DriverCard key={driver.id} driver={driver} onSelect={onSelect} />)}</div>
    </div>
  );
};

export { AvailableDrivers };
