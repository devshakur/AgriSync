export type DriverDashboardStat = {
  label: string;
  value: string;
  hint: string;
  delta?: string;
  showTrend?: boolean;
};

export type DriverNearbyPromo = {
  title: string;
  description: string;
  action: string;
  href: string;
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

const nearbyPromos: DriverNearbyPromo[] = [
  {
    title: "Stay online, earn more",
    description: "Keep your status on and pick up the best transport jobs near you.",
    action: "View requests",
    href: "/drivers/requests",
  },
  {
    title: "Accept nearby jobs first",
    description: "Shorter routes mean faster turnaround and more trips in a day.",
    action: "Browse jobs",
    href: "/drivers/requests",
  },
  {
    title: "Finish deliveries on time",
    description: "Complete active trips to keep your rating high and unlock more work.",
    action: "View deliveries",
    href: "/drivers/deliveries",
  },
];

export { stats, nearbyPromos };
