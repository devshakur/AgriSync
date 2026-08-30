"use client";

import { useState } from "react";
import { Button } from "@/component/ui/button";
import { NavMegaMenu} from "./NavMegaMenu";
import { navItems } from "@/constants/nav";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20c8-1 13-6 14-14-8 1-13 6-14 14Z" />
    <path d="M6.5 17.5c3-3.2 6-6.4 9-11" />
  </svg>
);



const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="5" x2="19" y2="19" />
    <line x1="19" y1="5" x2="5" y2="19" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          <LeafIcon />
          Jambito
        </a>

        <NavMegaMenu items={navItems} />

        <div className="hidden items-center gap-3 md:flex">
          <Button label="Log in" onClick={() => {}} variant="outline" size="sm" />
          <Button label="Get Started" onClick={() => {}} variant="primary" size="sm" />
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      


<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-x-0 top-(--header-height,65px) z-50 border-b border-border/40 bg-background/95 backdrop-blur-md px-6 pb-6 pt-2 shadow-xl md:hidden"
    >
      {/* Links Container */}
      <nav className="flex flex-col space-y-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href; // Optional: Pass active state check
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all active:scale-[0.98] ${
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }`}
            >
              <span>{item.label}</span>
              {/* Subtle visual indicator for list items */}
              <span className="text-muted-foreground/40 text-xs">→</span>
            </a>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-border/60" />

      {/* Call to Action Buttons */}
      <div className="flex flex-col gap-2.5">
        <Button
          label="Log in"
          onClick={() => setMobileOpen(false)}
          variant="outline"
          className="w-full justify-center py-3 text-base font-medium active:scale-[0.98]"
        />
        <Button
          label="Get Started"
          onClick={() => setMobileOpen(false)}
          variant="primary"
          className="w-full justify-center py-3 text-base font-medium shadow-sm active:scale-[0.98]"
        />
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </header>
  );
};

export { Header };
