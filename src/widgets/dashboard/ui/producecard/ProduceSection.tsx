"use client";

import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { ProduceCard, type ProduceCardProps } from "./ProduceCard";

type ProduceSectionProps = {
  title?: string;
  description?: string;
  products: ProduceCardProps[];
  onViewAll?: () => void;
  onEdit?: (id?: string) => void;
  onMenuClick?: (id?: string) => void;
  sideContent?: ReactNode;
};

const ProduceSection = ({
  title = "Your Produce",
  description,
  products,
  onViewAll,
  onEdit,
  onMenuClick,
  sideContent,
}: ProduceSectionProps) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">

        {/* LEFT — Produce */}
        <div className="min-w-0">

          {/* Section header */}
          <div className="mb-4 flex min-h-12 items-end justify-between gap-4">
            <div>
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
              View all

              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>

          {/* Produce Cards */}
          <div className="grid grid-cols-1 items-start gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <ProduceCard
                key={product.id ?? product.name}
                {...product}
                onEdit={onEdit}
                onMenuClick={onMenuClick}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Starts at the same level as cards */}
        <div className="min-w-0 lg:pt-16">
          {sideContent}
        </div>

      </div>
    </section>
  );
};

export { ProduceSection, type ProduceSectionProps };