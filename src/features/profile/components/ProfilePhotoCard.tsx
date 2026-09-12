"use client";

import { Camera } from "lucide-react";
import type { ChangeEvent, RefObject } from "react";
import { Button } from "@/shared/ui/button";
import { ProfileAvatar } from "./ProfileAvatar";
import type { ProfileThemeTokens } from "../lib/profile-utils";
import { PROFILE_PHOTO_ACCEPT } from "../lib/profile-utils";

type ProfilePhotoCardProps = {
  theme: ProfileThemeTokens;
  avatarSrc: string;
  userName: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onChangePhoto: () => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  className?: string;
};

const ProfilePhotoCard = ({
  theme,
  avatarSrc,
  userName,
  fileInputRef,
  onChangePhoto,
  onFileChange,
  error,
  className = "",
}: ProfilePhotoCardProps) => (
  <section
    className={`rounded-2xl border p-5 shadow-sm ${theme.cardBg} ${theme.cardBorder} ${className}`}
  >
    <h2 className="text-base font-semibold text-foreground">Profile Photo</h2>
    <p className="mt-1 text-sm text-muted-foreground">Upload a clear photo of yourself.</p>

    <div className="mt-6 flex flex-col items-center">
      <div className="relative">
        <ProfileAvatar
          src={avatarSrc}
          alt={`${userName} profile photo`}
          size="lg"
          fallbackSrc={theme.defaultAvatar}
        />
        <button
          type="button"
          onClick={onChangePhoto}
          aria-label="Change profile photo"
          className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background shadow-md transition hover:opacity-90"
        >
          <Camera className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={PROFILE_PHOTO_ACCEPT}
        className="sr-only"
        onChange={onFileChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      <div className="mt-5 w-full">
        <Button
          label="Change Photo"
          variant="outline"
          size="sm"
          onClick={onChangePhoto}
          className={`w-full rounded-xl ${theme.outlineButtonClass}`}
        />
        <p className="mt-2 text-center text-xs text-muted-foreground">
          JPG, PNG or WEBP (Max 5MB)
        </p>
        {error && (
          <p className="mt-2 text-center text-xs text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  </section>
);

export { ProfilePhotoCard };
