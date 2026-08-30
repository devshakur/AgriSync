"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";

export interface NavSubItem {
  label: string;
  description: string;
  detail?: string;
  href?: string;
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
  summary?: string;
  items?: NavSubItem[];
}

interface NavMegaMenuProps {
  items: NavItem[];
}

const NavMegaMenu = ({ items }: NavMegaMenuProps) => {
  const [activeItem, setActiveItem] = useState<NavItem | null>(
    items.find((item) => item.items?.length) ?? null,
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const activePanel = activeItem?.items ?? [];

  return (
    <div
      className="relative hidden md:block"
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => {
        setMenuOpen(false);
        setActiveItem(null);
      }}
    >
      <nav className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
        {items.map((item) => (
          <div key={item.label} className="relative">
            <button
              type="button"
              aria-expanded={menuOpen && activeItem?.label === item.label}
              onMouseEnter={() => {
                setMenuOpen(true);
                setActiveItem(item);
              }}
              onFocus={() => {
                setMenuOpen(true);
                setActiveItem(item);
              }}
              className="flex items-center gap-1 rounded-full px-2 py-2 transition-colors duration-200 hover:text-primary focus-visible:outline-none"
            >
              <span>{item.label}</span>
              {item.items && (
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    menuOpen && activeItem?.label === item.label ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>
          </div>
        ))}
      </nav>

      {activeItem?.items && (
        <div
          className={`absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-3 transition-all duration-300 ${
            menuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }`}
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => {
            setMenuOpen(false);
            setActiveItem(null);
          }}
        >
          <div className="overflow-hidden rounded-[26px] border border-emerald-900/10 bg-white/90 p-3 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl">
            <div className="grid gap-3 lg:grid-cols-[0.9fr_2.1fr]">
              <div className="rounded-2xl bg-linear-to-br from-[#f7f2e8] via-white to-[#edf8f1] p-4">
                <div className="mb-3 inline-flex items-center rounded-full border border-emerald-900/10 bg-white/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                  Smart flow
                </div>

                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                  {activeItem.label}
                </h3>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {activeItem.summary ??
                    "Built to keep every handoff visible, coordinated, and easy to act on."}
                </p>

                <ul className="mt-3 space-y-2 text-xs text-foreground/80">
                  {[
                    "Clear visibility from field to final delivery",
                    "Fewer check-ins and fewer missed handoffs",
                    "Fast decisions with the right context at the right time",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={activeItem.href}
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary transition-colors hover:text-emerald-700"
                >
                  Explore {activeItem.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              <div key={activeItem.label} className="mega-panel-content grid gap-2.5 sm:grid-cols-2">
                {activePanel.map((subItem, index) => (
                  <a
                    key={subItem.label}
                    href={subItem.href ?? "#"}
                    className="nav-menu-card group rounded-[18px] border border-black/5 bg-[#f9f7f2] p-3 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:bg-white"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="mb-2.5 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary shadow-sm">
                        {subItem.badge ?? "Flow"}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-primary transition-transform duration-200 group-hover:translate-x-1" />
                    </div>

                    <p className="text-sm font-semibold text-foreground">{subItem.label}</p>
                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                      {subItem.description}
                    </p>

                    {subItem.detail && (
                      <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.12em] text-emerald-700/75">
                        {subItem.detail}
                      </p>
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { NavMegaMenu };
