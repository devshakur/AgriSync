"use client";

import { Clock3, MapPin, Package, Truck } from "lucide-react";
import { FormField } from "@/shared/ui/formfield";
import { Button } from "@/shared/ui/button";
import { hasEmptyFields } from "@/lib/validation";
import type { RequestValues } from "../../../features/farmers/request-driver/types";
import type { ChangeEvent } from "react";

type RequestFormProps = {
  values: RequestValues;
  onChange: (field: keyof RequestValues, value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  errorMessage?: string;
};

const RequestForm = ({
  values,
  onChange,
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: RequestFormProps) => {
  const isFormIncomplete = hasEmptyFields(
    values.pickup,
    values.dropoff,
    values.date,
    values.time,
    values.produce,
    values.quantity,
  );

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
          <p className="mb-3 text-[10px] font-normal uppercase tracking-[0.16em] text-muted-foreground">Pickup and drop-off</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField label="Pickup Location (Farm)" icon={MapPin} value={values.pickup} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange("pickup", event.target.value)} placeholder="e.g. Green Farm, Kano" />
            <FormField label="Drop-off Location" icon={MapPin} value={values.dropoff} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange("dropoff", event.target.value)} placeholder="e.g. My House, Kano" />
            <FormField type="date" label="Preferred Pickup Date" value={values.date} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange("date", event.target.value)} icon={Clock3} />
            <FormField type="time" label="Preferred Pickup Time" value={values.time} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange("time", event.target.value)} icon={Clock3} />
          </div>
        </div>

        <div>
          <p className="mb-3 text-[10px] font-normal uppercase tracking-[0.16em] text-muted-foreground">Load details</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormField type="select" label="What are you transporting?" value={values.produce} className="text-sm" onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange("produce", event.target.value)} icon={Package} placeholder="Select produce" options={[{ label: "Fresh Tomatoes", value: "Fresh Tomatoes" }, { label: "Yellow Maize", value: "Yellow Maize" }, { label: "Local Rice", value: "Local Rice" }, { label: "Other produce", value: "Other produce" }]} />
            <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3">
              <FormField label="Approx. Quantity" type="number" value={values.quantity} onChange={(event: ChangeEvent<HTMLInputElement>) => onChange("quantity", event.target.value)} placeholder="e.g. 500" />
              <FormField type="select" className="text-sm" label="Unit" value={values.unit} onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange("unit", event.target.value)} placeholder="Unit" options={[{ label: "kg", value: "kg" }, { label: "bags", value: "bags" }, { label: "crates", value: "crates" }]} />
            </div>
            <FormField type="select" label="Packaging" className="text-sm" value={values.packaging} onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange("packaging", event.target.value)} placeholder="Select packaging" options={[{ label: "Crates", value: "Crates" }, { label: "Bags", value: "Bags" }, { label: "Loose load", value: "Loose load" }]} />
            <FormField type="textarea" label="Additional notes (optional)" value={values.notes} onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange("notes", event.target.value)} placeholder="e.g. Fragile items, special instructions..." rows={2} />
          </div>
        </div>

        <Button
          label="Find Drivers"
          onClick={onSubmit}
          size="lg"
          className="w-full rounded-lg"
          disabled={isFormIncomplete || isSubmitting}
          loading={isSubmitting}
        />

        {errorMessage && (
          <p className="text-center text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export { RequestForm };
