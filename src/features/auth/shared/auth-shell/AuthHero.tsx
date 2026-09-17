import { Leaf } from "lucide-react";
import { AUTH_AUDIENCE } from "./roles";
import { AuthBrand } from "./AuthBrand";

const AuthHero = () => {
  return (
    <aside className="relative hidden h-dvh w-[46%] shrink-0 overflow-hidden lg:flex lg:flex-col">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 18% 88%, rgba(250,247,239,0.14) 0%, transparent 52%), radial-gradient(ellipse at 88% 8%, rgba(255,255,255,0.12) 0%, transparent 42%), linear-gradient(165deg, #0E3E2F 0%, #1B5A3B 48%, #073D2C 100%)",
        }}
      />

      <Leaf
        aria-hidden
        className="pointer-events-none absolute -right-16 top-24 h-72 w-72 text-white/6"
        strokeWidth={0.6}
      />
      <Leaf
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rotate-12 text-white/5"
        strokeWidth={0.6}
      />

      <div className="relative z-10 flex h-full flex-col justify-between px-10 py-10 xl:px-14 xl:py-12">
        <AuthBrand variant="light" />

        <div className="max-w-lg space-y-8">
          <div className="space-y-4">
            <h2 className="font-heading text-4xl font-bold leading-[1.12] tracking-tight text-white xl:text-[2.75rem]">
              Connecting Farmers, Drivers and Buyers
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/75">
              Smarter logistics. Better markets.
              <br />
              A stronger agricultural economy.
            </p>
          </div>

          <div className="relative flex items-start justify-between gap-4 pt-2">
            <div className="absolute left-[16%] right-[16%] top-8 border-t border-dashed border-white/30" />
            {AUTH_AUDIENCE.map(({ title, caption, Icon }) => (
              <div key={title} className="relative z-10 flex w-28 flex-col items-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <p className="mt-3 font-heading text-sm font-semibold text-white">{title}</p>
                <p className="mt-0.5 text-xs text-white/65">{caption}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="font-heading text-lg italic tracking-tight text-white/85">
          Fresh Produce · Greater Possibilities
        </p>
      </div>
    </aside>
  );
};

export { AuthHero };
