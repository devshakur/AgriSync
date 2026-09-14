"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sprout } from "lucide-react";
import { Header } from "@/shared";

// ─── Slide data ────────────────────────────────────────────────────────────────
// All three states currently share the same banner image.
// Replace `image` in State 2 and 3 once the additional assets are provided.
const slides = [
  {
    id: 1,
    image: "/assests/images/Agrisync_banner.png",
    eyebrow: "Smart Farming for a Sustainable Future",
    headlineOne: "Empowering Farmers.",
    headlineTwo: "Growing Tomorrow.",
    body: "AgriSync connects farmers to buyers with fast, trusted logistics across Nigeria — from harvest to market, seamlessly.",
    primaryLabel: "Get Started",
    primaryHref: "/role",
    secondaryLabel: "Explore Solutions",
    secondaryHref: "#how-it-works",
  },
  {
    id: 2,
    // TODO: Replace with second image once provided
    image: "/assests/images/Agrisync_banner_002.jpeg",
    eyebrow: "Reliable Logistics, Every Route",
    headlineOne: "Drive Smarter.",
    headlineTwo: "Earn Better.",
    body: "Pick up jobs, track earnings, and optimise routes — all from your phone, anywhere across the AgriSync network.",
    primaryLabel: "Find Jobs",
    primaryHref: "/role",
    secondaryLabel: "How It Works",
    secondaryHref: "#how-it-works",
  },
  {
    id: 3,
    // TODO: Replace with third image once provided
    image: "/assests/images/Agrisync_banner_003.jpeg",
    eyebrow: "Fresh Produce, Direct to You",
    headlineOne: "Buy Fresh.",
    headlineTwo: "Buy Direct.",
    body: "Source verified produce straight from farmers with full delivery visibility, quality guarantees, and transparent pricing.",
    primaryLabel: "Browse Market",
    primaryHref: "/role",
    secondaryLabel: "Learn More",
    secondaryHref: "#buyers",
  },
] as const;

const SLIDE_DURATION_MS = 5000;

// ─── Crop-score decorative overlay card ───────────────────────────────────────
function CropScoreCard() {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * 0.78;
  const gap = circumference - filled;

  return (
    <div className="absolute bottom-10 right-4 z-20 flex flex-col gap-2 sm:right-8 lg:bottom-14 lg:right-12">
     
      {/* Soil & Moisture panel */}
      <div className="rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-md shadow-xl">
        <div className="flex flex-col gap-2.5 text-white">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/80">
              <Sprout className="h-3.5 w-3.5 text-white" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-wide text-white/60">Soil Health</p>
              <p className="text-xs font-semibold">Good</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/80">
              {/* Droplet icon */}
              <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C12 2 5 10.5 5 15a7 7 0 0014 0C19 10.5 12 2 12 2z" />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-[10px] font-medium uppercase tracking-wide text-white/60">Moisture</p>
              <p className="text-xs font-semibold">Optimal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Circular gauge panel */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-black/25 px-4 py-3 backdrop-blur-md shadow-xl">
        <svg width="60" height="60" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7" />
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="#4ade80"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${gap}`}
          />
        </svg>
        <div className="text-white leading-tight">
          <p className="text-xl font-bold leading-none">78%</p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-white/60">Crop Score</p>
        </div>
      </div>
    </div>
  );
}

// ─── HeroSlider ────────────────────────────────────────────────────────────────
export function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Auto-advance — resets whenever activeIndex changes (including manual clicks)
  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, shouldReduceMotion]);

  const activeSlide = slides[activeIndex];

  // ── Animation variants ──────────────────────────────────────────────────────
  // Image: pure opacity cross-fade (layered — new image fades in behind exiting one)
  const imageVariants = {
    enter:   { opacity: 0 },
    visible: { opacity: 1, transition: { duration: shouldReduceMotion ? 0 : 0.9, ease: "easeInOut" as const } },
    exit:    { opacity: 0, transition: { duration: shouldReduceMotion ? 0 : 0.7, ease: "easeInOut" as const } },
  };

  // Text: subtle slide + fade (exits left, enters right)
  const textVariants = {
    enter: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.55,
        ease: "easeOut" as const,
        delay: shouldReduceMotion ? 0 : 0.12,
      },
    },
    exit: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : -40,
      transition: { duration: shouldReduceMotion ? 0 : 0.3, ease: "easeIn" as const },
    },
  };

  return (
    <section
      aria-label="Hero banner"
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(500px, 100dvh, 900px)" }}
    >
      <Header />
      {/* ── Background layer: layered cross-fade images ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            className="absolute inset-0"
            variants={imageVariants}
            initial="enter"
            animate="visible"
            exit="exit"
          >
            <Image
              src={activeSlide.image}
              alt=""
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className="object-cover object-right sm:object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Left gradient overlay — ensures text legibility */}
        <div
          className="absolute inset-0 z-10"
          aria-hidden
          style={{
            background:
              "linear-gradient(to right, rgba(5,20,10,0.75) 0%, rgba(5,20,10,0.50) 40%, rgba(5,20,10,0.18) 65%, transparent 100%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 z-10 h-28"
          aria-hidden
          style={{
            background: "linear-gradient(to top, rgba(5,20,10,0.40) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Foreground: text content ── */}
      <div className="relative z-20 flex h-full w-full items-center">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSlide.id}
              variants={textVariants}
              initial="enter"
              animate="visible"
              exit="exit"
              className="flex w-full flex-col items-center gap-5 text-center sm:max-w-xl sm:items-start sm:text-left lg:max-w-[48%]"
            >
              {/* Eyebrow badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 font-sans text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                <Sprout className="h-3.5 w-3.5 shrink-0 text-green-300" />
                {activeSlide.eyebrow}
              </span>

              {/* Headline */}
              <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[64px]">
                {activeSlide.headlineOne}
                <span className="block text-green-400">{activeSlide.headlineTwo}</span>
              </h1>

              {/* Body copy */}
              <p className="max-w-sm font-sans text-base leading-relaxed text-white/80 sm:max-w-none sm:text-lg lg:max-w-md">
                {activeSlide.body}
              </p>

              {/* CTA buttons */}
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <a
                  href={activeSlide.primaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-heading text-[15px] font-semibold text-white shadow-md transition-all duration-150 hover:brightness-110 hover:shadow-lg active:scale-[0.97]"
                >
                  {activeSlide.primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={activeSlide.secondaryHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3.5 font-heading text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/20 active:scale-[0.97]"
                >
                  <Sprout className="h-4 w-4 text-green-300" />
                  {activeSlide.secondaryLabel}
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Decorative stats card (tablet + desktop only) ── */}
      <div className="hidden sm:block">
        <CropScoreCard />
      </div>
    </section>
  );
}
