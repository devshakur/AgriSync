import type { AuthRole, User } from "@/features/auth/types";

/** Display placeholder for fields the backend does not yet return */
export const MISSING_PROFILE_VALUE = "---";

export const DEFAULT_FARMER_AVATAR = "/assests/images/farmer.jpg";
export const DEFAULT_DRIVER_AVATAR = "/assests/images/delivery-bike.jpg";

export const PROFILE_PHOTO_ACCEPT = "image/jpeg,image/png,image/webp";
export const PROFILE_PHOTO_MAX_BYTES = 5 * 1024 * 1024;

export type ProfileVariant = "farmer" | "driver";

export type ProfileThemeTokens = {
  variant: ProfileVariant;
  roleLabel: string;
  defaultAvatar: string;
  softBg: string;
  softText: string;
  iconCircle: string;
  badge: string;
  verifiedBanner: string;
  activeNav: string;
  outlineButtonClass: string;
  primaryButtonClass: string;
  cardBg: string;
  cardBorder: string;
  divider: string;
  modalBg: string;
};

export const profileThemes: Record<ProfileVariant, ProfileThemeTokens> = {
  farmer: {
    variant: "farmer",
    roleLabel: "Verified Farmer",
    defaultAvatar: DEFAULT_FARMER_AVATAR,
    softBg: "bg-[#E3F2E7]",
    softText: "text-primary",
    iconCircle: "bg-[#E3F2E7] text-primary",
    badge: "bg-primary text-white",
    verifiedBanner: "bg-[#E3F2E7]",
    activeNav: "bg-[#E3F2E7] text-primary",
    outlineButtonClass:
      "border-primary text-primary hover:bg-primary/10 focus-visible:outline-primary",
    primaryButtonClass: "",
    cardBg: "bg-white",
    cardBorder: "border-black/[0.06]",
    divider: "border-black/[0.06]",
    modalBg: "bg-white",
  },
  driver: {
    variant: "driver",
    roleLabel: "Verified Driver",
    defaultAvatar: DEFAULT_DRIVER_AVATAR,
    softBg: "bg-emerald-100",
    softText: "text-emerald-800",
    iconCircle: "bg-emerald-100 text-emerald-700",
    badge: "bg-emerald-700 text-white",
    verifiedBanner: "bg-emerald-100",
    activeNav: "bg-emerald-100 text-emerald-800",
    outlineButtonClass:
      "!border-emerald-700 !text-emerald-700 hover:!bg-emerald-50 focus-visible:!outline-emerald-700",
    primaryButtonClass: "!bg-emerald-700 hover:!brightness-110",
    cardBg: "bg-emerald-50",
    cardBorder: "border-emerald-200/80",
    divider: "border-emerald-200/80",
    modalBg: "bg-emerald-50",
  },
};

export const displayProfileValue = (value: string | null | undefined): string => {
  if (value == null) return MISSING_PROFILE_VALUE;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : MISSING_PROFILE_VALUE;
};

export const formatMemberSince = (createdAt: string | null | undefined): string => {
  if (!createdAt) return MISSING_PROFILE_VALUE;
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return MISSING_PROFILE_VALUE;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const formatRoleLabel = (role: AuthRole | string | undefined): string => {
  if (!role) return MISSING_PROFILE_VALUE;
  return role.charAt(0).toUpperCase() + role.slice(1);
};

export const getProfileLocation = (user: User | null | undefined): string => {
  if (!user) return MISSING_PROFILE_VALUE;
  const parts = [user.location, user.city].filter(
    (part): part is string => Boolean(part && part.trim()),
  );
  if (parts.length === 0) return MISSING_PROFILE_VALUE;
  return parts.join(", ");
};

export const getAvatarSrc = (
  user: User | null | undefined,
  theme: ProfileThemeTokens,
  previewUrl?: string | null,
): string => {
  if (previewUrl) return previewUrl;
  if (user?.avatarUrl) return user.avatarUrl;
  return theme.defaultAvatar;
};
