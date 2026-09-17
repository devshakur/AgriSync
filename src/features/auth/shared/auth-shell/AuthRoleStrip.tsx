import { AUTH_AUDIENCE } from "./roles";

const AuthRoleStrip = () => {
  return (
    <div
      className="mt-auto lg:hidden"
      style={{
        background:
          "linear-gradient(180deg, #EAF4EE 0%, #1B5A3B 55%, #0E3E2F 100%)",
      }}
    >
      <div className="relative overflow-hidden px-4 pb-7 pt-16 sm:px-6">
        <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-white to-transparent" />
        <div className="relative flex w-full min-w-0 items-start justify-between gap-2">
          <div className="absolute left-[18%] right-[18%] top-7 border-t border-dashed border-white/35" />
          {AUTH_AUDIENCE.map(({ title, caption, Icon }) => (
            <div key={title} className="relative z-10 flex min-w-0 flex-1 flex-col items-center px-0.5 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-sm sm:h-14 sm:w-14">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <p className="mt-2 font-heading text-xs font-semibold text-white sm:text-sm">{title}</p>
              <p className="mt-0.5 text-[10px] leading-tight text-white/70 sm:text-[11px]">{caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { AuthRoleStrip };
