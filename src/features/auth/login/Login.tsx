"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole, Phone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/formfield";
import { hasEmptyFields } from "@/lib/validation";
import { getErrorMessage } from "@/lib/api";
import { AUTH_FIELD_CONTROL, AuthShell } from "../shared";
import { useAuth } from "../context";
import { useSignin } from "../hooks";
import { signinSchema } from "../schemas";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [phone, setPhone] = useState(searchParams.get("phone") ?? "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; password?: string }>({});
  const [signinError, setSigninError] = useState("");
  const { mutate: signin, isPending, isError, error } = useSignin();

  const isFormIncomplete = hasEmptyFields(phone, password);
  const displayError = signinError || (isError ? getErrorMessage(error) : "");

  const handleLogin = () => {
    if (isFormIncomplete || isPending) return;
    setSigninError("");
    const result = signinSchema.safeParse({ phone: phone.trim(), password });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        phone: errors.phone?.[0],
        password: errors.password?.[0],
      });
      return;
    }

    setFieldErrors({});
    signin(result.data, {
      onSuccess: (response) => {
        if (!response.user) {
          setSigninError("Login successful, but user information was not returned.");
          return;
        }

        login(response.user, {
          token: response.token,
          refreshToken: response.refreshToken,
        });

        const role = response.user.role.toLowerCase();

        switch (role) {
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
            setSigninError("Login successful, but your account role is not recognized.");
        }
      },
      onError: (signinError) => {
        setSigninError(getErrorMessage(signinError));
      },
    });
  };

  return (
    <AuthShell
      mode="login"
      title="Welcome back"
      description="Sign in to your account to continue"
      footer={
        <>
          New to AgriSync?{" "}
          <Link href="/role" className="font-semibold text-primary transition hover:text-[#143F2B]">
            Create an account
          </Link>
        </>
      }
    >
      <div className="space-y-3">
        <FormField
          label="Phone number"
          type="text"
          inputMode="numeric"
          icon={Phone}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="0803 456 7890"
          error={fieldErrors.phone}
          compact
          controlClassName={AUTH_FIELD_CONTROL}
        />

        <FormField
          label="Password"
          type="password"
          icon={LockKeyhole}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          error={fieldErrors.password}
          compact
          controlClassName={AUTH_FIELD_CONTROL}
        />

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <label className="inline-flex min-w-0 cursor-pointer items-center gap-2.5 text-sm text-[#2E2B29]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="h-4 w-4 shrink-0 rounded border-[#4F6F5D] bg-transparent text-primary accent-primary"
            />
            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-semibold text-primary transition hover:text-[#143F2B]"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          label="Sign In"
          type="button"
          variant="primary"
          disabled={isFormIncomplete || isPending}
          loading={isPending}
          onClick={handleLogin}
          size="md"
          className="w-full max-w-full rounded-full bg-primary font-semibold text-white hover:bg-[#0a3328]"
        />

        {displayError ? (
          <p className="text-center text-sm text-red-500">{displayError}</p>
        ) : null}
      </div>
    </AuthShell>
  );
};

export { Login };
