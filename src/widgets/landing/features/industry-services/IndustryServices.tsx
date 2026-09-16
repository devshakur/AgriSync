import Image from "next/image";
      import { Leaf, Truck, ShoppingBasket, Globe } from "lucide-react";
      import { type ReactNode } from "react";

// ─── Blade data ────────────────────────────────────────────────────────────────
interface BladeData {
  image: string;
  alt: string;
  label: string;
  icon: ReactNode;
}

const blades: BladeData[] = [
  {
    image: "/assests/images/male-farmer.jpg",
    alt: "A Nigerian farmer in the field",
    label: "FARMERS",
    icon: <Leaf className="h-5 w-5" />,
  },
  {
    image: "/assests/images/delivery-bike.jpg",
    alt: "A delivery driver on route",
    label: "DRIVERS",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    image: "/assests/images/produce-onions.jpg",
    alt: "Fresh produce at the market",
    label: "MARKET",
    icon: <ShoppingBasket className="h-5 w-5" />,
  },
  {
    image: "/assests/images/hero-farm.jpg",
    alt: "AgriSync farm network",
    label: "NETWORK",
    icon: <Globe className="h-5 w-5" />,
  },
];

// ─── Single blade card ─────────────────────────────────────────────────────────
// The pointed-bottom shape is achieved with clip-path polygon:
//   top-left → top-right → bottom-right (83%) → center-bottom (100%) → bottom-left (83%)
function BladeCard({ image, alt, label, icon }: BladeData) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 83%, 50% 100%, 0 83%)",
        borderRadius: "6px 6px 0 0",
      }}
    >
      {/* Background image */}
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 768px) 25vw, (max-width: 1024px) 13vw, 11vw"
        className="object-cover object-center"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-black/78" />

      {/* Icon — top center */}
      <div className="absolute left-1/2 top-5 -translate-x-1/2 text-white/90">
        {icon}
      </div>

      {/* Vertical label — lower center, letters upright */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-heading text-xs font-bold uppercase tracking-[0.2em] text-white"
        style={{ writingMode: "vertical-rl", textOrientation: "upright" }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function IndustryServices() {
  return (
    <section className="w-full py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Section title ── */}
        <div className="mb-10 flex items-center justify-center gap-2.5 lg:mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            AgriSync{" "}
            <span className="text-primary">Platform</span>
          </h2>
        </div>

        {/* ── Two-column body ── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">

          {/* Left — blade row
              Height: 220px mobile | 300px md | 380px lg */}
          <div className="flex h-55 w-full shrink-0 gap-2 sm:h-75 sm:gap-3 lg:h-95 lg:w-[48%]">
            {blades.map((blade) => (
              <div key={blade.label} className="relative flex-1 h-full">
                <BladeCard {...blade} />
              </div>
            ))}
          </div>

          {/* Right — text content */}
          <div className="flex w-full flex-col lg:w-[52%] lg:pt-4">

          

            {/* Heading */}
            <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[1.85rem]">
              Empowering Nigeria&apos;s Agricultural Supply Chain
            </h3>

            {/* Green sub-label */}
            <p className="mt-3 font-semibold text-primary sm:text-lg">
              Connecting Farmers, Drivers, and Buyers
            </p>

            {/* Body text */}
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              AgriSync offers a structured digital platform designed for
              farmers, transport drivers, and produce buyers. We combine
              logistics technology with traditional agricultural commerce to
              build transparent, efficient supply chains —{" "}
              <strong className="font-semibold text-foreground">
                from farm to final destination.
              </strong>
            </p>

          

          </div>
        </div>
      </div>
    </section>
  );
}
