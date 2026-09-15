import { Check } from "lucide-react";
import { type ReactNode } from "react";

type RoleCardProps = {
  value: string;
  title: string;
  description: string;
  illustration: ReactNode;
  selected?: boolean;
  onSelect?: (value: string) => void;
  className?: string;
};

const RoleCard = ({
  value,
  title,
  description,
  illustration,
  selected = false,
  onSelect,
  className = "",
}: RoleCardProps) => {
  const borderClassName = selected
    ? "border-primary shadow-[0_18px_48px_rgba(27,90,59,0.16)]"
    : "border-[#E6EAF0] shadow-[0_12px_36px_rgba(15,23,42,0.08)] hover:border-primary/60 hover:shadow-[0_18px_48px_rgba(27,90,59,0.12)]";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(value)}
      aria-pressed={selected}
      className={`group relative flex w-full flex-col rounded-4xl border-2 bg-white p-5 text-left transition-all duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-6 ${borderClassName} ${className}`}
    >
      <span
        className={`absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
          selected
            ? "border-primary bg-primary text-white"
            : "border-[#D7DEE8] bg-white text-transparent group-hover:border-primary/60"
        }`}
        aria-hidden="true"
      >
        <Check className="h-4.5 w-4.5" strokeWidth={2.5} />
      </span>

      <div className="flex min-h-52.5 items-center justify-center overflow-hidden rounded-3xl bg-[#F8FAFD] px-3 py-4 sm:min-h-57">
        {illustration}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#101513] sm:text-[1.7rem]">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#55606F] sm:text-base">
          {description}
        </p>
      </div>
    </button>
  );
};

export default RoleCard;
