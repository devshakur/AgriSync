"use client";

import { useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import { ErrorState } from "@/shared/ui/empty-state";
import { useAvatarPreview, useProfile } from "../hooks";
import {
  getAvatarSrc,
  profileThemes,
  type ProfileVariant,
} from "../lib/profile-utils";
import { EditProfileModal } from "./EditProfileModal";
import { ProfileInformationCard } from "./ProfileInformationCard";
import { ProfilePhotoCard } from "./ProfilePhotoCard";
import { ProfileSkeleton } from "./ProfileSkeleton";
import { ProfileSummaryCard } from "./ProfileSummaryCard";
import { SecuritySettingsCard } from "./SecuritySettingsCard";
import { SettingsNav, type SettingsNavId } from "./SettingsNav";

type ProfilePageProps = {
  variant: ProfileVariant;
};

const ProfilePage = ({ variant }: ProfilePageProps) => {
  const theme = profileThemes[variant];
  const { data: user, isPending, isError, error, refetch, isFetching } = useProfile();
  const avatar = useAvatarPreview();
  const [editOpen, setEditOpen] = useState(false);
  const [activeSettings, setActiveSettings] = useState<SettingsNavId>("profile");

  const avatarSrc = useMemo(
    () => getAvatarSrc(user, theme, avatar.previewUrl),
    [user, theme, avatar.previewUrl],
  );

  if (isPending && !user) {
    return <ProfileSkeleton theme={theme} />;
  }

  if (isError || !user) {
    return (
      <ErrorState
        icon={AlertCircle}
        title="Unable to load profile"
        description={
          error instanceof Error
            ? error.message
            : "We couldn’t load your profile. Please try again."
        }
        actionLabel={isFetching ? "Retrying..." : "Retry"}
        onAction={() => {
          void refetch();
        }}
      />
    );
  }

  const showProfileSection = activeSettings === "profile";

  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Page header — matches Settings title on mobile reference */}
      <header className="mb-5 sm:mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-[1.75rem]">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, profile and preferences.
        </p>
      </header>

      {/* Mobile layout */}
      <div className="space-y-4 lg:hidden">
        <ProfileSummaryCard user={user} theme={theme} avatarSrc={avatarSrc} />

        <SettingsNav
          theme={theme}
          activeId={activeSettings}
          onSelect={setActiveSettings}
        />

        {showProfileSection && (
          <>
            <ProfilePhotoCard
              theme={theme}
              avatarSrc={avatarSrc}
              userName={user.fullName}
              fileInputRef={avatar.fileInputRef}
              onChangePhoto={avatar.openFilePicker}
              onFileChange={avatar.handleFileChange}
              error={avatar.error}
            />

            <ProfileInformationCard
              user={user}
              theme={theme}
              avatarSrc={avatarSrc}
              onEdit={() => setEditOpen(true)}
            />

            <SecuritySettingsCard theme={theme} />
          </>
        )}

        {activeSettings === "security" && <SecuritySettingsCard theme={theme} />}
        {activeSettings !== "profile" && activeSettings !== "security" && (
          <section
            className={`rounded-2xl border p-5 text-sm text-muted-foreground shadow-sm ${theme.cardBg} ${theme.cardBorder}`}
          >
            This section will be available in a future update.
          </section>
        )}
      </div>

      {/* Desktop layout — two columns matching reference */}
      <div className="hidden gap-6 lg:grid lg:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.9fr)] lg:items-start">
        <div className="space-y-6">
          <ProfileInformationCard
            user={user}
            theme={theme}
            avatarSrc={avatarSrc}
            onEdit={() => setEditOpen(true)}
          />
        </div>

        <div className="space-y-5">
          <ProfilePhotoCard
            theme={theme}
            avatarSrc={avatarSrc}
            userName={user.fullName}
            fileInputRef={avatar.fileInputRef}
            onChangePhoto={avatar.openFilePicker}
            onFileChange={avatar.handleFileChange}
            error={avatar.error}
          />
          <SecuritySettingsCard theme={theme} />
        </div>
      </div>

      {editOpen ? (
        <EditProfileModal
          key={user.id}
          open
          user={user}
          theme={theme}
          onClose={() => setEditOpen(false)}
        />
      ) : null}
    </div>
  );
};

export { ProfilePage };
