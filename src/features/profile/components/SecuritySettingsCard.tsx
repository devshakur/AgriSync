"use client";

import { ChevronRight, Clock3, Shield, ShieldCheck } from "lucide-react";
import type { ProfileThemeTokens } from "../lib/profile-utils";

type SecurityItem = {
  id: string;
  title: string;
  description: string;
  icon: typeof Shield;
};

const securityItems: SecurityItem[] = [
  {
    id: "password",
    title: "Change Password",
    description: "Update your account password",
    icon: Shield,
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security",
    icon: ShieldCheck,
  },
  {
    id: "activity",
    title: "Login Activity",
    description: "Review recent sign-ins",
    icon: Clock3,
  },
];

type SecuritySettingsCardProps = {
  theme: ProfileThemeTokens;
  className?: string;
};

const SecuritySettingsCard = ({ theme, className = "" }: SecuritySettingsCardProps) => (
  <section
    className={`rounded-2xl border p-5 shadow-sm ${theme.cardBg} ${theme.cardBorder} ${className}`}
  >
    <h2 className="text-base font-semibold text-foreground">Security Settings</h2>
    <p className="mt-1 text-sm text-muted-foreground">
      Manage your password and security preferences.
    </p>

    <ul className="mt-4 divide-y divide-black/6 dark:divide-white/10">
      {securityItems.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.id}>
            <button
              type="button"
              className="flex w-full items-center gap-3 py-3.5 text-left transition hover:opacity-90"
              aria-label={`${item.title} (coming soon)`}
            >
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${theme.iconCircle}`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">{item.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {item.description}
                </span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </button>
          </li>
        );
      })}
    </ul>
  </section>
);

export { SecuritySettingsCard };
