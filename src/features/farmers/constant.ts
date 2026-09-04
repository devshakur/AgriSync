 import { Package, ShoppingBag, Truck, Wallet } from "lucide-react";
 
 export const farmerStats = [
  {
    label: "Produce Listed",
    value: "12",
    description: "4 active listings",
    trend: "10% this month",
    trendDirection: "up" as const,
    icon: Package,
    iconType: "green" as const,
  },
  {
    label: "Active Orders",
    value: "8",
    description: "2 require action",
    trend: "15% this month",
    trendDirection: "up" as const,
    icon: ShoppingBag,
    iconType: "amber" as const,
  },
  {
    label: "In Delivery",
    value: "3",
    description: "Currently on the road",
    trend: "5% this month",
    trendDirection: "up" as const,
    icon: Truck,
    iconType: "clay" as const,
  },
  {
    label: "Total Earnings",
    value: "₦284,500",
    description: "This month",
    trend: "12.8% vs last month",
    trendDirection: "up" as const,
    icon: Wallet,
    iconType: "green" as const,
  },
];


export const farmerProduce = [
  {
    id: "produce-1",
    name: "Fresh Tomatoes",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
    quantity: "500 kg",
    price: "₦1,200",
    unit: "basket",
    status: "Available" as const,
    updatedAt: "Updated today",
  },
  {
    id: "produce-2",
    name: "Yellow Maize",
    image:
      "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    quantity: "1,200 kg",
    price: "₦850",
    unit: "bag",
    status: "Available" as const,
    updatedAt: "Updated today",
  },
  {
    id: "produce-3",
    name: "Local Rice",
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=800&q=80",
    quantity: "800 kg",
    price: "₦2,500",
    unit: "bag",
    status: "Low Stock" as const,
    updatedAt: "Updated yesterday",
  },
];