"use client";

import { Mail, Phone } from "lucide-react";
import type { User } from "@/features/auth/types";
import { ProfileAvatar, VerifiedBadge } from "./ProfileAvatar";
import {
  displayProfileValue,
  type ProfileThemeTokens,
} from "../lib/profile-utils";

type ProfileSummaryCardProps = {
  user: User;
  theme: ProfileThemeTokens;
  avatarSrc: string;
  className?: string;
};

const ProfileSummaryCard = ({
  user,
  theme,
  avatarSrc,
  className = "",
}: ProfileSummaryCardProps) => (
  <section
    className={`rounded-2xl border p-4 shadow-sm ${theme.cardBg} ${theme.cardBorder} ${className}`}
  >
    <div className="flex items-start gap-3">
      <ProfileAvatar
        src={avatarSrc}
        alt={`${user.fullName} avatar`}
        size="sm"
        fallbackSrc={theme.defaultAvatar}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate text-base font-semibold text-foreground">
            {displayProfileValue(user.fullName)}
          </h2>
          {user.isVerified !== false && (
            <VerifiedBadge label={theme.roleLabel} theme={theme} />
          )}
        </div>
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-2 truncate">
            <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{displayProfileValue(user.email)}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>{displayProfileValue(user.phone)}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export { ProfileSummaryCard };
