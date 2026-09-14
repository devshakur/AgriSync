"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";

// ─── Testimonial data ──────────────────────────────────────────────────────────
interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Emeka Okafor",
    role: "Maize Farmer, Kano",
    avatar: "https://i.pravatar.cc/80?img=11",
    text: "AgriSync connected me to buyers I never had access to before. I now sell directly and get paid faster. My farm income has grown by over 40% in one season.",
  },
  {
    name: "Fatima Bello",
    role: "Tomato Farmer, Kaduna",
    avatar: "https://i.pravatar.cc/80?img=44",
    text: "I used to lose a third of my harvest to spoilage before it reached the market. With AgriSync, my produce gets picked up the same day. It is a lifeline for my family.",
  },
  {
    name: "Chukwudi Eze",
    role: "Logistics Driver, Enugu",
    avatar: "https://i.pravatar.cc/80?img=14",
    text: "As a driver, I struggled to find consistent work. AgriSync gives me daily delivery routes, tracks my trips, and pays promptly. I have not had an empty week since I joined.",
  },
  {
    name: "Aisha Mohammed",
    role: "Produce Buyer, Abuja",
    avatar: "https://i.pravatar.cc/80?img=47",
    text: "I source fresh vegetables for my restaurant through AgriSync. The quality is consistently excellent and the pricing is transparent. I trust this platform completely.",
  },
  {
    name: "Tunde Adeyemi",
    role: "Rice Farmer, Ogun",
    avatar: "https://i.pravatar.cc/80?img=12",
    text: "Before AgriSync I had to rely on middlemen who kept most of the profit. Now I list my harvest, set my own price, and connect directly with serious buyers.",
  },
  {
    name: "Ngozi Obi",
    role: "Market Trader, Lagos",
    avatar: "https://i.pravatar.cc/80?img=49",
    text: "Just wow. I knew I was going to get a great service, but they went above and beyond my expectations. Ordering in bulk has never been this smooth.",
  },
  {
    name: "Yusuf Aliyu",
    role: "Transport Driver, Sokoto",
    avatar: "https://i.pravatar.cc/80?img=15",
    text: "The route planning feature alone saved me hours every week. I carry more loads, cover more ground, and my fuel costs have dropped significantly.",
  },
  {
    name: "Chisom Ike",
    role: "Cassava Farmer, Anambra",
    avatar: "https://i.pravatar.cc/80?img=46",
    text: "AgriSync is the best thing that happened to my small farm. They re-organised, re-branded and re-vamped how I sell my cassava to processing plants.",
  },
  {
    name: "Adebola Williams",
    role: "Grocery Store Owner, Ibadan",
    avatar: "https://i.pravatar.cc/80?img=20",
    text: "By far the most efficient team I have partnered with. Everyone is knowledgeable and friendly, and the produce arrives on time every single delivery.",
  },
  {
    name: "Halima Sani",
    role: "Onion Farmer, Plateau",
    avatar: "https://i.pravatar.cc/80?img=48",
    text: "Awesome services. I am really happy to be here because of AgriSync. Everyone is very professional and I will continue to use their services in the future.",
  },
  {
    name: "Ikenna Nwosu",
    role: "Delivery Coordinator, Port Harcourt",
    avatar: "https://i.pravatar.cc/80?img=17",
    text: "Managing a fleet used to give me headaches. AgriSync's dashboard shows every vehicle, every delivery, every payment in real time. It changed how I operate.",
  },
  {
    name: "Blessing Okoro",
    role: "Pepper Farmer, Benue",
    avatar: "https://i.pravatar.cc/80?img=43",
    text: "I never imagined I could track where my produce is going after it leaves my farm. AgriSync shows me everything and gives me peace of mind.",
  },
  {
    name: "Musa Garba",
    role: "Transport Driver, Katsina",
    avatar: "https://i.pravatar.cc/80?img=18",
    text: "The app is easy to understand even for someone like me who is not very tech-savvy. The support team helped me set everything up in less than an hour.",
  },
  {
    name: "Amaka Nze",
    role: "Foodstuff Retailer, Onitsha",
    avatar: "https://i.pravatar.cc/80?img=45",
    text: "AgriSync cut my procurement time in half. I place orders in the morning and have fresh produce at my store by midday. The reliability is unmatched.",
  },
];

