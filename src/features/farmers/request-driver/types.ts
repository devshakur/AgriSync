export type RequestStage =
  | "request"
  | "drivers"
  | "selected"
  | "chat"
  | "tracking"
  | "completed";

export type DeliveryStatus =
  | "Requested"
  | "Driver Accepted"
  | "Driver Arrived"
  | "Transporting"
  | "Delivered";

export type RequestValues = {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  produce: string;
  quantity: string;
  unit: string;
  packaging: string;
  notes: string;
};

export const emptyRequestValues: RequestValues = {
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  produce: "",
  quantity: "",
  unit: "",
  packaging: "",
  notes: "",
};

// POST /transports payload — backend field names.
export type TransportRequestPayload = {
  productType: string;
  quantity: number;
  pickupLocation: string;
  deliveryLocation: string;
  preferredPickupDate: string;
};

export type TransportRequest = {
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
  __v: number;
};

export type TransportRequestResponse = {
  message?: string;
  transportRequest?: TransportRequest;
};

export type DeleteTransportRequestResponse = {
  message: string;
};

// GET /transports — list is wrapped in a `transportRequests` key.
export type TransportRequestsListResponse = {
  transportRequests: TransportRequest[];
};


export type Driver = {
  id: string;
  name: string;
  rating: string;
  trips: number;
  vehicle: string;
  capacity: string;
  distance: string;
  eta: string;
  price: string;
  verified: boolean;
  image: string;
  bestMatch?: boolean;
};

export type ChatMessage = {
  id: string;
  sender: "driver" | "farmer";
  text: string;
  time: string;
};
