"use client";

import { Leaf, ShoppingBasket, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { InfoCard } from "../info-card";

const audienceCards = [
  {
    id: "farmers",
    role: "farmer",
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
  },
  {
    id: "drivers",
    role: "driver",
    eyebrow: "For Drivers",
    title: "Turn every trip into income",
    items: [
      "More delivery jobs, closer to home",
      "Discover requests along your route",
      "Transparent, upfront pricing",
      "Track earnings and ratings in one place",
    ],
    buttonText: "Join as a Driver",
    icon: <Truck className="h-7 w-7" />,
    accent: "#F4E7D5",
  },
  {
    id: "buyers",
    role: "buyer",
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
  },
];

export function AudienceCards() {
  const router = useRouter();

  return (
    <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-3 lg:gap-8">
      {audienceCards.map((card) => (
        <InfoCard
          key={card.eyebrow}
          id={card.id}
          eyebrow={card.eyebrow}
          title={card.title}
          items={card.items}
          buttonText={card.buttonText}
          onButtonClick={() => router.push(`/signup?role=${encodeURIComponent(card.role)}`)}
          icon={card.icon}
          className="min-h-107.5"
        />
      ))}
    </div>
  );
}