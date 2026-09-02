import { ArrowRight, type LucideIcon } from "lucide-react";

type RoleCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  onClick?: () => void;
  className?: string;
};

const RoleCard = ({
  icon: Icon,
  title,
  description,
  actionText,
  onClick,
  className = "",
}: RoleCardProps) => {
  return (
    <article
      className={`w-full max-w-125 rounded-4xl border-2  bg-white px-8 py-5 shadow-[0_8px_30px_rgba(27,90,59,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#1B5A3B] hover:shadow-[0_16px_40px_rgba(27,90,59,0.12)] ${className}`}
    >
      {/* Icon */}
      <div className="flex h-14.5 w-14.5 items-center justify-center rounded-full border-[3px] border-[#B35B25] text-[#1B5A3B]">
        <Icon
          className="h-7 w-7"
          strokeWidth={1.8}
        />
      </div>

      {/* Content */}
      <div className="mt-8">
        <h3 className="text-[22px] font-semibold leading-[1.15] tracking-[-0.03em] text-[#101513]">
          {title}
        </h3>

        <p className="mt-3 max-w-112.5 text-[19px] leading-[1.35] text-[#4B514F] sm:text-xl">
          {description}
        </p>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={onClick}
        className="group mt-6 cursor-pointer inline-flex items-center gap-3 text-[19px] font-semibold text-[#075B3C] transition-colors duration-200 hover:text-[#B35B25]"
      >
        <span>{actionText}</span>

        <ArrowRight
          className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
          strokeWidth={2}
        />
      </button>
    </article>
  );
}

export default RoleCard;