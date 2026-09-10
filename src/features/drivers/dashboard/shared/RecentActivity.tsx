"use client";

import React from "react";
import { CheckCircle2, Clock, PlusCircle, CreditCard } from "lucide-react";

type Activity = {
  id: string;
  title: string;
  subtitle?: string;
  amount?: string;
  time: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconBg: string;
};

const activities: Activity[] = [
  {
    id: "A-001",
    title: "Delivery completed",
    subtitle: "MTL STS added to your wallet",
    amount: "",
    time: "2h ago",
    icon: CheckCircle2,
    iconBg: "bg-[#ECF8F3] text-[#1B5A3B]",
  },
  {
    id: "A-002",
    title: "New request",
    subtitle: "Tomatoes • 120kg",
    amount: "",
    time: "3h ago",
    icon: PlusCircle,
    iconBg: "bg-[#FEF6E9] text-[#A36B00]",
  },
  {
    id: "A-003",
    title: "Delivery accepted",
    subtitle: "Yams • 200kg",
    amount: "",
    time: "4h ago",
    icon: Clock,
    iconBg: "bg-[#F3EDDD] text-[#7A704F]",
  },
  {
    id: "A-004",
    title: "Payment received",
    subtitle: "",
    amount: "₦15,300",
    time: "5h ago",
    icon: CreditCard,
    iconBg: "bg-[#EAF8F7] text-[#0F6B60]",
  },
];

const RecentActivity = () => {
  return (
    <section className="w-full overflow-hidden rounded-xl border border-[#E7E2D7] bg-[#E3F2E7]">
      <div className="flex items-center justify-between px-4 pb-2.5 pt-3.5 sm:px-5">
        <h2 className="font-heading text-sm font-semibold tracking-tight text-[#211F1A] sm:text-base">
          Recent Activity
        </h2>
      </div>

      <div className="mx-4 h-px bg-[#EAE6DC] sm:mx-5" />

      <div className="divide-y divide-[#F1EEE7]">
        {activities.map((act) => (
          <div key={act.id} className="flex items-center justify-between px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-full ${act.iconBg}`}>
                <act.icon className="h-4 w-4" />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#211F1A]">{act.title}</p>
                {act.subtitle ? (
                  <p className="mt-0.5 text-[11px] text-[#777368]">{act.subtitle}</p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col items-end">
              {act.amount ? (
                <span className="text-sm font-semibold text-[#211F1A]">{act.amount}</span>
              ) : null}
              <span className="mt-0.5 text-[11px] text-[#777368]">{act.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { RecentActivity };
