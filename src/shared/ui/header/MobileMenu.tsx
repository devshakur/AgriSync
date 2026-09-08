
"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/ui/button";
import { navItems } from "@/constants/nav";

export function MobileMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <>
      <button
        type="button"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted md:hidden"
        onClick={() => setMobileOpen((prev) => !prev)}
      >
        {mobileOpen ? (
          <X className="h-6 w-6 text-accent" />
        ) : (
          <Menu className="h-7 w-7 text-accent" />
        )}
      </button>

      <div
        className={`fixed inset-x-0 top-(--header-height,65px) z-50 border-b border-border/40 bg-background/95 px-6 pb-6 pt-2 shadow-xl backdrop-blur-md md:hidden
          transform transition-all duration-200 ease-out
          ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all active:scale-[0.98] ${
                  isActive
                    ? "bg-primary/10 font-semibold text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-muted-foreground"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-xs text-primary">→</span>
              </a>
            );
          })}
        </nav>

        <div className="my-4 h-px w-full bg-border/60" />

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
    </>
  );
}

