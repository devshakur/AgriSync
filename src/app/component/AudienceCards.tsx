"use client";

import { Leaf, ShoppingBasket, Truck } from "lucide-react";
import InfoCard from "./InfoCard";

const audienceCards = [
  {
    eyebrow: "For Farmers",
    title: "Sell more, chase less",
    items: [
      "Affordable, on-demand transportation",
      "Direct access to buyers, no middlemen",
      "Real-time delivery tracking",
      "Transparent earnings",
    ],
    buttonText: "Join as a Farmer",
    icon: <Leaf className="h-7 w-7" />,
    accent: "#E3F2E7",
    onClick: () => console.log("Farmer signup"),
  },
  {
    eyebrow: "For Drivers",
    title: "Turn every trip into income",
    items: [
      "More delivery jobs, closer to home",
      "Discover requests along your route",
      "Transparent, upfront pricing",
      "Track earnings and ratings in one place",
    ],
    buttonText: "Become a Driver",
    icon: <Truck className="h-7 w-7" />,
    accent: "#F4E7D5",
    onClick: () => console.log("Driver signup"),
  },
  {
    eyebrow: "For Buyers",
    title: "Fresh produce, no market run",
    items: [
      "Farm-fresh produce",
      "Buy directly from verified farmers",
      "Convenient, tracked delivery",
      "No more early-morning market trips",
    ],
    buttonText: "Join as a Buyer",
    icon: <ShoppingBasket className="h-7 w-7" />,
    accent: "#E8E5D8",
    onClick: () => console.log("Buyer signup"),
  },
];

export function AudienceCards() {
  return (
    <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-3 lg:gap-8">
      {audienceCards.map((card) => (
        <InfoCard
          key={card.eyebrow}
          eyebrow={card.eyebrow}
          title={card.title}
          items={card.items}
          buttonText={card.buttonText}
          onButtonClick={card.onClick}
          icon={card.icon}
          className="min-h-107.5"
        />
      ))}
    </div>
  );
}