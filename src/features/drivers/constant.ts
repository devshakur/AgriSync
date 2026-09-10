import { Users, MapPin, Clock, CheckCircle2 } from "lucide-react";
import type { DashboardStat } from "@/widgets/dashboard/ui/statcard/StatCardCarousel";

const stats: DashboardStat[] = [
  {
    label: "Nearby Drivers",
    value: "5",
    description: "Within 5 km",
    icon: Users,
    iconType: "green",
  },
  {
    label: "Sourcing",
    value: "2",
    description: "Requests being sourced",
    icon: MapPin,
    iconType: "amber",
  },
  {
    label: "Pending Offers",
    value: "1",
    description: "Awaiting driver confirmation",
    icon: Clock,
    iconType: "clay",
  },
  {
    label: "Completed",
    value: "24",
    description: "Deliveries this month",
    icon: CheckCircle2,
    iconType: "green",
  },
];

export { stats };