"use client";

import { useState, type ReactNode } from "react";
import { AuthBrand } from "./AuthBrand";
import { AuthGoogleButton } from "./AuthGoogleButton";
import { AuthHero } from "./AuthHero";
import { AuthModeToggle, type AuthMode } from "./AuthModeToggle";
import { AuthRoleStrip } from "./AuthRoleStrip";

type AuthShellProps = {
  mode: AuthMode;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
  banner?: ReactNode;
};

const GOOGLE_NOTICE = "Google sign-in is coming soon.";

const AuthShell = ({
  mode,
  title,
  description,
  children,
  footer,
  banner,
}: AuthShellProps) => {
  const [googleNotice, setGoogleNotice] = useState("");

  return (
    <div className="min-h-dvh w-full min-w-0 max-w-[100vw] overflow-x-hidden bg-white lg:h-dvh lg:overflow-hidden lg:flex">
      <AuthHero />

      <div className="flex min-h-dvh min-w-0 flex-1 flex-col lg:h-dvh lg:overflow-hidden">
        <div className="mx-auto flex w-full min-w-0 max-w-md flex-1 flex-col px-6 py-8 sm:px-8 lg:max-w-100 lg:justify-center lg:py-6 xl:max-w-150">
          <div className="mb-6 flex justify-center lg:mb-4">
            <AuthBrand />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight text-[#073D2C] lg:text-[1.75rem]">
              {title}
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          {banner ? <div className="mt-3">{banner}</div> : null}

          <div className="mt-4">
            <AuthModeToggle active={mode} />
          </div>

          <div className="mt-4">{children}</div>

          <div className="mt-4">
            <AuthGoogleButton
              notice={googleNotice}
              onClick={() => setGoogleNotice(GOOGLE_NOTICE)}
            />
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>

        <AuthRoleStrip />
      </div>
    </div>
  );
};

export { AuthShell };
