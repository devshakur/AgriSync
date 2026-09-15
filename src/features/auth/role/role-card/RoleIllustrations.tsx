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
      height={360}
      className={`h-auto w-full max-w-55 object-contain ${className}`}
    />
  );
}

function FarmerIllustration({ className = "" }: IllustrationProps) {
  return (
    <RoleIllustration
      src="/assests/images/role-farmer.jpg"
      className={className}
    />
  );
}

function DriverIllustration({ className = "" }: IllustrationProps) {
  return (
    <RoleIllustration
      src="/assests/images/role-driver.jpg"
      className={className}
    />
  );
}

function BuyerIllustration({ className = "" }: IllustrationProps) {
  return (
    <RoleIllustration
      src="/assests/images/role-buyer.jpg"
      className={className}
    />
  );
}

export { BuyerIllustration, DriverIllustration, FarmerIllustration };