// ─── Single testimonial card ───────────────────────────────────────────────────
function TestimonialCard({ name, role, avatar, text }: Testimonial) {
  return (
    <article className="flex h-full flex-col overflow-hidden  rounded-2xl  px-6 pb-7 pt-4">
      {/* Opening decorative quote — large watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none -mb-6 select-none font-serif text-7xl leading-none text-gray-100"
      >
        &ldquo;
      </span>

      {/* Avatar + name */}
      <div className="relative z-10 mb-3 flex flex-col items-center gap-1.5">
        <Image
          src={avatar}
          alt={`Photo of ${name}`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
          unoptimized
        />
        <div className="text-center">
          <p className="font-heading text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>

      {/* Review text */}
      <p className="relative z-10 flex-1 text-left text-[0.8rem] leading-relaxed text-muted-foreground">
        {text}
      </p>

      {/* Closing decorative quote — bottom-right, mirrored */}
      <span
        aria-hidden="true"
        className="pointer-events-none -mt-3 select-none self-end rotate-180 font-serif text-4xl leading-none text-gray-100"
      >
        &ldquo;
      </span>
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export function TestimonialsSection() {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  /*
    Centre-spotlight driver.

    The horizontal movement is handled entirely by the CSS marquee animation.
    This loop only measures where each card currently sits and writes a single
    custom property (--f) describing how close it is to the centre of the
    viewport: 0 = far away, 1 = perfectly centred.

    Because we read real layout positions rather than computing them from the
    animation clock, the spotlight stays in sync at any viewport width and
    automatically follows the hover-pause.
  */
  useEffect(() => {
    if (reduceMotion) return;

    let frameId = 0;

    const update = () => {
      const viewport = viewportRef.current;

      if (viewport) {
        const vRect = viewport.getBoundingClientRect();
        const centreX = vRect.left + vRect.width / 2;
   
        const focusRadius = Math.min(vRect.width * 0.3, 320);

        for (const card of cardRefs.current) {
          if (!card) continue;

          const rect = card.getBoundingClientRect();
          const cardCentre = rect.left + rect.width / 2;
          const distance = Math.abs(cardCentre - centreX);

          // Linear falloff, then smoothstep for an ease-in-out feel.
          const linear = Math.max(0, 1 - distance / focusRadius);
          const eased = linear * linear * (3 - 2 * linear);

          card.style.setProperty("--f", eased.toFixed(3));
        }
      }

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [reduceMotion]);

 
  const track = [...testimonials, ...testimonials];

  return (
    <section className="w-full overflow-hidden py-14 lg:py-20">
      {/* ── Header ── */}
      <div className="relative mx-auto mb-10 max-w-3xl px-4 text-center lg:mb-12">
      
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 left-0 hidden select-none font-serif text-[9rem] leading-none text-green-500 lg:block"
        >
          &ldquo;
        </span>

        <h2 className="relative font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What our Clients say!
        </h2>

      
        <div className="mt-4 flex items-center justify-center gap-1.5">
          <span className="h-1 w-28 rounded-full bg-[#F0836E]" />
          <span className="h-1 w-2.5 rounded-full bg-[#F0836E]/60" />
        </div>
      </div>

    
      <div
        ref={viewportRef}
        className={`relative w-full py-8 ${
          reduceMotion ? "overflow-x-auto" : "overflow-hidden"
        }`}
        aria-label="Client testimonials"
        role="region"
      >
    
        <div
          className={`flex w-max flex-nowrap items-stretch gap-5 px-5 ${
            reduceMotion ? "" : "animate-marquee"
          }`}
        >
          {track.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
             
              aria-hidden={i >= testimonials.length ? "true" : undefined}
              className="tm-card w-67.5 shrink-0 sm:w-75"
            >
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
