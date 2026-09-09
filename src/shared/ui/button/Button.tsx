import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-transform duration-150 active:scale-[0.97] " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary " +
  "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:brightness-110 shadow-sm hover:shadow-md",
  secondary:
    "bg-secondary text-secondary-foreground hover:brightness-110 shadow-sm hover:shadow-md",
  accent:
    "bg-accent text-accent-foreground hover:brightness-110 shadow-sm hover:shadow-md",
  outline:
    "bg-transparent border border-primary text-primary hover:bg-primary/10",
  ghost:
    "bg-transparent text-muted-foreground hover:text-primary hover:bg-muted",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15.5px]",
  lg: "px-7 py-4 text-base",
};

const Button = ({
  label,
  href,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const content = (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading}
      className={[
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      {label}
      {loading && (
        <span
          className="inline-flex items-center gap-[3px]"
          aria-hidden="true"
        >
          <span className="btn-loading-bar" style={{ animationDelay: "0ms" }} />
          <span className="btn-loading-bar" style={{ animationDelay: "150ms" }} />
          <span className="btn-loading-bar" style={{ animationDelay: "300ms" }} />
        </span>
      )}
    </button>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };