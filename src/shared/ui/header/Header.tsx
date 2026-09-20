
import { ArrowRight } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { navItems } from "@/constants/nav";

import { NavMegaMenu } from "./nav-mega-menu";
import { MobileMenu } from "./MobileMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 ">
      <div className="flex items-center justify-between gap-4 px-6 py-3 lg:px-10">
        {/* Logo + brand name + tagline */}
        <a
          href="#top"
          className="flex shrink-0 items-center gap-3 group"
        >
          {/* <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 p-1.5 transition-colors group-hover:bg-primary/15">
            <Image
              src="/assests/logo/Agrisync-new-logo.webp"
              alt="AgriSync logo"
              width={32}
              height={32}
              className="h-full w-full object-contain"
              priority
            />
          </div> */}
          <div className="hidden flex-col sm:flex">
            <span className="font-heading text-[15px] font-bold leading-tight tracking-tight text-white">
              AgriSync
            </span>
            <span className="font-sans text-[10px] font-medium tracking-wide text-white/70">
              Grow Better. Live Better.
            </span>
          </div>
        </a>

        {/* Navigation */}
        <div className="hidden flex-1 justify-center md:flex">
          <NavMegaMenu items={navItems} />
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden shrink-0 items-center gap-2.5 md:flex">
          <Button label="Login" href="/login" variant="ghost" size="sm" className="shrink-0 text-white/80 hover:text-white hover:bg-transparent" />
          <a
            href="/role"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:brightness-110 hover:shadow-md active:scale-[0.97]"
          >
            Get Started
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <MobileMenu />
      </div>
    </header>
  );
};

export { Header };
