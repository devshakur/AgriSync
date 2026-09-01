"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormCard } from "../component/FormCard";
import { Header } from "../component/Header";
import {
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { FormSubhead } from "../component/FormSubHead";
import { FormField } from "@/component/ui/formfield/FormField";
import { Button } from "@/component/ui/button";
import Link from "next/link";

const SignUp = () => {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const role = searchParams.get("role") ?? "farmer";

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <>
      <Header page="Choose a different role" route="/role" />

      <div className="px-4 pt-6">
        <FormSubhead
          role={roleLabel}
          icon={Leaf}
          title="Create your farmer account"
          description="Tell us about your farm so buyers and drivers can find you."
        />
      </div>

      <div className="flex w-full justify-center px-4 py-6">
        <FormCard className="w-full max-w-[70vw]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormField
                label="Full name"
                icon={UserRound}
                placeholder="e.g. Amina Bello"
              />
            </div>

            <div>
              <FormField
                label="Phone number"
                type="tel"
                icon={Phone}
                placeholder="0803 456 7890"
              />
            </div>

            <div>
              <FormField
                label="Email"
                type="email"
                icon={Mail}
                placeholder="amina.bello@example.com"
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                label="Password"
                type="password"
                icon={LockKeyhole}
                placeholder="Create a password"
                helperText="At least 8 characters."
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                label="Location"
                type="select"
                name="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                icon={MapPin}
                placeholder="Select your state"
                options={[
                  { label: "Abuja", value: "abuja" },
                  { label: "Kano", value: "kano" },
                  { label: "Kaduna", value: "kaduna" },
                  { label: "Nasarawa", value: "nasarawa" },
                  { label: "Niger", value: "niger" },
                  { label: "Plateau", value: "plateau" },
                ]}
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                label="Farm location"
                icon={Leaf}
                placeholder="e.g. Kuje, Abuja"
              />
            </div>

            <div className="md:col-span-2 mt-2 flex justify-center pt-2">
              <Button
                label="Create account"
                type="button"
                variant="primary"
                size="lg"
                className="w-full max-w-[320px]"
              />
            </div>

            <div className="md:col-span-2 mt-4 flex w-full justify-center text-center text-secondary/80">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#1B5A3B] transition hover:text-[#143F2B]">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </FormCard>
      </div>
    </>
  );
};

export { SignUp };