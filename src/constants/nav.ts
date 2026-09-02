import { type NavItem } from "@/shared/ui/header/nav-mega-menu";

export const navItems: NavItem[] = [
  { label: "Problem", href: "#problem", summary: "Understand the bottlenecks slowing agriculture from field to market." },
  {
    label: "For Farmers",
    href: "#farmers",
    summary: "Turn harvest plans into faster movement, stronger pricing, and better cash flow.",
    items: [
      {
        label: "Request Transport",
        description: "Book reliable movement for crops, produce, and farm goods across your route network.",
        detail: "Dispatch in minutes",
        badge: "Move",
      },
      {
        label: "List Produce",
        description: "Show available harvests and connect directly with buyers looking for in-season supply.",
        detail: "More visibility",
        badge: "Sell",
      },
      {
        label: "Track Deliveries",
        description: "Monitor real-time status from the field pickup to the final drop-off and confirmation.",
        detail: "Live updates",
        badge: "Watch",
      },
      {
        label: "Manage Earnings",
        description: "See payouts, settlement timing, and performance insights in a single dashboard.",
        detail: "Simple finances",
        badge: "Pay",
      },
    ],
  },
  {
    label: "For Drivers",
    href: "#drivers",
    summary: "Keep routes efficient, earnings transparent, and delivery windows dependable.",
    items: [
      {
        label: "Find Jobs",
        description: "Browse nearby opportunities that fit your route, timing, and capacity preferences.",
        detail: "Live opportunities",
        badge: "Route",
      },
      {
        label: "Accept & Deliver",
        description: "Pickup orders, confirm routes, and update progress without losing track of the next pickup.",
        detail: "Track every handoff",
        badge: "Move",
      },
      {
        label: "Track Earnings",
        description: "See daily totals, bonuses, trip completion rates, and payout timing in one place.",
        detail: "Transparent pay",
        badge: "Earn",
      },
      {
        label: "Optimise Routes",
        description: "Use smarter trip planning to reduce empty miles and keep deliveries on schedule.",
        detail: "Route smarter",
        badge: "Plan",
      },
    
    ],
  },
  {
    label: "For Buyers",
    href: "#buyers",
    summary: "Source fresh produce with confidence, visibility, and a cleaner purchasing experience.",
    items: [
      {
        label: "Browse Marketplace",
        description: "Explore verified produce availability by crop, season, location, and price signals.",
        detail: "Fresh inventory",
        badge: "Buy",
      },
      {
        label: "Track Orders",
        description: "See status changes as produce moves from harvest to warehouse to final destination.",
        detail: "Delivery visibility",
        badge: "Watch",
      },
      {
        label: "Rate & Review",
        description: "Share delivery feedback and build a better network of trusted, quality-minded growers.",
        detail: "Better trust",
        badge: "Review",
      },
      {
        label: "Quality Checks",
        description: "Confirm produce quality standards and avoid disruptions with better upstream visibility.",
        detail: "Higher confidence",
        badge: "Verify",
      },
      
    ],
  },
  { label: "How It Works", href: "#how-it-works", summary: "See how the platform connects logistics, visibility, and trusted coordination." },
];