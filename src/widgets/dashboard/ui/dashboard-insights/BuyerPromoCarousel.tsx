"use client";

import NextImage from "next/image";
import { useEffect, useState } from "react";

const promos = [
  {
    title: "Get more buyers for your produce",
    description: "List more produce and reach thousands of buyers.",
    action: "List Produce",
    image: "/assests/images/produce-onions.jpg",
    imageAlt: "Fresh produce in a basket",
  },
  {
    title: "Move your harvest faster",
    description: "Connect with trusted drivers near your farm.",
    action: "Find a Driver",
    image: "/assests/images/delivery-bike.jpg",
    imageAlt: "A delivery bike ready for transport",
  },
  {
    title: "Sell directly to verified buyers",
    description: "Grow your market with simple, secure orders.",
    action: "View Buyers",
    image: "/assests/images/hero-farm.jpg",
    imageAlt: "A productive farm field",
  },
];

const BuyerPromoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePromo = promos[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % promos.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-26 flex-1 overflow-hidden rounded-2xl border border-[#E2911F]/10 bg-[#FFF4DC] p-4 shadow-sm">
      <div
        key={activeIndex}
        className="relative z-10 max-w-[68%] animate-[promoCardIn_450ms_ease-out]"
      >
        <h2 className="font-heading text-xs font-semibold leading-snug text-muted-foreground">
          {activePromo.title}
        </h2>
        <p className="mt-1 text-[10px] leading-snug text-muted-foreground">
          {activePromo.description}
        </p>
        <button
          type="button"
          className="mt-3 rounded-md bg-primary px-2.5 py-1.5 text-[9px] font-semibold text-white transition hover:bg-primary/90"
        >
          {activePromo.action}
        </button>
      </div>

      <NextImage
        key={activePromo.image}
        src={activePromo.image}
        alt={activePromo.imageAlt}
        width={150}
        height={120}
        className="absolute inset-0 h-full w-full object-cover mix-blend-lighten opacity-20"
      />

      <div className="absolute bottom-2 left-4 flex gap-1">
        {promos.map((promo, index) => (
          <span
            key={promo.title}
            className={`h-1 rounded-full transition-all ${
              index === activeIndex ? "w-4 bg-primary" : "w-1 bg-primary/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export { BuyerPromoCarousel };
