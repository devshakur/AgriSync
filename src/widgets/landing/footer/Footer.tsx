import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight, Mail, MapPin } from "lucide-react";
import type { SVGProps } from "react";

// ─── Social brand icons (inline SVG — lucide-react dropped brand icons) ───────
function IconFacebook(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconTwitter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
function IconInstagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function IconLinkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

// ─── Link data ────────────────────────────────────────────────────────────────
const quickLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "For Farmers",  href: "#farmers" },
  { label: "For Drivers",  href: "#drivers" },
  { label: "For Buyers",   href: "#buyers" },
];

const supportLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy",   href: "/privacy" },
  { label: "Help Center",      href: "#contact" },
];

const serviceLinks = [
  { label: "Farmer Portal",      href: "/role" },
  { label: "Driver App",         href: "/role" },
  { label: "Buyer Marketplace",  href: "/role" },
];

const aboutLinks = [
  { label: "About Us",    href: "#problem" },
  { label: "Careers",     href: "#how-it-works" },
  { label: "Contact Us",  href: "mailto:devshakur23@gmail.com" },
];

// ─── Social icons ─────────────────────────────────────────────────────────────
type SocialIconComponent = (props: SVGProps<SVGSVGElement>) => React.ReactNode;

const socials: { icon: SocialIconComponent; href: string; label: string }[] = [
  { icon: IconFacebook,  href: "#", label: "Facebook"  },
  { icon: IconTwitter,   href: "#", label: "Twitter"   },
  { icon: IconInstagram, href: "#", label: "Instagram" },
  { icon: IconLinkedin,  href: "#", label: "LinkedIn"  },
];

// ─── Footer column ────────────────────────────────────────────────────────────
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
      <ul className="mt-5 space-y-3.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-[#E3EBE6] transition-colors duration-200 hover:text-white"
            >
              {link.label}
              <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="w-full bg-[#173F2D]">

      {/* ── Top CTA card ──
          Slightly lighter green pill sitting above the column grid.
          Replaces the newsletter strip from the reference screenshot.
      */}
      <div className="px-6 pt-8 sm:px-10 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#1E5437] px-7 py-7 sm:flex-row sm:items-center sm:px-10 sm:py-8">
          {/* Heading */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8FD49D]">
              Ready to begin?
            </p>
            <h2 className="mt-1.5 font-heading text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              Join the AgriSync Network
            </h2>
          </div>

          {/* CTA button */}
          <a
            href="/role"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#173F2D] shadow-sm transition-all duration-150 hover:bg-white/90 active:scale-[0.97]"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            

            <p className="mt-5 max-w-xs text-sm leading-6 text-[#C7D8CD]">
              Connecting farmers, drivers, and buyers across Nigeria — one
              delivery at a time.
            </p>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-[#AFC7B8]">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>Serving communities across Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#AFC7B8]">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <a
                  href="mailto:devshakur23@gmail.com"
                  className="transition-colors hover:text-white"
                >
                  devshakur23@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Support"     links={supportLinks} />
          <FooterColumn title="Services"    links={serviceLinks} />
          <FooterColumn title="About"       links={aboutLinks} />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="flex flex-col gap-4 px-6 py-5 sm:px-10 sm:flex-row sm:items-center sm:justify-between lg:px-16">
          <p className="text-xs text-[#AFC7B8]">
            © {new Date().getFullYear()} AgriSync. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-2.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors duration-200 hover:border-white/50 hover:text-white"
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}

          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
