"use client";

import {
  Bell,
  ChevronRight,
  CreditCard,
  HelpCircle,
  Lock,
  Shield,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { ProfileThemeTokens } from "../lib/profile-utils";

export type SettingsNavId =
  | "profile"
  | "security"
  | "notifications"
  | "payments"
  | "privacy"
  | "help";

type SettingsNavItem = {
  id: SettingsNavId;
  label: string;
  icon: LucideIcon;
};

const items: SettingsNavItem[] = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "security", label: "Account Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "payments", label: "Payment Methods", icon: CreditCard },
  { id: "privacy", label: "Privacy", icon: Shield },
  { id: "help", label: "Help & Support", icon: HelpCircle },
];

type SettingsNavProps = {
  theme: ProfileThemeTokens;
  activeId: SettingsNavId;
  onSelect: (id: SettingsNavId) => void;
  className?: string;
};

const SettingsNav = ({
  theme,
  activeId,
  onSelect,
  className = "",
}: SettingsNavProps) => (
  <nav
    aria-label="Settings"
    className={`overflow-hidden rounded-2xl border shadow-sm ${theme.cardBg} ${theme.cardBorder} ${className}`}
  >
    <ul className="divide-y divide-black/[0.06] dark:divide-white/10">
      {items.map((item) => {
        const Icon = item.icon;
        const active = item.id === activeId;
        return (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex w-full items-center gap-3 px-4 py-3.5 text-left transition ${
                active ? theme.activeNav : "text-foreground hover:bg-black/[0.03] dark:hover:bg-white/5"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <Icon
                className={`h-5 w-5 shrink-0 ${active ? theme.softText : "text-foreground"}`}
                strokeWidth={1.75}
              />
              <span className={`flex-1 text-sm font-medium ${active ? theme.softText : ""}`}>
                {item.label}
              </span>
              <ChevronRight
                className={`h-4 w-4 shrink-0 ${active ? theme.softText : "text-muted-foreground"}`}
                aria-hidden="true"
              />
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

export { SettingsNav };
