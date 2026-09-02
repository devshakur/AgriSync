import { CreditCard, MapPinned, ShieldCheck, Star, type LucideIcon } from "lucide-react";

type TrustFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const trustFeatures: TrustFeature[] = [
  {
    title: "Verified users",
    description: "Every farmer, driver, and buyer is identity-checked.",
    icon: ShieldCheck,
  },
  {
    title: "Driver & farmer ratings",
    description: "Two-way ratings keep quality and trust high.",
    icon: Star,
  },
  {
    title: "Delivery tracking",
    description: "Know exactly where your produce is, every step.",
    icon: MapPinned,
  },
  {
    title: "Secure payments",
    description: "Card, transfer, or USSD — held safely until delivery.",
    icon: CreditCard,
  },
];

type FeatureItemProps = {
  title: string;
  description: string;
  Icon: LucideIcon;
};

function FeatureItem({ title, description, Icon }: FeatureItemProps) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#D9EEE4] text-[#1C5C3B] shadow-[inset_0_0_0_1px_rgba(28,92,59,0.08)]">
        <Icon className="h-6 w-6 stroke-[1.9]" />
      </div>

      <h3 className="text-md font-semibold leading-tight tracking-[-0.04em] text-[#1A1F1D]">
        {title}
      </h3>

      <p className="mt-2 max-w-[18rem] text-14 leading-normal text-[#3F4A45]">
        {description}
      </p>
    </article>
  );
}

type TrustHighlightsProps = {
  items?: TrustFeature[];
  className?: string;
};

const  TrustHighlights = ({
  items = trustFeatures,
  className = "",
}: TrustHighlightsProps) => {
  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto grid w-full gap-10 px-6 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <FeatureItem
            key={item.title}
            title={item.title}
            description={item.description}
            Icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}

export  {TrustHighlights};
