"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  target: number;
  prefix?: string;
  suffix?: string;
  description: React.ReactNode;
};

const stats: Stat[] = [
  {
    target: 4000,
    prefix: "#",
    suffix: "+",
    description: (
      <>
        saved per bag
        <br />
        moved
      </>
    ),
  },
  {
    target: 6,
    description: <>and growing</>,
  },
  {
    target: 3,
    description: <>one connected platform</>,
  },
];

function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 1800,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;

        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out animation
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          const currentCount = Math.floor(target * easedProgress);

          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        requestAnimationFrame(animate);
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const StatsSection = () => {
  return (
    <section className="w-full bg-[#F9F7F0]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-3 sm:gap-0 sm:px-10 ">
        {stats.map((stat) => (
          <div
            key={`${stat.target}-${stat.description}`}
            className="flex flex-col items-center text-center"
          >
            <h2 className="font-mono text-[20px] font-semibold leading-none tracking-[-0.04em] text-[#073B32] sm:text-[22px]">
              <CountUp
                target={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            </h2>

            <p className="mt-5 text-[14px] font-normal leading-[1.35] tracking-[-0.01em] text-[#4B514F] sm:text-[18px]">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsSection;