import Image from "next/image";

import { Button } from "@/shared/ui/button";
import { navItems } from "@/constants/nav";

import { NavMegaMenu } from "./nav-mega-menu";
import { MobileMenu } from "./MobileMenu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/90 backdrop-blur-md">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <a href="#top" className="flex shrink-0 items-center gap-2 font-heading text-xl font-bold text-primary">
          <Image
            src="/assests/logo/Agrisync-new-logo.webp"
            alt="Agrisync logo"
            width={120}
            height={40}
            className="h-auto w-auto max-h-10 object-contain"
            priority
          />
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <NavMegaMenu items={navItems} />
        </div>

        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Button label="Log in" href="/login" variant="outline" size="sm" className="shrink-0" />
          <Button label="Get Started" variant="primary" size="sm" className="shrink-0" href="/role" />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
};

export { Header };
