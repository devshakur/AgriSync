"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormCard, Header, FormSubhead } from "../shared";
import { useSignup } from "../hooks";
import {
  Leaf,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react";
import { FormField } from "@/shared/ui/formfield";
import { Button } from "@/shared/ui/button";
import { getErrorMessage } from "@/lib/api";
import { userRoles, type AuthRole } from "../types";
import { signupSchema } from "../schemas";
import Link from "next/link";
import { NIGERIAN_STATES } from "../constants";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"fullName" | "phone" | "email" | "password" | "location" | "city", string>>
  >({});
  const { mutate: signup, isPending: loading } = useSignup();
  const roleParam = searchParams.get("role");
  const role: AuthRole = userRoles.includes(roleParam as AuthRole)
    ? (roleParam as AuthRole)
    : "farmer";

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);
  const roleDescription = {
    farmer: "Tell us about your farm so buyers and drivers can find you.",
    buyer: "Tell us about your trade so farmers and drivers can find you.",
    driver: "Tell us about your ride so farmers and buyers can reach you.",
  }[role] ?? "Tell us about your work so the right people can find you.";

  const isFormValid = signupSchema.safeParse({
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    password,
    role,
    location: location.trim(),
    city: city.trim(),
  }).success;

  const handleSignup = () => {
    if (loading) return;
    setError("");

    const result = signupSchema.safeParse({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
      role,
      location: location.trim(),
      city: city.trim(),
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        fullName: errors.fullName?.[0],
        phone: errors.phone?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
        location: errors.location?.[0],
        city: errors.city?.[0],
      });
      return;
    }

    setFieldErrors({});
    signup(result.data, {
      onSuccess: () => {
        router.push(`/login?phone=${encodeURIComponent(phone.trim())}`);
      },
      onError: (signupError) => {
        setError(getErrorMessage(signupError));
      },
    });
  };

  return (
    <>
      <Header page="Choose a different role" route="/role" />

      <div className="px-4 pt-6">
        <FormSubhead
          role={roleLabel}
          icon={Leaf}
          title={`Create your ${roleLabel} account`}
          description={roleDescription}
        />
      </div>

      <div className="flex w-full justify-center px-4 py-6">
        <FormCard className="w-full max-w-[70vw]">
          <div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormField
                label="Full name"
                icon={UserRound}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="e.g. Amina Bello"
                error={fieldErrors.fullName}
              />
            </div>

            <div>
              <FormField
                label="Phone number"
                type="tel"
                icon={Phone}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="0803 456 7890"
                error={fieldErrors.phone}
              />
            </div>

            <div>
              <FormField
                label="Email"
                type="email"
                icon={Mail}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="amina.bello@example.com"
                error={fieldErrors.email}
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                label="Password"
                type="password"
                icon={LockKeyhole}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                helperText="At least 8 characters."
                error={fieldErrors.password}
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
                error={fieldErrors.location}
                options={NIGERIAN_STATES}
              />
            </div>

            <div className="md:col-span-2">
              <FormField
                label="City"
                icon={Leaf}
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder="e.g. Kuje, Gwagwalada, Zuba"
                error={fieldErrors.city}
              />
            </div>

            <div className="md:col-span-2 mt-2 flex justify-center pt-2">
              <Button
                label="Create account"
                type="button"
                variant="primary"
                size="lg"
                disabled={!isFormValid || loading}
                loading={loading}
                onClick={handleSignup}
                className="w-full max-w-[320px]"
              />
            </div>

            {error && (
              <p className="md:col-span-2 mt-2 text-center text-sm text-red-500">
                {error}
              </p>
            )}

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