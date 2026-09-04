"use client";


import { useRouter } from "next/navigation";
import { Leaf, ShoppingBasket, Truck } from "lucide-react";
import { ExtraInfo } from "@/widgets/landing/features/extra-info";
import RoleCard from "./role-card/RoleCard";
import { Header } from "../shared/header";

const roles = [
  {
    value: "farmer",
    icon: Leaf,
    title: "I’m a Farmer",
    description: "Request transport, list produce, and sell directly to buyers.",
    actionText: "Continue as Farmer",
  },
  {
    value: "driver",
    icon: Truck,
    title: "I’m a Driver",
    description: "Find delivery jobs, earn on every trip, and help move produce.",
    actionText: "Continue as Driver",
  },
  {
    value: "buyer",
    icon: ShoppingBasket,
    title: "I’m a Buyer",
    description: "Discover fresh produce and get it delivered directly to you.",
    actionText: "Continue as Buyer",
  },
];

const UserRole = () => {
  const router = useRouter();

  const handleRoleSelect = (role: string) => {
    router.push(`/signup?role=${encodeURIComponent(role)}`);
  };

  return (
    <div>
     <Header page="Back to Home" route="/" />
      <section>
        <ExtraInfo
          id="AgriSync usage"
          heading="How will you use AgriSync?"
          description="Choose the role that fits you best — you can always add another account later."
        />
      </section>
      <article>
        <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-3">
          {roles.map(({ value, icon: Icon, title, description, actionText }, index) => {
            const isLastCard = index === roles.length - 1;

            return (
              <div
                key={title}
                className={isLastCard ? "flex w-full justify-center sm:col-span-2 lg:col-span-1" : "flex w-full justify-center"}
              >
                <RoleCard
                  icon={Icon}
                  title={title}
                  description={description}
                  actionText={actionText}
                  onClick={() => handleRoleSelect(value)}
                  className={isLastCard ? "w-full max-w-105" : "w-full max-w-105"}
                />
              </div>
            );
          })}
        </div>
      </article>
    </div>
  );
};

export { UserRole };
