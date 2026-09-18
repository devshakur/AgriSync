import { TrendingUp } from "lucide-react";
import type { DriverDashboardStat } from "@/features/drivers/constant";

type DriverStatCardProps = DriverDashboardStat;

const DriverStatCard = ({ label, value, hint, delta, showTrend }: DriverStatCardProps) => (
  <article className="flex h-full flex-col justify-between rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm">
    <div className="flex items-start justify-between gap-2">
      <p className="min-w-0 text-xs font-medium leading-snug text-muted-foreground">{label}</p>
      {showTrend ? <TrendingUp className="h-5 w-5 shrink-0 text-[#22A45D]" strokeWidth={2} /> : null}
    </div>

    <p className="mt-3 font-heading text-2xl font-semibold tracking-tight text-gray-900">{value}</p>

    <p className="mt-2 flex items-center gap-1 text-xs">
      {delta ? <span className="font-medium text-[#22A45D]">{delta}</span> : null}
      <span className="text-muted-foreground">{hint}</span>
    </p>
  </article>
);

export { DriverStatCard };
