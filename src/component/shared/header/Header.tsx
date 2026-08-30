"use client";

import { useState } from "react";
import { Button } from "@/component/ui/button";
import { NavMegaMenu } from "./NavMegaMenu";
import { navItems } from "@/constants/nav";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Leaf, X, Menu } from "lucide-react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentPath = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-heading text-xl font-bold text-primary">
          <Leaf className="h-6 w-6" />
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
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-5 w-5" />}
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
