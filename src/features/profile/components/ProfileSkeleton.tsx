"use client";

import type { ProfileThemeTokens } from "../lib/profile-utils";

type ProfileSkeletonProps = {
  theme: ProfileThemeTokens;
};

const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-black/[0.06] dark:bg-white/10 ${className}`} />
);

const ProfileSkeleton = ({ theme }: ProfileSkeletonProps) => (
  <div className="space-y-6" aria-busy="true" aria-label="Loading profile">
    <div className="space-y-2">
      <SkeletonBlock className="h-8 w-40" />
      <SkeletonBlock className="h-4 w-64 max-w-full" />
    </div>

    <div className="lg:hidden space-y-4">
      <div className={`rounded-2xl border p-4 ${theme.cardBg} ${theme.cardBorder}`}>
        <div className="flex gap-3">
          <SkeletonBlock className="h-14 w-14 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-4 w-40" />
            <SkeletonBlock className="h-3 w-28" />
            <SkeletonBlock className="h-3 w-36" />
          </div>
        </div>
      </div>
      <SkeletonBlock className="h-64 w-full rounded-2xl" />
    </div>

    <div className="hidden gap-6 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(280px,1fr)]">
      <div className={`rounded-2xl border p-6 ${theme.cardBg} ${theme.cardBorder}`}>
        <SkeletonBlock className="h-5 w-48" />
        <SkeletonBlock className="mt-2 h-4 w-72 max-w-full" />
        <div className="mt-6 flex gap-4">
          <SkeletonBlock className="h-20 w-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonBlock className="h-5 w-48" />
            <SkeletonBlock className="h-3 w-40" />
            <SkeletonBlock className="h-3 w-36" />
          </div>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex gap-3">
              <SkeletonBlock className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-3 w-20" />
                <SkeletonBlock className="h-4 w-32" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SkeletonBlock className="h-56 w-full rounded-2xl" />
        <SkeletonBlock className="h-48 w-full rounded-2xl" />
      </div>
    </div>
  </div>
);

export { ProfileSkeleton };
