"use client";

import {
  CalendarDays,
  MoreHorizontal,
  Package,
  Pencil,
} from "lucide-react";
import Image from "next/image";

export type ProduceStatus = "Available" | "Low Stock" | "Sold Out";

 type ProduceCardProps = {
  id?: string;
  name: string;
  image: string;
  quantity: string;
  price: string;
  unit: string;
  status: ProduceStatus;
  updatedAt: string;
  onEdit?: (id?: string) => void;
  onMenuClick?: (id?: string) => void;
};

const ProduceCard = ({
  id,
  name,

  quantity,
  price,
  unit,
  status,
  updatedAt,
  onEdit,

}: ProduceCardProps) => {
  const statusStyles = {
    Available: {
      badge: "border-primary/15 bg-[#E3F2E7] text-primary",
    },
    "Low Stock": {
      badge: "border-[#E2911F]/30 bg-[#FFF4DC] text-[#9A6411]",
    },
    "Sold Out": {
      badge: "border-black/10 bg-[#F3EDDD] text-muted-foreground",
    },
  };

  return (
    <article className="group  overflow-hidden rounded-xl border border-black/[0.07]  shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(33,31,26,0.08)]">
      {/* Image */}
      
      <div className="relative h-38.75 overflow-hidden sm:h-41.25">
        <Image
          src="/assests/images/produce-onions.jpg"
          alt={name}
          width={500}
          height={500}
          quality={100}
          priority
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {/* Status */}
        <span
          className={`absolute bottom-0 left-3 translate-y-1/2 rounded-full border px-3 py-1 text-[10px] font-medium shadow-sm ${
            statusStyles[status].badge
          }`}
        >
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="px-3 pb-0 pt-6">
        {/* Name */}
        <h3 className="font-heading text-[15px] font-semibold tracking-tight text-muted-foreground">
          {name}
        </h3>

        {/* Quantity */}
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Package className="h-3.5 w-3.5" strokeWidth={1.7} />
          <span>{quantity} available</span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-1">
          <span className="font-mono text-sm font-semibold text-primary">
            {price}
          </span>

          <span className="text-xs text-muted-foreground">
            / {unit}
          </span>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-4 flex items-center justify-between border-t border-black/[0.07] px-3 py-3">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.7} />
          <span>{updatedAt}</span>
        </div>

        <button
          type="button"
          onClick={() => onEdit?.(id)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-primary"
          aria-label={`Edit ${name}`}
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );
}

export {ProduceCard, type ProduceCardProps};