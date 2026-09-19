"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { TablePagination } from "./TablePagination";
import { TablePulse } from "./TablePulse";

export type OrderStatus = "Pending" | "In Transit" | "Delivered";

export type Order = {
  id: string;
  product: string;
  quantity: string;
  route: string;
  pickupDate: string;
  /** Full backend request id */
  requestId?: string;
  status: OrderStatus;
};

type OrdersTableProps = {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
  pageSize?: number;
  isLoading?: boolean;
};

const SKELETON_ROWS = 5;

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-[#FFF4DC] text-[#9A6411]",
  "In Transit": "bg-[#F3E7DE] text-[#A85A2A]",
  Delivered: "bg-[#E3F2E7] text-primary",
};

const OrdersTable = ({
  orders,
  onOrderClick,
  pageSize = 5,
  isLoading = false,
}: OrdersTableProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(orders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleOrders = orders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="w-full overflow-visible rounded-xl border-0 bg-background md:overflow-hidden md:border md:border-black/[0.07]">

      <div className="hidden bg-background md:block">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1.3fr_0.8fr_1.4fr_1fr_0.8fr_32px] items-center border-b border-black/[0.07]  px-4 py-3 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground lg:px-5">
          <span>Request ID</span>
          <span>Produce</span>
          <span>Quantity</span>
          <span>Route</span>
          <span>Pickup Date</span>
          <span>Status</span>
          <span />
        </div>

        {/* Rows */}
        {isLoading
          ? Array.from({ length: SKELETON_ROWS }, (_, index) => (
              <div
                key={`orders-skeleton-${index}`}
                className="grid grid-cols-[1fr_1.3fr_0.8fr_1.4fr_1fr_0.8fr_32px] items-center border-b border-black/6 px-4 py-3.5 last:border-0 lg:px-5"
              >
                <TablePulse className="h-3 w-14" />
                <TablePulse className="h-3 w-20" />
                <TablePulse className="h-3 w-10" />
                <TablePulse className="h-3 w-28" />
                <TablePulse className="h-3 w-16" />
                <TablePulse className="h-5 w-14 rounded-md" />
                <TablePulse className="h-4 w-4" />
              </div>
            ))
          : visibleOrders.map((order) => (
          <button
            key={order.id}
            type="button"
            onClick={() => onOrderClick?.(order)}
            className="group grid w-full grid-cols-[1fr_1.3fr_0.8fr_1.4fr_1fr_0.8fr_32px] items-center border-b border-black/6 bg-background px-4 py-3.5 text-left transition last:border-0 hover:bg-[#FAF7EF]/60 lg:px-5"
          >
            {/* Order ID */}
            <span className="font-mono text-[11px] font-medium text-muted-foreground">
              {order.id}
            </span>

            {/* Produce */}
            <span className="truncate pr-2 text-xs font-medium text-muted-foreground">
              {order.product}
            </span>

            {/* Quantity */}
            <span className="text-xs text-muted-foreground">
              {order.quantity}
            </span>

            {/* Buyer */}
            <span className="truncate pr-2 text-xs text-muted-foreground">
              {order.route}
            </span>

            {/* Amount */}
            <span className="font-mono text-[11px] font-semibold text-muted-foreground">
              {order.pickupDate}
            </span>

            {/* Status */}
            <span>
              <span
                className={`inline-flex rounded-md px-2.5 py-1 text-[9px] font-medium ${statusStyles[order.status]}`}
              >
                {order.status}
              </span>
            </span>

            {/* Arrow */}
            <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </button>
        ))}
      </div>

      {/* ================= MOBILE ================= */}
      <div className="space-y-3 md:hidden">
        {isLoading
          ? Array.from({ length: SKELETON_ROWS }, (_, index) => (
              <div
                key={`orders-mobile-skeleton-${index}`}
                className="flex w-full items-center gap-3 rounded-xl border border-black/[0.07] bg-background px-4 py-4"
              >
                <TablePulse className="h-9 w-1 rounded-full" />
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <TablePulse className="h-3 w-14" />
                    <TablePulse className="h-5 w-14 rounded-md" />
                  </div>
                  <TablePulse className="h-3 w-24" />
                  <TablePulse className="h-3 w-32" />
                </div>
              </div>
            ))
          : visibleOrders.map((order) => (
          <button
            key={order.id}
            type="button"
            onClick={() => onOrderClick?.(order)}
            className="group flex w-full items-center gap-3 rounded-xl border border-black/[0.07] bg-background px-4 py-4 text-left shadow-sm transition hover:bg-[#FAF7EF]/60"
          >
            {/* Left indicator */}
            <div
              className={`h-9 w-1 shrink-0 rounded-full ${
                order.status === "Delivered"
                  ? "bg-primary"
                  : order.status === "In Transit"
                    ? "bg-[#A85A2A]"
                    : "bg-[#E2911F]"
              }`}
            />

            {/* Main content */}
            <div className="min-w-0 flex-1">
              {/* Top row */}
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] font-semibold text-muted-foreground">
                  {order.id}
                </span>

                <span
                  className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-medium ${statusStyles[order.status]}`}
                >
                  {order.status}
                </span>
              </div>

              {/* Product */}
              <p className="mt-1.5 truncate text-xs font-semibold text-primary">
                {order.product}
              </p>

              {/* Details */}
              <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                <span>{order.quantity}</span>

                <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />

                <span className="truncate">{order.route}</span>
              </div>

              {/* Amount */}
              <p className="mt-1.5 font-mono text-[11px] font-semibold text-primary">
                {order.pickupDate}
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </button>
        ))}
      </div>

      {/* Empty state */}
      {!isLoading && orders.length === 0 && (
        <div className="flex min-h-45 items-center justify-center px-5">
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              No requests yet
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your recent driver requests will appear here.
            </p>
          </div>
        </div>
      )}

      {!isLoading ? (
        <TablePagination
          page={currentPage}
          pageSize={pageSize}
          totalItems={orders.length}
          itemLabel="requests"
          onPageChange={setPage}
        />
      ) : null}
    </div>
  );
};

export { OrdersTable };