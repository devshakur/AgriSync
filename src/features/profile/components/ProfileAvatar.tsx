"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProfileThemeTokens } from "../lib/profile-utils";

type ProfileAvatarProps = {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallbackSrc: string;
  className?: string;
};

const sizeMap = {
  sm: { className: "h-14 w-14", sizes: "56px" },
  md: { className: "h-20 w-20", sizes: "80px" },
  lg: { className: "h-28 w-28", sizes: "112px" },
  xl: { className: "h-32 w-32", sizes: "128px" },
} as const;

const ProfileAvatar = ({
  src,
  alt,
  size = "md",
  fallbackSrc,
  className = "",
}: ProfileAvatarProps) => {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = failed ? fallbackSrc : src;
  const dimensions = sizeMap[size];

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-muted ${dimensions.className} ${className}`}
    >
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        className="object-cover"
        sizes={dimensions.sizes}
        onError={() => setFailed(true)}
        unoptimized={resolvedSrc.startsWith("data:")}
      />
    </div>
  );
};

type VerifiedBadgeProps = {
  label: string;
  theme: ProfileThemeTokens;
  className?: string;
};

const VerifiedBadge = ({ label, theme, className = "" }: VerifiedBadgeProps) => (
  <span
    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${theme.badge} ${className}`}
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3 w-3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.3 4.7 6.5 11.5 2.7 7.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {label}
  </span>
);

export { ProfileAvatar, VerifiedBadge };
