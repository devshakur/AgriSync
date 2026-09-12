"use client";

import type { LucideIcon } from "lucide-react";
import type { ProfileThemeTokens } from "../lib/profile-utils";
import { displayProfileValue } from "../lib/profile-utils";

type ProfileFieldProps = {
  label: string;
  value: string | null | undefined;
  icon: LucideIcon;
  theme: ProfileThemeTokens;
};

const ProfileField = ({ label, value, icon: Icon, theme }: ProfileFieldProps) => (
  <div className="flex items-start gap-3">
    <span
      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${theme.iconCircle}`}
      aria-hidden="true"
    >
      <Icon className="h-4 w-4" strokeWidth={1.75} />
    </span>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-sm font-medium text-foreground">
        {displayProfileValue(value)}
      </p>
    </div>
  </div>
);

export { ProfileField };
