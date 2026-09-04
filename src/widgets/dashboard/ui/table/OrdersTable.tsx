"use client";

import { ChevronRight } from "lucide-react";

export type OrderStatus = "Pending" | "In Transit" | "Delivered";

export type Order = {
  id: string;
  product: string;
  quantity: string;
  buyer: string;
  amount: string;
  status: OrderStatus;
};

type OrdersTableProps = {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
};

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-[#FFF4DC] text-[#9A6411]",
  "In Transit": "bg-[#F3E7DE] text-[#A85A2A]",
  Delivered: "bg-[#E3F2E7] text-primary",
};

const OrdersTable = ({
  orders,
  onOrderClick,
}: OrdersTableProps) => {
  return (
    <div className="w-full overflow-visible rounded-xl border-0  md:overflow-hidden md:border md:border-black/[0.07]">
    
      <div className="hidden md:block">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_1.3fr_0.8fr_1.4fr_1fr_0.8fr_32px] items-center border-b border-black/[0.07]  px-4 py-3 text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground lg:px-5">
          <span>Order ID</span>
          <span>Produce</span>
          <span>Quantity</span>
          <span>Buyer</span>
          <span>Amount</span>
          <span>Status</span>
          <span />
        </div>

        {/* Rows */}
        {orders.map((order) => (
          <button
            key={order.id}
            type="button"
            onClick={() => onOrderClick?.(order)}
            className="group grid w-full grid-cols-[1fr_1.3fr_0.8fr_1.4fr_1fr_0.8fr_32px] items-center border-b border-black/6 px-4 py-3.5 text-left transition last:border-0 hover:bg-[#FAF7EF]/60 lg:px-5"
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
              {order.buyer}
            </span>

            {/* Amount */}
            <span className="font-mono text-[11px] font-semibold text-muted-foreground">
              {order.amount}
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
        {orders.map((order) => (
          <button
            key={order.id}
            type="button"
            onClick={() => onOrderClick?.(order)}
            className="group flex w-full items-center gap-3 rounded-xl border border-black/[0.07] px-4 py-4 text-left shadow-sm transition hover:bg-[#FAF7EF]/60"
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

                <span className="truncate">{order.buyer}</span>
              </div>

              {/* Amount */}
              <p className="mt-1.5 font-mono text-[11px] font-semibold text-primary">
                {order.amount}
              </p>
            </div>

            {/* Arrow */}
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </button>
        ))}
      </div>

      {/* Empty state */}
      {orders.length === 0 && (
        <div className="flex min-h-45 items-center justify-center px-5">
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              No orders yet
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Your recent orders will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export { OrdersTable };