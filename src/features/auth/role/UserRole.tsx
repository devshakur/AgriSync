"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ComponentType, useMemo, useState } from "react";
import { Button } from "@/shared/ui/button";
import { ExtraInfo } from "@/widgets/landing/features/extra-info";
import { Header } from "../shared/header";
import {
  BuyerIllustration,
  DriverIllustration,
  FarmerIllustration,
  RoleCard,
} from "./role-card";

type RoleValue = "farmer" | "driver" | "buyer";

type IllustrationProps = {
  className?: string;
};

type RoleItem = {
  value: RoleValue;
  title: string;
  description: string;
  Illustration: ComponentType<IllustrationProps>;
};

const roles: RoleItem[] = [
  {
    value: "farmer",
    title: "Farmer",
    description: "List produce, request transport, and sell your harvest directly to buyers.",
    Illustration: FarmerIllustration,
  },
  {
    value: "driver",
    title: "Driver",
    description: "Pick up delivery jobs, move produce safely, and earn on every completed trip.",
    Illustration: DriverIllustration,
  },
  {
    value: "buyer",
    title: "Buyer",
    description: "Source fresh produce, place orders quickly, and track deliveries with ease.",
    Illustration: BuyerIllustration,
  },
];

const UserRole = () => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [selectedRole, setSelectedRole] = useState<RoleValue | null>(null);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeRole = roles[mobileIndex];
  const selectedRoleConfig = useMemo(
    () => roles.find((role) => role.value === selectedRole) ?? null,
    [selectedRole],
  );

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role as RoleValue);
  };

  const handleCarouselMove = (step: -1 | 1) => {
    setDirection(step);
    setMobileIndex((currentIndex) => (currentIndex + step + roles.length) % roles.length);
  };

  const handleContinue = () => {
    if (!selectedRole) return;

    router.push(`/signup?role=${encodeURIComponent(selectedRole)}`);
  };

  const mobileCardVariants = {
    enter: (step: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : step * 42,
      scale: shouldReduceMotion ? 1 : 0.96,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.34,
        ease: "easeOut" as const,
      },
    },
    exit: (step: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : step * -42,
      scale: shouldReduceMotion ? 1 : 0.96,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.28,
        ease: "easeIn" as const,
      },
    }),
  };

  const renderRoleCard = (role: RoleItem, className = "") => (
    <RoleCard
      value={role.value}
      title={role.title}
      description={role.description}
      illustration={<role.Illustration />}
      selected={selectedRole === role.value}
      onSelect={handleRoleSelect}
      className={className}
    />
  );

  return (
    <div className="h-dvh overflow-y-auto hide-scrollbar bg-background pb-10">
      <Header page="Back to Home" route="/" />

      <section className="px-4 pt-4 sm:px-6">
        <ExtraInfo
          id="AgriSync usage"
          heading="How do you want to use AgriSync?"
          description="This helps us tailor your experience. Pick a role first, then continue when you are ready."
        />
      </section>

      <section className="mx-auto mt-3 w-full max-w-6xl px-4 sm:px-6">
        <div className="rounded-4xl bg-[#FFFDFC] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
          <div className="sm:hidden">
            <div className="mb-4 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => handleCarouselMove(-1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D6DEE7] bg-white text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Show previous role"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  Role {mobileIndex + 1} of {roles.length}
                </p>
                <p className="text-xs text-muted-foreground">
                  Use the arrows to view the next role.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleCarouselMove(1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#D6DEE7] bg-white text-foreground transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label="Show next role"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={activeRole.value}
                  custom={direction}
                  variants={mobileCardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  {renderRoleCard(activeRole)}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {roles.map((role, index) => {
                const isActive = index === mobileIndex;

                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => {
                      setDirection(index > mobileIndex ? 1 : -1);
                      setMobileIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      isActive ? "w-8 bg-primary" : "w-2.5 bg-primary/25"
                    }`}
                    aria-label={`Go to ${role.title}`}
                    aria-current={isActive ? "true" : undefined}
                  />
                );
              })}
            </div>
          </div>

          <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5">
            {roles.slice(0, 2).map((role) => (
              <div key={role.value} className="flex">
                {renderRoleCard(role)}
              </div>
            ))}

            <div className="col-span-2 flex justify-center">
              {renderRoleCard(roles[2], "max-w-88")}
            </div>
          </div>

          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
            {roles.map((role) => (
              <div key={role.value} className="flex">
                {renderRoleCard(role)}
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#ECF1F6] pt-6 sm:mt-8">
            <div className="flex flex-col items-center gap-3">
              <p className="text-center text-sm text-muted-foreground">
                {selectedRoleConfig
                  ? `Selected role: ${selectedRoleConfig.title}`
                  : "Select a role to continue."}
              </p>

              <Button
                label="Next"
                onClick={handleContinue}
                disabled={!selectedRole}
                className="w-full max-w-88 py-3.5 text-base shadow-[0_14px_30px_rgba(27,90,59,0.18)]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export { UserRole };
