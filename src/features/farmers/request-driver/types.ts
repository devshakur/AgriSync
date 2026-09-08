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
