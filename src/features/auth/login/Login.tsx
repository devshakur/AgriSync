"use client";

import Link from "next/link";
import { Leaf, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/formfield";
import { FormCard, Header, FormSubhead } from "../shared";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
                  value={identifier}
                  onChange={(event) => setIdentifier(event.target.value)}
                  placeholder="0803 456 7890"
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
                size="lg"
                className="w-full rounded-full bg-primary  text-lg font-semibold text-white hover:bg-[#0a3328]"
              />
            </div>

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
