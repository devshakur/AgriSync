import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  page: string;
  route: string;
}

const Header = ({ page, route }: HeaderProps) => {
  return (
        <header className="flex items-center justify-between px-8 py-2">
        <div className="flex items-center gap-3">
          <Image
            src="/assests/logo/Agrisync-new-logo.webp"
            alt="Agrisync logo"
            width={100}
            height={100}
            loading="eager"
            className="h-auto w-auto object-contain"
          />
        </div>
        <Link
          href={route}
          scroll={true}
          onClick={() => {
            if (route === "/") {
              window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            }
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1B5A3B] transition-opacity hover:opacity-80"
          aria-label="Going Back to previous page"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{page}</span>
        </Link>
      </header>
  )
}

export { Header, type HeaderProps };