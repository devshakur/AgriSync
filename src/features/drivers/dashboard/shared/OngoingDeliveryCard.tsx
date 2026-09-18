// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { ArrowRight, Check, MapPin } from "lucide-react";

// const STEPS = ["Picked Up", "In Transit", "Arrived", "Delivered"] as const;
// const CURRENT_STEP = 1;

// const OngoingDeliveryCard = () => {
//   return (
//     <article className="flex flex-col rounded-2xl border border-black/6 bg-white p-4 shadow-sm sm:p-5">
//       <div className="flex items-center justify-between gap-3">
//         <h2 className="font-heading text-sm font-semibold text-gray-900 sm:text-base">Ongoing Delivery</h2>
//         <Link
//           href="/drivers/deliveries"
//           className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B5A3B]"
//         >
//           View Details
//           <ArrowRight className="h-3.5 w-3.5" />
//         </Link>
//       </div>

//       <div className="mt-4 flex items-start justify-between gap-3">
//         <div className="flex min-w-0 items-start gap-3">
//           <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
//             <Image
//               src="/assests/images/produce-onions.jpg"
//               alt="Tomatoes"
//               fill
//               className="object-cover"
//               sizes="56px"
//             />
//           </div>
//           <div className="min-w-0">
//             <p className="font-heading text-base font-semibold text-gray-900">Tomatoes</p>
//             <p className="text-xs text-muted-foreground">#TRK-1047</p>
//             <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
//               <MapPin className="h-3.5 w-3.5 shrink-0 text-[#22A45D]" />
//               <span className="truncate">Kano → Kaduna</span>
//             </p>
//             <p className="mt-0.5 text-[11px] text-muted-foreground">120 km · 2h 30m</p>
//           </div>
//         </div>

//         <div className="shrink-0 text-right">
//           <span className="inline-flex items-center rounded-full bg-[#E3F2E7] px-2.5 py-1 text-[10px] font-semibold text-[#1B5A3B]">
//             In Transit
//           </span>
//           <p className="mt-3 text-[11px] text-muted-foreground">Suggested Rate</p>
//           <p className="font-heading text-lg font-semibold text-gray-900">₦25,000</p>
//         </div>
//       </div>

//       <ol className="mt-6 flex items-start justify-between gap-1">
//         {STEPS.map((step, index) => {
//           const done = index < CURRENT_STEP;
//           const current = index === CURRENT_STEP;
//           const active = done || current;

//           return (
//             <li key={step} className="flex min-w-0 flex-1 flex-col items-center">
//               <div className="flex w-full items-center">
//                 <span
//                   className={`h-px flex-1 ${index === 0 ? "bg-transparent" : active ? "bg-[#22A45D]" : "bg-black/10"}`}
//                 />
//                 <span
//                   className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
//                     active ? "bg-[#22A45D] text-white" : "border border-black/15 bg-white"
//                   }`}
//                 >
//                   {done ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
//                 </span>
//                 <span
//                   className={`h-px flex-1 ${
//                     index === STEPS.length - 1 ? "bg-transparent" : index < CURRENT_STEP ? "bg-[#22A45D]" : "bg-black/10"
//                   }`}
//                 />
//               </div>
//               <span
//                 className={`mt-2 text-center text-[10px] leading-3 ${
//                   active ? "font-medium text-gray-800" : "text-muted-foreground"
//                 }`}
//               >
//                 {step}
//               </span>
//             </li>
//           );
//         })}
//       </ol>

//       <Link
//         href="/drivers/deliveries"
//         className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#1B5A3B] text-sm font-semibold text-white transition hover:brightness-110"
//       >
//         View Tracking
//       </Link>
//     </article>
//   );
// };

// export { OngoingDeliveryCard };

"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Truck } from "lucide-react";
import { EmptyState } from "@/shared/ui/empty-state";
import { useOngoingDelivery } from "../hooks";
import { getOngoingStep, isActiveOngoingDelivery } from "../lib/ongoing-delivery";
import type { AvailableTransportRequest } from "../types";

const STEPS = ["Picked Up", "In Transit", "Arrived", "Delivered"] as const;
const PRODUCE_IMAGE = "/assests/images/produce-onions.jpg";

const shortId = (id: string) => `#${id.slice(-6).toUpperCase()}`;

const toCardDelivery = (request: AvailableTransportRequest) => ({
  produce: request.productType,
  quantity: `${request.quantity}kg`,
  trackingId: shortId(request._id),
  route: `${request.pickupLocation} → ${request.deliveryLocation}`,
  currentStep: getOngoingStep(request),
});

