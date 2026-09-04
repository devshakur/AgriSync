"use client";

import { ChevronDown, TrendingUp } from "lucide-react";

const earningsByDay = [
  { day: "Mon", amount: 42 },
  { day: "Tue", amount: 58 },
  { day: "Wed", amount: 64 },
  { day: "Thu", amount: 48 },
  { day: "Fri", amount: 86 },
  { day: "Sat", amount: 62 },
  { day: "Sun", amount: 44 },
];

type EarningsOverviewProps = {
  amount?: string;
  period?: string;
};

const EarningsOverview = ({
  amount = "₦284,500",
  period = "This Month",
}: EarningsOverviewProps) => {
  return (
    <section className="rounded-2xl border border-black/[0.07] bg-background p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-heading text-sm font-semibold tracking-tight text-muted-foreground">
            Earnings Overview
          </h2>
          <p className="mt-3 font-heading text-xl font-semibold tracking-tight text-muted-foreground">
            {amount}
          </p>
          <p className="text-[10px] text-muted-foreground">Total earnings</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-black/[0.07] bg-background px-2.5 py-1.5 text-[10px] text-muted-foreground shadow-sm"
        >
          {period}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-end gap-1 text-[9px] text-primary">
        <TrendingUp className="h-3 w-3" />
        <span>12.8% vs last month</span>
      </div>

      <div className="mt-5 flex h-20 items-end justify-between gap-2">
        {earningsByDay.map((item) => (
          <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <div
              className="w-full max-w-2 rounded-t-sm bg-primary"
              style={{ height: `${item.amount}%` }}
            />
            <span className="text-[9px] text-muted-foreground">{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export { EarningsOverview };
