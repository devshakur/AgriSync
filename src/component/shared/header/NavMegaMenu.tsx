"use client";

import { useState } from "react";

const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="m13 5 7 7-7 7" />
  </svg>
);

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
                <ChevronDownIcon
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
          className={`absolute left-1/2 top-full z-50 w-190 -translate-x-1/2 pt-4 transition-all duration-300 ${
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
          <div className="overflow-hidden rounded-[30px] border border-emerald-900/10 bg-white/90 p-4 shadow-[0_30px_80px_-24px_rgba(15,23,42,0.28)] backdrop-blur-xl">
            <div className="grid gap-5 lg:grid-cols-[1.02fr_2.2fr]">
              <div className="rounded-3xl bg-linear-to-br from-[#f7f2e8] via-white to-[#edf8f1] p-5">
                <div className="mb-4 inline-flex items-center rounded-full border border-emerald-900/10 bg-white/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Smart flow
                </div>

                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {activeItem.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {activeItem.summary ??
                    "Built to keep every handoff visible, coordinated, and easy to act on."}
                </p>

                <ul className="mt-5 space-y-3 text-sm text-foreground/80">
                  {[
                    "Clear visibility from field to final delivery",
                    "Fewer check-ins and fewer missed handoffs",
                    "Fast decisions with the right context at the right time",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={activeItem.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-emerald-700"
                >
                  Explore {activeItem.label}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              </div>

              <div key={activeItem.label} className="mega-panel-content grid gap-3 sm:grid-cols-2">
                {activePanel.map((subItem, index) => (
                  <a
                    key={subItem.label}
                    href={subItem.href ?? "#"}
                    className="nav-menu-card group rounded-[22px] border border-black/5 bg-[#f9f7f2] p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/20 hover:bg-white"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary shadow-sm">
                        {subItem.badge ?? "Flow"}
                      </span>
                      <ArrowRightIcon className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
                    </div>

                    <p className="text-base font-semibold text-foreground">{subItem.label}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {subItem.description}
                    </p>

                    {subItem.detail && (
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-emerald-700/75">
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
