import { ArrowRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  href?: string;
  target?: string;
  icon?: React.ReactNode;
  className?: string;
};

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
  href,
  target,
  icon,
  className = "",
}: Props) {
  const trailing = icon === undefined ? <ArrowRight size={16} /> : icon;

  const classes = [
    "inline-flex items-center justify-center gap-2.5 rounded-lg px-7 h-[52px]",
    "text-[15px] font-medium tracking-[0.02em] transition-all duration-200",
    disabled
      ? "bg-border-light text-text-secondary cursor-not-allowed"
      : "bg-navy text-white hover:bg-[color:var(--color-navy-deeper)] cursor-pointer",
    className,
  ].join(" ");

  if (href && !disabled) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={classes}>
        {children}
        {trailing}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
      {trailing}
    </button>
  );
}
