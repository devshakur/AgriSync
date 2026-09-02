"use client";

import { useRouter } from "next/navigation";
import { InfoCard } from "../info-card";

const FarmerCard = () => {
  const router = useRouter();

  return (
    <InfoCard
      eyebrow="For Farmers"
      title="Sell more, chase less"
      items={[
        "Affordable, on-demand transportation",
        "Direct access to buyers, no middlemen",
        "Real-time delivery tracking",
        "Transparent earnings, paid to your wallet",
      ]}
      buttonText="Join as a Farmer"
      onButtonClick={() => router.push("/signup?role=farmer")}
      icon={
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 20c8-1 13-6 14-14-8 1-13 6-14 14Z" />
          <path d="M5.5 17.5c3-3.2 6-6.4 9-11" />
        </svg>
      }
    />
  );
};

export { FarmerCard };