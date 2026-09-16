import Image from "next/image";

type IllustrationProps = {
  className?: string;
};

type RoleIllustrationProps = IllustrationProps & {
  src: string;
};

function RoleIllustration({ src, className = "" }: RoleIllustrationProps) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={360}
      height={260}
      className={`h-auto w-full max-w-55 object-contain ${className}`}
    />
  );
}

function FarmerIllustration({ className = "" }: IllustrationProps) {
  return (
    <RoleIllustration
      src="/assests/images/agrisync-farmer.webp"
      className={className}
    />
  );
}

function DriverIllustration({ className = "" }: IllustrationProps) {
  return (
    <RoleIllustration
      src="/assests/images/agrisync-driver.webp"
      className={className}
    />
  );
}

function BuyerIllustration({ className = "" }: IllustrationProps) {
  return (
    <RoleIllustration
      src="/assests/images/agrisync-buyer.webp"
      className={className}
    />
  );
}

export { BuyerIllustration, DriverIllustration, FarmerIllustration };
