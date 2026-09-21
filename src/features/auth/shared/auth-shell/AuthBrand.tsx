import Link from "next/link";

import Image from "next/image";

type AuthBrandProps = {
  variant?: "light" | "dark";
};

const AuthBrand = ({ variant = "dark" }: AuthBrandProps) => {
  const isLight = variant === "light";

  return (
    <Link href="/" className="inline-flex items-center">
      <span
      >
        <Image src="/assests/logo/Agricsync_logo.png" alt="AgriSync" width={35} height={35} priority />
      </span>
      <span
        className={`font-heading -ml-1 text-xl font-bold tracking-tight ${
          isLight ? "text-white" : "text-primary"
        }`}
      >
        AgriSync
      </span>
    </Link>
  );
};

export { AuthBrand };
