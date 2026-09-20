 import { BanknoteArrowUp, CircleArrowOutDownRight, CirclePile, Package, ShoppingBag, Sprout, Truck, Wallet } from "lucide-react";
 import type { ChatMessage, Driver } from "./request-driver/types";
 
 export const farmerStats = [
  {
    label: "Produce Listed",
    value: "0",
    description: "0 active listings",
    trend: "10% this month",
    trendDirection: "up" as const,
    icon: Package,
    iconType: "green" as const,
  },
  {
    label: "Active Orders",
    value: "0",
    description: "0 orders require action",
    trend: "15% this month",
    trendDirection: "up" as const,
    icon: ShoppingBag,
    iconType: "amber" as const,
  },
  {
    label: "In Delivery",
    value: "0",
    description: "Currently on the road",
    trend: "5% this month",
    trendDirection: "up" as const,
    icon: Truck,
    iconType: "clay" as const,
  },
  {
    label: "Total Earnings",
    value: "₦0.00",
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

 export const produceStats = [
  {
    label: "Total Listed",
    value: "0",
     description: "4 active listings",
    trend: "10% this month",
    trendDirection: "up" as const,
    icon: Sprout,
    iconType: "green" as const,
  },
  {
    label: "Available Stock",
    value: "0",
    description: "Across all produce",
    trend: "15% this month",
    trendDirection: "up" as const,
    icon: CirclePile,
    iconType: "amber" as const,
  },
  {
    label: "Low Stock",
    value: "0",
    description: "Listing",
    trend: "5% this month",
    trendDirection: "up" as const,
    icon: CircleArrowOutDownRight,
    iconType: "clay" as const,
  },
  {
    label: "Sold This Month",
      value: "0kg",
    description: "This month",
    trend: "12.8% vs last month",
    trendDirection: "up" as const,
    icon: BanknoteArrowUp,
    iconType: "green" as const,
  },
];

//request-driver

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
