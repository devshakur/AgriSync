import { Leaf, Truck, ShoppingBasket, ArrowRight } from "lucide-react";
import { type ReactNode } from "react";

// ─── Card data ────────────────────────────────────────────────────────────────
interface FeatureCardData {
  icon: ReactNode;
  title: string;
  description: string;
  linkLabel: string;
  linkHref: string;
  bgClass: string;
  textClass: string;
  subTextClass: string;
  linkClass: string;
  iconContainerClass: string;
  circleClass: string;
}

const features: FeatureCardData[] = [
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "Farm-First Movement",
    description:
      "Get your harvest moving reliably and affordably. Reach buyers across Nigeria without chasing middlemen or losing produce to delays.",
    linkLabel: "Learn More",
    linkHref: "#farmers",
    bgClass: "bg-background border border-[#E9E8E2]",
    textClass: "text-foreground",
    subTextClass: "text-muted-foreground",
    linkClass: "text-primary hover:text-primary/80",
    iconContainerClass: "bg-primary/10 text-primary",
    circleClass: "bg-primary/[0.07]",
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Smart Driver Network",
    description:
      "Pick up verified jobs near you, track your earnings daily, and optimise every route you drive — all from a single dashboard.",
    linkLabel: "Explore More",
    linkHref: "#drivers",
    bgClass: "bg-primary",
    textClass: "text-white",
    subTextClass: "text-white/75",
    linkClass: "text-white/90 hover:text-white",
    iconContainerClass: "bg-white/15 text-white",
    circleClass: "bg-white/10",
  },
  {
    icon: <ShoppingBasket className="h-5 w-5" />,
    title: "Direct Market Access",
    description:
      "Source fresh, verified produce straight from farmers — with full delivery visibility, quality guarantees, and transparent pricing from field to door.",
    linkLabel: "Explore More",
    linkHref: "#buyers",
    bgClass: "bg-[#0D2E1E]",
    textClass: "text-white",
    subTextClass: "text-white/70",
    linkClass: "text-white/85 hover:text-white",
    iconContainerClass: "bg-white/10 text-white",
    circleClass: "bg-white/[0.07]",
  },
];

// ─── Individual card ───────────────────────────────────────────────────────────
function FeatureCard({
  icon,
  title,
  description,
  linkLabel,
  linkHref,
  bgClass,
  textClass,
  subTextClass,
  linkClass,
  iconContainerClass,
  circleClass,
}: FeatureCardData) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-3xl px-6 py-7 shadow-sm sm:px-8 sm:py-8 ${bgClass}`}
    >
      {/* Icon container */}
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-2xl ${iconContainerClass}`}
      >
        {icon}
      </div>

      {/* Title */}
      <h3 className={`font-heading text-xl font-semibold leading-tight tracking-tight ${textClass}`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`mt-3 flex-1 text-sm leading-relaxed ${subTextClass}`}>
        {description}
      </p>

      {/* <a
        href={linkHref}
        className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${linkClass}`}
      >
        {linkLabel}
        <ArrowRight className="h-4 w-4" />
      </a> */}

      {/* Decorative bottom-right arc ── large circle partially clipped by overflow-hidden */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-0 right-0 h-44 w-44 translate-x-1/3 translate-y-1/3 rounded-full ${circleClass}`}
      />
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function FeatureCards() {
  return (
    <section className="w-full px-2 py-6">
      <div className="mx-auto  sm:px-6 lg:px-8">

        {/* Section header — 2 columns on md+ */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between lg:mb-14">
          {/* Left: eyebrow + heading */}
          <div className="md:max-w-[48%]">
            <span className="mb-3 inline-block font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              The AgriSync Way
            </span>
            <h2 className="font-heading text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
              Essential features for a connected supply chain
            </h2>
          </div>

          {/* Right: body text */}
          <p className="text-base leading-relaxed text-muted-foreground md:max-w-[44%] md:pb-1 lg:text-lg">
            One platform connecting farmers, drivers, and buyers — making the
            journey from harvest to destination faster, fairer, and fully
            visible.
          </p>
        </div>

        {/* Card grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
