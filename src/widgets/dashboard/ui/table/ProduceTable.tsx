"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TablePagination } from "./TablePagination";
import type { ProduceCardProps, ProduceStatus } from "../producecard/ProduceCard";

type ProduceTableProps = {
  produce: ProduceCardProps[];
  pageSize?: number;
  onEdit?: (produce: ProduceCardProps) => void;
  onDelete?: (produce: ProduceCardProps) => void;
};

const statusStyles: Record<ProduceStatus, string> = {
  Available: "bg-[#E3F2E7] text-primary",
  "Low Stock": "bg-[#FFF4DC] text-[#9A6411]",
  "Sold Out": "bg-[#F3EDDD] text-muted-foreground",
};

const ProduceTable = ({
  produce,
  pageSize = 2,
  onEdit,
  onDelete,
}: ProduceTableProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(produce.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleProduce = produce.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.07] bg-background">
      <div className="hidden md:block">
        <div className="grid grid-cols-[minmax(180px,1.5fr)_1fr_1fr_1fr_44px] items-center border-b border-black/[0.07] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground lg:px-5">
          <span>Produce</span>
          <span>Available Stock</span>
          <span>Price</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {visibleProduce.map((product) => (
          <div
            key={product.id ?? product.name}
            className="grid grid-cols-[minmax(180px,1.5fr)_1fr_1fr_1fr_44px] items-center border-b border-black/6 px-4 py-2.5 last:border-0 lg:px-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-9 w-11 shrink-0 overflow-hidden rounded-md">
                <Image
                  src="/assests/images/produce-onions.jpg"
                  alt={product.name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <span className="truncate text-xs font-semibold text-muted-foreground">
                {product.name}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{product.quantity}</span>
            <span className="text-xs text-muted-foreground">
              {product.price} / {product.unit}
            </span>
            <span>
              <span className={`inline-flex rounded-md px-2 py-1 text-[9px] font-medium ${statusStyles[product.status]}`}>
                {product.status}
              </span>
            </span>
            <ProduceActions
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      <div className="divide-y divide-black/6 md:hidden">
        {visibleProduce.map((product) => (
          <div key={product.id ?? product.name} className="flex items-center gap-3 px-3 py-3">
            <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src="/assests/images/produce-onions.jpg"
                alt={product.name}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-foreground">{product.name}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">
                {product.quantity} · {product.price} / {product.unit}
              </p>
            </div>
            <span className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-medium ${statusStyles[product.status]}`}>
              {product.status}
            </span>
            <ProduceActions
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      {produce.length === 0 && (
        <div className="flex min-h-32 items-center justify-center text-sm text-muted-foreground">
          No produce found.
        </div>
      )}

      <TablePagination
        page={currentPage}
        pageSize={pageSize}
        totalItems={produce.length}
        itemLabel="produce"
        onPageChange={setPage}
      />
    </div>
  );
};

type ProduceActionsProps = {
  product: ProduceCardProps;
  onEdit?: (produce: ProduceCardProps) => void;
  onDelete?: (produce: ProduceCardProps) => void;
};

const ProduceActions = ({
  product,
  onEdit,
  onDelete,
}: ProduceActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        aria-label={`Actions for ${product.name}`}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-primary"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-9 z-30 w-32 overflow-hidden rounded-lg border border-black/8 bg-background p-1 shadow-[0_12px_30px_rgba(33,31,26,0.14)]">
          <button
            type="button"
            onClick={() => {
              onEdit?.(product);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-muted-foreground transition hover:bg-muted"
          >
            <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
            Edit
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete?.(product);
              setIsOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-red-700 transition hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export { ProduceTable };
