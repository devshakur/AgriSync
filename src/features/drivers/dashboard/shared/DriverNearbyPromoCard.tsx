"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nearbyPromos } from "@/features/drivers/constant";

const ROTATE_MS = 4500;

const DriverNearbyPromoCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activePromo = nearbyPromos[activeIndex];

  useEffect(() => {
    if (paused || nearbyPromos.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % nearbyPromos.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      className="overflow-hidden rounded-2xl border border-[#1B5A3B]/12 bg-[#E8F3EC] p-4 shadow-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div key={activeIndex} className="animate-[promoCardIn_450ms_ease-out]">
        <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#1B5A3B]/70">Driver tip</p>
        <h2 className="mt-1 font-heading text-sm font-semibold leading-snug text-[#0E4A38]">
          {activePromo.title}
        </h2>
        <p className="mt-1 text-[11px] leading-4 text-[#1B5A3B]/80">{activePromo.description}</p>
        <Link
          href={activePromo.href}
          className="mt-3 inline-flex h-8 items-center rounded-lg bg-[#1B5A3B] px-3 text-[11px] font-semibold text-white transition hover:brightness-110"
        >
          {activePromo.action}
        </Link>
      </div>

      <div className="mt-3 flex gap-1">
        {nearbyPromos.map((promo, index) => (
          <button
            key={promo.title}
            type="button"
            aria-label={`Show tip: ${promo.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => setActiveIndex(index)}
            className={`h-1 rounded-full transition-all ${
              index === activeIndex ? "w-4 bg-[#1B5A3B]" : "w-1 bg-[#1B5A3B]/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export { DriverNearbyPromoCard };
