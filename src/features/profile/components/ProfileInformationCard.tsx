"use client";

import {
  Calendar,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Ticket,
  UserRound,
} from "lucide-react";
import type { User } from "@/features/auth/types";
import { Button } from "@/shared/ui/button";
import { ProfileAvatar, VerifiedBadge } from "./ProfileAvatar";
import { ProfileField } from "./ProfileField";
import {
  displayProfileValue,
  formatMemberSince,
  getProfileLocation,
  type ProfileThemeTokens,
} from "../lib/profile-utils";

type ProfileInformationCardProps = {
  user: User;
  theme: ProfileThemeTokens;
  avatarSrc: string;
  onEdit: () => void;
};

const ProfileInformationCard = ({
  user,
  theme,
  avatarSrc,
  onEdit,
}: ProfileInformationCardProps) => {
  const isVerified = user.isVerified !== false;

  return (
    <section className={`rounded-2xl border p-5 shadow-sm sm:p-6 ${theme.cardBg} ${theme.cardBorder}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">
            Profile Information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Update your personal information and {theme.variant} details.
          </p>
        </div>
        <Button
          label="Edit Profile"
          variant="outline"
          size="sm"
          onClick={onEdit}
          className={`rounded-xl ${theme.outlineButtonClass}`}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <ProfileAvatar
          src={avatarSrc}
          alt={`${user.fullName} avatar`}
          size="md"
          fallbackSrc={theme.defaultAvatar}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-xl font-semibold text-foreground">
              {displayProfileValue(user.fullName)}
            </h3>
            {isVerified && <VerifiedBadge label={theme.roleLabel} theme={theme} />}
          </div>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
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

      <div className={`mt-6 grid gap-5 border-t pt-6 sm:grid-cols-2 ${theme.divider}`}>
        <ProfileField label="Full Name" value={user.fullName} icon={UserRound} theme={theme} />
        <ProfileField
          label={theme.variant === "farmer" ? "Farm Location" : "Location"}
          value={getProfileLocation(user)}
          icon={MapPin}
          theme={theme}
        />
        <ProfileField label="Email Address" value={user.email} icon={Mail} theme={theme} />
        <ProfileField
          label="Member Since"
          value={formatMemberSince(user.createdAt)}
          icon={Calendar}
          theme={theme}
        />
        <ProfileField label="Phone Number" value={user.phone} icon={Phone} theme={theme} />
        <ProfileField
          label="Referral Code"
          value={user.referralCode}
          icon={Ticket}
          theme={theme}
        />
      </div>

      {isVerified && (
        <div
          className={`mt-6 flex flex-col gap-3 rounded-xl px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${theme.verifiedBanner}`}
        >
          <div className="flex items-start gap-3">
            <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${theme.iconCircle}`}>
              <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Account Verified</p>
              <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                Your account has been verified. You can buy, sell and transact with confidence.
              </p>
            </div>
          </div>
          <span
            className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${theme.badge}`}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Verified
          </span>
        </div>
      )}
    </section>
  );
};

export { ProfileInformationCard };
