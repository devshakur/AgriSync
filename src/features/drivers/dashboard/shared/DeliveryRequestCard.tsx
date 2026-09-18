"use client";

import { Clock3, MapPin, Route, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { getErrorMessage } from "@/lib/api";

import {
  useAcceptTransportRequest,
  useTransportRequest,
} from "../hooks";

import { RequestDetailsModal } from "./RequestDetailsModal";


export type DeliveryRequest = {
  _id?: string;
  id?: string;

  productType?: string;
  produce?: string;

  quantity?: number | string;
  qty?: number | string;

  pickupLocation?: string;
  pickup?: string;

  deliveryLocation?: string;
  destination?: string;

  preferredPickupDate?: string;

  postedAt?: string;
  requestDate?: string;
  createdAt?: string;
  requestedAt?: string;
  created_at?: string;

  amount?: number | string;
  price?: number | string;
  deliveryFee?: number | string;
  transportFee?: number | string;
  offeredAmount?: number | string;

  distance?: number | string;
  distanceKm?: number | string;
  estimatedDistance?: number | string;

  duration?: string | number;
  estimatedDuration?: string | number;
  estimatedTime?: string | number;

  /*
   * These are the actual status fields returned
   * by your backend.
   */
  isAccepted?: boolean;
  isInTransit?: boolean;
  isDelivered?: boolean;
  isDelete?: boolean;

  farmer?: {
    name?: string;
    fullName?: string;
    rating?: number;
    reviewsCount?: number;
    reviewCount?: number;
  };

  user?: {
    name?: string;
    fullName?: string;
  };

  [key: string]: unknown;
};

type DeliveryRequestCardProps = {
  request: DeliveryRequest;
  onAccept?: (request: DeliveryRequest) => void;
};


const getFarmerName = (request: DeliveryRequest) => {
  return (
    request.farmer?.name ||
    request.farmer?.fullName ||
    request.user?.name ||
    request.user?.fullName ||
    "Farmer"
  );
};

const getFarmerRating = (request: DeliveryRequest) => {
  return (
    request.farmer?.rating ??
    (typeof request.farmerRating === "number"
      ? request.farmerRating
      : null)
  );
};

const getFarmerReviews = (request: DeliveryRequest) => {
  return (
    request.farmer?.reviewsCount ??
    request.farmer?.reviewCount ??
    (typeof request.reviewsCount === "number"
      ? request.reviewsCount
      : 0)
  );
};


const getStatus = (request: DeliveryRequest) => {

  if (request.isDelivered === true) {
    return {
      label: "Delivered",
      className: "bg-[#E7F5EC] text-[#2D8A54]",
      dot: "bg-[#49A96B]",
    };
  }

  if (request.isInTransit === true) {
    return {
      label: "In Transit",
      className: "bg-[#E8F0FA] text-[#3B6FA8]",
      dot: "bg-[#4A82C4]",
    };
  }

  if (request.isAccepted === true) {
    return {
      label: "Accepted",
      className: "bg-[#E7F5EC] text-[#2D8A54]",
      dot: "bg-[#49A96B]",
    };
  }

  /*
   * If all three are false, this is a new
   * request waiting for a driver.
   */
  return {
    label: "New",
    className: "bg-[#FFF5DF] text-[#C77A09]",
    dot: "bg-[#E2911F]",
  };
};

/* -------------------------------------------------------------------------- */
/* Amount                                                                    */
/* -------------------------------------------------------------------------- */

const getAmount = (request: DeliveryRequest) => {
  const amount =
    request.amount ??
    request.price ??
    request.deliveryFee ??
    request.transportFee ??
    request.offeredAmount;

  if (
    amount === undefined ||
    amount === null ||
    amount === ""
  ) {
    return "—";
  }

  const numericAmount = Number(amount);

  if (Number.isNaN(numericAmount)) {
    return String(amount);
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(numericAmount);
};



const formatRelativeDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const diff = Date.now() - date.getTime();

  const minutes = Math.floor(diff / 60000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
  });
};


