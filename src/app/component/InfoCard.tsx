"use client";

import { Button, type ButtonVariant } from "@/component/ui/button";
import { ReactNode } from "react";

type InfoCardProps = {
  id?: string;
  icon: ReactNode;
  eyebrow?: string;
  title: string;
  description?: string;
  items?: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  buttonVariant?: ButtonVariant;
  className?: string;
};

export default function InfoCard({
  id,
  icon,
  eyebrow,
  title,
  description,
  items,
  buttonText,
  onButtonClick,
  buttonVariant = "outline",
  className = "",
}: InfoCardProps) {
  return (
    <article
      id={id}
      className={`w-full rounded-4xl border border-[#E9E8E2] bg-primary-foreground px-8 py-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ${className}`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E3F2E7] text-[#1B5A3B]">
        {icon}
      </div>

      {eyebrow && (
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.12em] text-[#69706D]">
          {eyebrow}
        </p>
      )}

      <h3 className="mt-4 text-lg font-semibold leading-tight tracking-[-0.03em] text-[#101513]">
        {title}
      </h3>

      {description && (
        <p className="mt-6 text-lg leading-[1.55] text-[#4B514F] ">
          {description}
        </p>
      )}

      {items && items.length > 0 && (
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm leading-[1.45] text-[#4B514F] "
            >
              <span
                className="mt-0.5 shrink-0 text-md font-medium text-[#278451]"
                aria-hidden="true"
              >
                ✓
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {buttonText && (
        <Button
          label={buttonText}
          type="button"
          variant={buttonVariant}
          size="lg"
          onClick={onButtonClick}
          className="mt-8 w-full justify-center border-[1.5px] border-[#1B5A3B] text-[1.05rem] font-semibold text-[#1B5A3B]"
        />
      )}
    </article>
  );
}