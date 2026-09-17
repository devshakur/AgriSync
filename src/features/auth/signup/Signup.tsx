"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AUTH_FIELD_CONTROL, AuthShell } from "../shared";
import { useSignup } from "../hooks";
import { LockKeyhole, Mail, Phone, UserRound } from "lucide-react";
import { FormField } from "@/shared/ui/formfield";
import { Button } from "@/shared/ui/button";
import { getErrorMessage } from "@/lib/api";
import { userRoles, type AuthRole } from "../types";
import { signupSchema } from "../schemas";
import Link from "next/link";
import { useAuth } from "../context";

const SignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<"fullName" | "phone" | "email" | "password" | "confirmPassword", string>>
  >({});
  const { mutate: signup, isPending: loading } = useSignup();
  const { register } = useAuth();
  const roleParam = searchParams.get("role");
  const role: AuthRole = userRoles.includes(roleParam as AuthRole)
    ? (roleParam as AuthRole)
    : "farmer";

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const formValues = {
    fullName: fullName.trim(),
    phone: phone.trim(),
    email: email.trim(),
    password,
    confirmPassword,
    role,
  };

  const isFormValid = signupSchema.safeParse(formValues).success;

  const handleSignup = () => {
    if (loading) return;
    setError("");

    const result = signupSchema.safeParse(formValues);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        fullName: errors.fullName?.[0],
        phone: errors.phone?.[0],
        email: errors.email?.[0],
        password: errors.password?.[0],
        confirmPassword: errors.confirmPassword?.[0],
      });
      return;
    }

    setFieldErrors({});
    signup(
      {
        fullName: result.data.fullName,
        email: result.data.email,
        password: result.data.password,
        phone: result.data.phone,
        role: result.data.role,
      },
      {
        onSuccess: (response) => {
          if (!response.user) {
            setError("Account created, but user information was not returned.");
            return;
          }

          register(response.user, {
            token: response.token,
            refreshToken: response.refreshToken,
          });

          const nextRole = response.user.role.toLowerCase();

          switch (nextRole) {
            case "farmer":
              router.push("/farmer");
              break;

            case "buyer":
              router.push("/buyer");
              break;

            case "driver":
              router.push("/drivers");
              break;

            default:
              setError("Account created, but your account role is not recognized.");
          }
        },
        onError: (signupError) => {
          setError(getErrorMessage(signupError));
        },
      },
    );
  };

  return (
    <AuthShell
      mode="signup"
      title={`Create your ${roleLabel} account`}
      description="Create an account to continue"
      banner={
        <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
          {/* <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F2E7] px-3 py-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-primary">
              <Leaf className="h-3 w-3" strokeWidth={1.8} />
            </span>
            <span className="text-sm font-semibold text-primary">{roleLabel}</span>
          </div> */}
          <Link
            href="/role"
            className="text-sm font-semibold text-primary transition hover:text-[#143F2B]"
          >
            Choose a different role
          </Link>
        </div>
      }
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary transition hover:text-[#143F2B]">
            Login
          </Link>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-x-4 lg:gap-y-3">
        <FormField
          label="Full name"
          icon={UserRound}
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="e.g. Amina Bello"
          error={fieldErrors.fullName}
          compact
          controlClassName={AUTH_FIELD_CONTROL}
        />

        <FormField
          label="Phone number"
          type="tel"
          icon={Phone}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="0803 456 7890"
          error={fieldErrors.phone}
          compact
          controlClassName={AUTH_FIELD_CONTROL}
        />

        <FormField
          className="lg:col-span-2"
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="amina.bello@example.com"
          error={fieldErrors.email}
          compact
          controlClassName={AUTH_FIELD_CONTROL}
        />

        <FormField
          label="Password"
          type="password"
          icon={LockKeyhole}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Create a password"
          error={fieldErrors.password}
          compact
          controlClassName={AUTH_FIELD_CONTROL}
        />

        <FormField
          label="Confirm password"
          type="password"
          icon={LockKeyhole}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm password"
          error={fieldErrors.confirmPassword}
          compact
          controlClassName={AUTH_FIELD_CONTROL}
        />

        <p className="text-xs text-muted-foreground lg:col-span-2">
          Password must be at least 8 characters.
        </p>

        <div className="lg:col-span-2">
          <Button
            label="Create account"
            type="button"
            variant="primary"
            size="md"
            disabled={!isFormValid || loading}
            loading={loading}
            onClick={handleSignup}
            className="w-full max-w-full rounded-full bg-primary font-semibold text-white hover:bg-[#0a3328]"
          />
        </div>

        {error ? (
          <p className="text-center text-sm text-red-500 lg:col-span-2">{error}</p>
        ) : null}
      </div>
    </AuthShell>
  );
};

export { SignUp };
