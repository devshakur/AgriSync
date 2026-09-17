import Link from "next/link";
import { Leaf } from "lucide-react";

type AuthBrandProps = {
  variant?: "light" | "dark";
};

const AuthBrand = ({ variant = "dark" }: AuthBrandProps) => {
  const isLight = variant === "light";

  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full ${
          isLight ? "bg-white/15 text-white" : "bg-primary/10 text-primary"
        }`}
      >
        <Leaf className="h-5 w-5" strokeWidth={2} />
      </span>
      <span
        className={`font-heading text-xl font-bold tracking-tight ${
          isLight ? "text-white" : "text-primary"
        }`}
      >
        AgriSync
      </span>
    </Link>
  );
};

export { AuthBrand };
