export type DriverDashboardStat = {
  label: string;
  value: string;
  hint: string;
  delta?: string;
  showTrend?: boolean;
};

const stats: DriverDashboardStat[] = [
  {
    label: "Today's Earnings",
    value: "₦0.00",
    hint: "vs. yesterday",
    delta: "+0%",
  },
  {
    label: "Completed Deliveries",
    value: "0",
    hint: "vs. yesterday",
    delta: "+0",
  },
  {
    label: "Active Deliveries",
    value: "0",
    hint: "in progress",
  },
  {
    label: "Total Trips",
    value: "0",
    hint: "this week",
    showTrend: true,
  },
];

export { stats };
