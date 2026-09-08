"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { ImagePlus, Upload, X } from "lucide-react";
import Image from "next/image";
import { FormField } from "@/shared/ui/formfield";
import type { ProduceCardProps, ProduceStatus } from "../producecard/ProduceCard";

type ProduceModalProps = {
  open: boolean;
  produce?: ProduceCardProps;
  onClose: () => void;
  onSubmit?: (values: ProduceFormValues) => void;
};

export type ProduceFormValues = {
  name: string;
  category: string;
  quantity: string;
  unit: string;
  price: string;
  priceUnit: string;
  description: string;
  image: string;
  status: ProduceStatus;
};

const emptyForm: ProduceFormValues = {
  name: "",
  category: "",
  quantity: "",
  unit: "kg",
  price: "",
  priceUnit: "basket",
  description: "",
  image: "",
  status: "Available",
};

const getInitialForm = (produce?: ProduceCardProps): ProduceFormValues => {
  if (!produce) return emptyForm;

  return {
    name: produce.name,
    category: "",
    quantity: produce.quantity.replace(/\s?(kg|bags?)$/i, ""),
    unit: produce.quantity.toLowerCase().includes("bag") ? "bag" : "kg",
    price: produce.price.replace(/[^\d.]/g, ""),
    priceUnit: produce.unit,
    description: "",
    image: produce.image,
    status: produce.status,
  };
};

const ProduceModal = ({
  open,
  produce,
  onClose,
  onSubmit,
}: ProduceModalProps) => {
  const isEditing = Boolean(produce);
  const [form, setForm] = useState<ProduceFormValues>(() => getInitialForm(produce));
  const [imagePreview, setImagePreview] = useState(() => produce?.image ?? "");

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose, open]);

  if (!open) return null;

  const updateField = <Key extends keyof ProduceFormValues>(
    field: Key,
    value: ProduceFormValues[Key],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : "";
      setImagePreview(image);
      updateField("image", image);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit?.(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-70 flex items-center justify-center bg-black/35 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="produce-modal-title"
        className="flex max-h-[calc(100vh-1.5rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_24px_70px_rgba(33,31,26,0.22)] sm:max-h-[calc(100vh-3rem)]"
      >
        <div className="flex items-start justify-between border-b border-black/[0.07] px-4 py-4 sm:px-6 sm:py-5">
          <div>
            <h2 id="produce-modal-title" className="font-heading text-base font-semibold text-muted-foreground sm:text-lg">
              {isEditing ? "Edit Produce" : "List New Produce"}
            </h2>
            <p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">
              {isEditing ? "Update your listing details." : "Add your farm produce to reach more buyers."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close produce modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
            <FormField
              label="Produce Name"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="e.g. Fresh Tomatoes"
            />
            <FormField
              type="select"
              label="Category"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              placeholder="Select category"
              options={[
                { label: "Vegetables", value: "vegetables" },
                { label: "Grains", value: "grains" },
                { label: "Fruits", value: "fruits" },
                { label: "Tubers", value: "tubers" },
              ]}
            />
            <FormField
              type="select"
              label="Status"
              value={form.status}
              onChange={(event) => updateField("status", event.target.value as ProduceStatus)}
              options={[
                { label: "Available", value: "Available" },
                { label: "Low Stock", value: "Low Stock" },
                { label: "Sold Out", value: "Sold Out" },
              ]}
            />

            <FormField
              label="Quantity"
              type="number"
              value={form.quantity}
              onChange={(event) => updateField("quantity", event.target.value)}
              placeholder="e.g. 500"
            />
            <FormField
              type="select"
              label="Unit"
              value={form.unit}
              onChange={(event) => updateField("unit", event.target.value)}
              options={[
                { label: "kg", value: "kg" },
                { label: "bag", value: "bag" },
                { label: "basket", value: "basket" },
              ]}
            />

            <div className="grid grid-cols-[minmax(0,1fr)_minmax(110px,0.8fr)] gap-3">
              <FormField
                label="Price"
                type="number"
                value={form.price}
                onChange={(event) => updateField("price", event.target.value)}
                placeholder="e.g. 1200"
              />
              <FormField
                type="select"
                label="Per"
                value={form.priceUnit}
                onChange={(event) => updateField("priceUnit", event.target.value)}
                options={[
                  { label: "basket", value: "basket" },
                  { label: "kg", value: "kg" },
                  { label: "bag", value: "bag" },
                ]}
              />
            </div>

            <div className="row-span-2">
              <label className="block text-sm font-semibold text-muted-foreground sm:text-xs">Product Image</label>
              <label className="mt-1.5 flex min-h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border border-dashed border-black/15 bg-background px-4 py-4 text-center transition hover:border-primary/50 hover:bg-muted/40 sm:min-h-42">
                {imagePreview ? (
                  <div className="relative h-36 w-full overflow-hidden rounded-md">
                    <Image
                      src={imagePreview}
                      alt="Produce preview"
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <>
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    <span className="mt-2 text-xs font-semibold text-primary">Upload image</span>
                    <span className="mt-1 text-[10px] text-muted-foreground">Drag and drop or click to browse</span>
                    <span className="mt-1 text-[10px] text-muted-foreground">JPG, PNG or WEBP (Max 5MB)</span>
                  </>
                )}
                <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} className="sr-only" />
              </label>
              {!imagePreview && <Upload className="sr-only" />}
            </div>

            <FormField
              type="textarea"
              label="Description (Optional)"
              value={form.description}
              onChange={(event) => updateField("description", event.target.value)}
              placeholder="Describe your produce..."
              rows={4}
              className="sm:col-span-1"
            />

            {isEditing && produce && (
              <div className="sm:col-span-1">
                <p className="py-1 text-xs font-semibold text-muted-foreground">Last Updated</p>
                <p className="rounded-xl bg-[#FAF8F2] px-4 py-3 text-sm text-muted-foreground">
                  {produce.updatedAt}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-black/[0.07] px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-black/10 bg-background px-4 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary/90"
          >
            {isEditing ? "Save Changes" : "List Produce"}
          </button>
        </div>
      </section>
    </div>
  );
};

export { ProduceModal };
