"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Sprout, Star } from "lucide-react";

// ─── Team data ────────────────────────────────────────────────────────────────
interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

const team: TeamMember[] = [
  {
    name: "James Whitfield",
    role: "Chief Executive Officer",
    avatar: "https://i.pravatar.cc/320?img=65",
    quote:
      "AgriSync was born from a simple belief: that farmers deserve the same access to markets and technology as any modern business. Every decision I make is rooted in that mission.",
  },
  {
    name: "Sarah Mitchell",
    role: "Chief Technology Officer",
    avatar: "https://i.pravatar.cc/320?img=26",
    quote:
      "We built AgriSync to be resilient where connectivity is unreliable, fast where time is critical, and transparent where trust is everything. Technology should remove friction, not create it.",
  },
  {
    name: "Abdulshakur Dauda",
    role: "Lead Developer",
    avatar: "https://i.pravatar.cc/320?img=33",
    quote:
      "Every feature I ship brings a farmer closer to a fair price and a driver closer to steady work. That context makes writing good code feel genuinely important.",
  },
  {
    name: "Michael Ibrahim",
    role: "Backend Engineer",
    avatar: "https://i.pravatar.cc/320?img=16",
    quote:
      "The real-time logistics layer we have built handles thousands of concurrent routes without breaking a sweat. I am proud of the architecture we have put together under the hood.",
  },
  {
    name: "Fatima Agbage",
    role: "Product Designer",
    avatar: "https://i.pravatar.cc/320?img=45",
    quote:
      "Designing for farmers in the field means designing for thumbs, not cursors. I obsess over clarity and speed so that anyone, anywhere can use AgriSync with confidence.",
  },
  {
    name: "Abubakar Sidiq",
    role: "Project Manager",
    avatar: "https://i.pravatar.cc/320?img=69",
    quote:
      "Coordinating across farmers, drivers, and buyers requires crystal-clear communication. I make sure every sprint we run delivers something real and measurable for our users.",
  },
];

// ─── Single pair card ─────────────────────────────────────────────────────────
function TeamCard({ name, role, avatar, quote }: TeamMember) {
  return (
    /* The pair wrapper is the spotlight unit — tm-card is applied to this div */
    <div className="flex h-64 shrink-0 gap-1 sm:h-72">

      {/* ── Photo card ── */}
      <div className="relative w-36 overflow-hidden rounded-2xl sm:w-44">
        <Image
          src={avatar}
          alt={`Photo of ${name}`}
          fill
          sizes="(max-width: 640px) 144px, 176px"
          className="object-cover object-top grayscale-20"
          unoptimized
        />

        {/* Name badge — pinned to bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-white/95 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-1.5">
            <Sprout className="h-3.5 w-3.5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="truncate font-heading text-xs font-semibold text-foreground">
                {name}
              </p>
              <p className="truncate text-[10px] text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quote card ── */}
      <div className="flex w-52 flex-col justify-between rounded-2xl bg-primary px-5 py-4 sm:w-60">
        {/* Opening quote mark */}
        <span
          aria-hidden="true"
          className="pointer-events-none -mb-3 select-none font-serif text-6xl leading-none text-white/25"
        >
          &ldquo;
        </span>

        {/* Quote body */}
        <p className="flex-1 overflow-hidden text-left text-[0.72rem] leading-relaxed text-white/90 sm:text-[0.75rem]">
          {quote}
        </p>

        {/* Bottom row: stars + logo */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-0.5" aria-label="5 stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-3 w-3 fill-secondary text-secondary"
                aria-hidden="true"
              />
            ))}
          </div>
          <Sprout className="h-5 w-5 text-white/20" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function TeamSection() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  /*
    Centre-spotlight driver (same pattern as TestimonialsSection).
    Reads the real screen position of every card pair each frame and writes
    --f (0 = far, 1 = centred) onto the element. CSS .tm-card uses --f to
    drive scale, lift, opacity, and shadow.
  */
  useEffect(() => {
    if (reduceMotion) return;

    let frameId = 0;

    const update = () => {
      const viewport = viewportRef.current;
      if (viewport) {
        const vRect = viewport.getBoundingClientRect();
        const centreX = vRect.left + vRect.width / 2;
        const focusRadius = Math.min(vRect.width * 0.3, 340);

        for (const card of cardRefs.current) {
          if (!card) continue;
          const rect = card.getBoundingClientRect();
          const cardCentre = rect.left + rect.width / 2;
          const distance = Math.abs(cardCentre - centreX);
          const linear = Math.max(0, 1 - distance / focusRadius);
          // smoothstep easing
          const eased = linear * linear * (3 - 2 * linear);
          card.style.setProperty("--f", eased.toFixed(3));
        }
      }
      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [reduceMotion]);

  // Two copies for seamless loop
  const track = [...team, ...team];

  return (
    <section className="w-full overflow-hidden bg-[#F5F8EF] py-14 lg:py-20">
      {/* ── Header ── */}
      <div className="mb-10 px-4 text-center lg:mb-12">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Meet Our Team
        </h2>
        {/* Green accent underline matching brand */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <span className="h-1 w-28 rounded-full bg-primary" />
          <span className="h-1 w-2.5 rounded-full bg-primary/40" />
        </div>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          The people building the infrastructure that connects Nigeria's farms to
          its tables.
        </p>
      </div>

      {/* ── Marquee viewport ── */}
      <div
        ref={viewportRef}
        className={`relative w-full py-8 ${
          reduceMotion ? "overflow-x-auto" : "overflow-hidden"
        }`}
        aria-label="Team members"
        role="region"
      >
        {/*
          w-max  → track is as wide as all pairs combined so translateX(-50%)
                   equals exactly one full set, giving a seamless loop.
          flex-nowrap → single horizontal strip, never wraps.
        */}
        <div
          className={`flex w-max flex-nowrap items-stretch gap-6 px-6 ${
            reduceMotion ? "" : "animate-marquee"
          }`}
        >
          {track.map((member, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              /* Duplicate half is hidden from screen readers */
              aria-hidden={i >= team.length ? "true" : undefined}
              className="tm-card"
            >
              <TeamCard {...member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
