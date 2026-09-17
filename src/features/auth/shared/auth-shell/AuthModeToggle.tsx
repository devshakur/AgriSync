import Link from "next/link";
import type { ReactNode } from "react";

type AuthMode = "login" | "signup";

type AuthModeToggleProps = {
  active: AuthMode;
};

const tabClass = (active: boolean) =>
  `block min-w-0 flex-1 rounded-full px-2 py-2.5 text-center text-[13px] font-semibold leading-tight transition sm:px-4 sm:text-sm ${
    active
      ? "bg-primary text-white shadow-sm"
      : "text-muted-foreground hover:text-foreground"
  }`;

const Tab = ({
  active,
  href,
  children,
}: {
  active: boolean;
  href?: string;
  children: ReactNode;
}) => {
  if (!href || active) {
    return <span className={tabClass(active)}>{children}</span>;
  }

  return (
    <Link href={href} className={tabClass(active)}>
      {children}
    </Link>
  );
};

const AuthModeToggle = ({ active }: AuthModeToggleProps) => {
  return (
    <div className="flex min-w-0 rounded-full bg-[#F3EFE6] p-1">
      <Tab active={active === "login"} href="/login">
        Login
      </Tab>
      <Tab active={active === "signup"} href="/role">
        <span className="sm:hidden">Sign up</span>
        <span className="hidden sm:inline">Create Account</span>
      </Tab>
    </div>
  );
};

export { AuthModeToggle, type AuthMode };
