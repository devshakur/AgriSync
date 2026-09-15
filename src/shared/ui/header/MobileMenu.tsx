"use client";

import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { navItems } from "@/constants/nav";

export function MobileMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <>
      {/* ── Hamburger trigger (header row) — always shows Menu icon ── */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        aria-controls="mobile-nav-overlay"
        className="rounded-full p-2 text-white transition-colors hover:bg-white/15 md:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* ── Full-screen overlay ── */}
      <div
        id="mobile-nav-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!mobileOpen}
        className={`
          fixed inset-0 z-50 flex flex-col bg-white md:hidden
          transition-all duration-200 ease-out
          ${mobileOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-[0.98] pointer-events-none"
          }
        `}
      >
        {/* ── Top bar: logo left, close right ── */}
        <div className="flex shrink-0 items-center justify-end py-2">
          {/* <a
            href="#top"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5"
          >
            <Image
              src="/assests/logo/Agricsync-short-logo.png"
              alt="AgriSync logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <span className="font-heading text-[15px] font-bold leading-tight tracking-tight text-primary">
              AgriSync
            </span>
          </a> */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-3">
        <Image
              src="/assests/logo/Agricsync-short-logo.png"
              alt="AgriSync logo"
              width={32}
              height={30}
              className="h-10 w-10 object-contain"
            />
        </div>

        {/* ── Scrollable body: nav + spacer + CTAs ── */}
        <div className="flex flex-1 flex-col overflow-y-auto px-4 pb-6 pt-3">

          {/* Navigation list */}
          <nav aria-label="Main navigation">
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const isActive = currentPath === item.href;
                const hasChildren = Boolean(item.items?.length);

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        flex items-center justify-between rounded-xl px-4 py-4 font-sans text-base font-medium
                        transition-all duration-150 active:scale-[0.98]
                        ${isActive
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-foreground hover:bg-muted/60 hover:text-primary"
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      {hasChildren && (
                        <ChevronRight
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Flex spacer — pushes CTAs to the bottom */}
          <div className="flex-1" />

          {/* Divider */}
          <div className="mb-4 h-px w-full bg-gray-100" />

          {/* CTA buttons */}
          <div className="flex flex-col gap-2.5">
            <Button
              label="Log in"
              onClick={() => setMobileOpen(false)}
              href="/login"
              variant="outline"
              className="w-full justify-center py-3 text-base font-medium active:scale-[0.98]"
            />
            <Button
              label="Get Started"
              onClick={() => setMobileOpen(false)}
              href="/role"
              variant="primary"
              className="w-full justify-center py-3 text-base font-medium shadow-sm active:scale-[0.98]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
