"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import {
  OrdersTable,
  type Order,
} from "./OrdersTable";

type OrdersSectionProps = {
  title?: string;
  description?: string;
  orders: Order[];
  isLoading?: boolean;
  onViewAll?: () => void;
  onOrderClick?: (order: Order) => void;
  sideContent?: ReactNode;
};

const OrdersSection = ({
  title = "Recent Orders",
  description,
  orders,
  isLoading = false,
  onViewAll,
  onOrderClick,
  sideContent,
}: OrdersSectionProps) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="min-w-0">
          {/* Section header */}
          <div className="mb-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <h2 className="font-heading text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl">
                {title}
              </h2>

              {description && (
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {description}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onViewAll}
              className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-primary transition hover:text-primary/80 sm:text-sm"
            >
              <span>View all</span>

              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          <OrdersTable
            orders={orders}
            isLoading={isLoading}
            onOrderClick={onOrderClick}
          />
        </div>

        <div className="min-w-0 lg:flex lg:h-full lg:flex-col lg:pt-5">
          {sideContent}
        </div>
      </div>
    </section>
  );
};

export { OrdersSection, type OrdersSectionProps };