const OngoingDeliveryCard = () => {
  const { data: request } = useOngoingDelivery();
  const ongoingDelivery = isActiveOngoingDelivery(request) ? toCardDelivery(request) : null;
  const currentStep = ongoingDelivery?.currentStep ?? 0;
  const progress = (currentStep / (STEPS.length - 1)) * 100;

  return (
    <article className="flex min-h-80 flex-col overflow-hidden rounded-2xl border border-black/6 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.05)]">
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-sm font-semibold text-gray-900 sm:text-base">
              Ongoing Delivery
            </h2>
          </div>

          {ongoingDelivery ? (
            <Link
              href="/drivers/deliveries"
              className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#1B5A3B]"
            >
              View Details
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>

        {!ongoingDelivery ? (
          <EmptyState
            icon={Truck}
            title="No ongoing delivery"
            description="When you accept a request, tracking and route details will appear here."
            actionLabel="Browse requests"
            actionHref="/drivers/requests"
            className="min-h-56 flex-1 py-8"
          />
        ) : (
          <>

        {/* Delivery Information */}
        <div className="mt-5 rounded-xl bg-[#F8FAF9] p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={PRODUCE_IMAGE}
                  alt={ongoingDelivery.produce}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-heading text-base font-semibold text-gray-900">
                    {ongoingDelivery.produce}
                  </p>
                </div>

                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {ongoingDelivery.quantity} · {ongoingDelivery.trackingId}
                </p>

                <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#22A45D]" />
                  <span className="truncate">{ongoingDelivery.route}</span>
                </p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="inline-flex items-center rounded-full bg-[#E3F2E7] px-2.5 py-1 text-[10px] font-semibold text-[#1B5A3B]">
                {STEPS[currentStep]}
              </span>
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="mt-7 px-1 sm:px-2">
          <div className="relative">
            {/* Base line */}
            <div className="absolute left-0 right-0 top-2.5 h-1 rounded-full bg-[#E8EEE9]" />

            {/* Completed / active line */}
            <div
              className="absolute left-0 top-2.5 h-1 rounded-full bg-[#22A45D] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />

            {/* Steps */}
            <ol className="relative flex justify-between">
              {STEPS.map((step, index) => {
                const done = index < currentStep;
                const current = index === currentStep;
                const active = done || current;

                return (
                  <li
                    key={step}
                    className="flex w-1/4 flex-col items-center"
                  >
                    {/* Indicator */}
                    <div className="relative flex h-6 w-6 items-center justify-center">
                      {/* Beeping / pulsing ring */}
                      {current && (
                        <>
                          <span className="absolute inset-0 animate-ping rounded-full bg-[#22A45D]/30" />
                          <span className="absolute -inset-1 rounded-full border border-[#22A45D]/20" />
                        </>
                      )}

                      <span
                        className={[
                          "relative z-10 flex h-5 w-5 items-center justify-center rounded-full transition-all",
                          done
                            ? "bg-[#22A45D] text-white shadow-[0_2px_8px_rgba(34,164,93,0.25)]"
                            : current
                              ? "bg-white ring-4 ring-[#22A45D]/15"
                              : "border-2 border-[#D8E1DB] bg-white",
                        ].join(" ")}
                      >
                        {done && (
                          <Check
                            className="h-3 w-3"
                            strokeWidth={3}
                          />
                        )}

                        {current && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#22A45D]" />
                        )}
                      </span>
                    </div>

                    {/* Label */}
                    <span
                      className={[
                        "mt-2.5 text-center text-[10px] leading-3",
                        active
                          ? "font-semibold text-gray-800"
                          : "font-medium text-muted-foreground",
                        current ? "text-[#1B5A3B]" : "",
                      ].join(" ")}
                    >
                      {step}
                    </span>

                    {/* Current status */}
                    {current && (
                      <span className="mt-1 text-[9px] font-medium text-[#22A45D]">
                        Current
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/drivers/deliveries"
          className="group mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1B5A3B] text-sm font-semibold text-white shadow-[0_4px_12px_rgba(27,90,59,0.18)] transition-all hover:bg-[#164c32] hover:shadow-[0_6px_16px_rgba(27,90,59,0.24)]"
        >
          View Tracking
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
          </>
        )}
      </div>
    </article>
  );
};

export { OngoingDeliveryCard };