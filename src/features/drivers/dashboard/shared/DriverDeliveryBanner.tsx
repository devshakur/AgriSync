import { Button } from "@/shared/ui/button";
import Image from "next/image";

type DriverDeliveryBannerProps = {
  requestsHref?: string;
  deliveriesHref?: string;
  className?: string;
};

const DriverDeliveryBanner = ({
  requestsHref = "/drivers/requests",
  deliveriesHref = "/drivers/deliveries",
  className = "",
}: DriverDeliveryBannerProps) => {
  return (
    <section
      className={`relative isolate h-48 md:h-30 pb-3 w-full overflow-hidden rounded-lg bg-[#2E704F] px-3.5 py-2.5 sm:px-4 ${className}`}
    >
      {/* Decorative landscape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[58%] overflow-hidden"
      >
        {/* Dark green hills */}
        <div className="absolute -bottom-7 left-[42%] h-16 w-28 rounded-[50%] bg-[#205D42]" />
        <div className="absolute -bottom-9 left-[52%] h-20 w-36 rounded-[50%] bg-[#1C563D]" />
        <div className="absolute -bottom-10 left-[66%] h-20 w-40 rounded-[50%] bg-[#225F43]" />

        {/* Orange road / ground */}
        <div className="absolute -bottom-9 right-[-5%] h-16 w-[55%] rotate-[-4deg] rounded-[50%] bg-[#D98A25]" />
        <div className="absolute -bottom-10 right-[-2%] h-14 w-[48%] -rotate-3 rounded-[50%] bg-[#E5A13A]" />

        {/* Small distant trees */}
        <div className="absolute bottom-4 left-[79%] h-5 w-1.5 rounded-full bg-[#275F43]" />
        <div className="absolute bottom-6 left-[78%] h-4 w-4 rounded-full bg-[#347653]" />

        <div className="absolute bottom-3 left-[86%] h-6 w-1.5 rounded-full bg-[#275F43]" />
        <div className="absolute bottom-5 left-[84.8%] h-5 w-5 rounded-full bg-[#3C8058]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[62%] sm:max-w-[58%]">
        <h3 className="font-heading text-[12px] font-semibold leading-[1.15] text-white sm:text-[13px]">
          Ready for your next delivery?
        </h3>

        <p className="mt-0.5 text-[7px] leading-[1.35] text-[#D8E8DF] sm:text-[8px]">
          Check out nearby requests and start earning.
        </p>

        <div className="mt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button
            label="View Requests"
            href={requestsHref}
            aria-label="View delivery requests"
            className="w-full sm:w-auto h-8 rounded-md bg-[#E2911F] px-3 py-2 text-[6px] font-semibold text-white shadow-none hover:bg-[#D17F12]"
          />

          <Button
            label="View Deliveries"
            href={deliveriesHref}
            aria-label="View my deliveries"
            variant="outline"
            className="w-full sm:w-auto h-8 rounded-md border-white/50 bg-white/5 px-3 text-[6px] font-medium text-white shadow-none hover:bg-white/10 hover:text-white"
          />
        </div>
      </div>

      {/* Truck */}
        <div className="pointer-events-none absolute -bottom-12 right-[7%] z-10 h-44 w-44 sm:right-[6%] sm:h-44 sm:w-44">
          <Image
            src="/assests/images/Agricsync-truck.webp"
            alt="Ready for your next delivery? Check out new requests and start earning."
            width={176}
            height={176}
            priority
            quality={100}
            className="h-44 w-44 object-contain"
          />
      </div>
    </section>
  );
};

export default DriverDeliveryBanner;