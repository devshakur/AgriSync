"use client";

import { TypeAnimation } from "react-type-animation";

type AnimatedSearchPlaceholderProps = {
  value?: string;
  phrases: string[];
  className?: string;
};

const AnimatedSearchPlaceholder = ({
  value = "",
  phrases,
  className = "",
}: AnimatedSearchPlaceholderProps) => {
  if (value) return null;

  const sequence = phrases.flatMap((phrase) => [phrase, 1600, "", 500]);

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-inherit ${className}`}
    >
      <TypeAnimation
        sequence={sequence}
        speed={10}
        deletionSpeed={15}
        repeat={Infinity}
        cursor={false}
        wrapper="span"
      />
    </span>
  );
};

export { AnimatedSearchPlaceholder };
