import { Target, Binoculars, Sparkles, type LucideIcon } from "lucide-react";

// ─── Column data ──────────────────────────────────────────────────────────────
interface Pillar {
  icon: LucideIcon;
  label: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    icon: Target,
    label: "Mission",
    body: "To connect Nigeria's farmers, drivers, and buyers through a transparent, efficient, and technology-driven agricultural supply chain — ensuring fair prices, reduced waste, and reliable delivery from farm to table.",
  },
  {
    icon: Binoculars,
    label: "Vision",
    body: "To become the most trusted digital marketplace for agricultural commerce in Nigeria, where every participant in the supply chain has equal access to opportunity and information.",
  },
  {
    icon: Sparkles,
    label: "Values",
    body: "Transparency, fairness, and community. We build trust between farmers and buyers, protect smallholder livelihoods, and uphold integrity at every point on the route.",
  },
];

// ─── Single pillar column ─────────────────────────────────────────────────────
function PillarColumn({ icon: Icon, label, body }: Pillar) {
  return (
    <div className="flex flex-col items-center px-8 py-10 text-center sm:px-10">
      {/* Icon circle — mirrors the outlined circular frame in the screenshot */}
      <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-gray-300">
        <Icon
          className="h-14 w-14 text-secondary"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <h3 className="mt-6 font-heading text-xl font-black uppercase tracking-widest text-foreground">
        {label}
      </h3>

      {/* Thin amber accent line under label */}
      <span className="mt-2 block h-0.5 w-8 rounded-full bg-secondary" />

      {/* Body */}
      <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function MissionVision() {
  return (
    <section className="w-full py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-12 text-center lg:mb-16">
          {/* Eyebrow */}
          <p className="mb-2 font-heading text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            What Drives Us
          </p>

          {/* Heading */}
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Purpose &amp; Principles
          </h2>

          {/* Underline accent */}
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <span className="h-1 w-20 rounded-full bg-primary" />
            <span className="h-1 w-3 rounded-full bg-primary/40" />
          </div>

          {/* Sub-copy */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Every decision at AgriSync is guided by a clear mission, a bold
            vision, and a set of values we refuse to compromise on.
          </p>
        </div>

        {/*
          Mobile:  1 column, rows separated by horizontal dividers (divide-y)
          Tablet+: 3 columns side by side, separated by vertical dividers (divide-x)
        */}
        <div className="grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {pillars.map((pillar) => (
            <PillarColumn key={pillar.label} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
