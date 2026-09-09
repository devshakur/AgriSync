"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Leaf, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/formfield";
import { hasEmptyFields } from "@/lib/validation";
import { getErrorMessage } from "@/lib/api";
import { FormCard, Header, FormSubhead } from "../shared";
import { useAuth } from "../context";
import { useSignin } from "../hooks";
import { signinSchema } from "../schemas";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth(); 
  const [phone, setPhone] = useState(
    searchParams.get("phone") ?? "",
  );
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ phone?: string; password?: string }>({});
  const { mutate: signin, isPending, isError, error } = useSignin();

  const isFormIncomplete = hasEmptyFields(phone, password);

  const handleLogin = () => {
    if (isFormIncomplete || isPending) return;

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
        if (response.user) {
          login(response.user, {
            token: response.token,
            refreshToken: response.refreshToken,
          });
        }
        router.push(`/${response.user?.role ?? "farmer"}`);
      },
    });
  };

  return (
    <>
      <Header page="Back to Home" route="/" />
             <FormSubhead
                   icon={Leaf}
                   title="Welcome back"
                   description="Log in to manage your deliveries, orders, and produce."
                 />
      <div className="flex  items-center justify-center px-4 py-8">
        <FormCard className="w-full p-5">
          <div className="space-y-6">
            <div className="space-y-2">
              <div>
                <FormField
                  label="Phone number"
                  type="text"
                  inputMode="numeric"
                  icon={UserRound}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="0803 456 7890"
                  error={fieldErrors.phone}
                />
              </div>

              <div>
                <FormField
                  label="Password"
                  type="password"
                  icon={LockKeyhole}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  error={fieldErrors.password}
                />
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="inline-flex cursor-pointer items-center gap-3 text-sm text-[#2E2B29]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  className="h-4 w-4 rounded border-[#4F6F5D] bg-transparent text-[#1B5A3B] accent-[#1B5A3B]"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#1B5A3B] transition hover:text-[#143F2B]"
              >
                Forgot password?
              </Link>
            </div>

            <div className="pt-1">
              <Button
                label="Log in"
                type="button"
                variant="primary"
                disabled={isFormIncomplete || isPending}
                loading={isPending}
                onClick={handleLogin}
                size="lg"
                className="w-full rounded-full bg-primary  text-lg font-semibold text-white hover:bg-[#0a3328]"
              />
            </div>

            {isError && (
              <p className="text-center text-sm text-red-500">
                {getErrorMessage(error)}
              </p>
            )}

            <div className="flex items-center gap-4 pt-2">
              <div className="h-px flex-1 bg-[#CFC8BE]" />
              <span className="text-base text-[#5C5A57]">New to AgriSync?</span>
              <div className="h-px flex-1 bg-[#CFC8BE]" />
            </div>

            <div>
              <Link href="/signup" className="block">
                <Button
                  label="Create an account"
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full border-[1.5px] border-[#0E3E2F] bg-transparent text-lg font-semibold text-[#0E3E2F] hover:bg-[#EAF4EE]"
                />
              </Link>
            </div>
          </div>
        </FormCard>
      </div>
    </>
  );
};

export { Login };
