import { Leaf, Truck, ShoppingBasket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Farmer posts a request",
    description:
      "Or lists produce for sale — quantity, location, and timing, in under a minute.",
    icon: <Leaf className="h-7 w-7" />,
  },
  {
    number: "02",
    title: "Driver connects & transports",
    description:
      "Nearby drivers accept the job and move the produce along the way.",
    icon: <Truck className="h-7 w-7" />,
  },
  {
    number: "03",
    title: "Buyer receives fresh produce",
    description:
      "Tracked door to door, with pricing agreed upfront.",
    icon: <ShoppingBasket className="h-7 w-7" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full bg-[#F9F7F0] px-6 py-5 sm:px-8 lg:px-5">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10 lg:gap-20">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-[#B35B25] text-[#1B5A3B]">
                {step.icon}
              </div>

              {/* Step number */}
              <p className="mt-2 font-mono text-sm font-medium tracking-[0.12em] text-[#B35B25] ">
                STOP {step.number}
              </p>

              {/* Title */}
              <h3 className="mt-2 max-w-sm text-md font-semibold leading-[1.2] tracking-[-0.03em] text-[#101513]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="mt-2 max-w-md text-md leading-[1.55] text-[#4B514F] ">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { HowItWorks };