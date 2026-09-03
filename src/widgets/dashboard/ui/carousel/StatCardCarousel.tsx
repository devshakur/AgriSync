"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { StatCard } from "../statcard";

export type DashboardStat = {
  label: string;
  value: string;
  description: string;
  trend?: string;
  trendDirection?: "up" | "down";
  icon: LucideIcon;
  iconType?: "green" | "amber" | "clay";
};

type StatCardsCarouselProps = {
  cards: DashboardStat[];
  interval?: number;
};

const StatCardsCarousel = ({
  cards,
  interval = 3500,
}: StatCardsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [paused, setPaused] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 768) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();

    window.addEventListener("resize", updateCardsPerView);

    return () => {
      window.removeEventListener("resize", updateCardsPerView);
    };
  }, []);

  useEffect(() => {
    if (cardsPerView >= cards.length || paused) {
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % cards.length);
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [cardsPerView, cards.length, interval, paused]);

  /*
   * Desktop:
   * Show all cards.
   */
  if (cardsPerView >= cards.length) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <StatCard
            key={card.label}
            {...card}
          />
        ))}
      </div>
    );
  }

  const validCurrentIndex = currentIndex >= cards.length ? 0 : currentIndex;

  const visibleCards = Array.from(
    { length: cardsPerView },
    (_, position) => {
      const index = (validCurrentIndex + position) % cards.length;

      return {
        ...cards[index],
        index,
      };
    },
  );

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Cards */}
      <div
        className={`grid gap-4 ${
          cardsPerView === 2 ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        {visibleCards.map((card, position) => (
          <div
            key={`${card.index}-${position}`}
            className="animate-[statCardIn_450ms_ease-out]"
          >
            <StatCard {...card} />
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-1.5">
        {cards.map((card, index) => (
          <button
            key={card.label}
            type="button"
            aria-label={`Show ${card.label}`}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === validCurrentIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-primary/15 hover:bg-primary/30"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export { StatCardsCarousel };