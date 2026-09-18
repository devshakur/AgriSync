import Link from "next/link";
import { Truck } from "lucide-react";

type DriverStatsPromoCardProps = {
  href?: string;
};

const DriverStatsPromoCard = ({ href = "/drivers/requests" }: DriverStatsPromoCardProps) => (
  <article className="flex h-full items-center gap-3 rounded-2xl border border-black/[0.06] bg-white p-4 shadow-sm">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E3F2E7]">
      <Truck className="h-6 w-6 text-[#1B5A3B]" strokeWidth={1.75} />
    </div>

    <div className="min-w-0 flex-1">
      <p className="font-heading text-sm font-semibold text-gray-900">More trips, more earnings</p>
      <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
        Stay online and get the best transport requests near you.
      </p>
      <Link
        href={href}
        className="mt-2.5 inline-flex h-8 items-center rounded-lg bg-[#1B5A3B] px-3 text-xs font-semibold text-white transition hover:brightness-110"
      >
        View Requests
      </Link>
    </div>
  </article>
);

export { DriverStatsPromoCard };