const DeliveryRequestCard = ({
  request,
  onAccept,
}: DeliveryRequestCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAcceptConfirm, setShowAcceptConfirm] =
    useState(false);

  const id = request._id ?? request.id;



  const {
    data: requestDetails,
    isFetching: isLoadingDetails,
    isError: isDetailsError,
    error: detailsError,
  } = useTransportRequest(id, showDetails);

  const acceptMutation = useAcceptTransportRequest();



  const farmerName = getFarmerName(request);

  const rating = getFarmerRating(request);

  const reviews = getFarmerReviews(request);

  const status = getStatus(request);

  const produce =
    request.productType ??
    request.produce ??
    "Produce";

  const rawQuantity =
    request.quantity ??
    request.qty;

  const quantity =
    rawQuantity !== undefined &&
    rawQuantity !== null &&
    rawQuantity !== ""
      ? `${rawQuantity}kg`
      : "—";

  const pickup =
    request.pickupLocation ??
    request.pickup ??
    "Pickup location";

  const destination =
    request.deliveryLocation ??
    request.destination ??
    "Delivery location";

  const amount = getAmount(request);

  const distanceRaw =
    request.distance ??
    request.distanceKm ??
    request.estimatedDistance ??
    null;

  const distance =
    distanceRaw !== null &&
    distanceRaw !== undefined &&
    distanceRaw !== ""
      ? typeof distanceRaw === "number"
        ? `${distanceRaw} km`
        : String(distanceRaw)
      : null;

  const durationRaw =
    request.duration ??
    request.estimatedDuration ??
    request.estimatedTime ??
    null;

  const duration =
    durationRaw !== null &&
    durationRaw !== undefined &&
    durationRaw !== ""
      ? String(durationRaw)
      : null;

  const postedAtRaw =
    request.postedAt ??
    request.requestDate ??
    request.requestedAt ??
    request.createdAt ??
    request.created_at ??
    "";

  const formattedPostedAt = postedAtRaw
    ? formatRelativeDate(String(postedAtRaw))
    : "";

  const handleAcceptConfirm = () => {
    if (!id) {
      return;
    }

    acceptMutation.mutate(id, {
      onSuccess: () => {
        setShowAcceptConfirm(false);

        onAccept?.(request);
      },
    });
  };

  return (
    <>
      <article className="group bg-white px-4 py-4 transition-colors hover:bg-[#FCFBF7] sm:px-5">
        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0 flex-1">
            {/* Farmer */}
            <div className="flex items-center gap-2">
              <h3 className="truncate text-[11px] font-semibold text-[#211F1A] sm:text-xs">
                {farmerName}
              </h3>

              {rating !== null && (
                <div className="flex shrink-0 items-center gap-1">
                  <Star className="h-2.5 w-2.5 fill-[#E2911F] text-[#E2911F]" />

                  <span className="text-[8px] font-medium text-[#5B584C]">
                    {rating}
                  </span>

                  <span className="text-[8px] text-[#99958A]">
                    ({reviews})
                  </span>
                </div>
              )}
            </div>

            {/* Produce */}
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-[#211F1A] sm:text-[11px]">
                {produce}
              </span>

              <span className="text-[8px] text-[#A29D91]">
                •
              </span>

              <span className="text-[9px] font-medium text-[#5B584C] sm:text-[10px]">
                {quantity}
              </span>
            </div>

            {/* Route */}
            <div className="mt-1 flex min-w-0 items-center gap-1 text-[8px] text-[#5B584C] sm:text-[9px]">
              <MapPin className="h-2.5 w-2.5 shrink-0 text-[#1B5A3B]" />

              <span className="truncate">
                {pickup}
              </span>

              <span className="shrink-0 text-[#9B978C]">
                →
              </span>

              <span className="truncate">
                {destination}
              </span>
            </div>

            {/* Distance / Duration */}
            {(distance || duration) && (
              <div className="mt-1 flex items-center gap-2 text-[8px] text-[#777368] sm:text-[9px]">
                {distance && (
                  <span className="flex items-center gap-1">
                    <Route className="h-2.5 w-2.5 text-[#1B5A3B]" />

                    {distance}
                  </span>
                )}

                {distance && duration && (
                  <span className="h-2.5 w-px bg-[#D9D5CA]" />
                )}

                {duration && (
                  <span className="flex items-center gap-1">
                    <Clock3 className="h-2.5 w-2.5 text-[#1B5A3B]" />

                    {duration}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end">
            {/* Amount */}
            <p className="text-[10px] font-bold text-[#1B5A3B] sm:text-xs">
              {amount}
            </p>

            {/* Posted time */}
            {formattedPostedAt && (
              <p className="mt-0.5 text-[7px] text-[#99958A] sm:text-[8px]">
                {formattedPostedAt}
              </p>
            )}

            {/* Status */}
            <div
              className={`mt-1.5 flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7px] font-medium ${status.className}`}
            >
              <span
                className={`h-1 w-1 rounded-full ${status.dot}`}
              />

              {status.label}
            </div>

            {/* Actions */}
       <div className="mt-2 flex items-center gap-1.5">
  <Button
    label="View Request"
    variant="outline"
    onClick={() => setShowDetails(true)}
    className="h-6 rounded-md border-[#70A991] bg-white px-2 text-[7px] font-medium text-[#1B5A3B] shadow-none hover:bg-[#F2F8F4] sm:h-7 sm:px-2.5 sm:text-[8px]"
  />

  {/* Request is still available */}
  {!request.isAccepted &&
    !request.isInTransit &&
    !request.isDelivered && (
      <Button
        label="Accept"
        onClick={() => setShowAcceptConfirm(true)}
        disabled={acceptMutation.isPending}
        className="h-6 rounded-md bg-[#1B5A3B] px-2.5 text-[7px] font-semibold text-white shadow-none hover:bg-[#15492F] sm:h-7 sm:px-3 sm:text-[8px]"
      />
    )}

  {/* Request has already been accepted */}
  {request.isAccepted &&
    !request.isInTransit &&
    !request.isDelivered && (
      <Button
        label="Accepted"
        disabled
        className="h-6 rounded-md bg-[#E7F5EC] px-2.5 text-[7px] font-semibold text-[#2D8A54] shadow-none sm:h-7 sm:px-3 sm:text-[8px]"
      />
    )}

  {/* Request is currently being transported */}
  {request.isInTransit &&
    !request.isDelivered && (
      <Button
        label="In Transit"
        disabled
        className="h-6 rounded-md bg-[#E8F0FA] px-2.5 text-[7px] font-semibold text-[#3B6FA8] shadow-none sm:h-7 sm:px-3 sm:text-[8px]"
      />
    )}

  {/* Request has been delivered */}
  {request.isDelivered && (
    <Button
      label="Delivered"
      disabled
      className="h-6 rounded-md bg-[#E7F5EC] px-2.5 text-[7px] font-semibold text-[#2D8A54] shadow-none sm:h-7 sm:px-3 sm:text-[8px]"
    />
  )}
</div>
          </div>
        </div>
      </article>

  

      <RequestDetailsModal
        open={showDetails}
        isLoading={isLoadingDetails}
        errorMessage={
          isDetailsError
            ? getErrorMessage(detailsError)
            : undefined
        }
        request={requestDetails}
        onClose={() => setShowDetails(false)}
      />

      

      <ConfirmDialog
        open={showAcceptConfirm}
        title="Accept this delivery request?"
        description={`You're about to accept the ${produce} request from ${pickup} to ${destination}.`}
        confirmLabel="Accept"
        cancelLabel="Cancel"
        isConfirming={acceptMutation.isPending}
        errorMessage={
          acceptMutation.isError
            ? getErrorMessage(acceptMutation.error)
            : undefined
        }
        onConfirm={handleAcceptConfirm}
        onCancel={() => setShowAcceptConfirm(false)}
      />
    </>
  );
};

export default DeliveryRequestCard;
export { DeliveryRequestCard };