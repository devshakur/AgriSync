"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { FormField } from "@/shared/ui/formfield";
import { getErrorMessage } from "@/lib/api";
import type { User } from "@/features/auth/types";
import { UPDATE_PROFILE_AVAILABLE } from "../api";
import { useUpdateProfile } from "../hooks";
import { editProfileSchema } from "../schemas";
import type { EditableProfileValues } from "../types";
import {
  MISSING_PROFILE_VALUE,
  getProfileLocation,
  type ProfileThemeTokens,
} from "../lib/profile-utils";

type EditProfileModalProps = {
  open: boolean;
  user: User;
  theme: ProfileThemeTokens;
  onClose: () => void;
};

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "unspecified" },
];

const toFormValues = (user: User): EditableProfileValues => {
  const location = getProfileLocation(user);
  return {
    fullName: user.fullName ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    dateOfBirth: user.dateOfBirth?.trim() || "",
    gender: user.gender?.trim() || "",
    location: location === MISSING_PROFILE_VALUE ? "" : location,
  };
};

const EditProfileModal = ({ open, user, theme, onClose }: EditProfileModalProps) => {
  const { mutate: updateProfileMutation, isPending } = useUpdateProfile();
  const [form, setForm] = useState<EditableProfileValues>(() => toFormValues(user));
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof EditableProfileValues, string>>
  >({});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isPending) onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isPending, onClose, open]);

  if (!open) return null;

  const fieldControlClass =
    theme.variant === "driver" ? "shadow-sm !bg-emerald-50" : "shadow-sm";

  const updateField = <Key extends keyof EditableProfileValues>(
    field: Key,
    value: EditableProfileValues[Key],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = () => {
    setFormError("");
    const result = editProfileSchema.safeParse({
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      dateOfBirth: form.dateOfBirth || undefined,
      gender: form.gender || undefined,
      location: form.location || undefined,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        fullName: errors.fullName?.[0],
        email: errors.email?.[0],
        phone: errors.phone?.[0],
        dateOfBirth: errors.dateOfBirth?.[0],
        gender: errors.gender?.[0],
        location: errors.location?.[0],
      });
      return;
    }

    setFieldErrors({});

    if (!UPDATE_PROFILE_AVAILABLE) {
      setFormError(
        "Profile updates aren’t available yet. Your form is ready and will connect when the API is enabled.",
      );
      return;
    }

    updateProfileMutation(
      {
        fullName: result.data.fullName,
        email: result.data.email,
        phone: result.data.phone,
        dateOfBirth: result.data.dateOfBirth,
        gender: result.data.gender,
        location: result.data.location,
      },
      {
        onSuccess: () => onClose(),
        onError: (error) => setFormError(getErrorMessage(error)),
      },
    );
  };

  return (
    <div
      className="fixed inset-0 z-70 flex items-end justify-center bg-black/35 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isPending) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className={`flex max-h-[min(100vh,100dvh)] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-black/8 shadow-[0_24px_70px_rgba(33,31,26,0.22)] sm:max-h-[calc(100vh-3rem)] sm:rounded-xl ${theme.modalBg}`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-black/[0.07] px-4 py-4 dark:border-white/10 sm:px-6 sm:py-5">
          <div>
            <h2
              id="edit-profile-title"
              className="font-heading text-base font-semibold text-foreground sm:text-lg"
            >
              Edit Profile
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your personal details.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close edit profile"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-black/5 disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder={MISSING_PROFILE_VALUE}
              error={fieldErrors.fullName}
              controlClassName={fieldControlClass}
              required
            />
            <FormField
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={MISSING_PROFILE_VALUE}
              autoComplete="email"
              error={fieldErrors.email}
              controlClassName={fieldControlClass}
              required
            />
            <FormField
              label="Phone Number"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder={MISSING_PROFILE_VALUE}
              inputMode="tel"
              autoComplete="tel"
              error={fieldErrors.phone}
              controlClassName={fieldControlClass}
              required
            />
            <FormField
              label="Date of Birth"
              type="date"
              name="dateOfBirth"
              icon={Calendar}
              value={form.dateOfBirth}
              onChange={(event) => updateField("dateOfBirth", event.target.value)}
              error={fieldErrors.dateOfBirth}
              controlClassName={fieldControlClass}
            />
            <FormField
              label="Gender"
              type="select"
              name="gender"
              value={form.gender}
              onChange={(event) => updateField("gender", event.target.value)}
              options={genderOptions}
              placeholder="Select gender"
              error={fieldErrors.gender}
              controlClassName={fieldControlClass}
              menuClassName={
                theme.variant === "driver"
                  ? "!bg-emerald-50 border-emerald-200"
                  : undefined
              }
            />
            <FormField
              label="Location"
              name="location"
              icon={MapPin}
              value={form.location}
              onChange={(event) => updateField("location", event.target.value)}
              placeholder={MISSING_PROFILE_VALUE}
              error={fieldErrors.location}
              controlClassName={fieldControlClass}
            />
          </div>

          {formError && (
            <p className="mt-4 text-sm text-amber-700 dark:text-amber-300" role="status">
              {formError}
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-black/[0.07] px-4 py-4 dark:border-white/10 sm:px-6">
          <Button
            label="Cancel"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
            className={`rounded-xl ${theme.outlineButtonClass}`}
          />
          <Button
            label="Save Changes"
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            loading={isPending}
            disabled={isPending}
            className={`rounded-xl ${theme.primaryButtonClass}`}
          />
        </div>
      </section>
    </div>
  );
};

export { EditProfileModal };
