import Image from "next/image";
import { Button } from "@/shared/ui/button";

// ─── Placeholder images — swap src values when real assets arrive ──────────────
const storyImages = [
  {
    src: "/assests/images/delivery-bike.jpg",
    alt: "A Nigerian farmer holding farm produce",
    wrapperClass: "mt-8",
    // Shorter portrait
    aspectRatio: "2 / 3",
  },
  {
    src: "/assests/images/male-farmer.jpg",
    alt: "A driver on a delivery route across Nigeria",
    wrapperClass: "mt-0",
    // Tallest — noticeably longer than the flanking cards
    aspectRatio: "2 / 4",
  },
  {
    src: "/assests/images/produce-onions.jpg",
    alt: "Fresh produce ready for market",
    wrapperClass: "mt-4",
    // Medium height
    aspectRatio: "2 / 3.4",
  },
] as const;

const RouteHero = () => {
  return (
    <section className="w-full bg-background py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Section title + decorative underline ── */}
        <div className="mb-10 text-center lg:mb-14">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Story
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-14 rounded-full bg-foreground" />
        </div>

        {/* ── Two-column body ── */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-14 lg:gap-20">

          {/* Left — quote + CTA */}
          <div className="flex flex-col items-center text-center md:w-1/2 md:pt-4">
            <blockquote className="font-sans text-lg font-medium leading-relaxed text-foreground sm:text-xl lg:text-2xl lg:leading-[1.55]">
              &ldquo;Born on Nigerian soil, AgriSync connects smallholder
              farmers directly to drivers and buyers across the country. We
              believe in transparent supply chains, empowering local
              communities, and moving fresh produce reliably — from field to
              table.&rdquo;
            </blockquote>

            <div className="mt-8">
              <Button
                label="Explore AgriSync"
                href="#how-it-works"
                variant="primary"
                size="md"
              />
            </div>
          </div>

          {/* Right — three staggered portrait image cards */}
          <div className="flex items-end gap-3 md:w-1/2 sm:gap-4">
            {storyImages.map((img) => (
              <div
                key={img.src}
                className={`relative flex-1 overflow-hidden rounded-3xl ${img.wrapperClass}`}
                style={{ aspectRatio: img.aspectRatio }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 33vw, 18vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export { RouteHero };
