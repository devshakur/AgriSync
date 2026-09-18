"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, History } from "lucide-react";
import { EmptyState } from "@/shared/ui/empty-state";

type Activity = {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  time: string;
  image: string;
};

const activities: Activity[] = [
  {
    id: "A-001",
    title: "Delivery completed",
    subtitle: "Maize · #TRK-1036",
    amount: "₦45,000",
    time: "2h ago",
    image: "/assests/images/produce-onions.jpg",
    
  },
  {
    id: "A-002",
    title: "Delivery completed",
    subtitle: "Rice · #TRK-1037",
    amount: "₦45,000",
    time: "2h ago",
    image: "/assests/images/produce-onions.jpg",
    
  },
];

const RecentActivity = () => {
  return (
    <section className="flex min-h-80 flex-col rounded-2xl border border-black/6 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-sm font-semibold text-gray-900 sm:text-base">Recent Activity</h2>
        {activities.length > 0 ? (
          <Link href="/drivers" className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B5A3B]">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>

      {activities.length === 0 ? (
        <EmptyState
          icon={History}
          title="No recent activity"
          description="Completed deliveries, payments, and updates will show up here."
          className="min-h-56 flex-1 py-8"
        />
      ) : (
        <ul className="mt-3 divide-y divide-black/5">
          {activities.map((act) => (
            <li key={act.id} className="flex items-center gap-3 py-3 first:pt-2 last:pb-0">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image src={act.image} alt="" fill className="object-cover" sizes="40px" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">{act.title}</p>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{act.subtitle}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[11px] text-muted-foreground">{act.time}</p>
                {act.amount ? (
                  <p className="mt-0.5 text-sm font-semibold text-[#1B5A3B]">{act.amount}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { RecentActivity };
