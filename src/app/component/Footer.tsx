import Link from "next/link";
import { Leaf, ArrowUpRight, Mail, MapPin, FlowerIcon } from "lucide-react";

const productLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For Farmers", href: "#farmers" },
  { label: "For Drivers", href: "#drivers" },
  { label: "For Buyers", href: "#buyers" },
];

const companyLinks = [
  { label: "About", href: "#problem" },
  { label: "Careers", href: "#how-it-works" },
  { label: "Contact", href: "mailto:devshakur23@gmail.com" },
];

const legalLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const Footer = () =>  {
  return (
    <footer className="w-full bg-[#F9F7F0] pt-4">
      <div className="w-full overflow-hidden bg-[#173F2D] text-white">
        {/* Main footer */}
        <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
            {/* Brand */}
            <div className="max-w-md">
              <Link
                href="/"
                className="group inline-flex items-center gap-3"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E5F2E8] text-[#1B5A3B] transition-transform duration-300 group-hover:rotate-[-8deg]"
                >
                  <Leaf className="h-5 w-5" strokeWidth={2} />
                </span>

                <span className="text-2xl font-semibold tracking-[-0.03em]">
                  AgriSync
                </span>
              </Link>

              <p className="mt-6 max-w-sm text-base leading-7 text-[#C7D8CD] sm:text-lg">
                Connecting farmers, drivers, and buyers across Nigeria — one
                delivery at a time.
              </p>

              {/* Contact details */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-[#AFC7B8]">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>Serving communities across Nigeria</span>
                </div>

                <div className="flex items-center gap-3 text-sm text-[#AFC7B8]">
                  <Mail className="h-4 w-4 shrink-0" />
                  <a
                    href="mailto:devshakur23@gmail.com"
                    className="transition-colors hover:text-white"
                  >
                    devshakur23@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Product */}
            <FooterColumn title="Product" links={productLinks} />

            {/* Company */}
            <FooterColumn title="Company" links={companyLinks} />

            {/* Legal */}
            <FooterColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="flex flex-col gap-5 px-6 py-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-16">
            <p className="text-sm text-[#AFC7B8]">
              © {new Date().getFullYear()} AgriSync. All rights reserved.
            </p>

            <div className="flex items-center gap-2 font-mono text-xs text-[#AFC7B8] sm:text-sm">
              <span>Built for Nigerian agriculture</span>

              <span className="text-[#8FD49D]"><FlowerIcon /> </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#8FD49D]">
        {title}
      </h3>

      <ul className="mt-6 space-y-4">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1.5 text-base text-[#E3EBE6] transition-colors duration-200 hover:text-white"
            >
              {link.label}

              <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Footer };