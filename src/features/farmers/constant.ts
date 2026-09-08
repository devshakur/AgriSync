 import { BanknoteArrowUp, CircleArrowOutDownRight, CirclePile, Package, ShoppingBag, Sprout, Truck, Wallet } from "lucide-react";
 import type { ChatMessage, Driver, RequestValues } from "./request-driver/types";
 
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

export const recentOrders = [
  {
    id: "#AG-1048",
    product: "Fresh Tomatoes",
    quantity: "250 kg",
    buyer: "Green Basket Market",
    amount: "₦84,000",
    status: "Pending" as const,
  },
  {
    id: "#AG-1047",
    product: "Yellow Maize",
    quantity: "500 kg",
    buyer: "Northern Foods Ltd.",
    amount: "₦125,000",
    status: "In Transit" as const,
  },
  {
    id: "#AG-1046",
    product: "Local Rice",
    quantity: "300 kg",
    buyer: "Arewa Supermarket",
    amount: "₦210,000",
    status: "Delivered" as const,
  },
  {
    id: "#AG-1045",
    product: "Green Pepper",
    quantity: "100 kg",
    buyer: "Veggie World",
    amount: "₦45,000",
    status: "Delivered" as const,
  },
];

 export const produceStats = [
  {
    label: "Total Listed",
    value: "12",
     description: "4 active listings",
    trend: "10% this month",
    trendDirection: "up" as const,
    icon: Sprout,
    iconType: "green" as const,
  },
  {
    label: "Available Stock",
    value: "8",
    description: "Across all produce",
    trend: "15% this month",
    trendDirection: "up" as const,
    icon: CirclePile,
    iconType: "amber" as const,
  },
  {
    label: "Low Stock",
    value: "3",
    description: "Listing",
    trend: "5% this month",
    trendDirection: "up" as const,
    icon: CircleArrowOutDownRight,
    iconType: "clay" as const,
  },
  {
    label: "Sold This Month",
    value: "2,850kg",
    description: "This month",
    trend: "12.8% vs last month",
    trendDirection: "up" as const,
    icon: BanknoteArrowUp,
    iconType: "green" as const,
  },
];

//request-driver

export const initialRequest: RequestValues = {
  pickup: "Green Farm, Kano",
  dropoff: "My House, Kano",
  date: "Today",
  time: "10:30 AM",
  produce: "Fresh Tomatoes",
  quantity: "500",
  unit: "kg",
  packaging: "Crates",
  notes: "Please call when you arrive at the farm gate.",
};

export const drivers: Driver[] = [
  {
    id: "musa-bello",
    name: "Musa Bello",
    rating: "4.9",
    trips: 124,
    vehicle: "Pickup Truck",
    capacity: "1.5 ton capacity",
    distance: "2.3 km away",
    eta: "10 min pickup",
    price: "₦18,000",
    verified: true,
    image: "/assests/images/farmer.jpg",
    bestMatch: true,
  },
  {
    id: "ibrahim-yusuf",
    name: "Ibrahim Yusuf",
    rating: "4.7",
    trips: 88,
    vehicle: "Mini Truck",
    capacity: "800 kg capacity",
    distance: "4.8 km away",
    eta: "18 min pickup",
    price: "₦15,000",
    verified: true,
    image: "/assests/images/farmer.jpg",
  },
  {
    id: "sani-mohammed",
    name: "Sani Mohammed",
    rating: "4.6",
    trips: 76,
    vehicle: "Pickup Truck",
    capacity: "1.2 ton capacity",
    distance: "9.1 km away",
    eta: "25 min pickup",
    price: "₦16,500",
    verified: true,
    image: "/assests/images/farmer.jpg",
  },
  {
    id: "fatima-lawal",
    name: "Fatima Lawal",
    rating: "4.8",
    trips: 94,
    vehicle: "Van",
    capacity: "1 ton capacity",
    distance: "6.4 km away",
    eta: "20 min pickup",
    price: "₦16,500",
    verified: true,
    image: "/assests/images/farmer.jpg",
  },
];

export const initialMessages: ChatMessage[] = [
  {
    id: "message-1",
    sender: "driver",
    text: "Hello! I am Musa, your driver. I am on my way to your farm.",
    time: "9:15 AM",
  },
  {
    id: "message-2",
    sender: "farmer",
    text: "Great! I will be waiting at the farm gate.",
    time: "9:16 AM",
  },
  {
    id: "message-3",
    sender: "driver",
    text: "I am here. I will call you when I arrive.",
    time: "9:20 AM",
  },
];
