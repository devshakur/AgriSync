export type AvailableTransportRequest = {
  _id: string;
  productType: string;
  quantity: number;
  pickupLocation: string;
  deliveryLocation: string;
  requestedBy: string;
  preferredPickupDate: string;
  isAccepted: boolean;
  isInTransit: boolean;
  isDelivered: boolean;
  isDelete: boolean;
  requestDate: string;
  __v?: number;
};

export type TransportRequestDetails = AvailableTransportRequest & {
  acceptedBy?: string;
};

export type AcceptTransportRequestResponse = {
  message: string;
  transportRequest: TransportRequestDetails;
};
