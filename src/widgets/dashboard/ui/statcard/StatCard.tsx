import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  trend?: string;
  trendDirection?: "up" | "down";
  icon: LucideIcon;
  iconType?: "green" | "amber" | "clay";
};

const StatCard = ({
  label,
  value,
  description,
  trend,
  trendDirection = "up",
  icon: Icon,
  iconType = "green",
}: StatCardProps) => {
  const iconStyles = {
    green: "bg-[#E3F2E7] text-primary",
    amber: "bg-[#FFF4DC] text-[#9A6411]",
    clay: "bg-[#F3E7DE] text-[#A85A2A]",
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-black/6  p-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(33,31,26,0.08)]">
      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/2.5 blur-2xl transition-all duration-500 group-hover:bg-primary/5" />

      <div className="relative flex items-start justify-between gap-4">
        {/* Icon */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center shadow-md justify-center rounded-full ${iconStyles[iconType]}`}
        >
          <Icon className="h-4.75 w-4.75" strokeWidth={1.8} />
        </div>

        
        {trend && (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[10px] font-medium ${
              trendDirection === "up"
                ? "bg-[#E3F2E7] text-primary"
                : "bg-[#F3E7DE] text-[#A85A2A]"
            }`}
          >
            {trendDirection === "up" ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative mt-5">
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 font-heading text-2xl font-semibold tracking-tight text-gray-700 sm:text-[26px]">
          {value}
        </p>

        <p className="mt-1.5 text-xs text-secondary-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}

export {StatCard}