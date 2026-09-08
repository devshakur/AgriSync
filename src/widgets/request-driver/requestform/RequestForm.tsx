"use client";

import { Clock3, MapPin, Package, Truck } from "lucide-react";
import { FormField } from "@/shared/ui/formfield";
import { Button } from "@/shared/ui/button";
import type { RequestValues } from "../../../features/farmers/request-driver/types";

type RequestFormProps = {
  values: RequestValues;
  onChange: (field: keyof RequestValues, value: string) => void;
  onSubmit: () => void;
};

const RequestForm = ({ values, onChange, onSubmit }: RequestFormProps) => {
  return (
    <div className="rounded-xl border border-black/[0.07] bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-semibold text-muted-foreground">Request a Driver</h2>
          <p className="mt-1 text-xs text-muted-foreground">Tell us what you need moved and where. We will match you with nearby drivers.</p>
        </div>
        <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-[#E3F2E7] text-primary sm:flex">
          <Truck className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Pickup and drop-off</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField label="Pickup Location (Farm)" icon={MapPin} value={values.pickup} onChange={(event) => onChange("pickup", event.target.value)} placeholder="e.g. Green Farm, Kano" />
            <FormField label="Drop-off Location" icon={MapPin} value={values.dropoff} onChange={(event) => onChange("dropoff", event.target.value)} placeholder="e.g. My House, Kano" />
            <FormField type="select" label="Preferred Pickup Date" value={values.date} onChange={(event) => onChange("date", event.target.value)} icon={Clock3} options={[{ label: "Today", value: "Today" }, { label: "Tomorrow", value: "Tomorrow" }, { label: "Select a date", value: "Select a date" }]} />
            <FormField type="select" label="Preferred Pickup Time" value={values.time} onChange={(event) => onChange("time", event.target.value)} icon={Clock3} options={[{ label: "10:30 AM", value: "10:30 AM" }, { label: "12:00 PM", value: "12:00 PM" }, { label: "2:00 PM", value: "2:00 PM" }]} />
          </div>
        </div>

        <div>
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Load details</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField type="select" label="What are you transporting?" value={values.produce} onChange={(event) => onChange("produce", event.target.value)} icon={Package} options={[{ label: "Fresh Tomatoes", value: "Fresh Tomatoes" }, { label: "Yellow Maize", value: "Yellow Maize" }, { label: "Local Rice", value: "Local Rice" }, { label: "Other produce", value: "Other produce" }]} />
            <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3">
              <FormField label="Approx. Quantity" type="number" value={values.quantity} onChange={(event) => onChange("quantity", event.target.value)} placeholder="e.g. 500" />
              <FormField type="select" label="Unit" value={values.unit} onChange={(event) => onChange("unit", event.target.value)} options={[{ label: "kg", value: "kg" }, { label: "bags", value: "bags" }, { label: "crates", value: "crates" }]} />
            </div>
            <FormField type="select" label="Packaging" value={values.packaging} onChange={(event) => onChange("packaging", event.target.value)} options={[{ label: "Crates", value: "Crates" }, { label: "Bags", value: "Bags" }, { label: "Loose load", value: "Loose load" }]} />
            <FormField type="textarea" label="Additional notes (optional)" value={values.notes} onChange={(event) => onChange("notes", event.target.value)} placeholder="e.g. Fragile items, special instructions..." rows={2} />
          </div>
        </div>

        <Button label="Find Drivers" onClick={onSubmit} size="lg" className="w-full rounded-lg" />
      </div>
    </div>
  );
};

export { RequestForm };
