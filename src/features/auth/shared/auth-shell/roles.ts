import { Leaf, ShoppingBasket, Truck, type LucideIcon } from "lucide-react";

export const AUTH_AUDIENCE = [
  { title: "Farmers", caption: "Sell your produce", Icon: Leaf },
  { title: "Drivers", caption: "Earn on every trip", Icon: Truck },
  { title: "Buyers", caption: "Get fresh produce", Icon: ShoppingBasket },
] as const satisfies ReadonlyArray<{
  title: string;
  caption: string;
  Icon: LucideIcon;
}>;

export const AUTH_FIELD_CONTROL =
  "border border-[#E6E2D8] bg-white shadow-none focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20";
