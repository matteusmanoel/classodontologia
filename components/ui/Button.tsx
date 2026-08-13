import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "outline";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

export type ButtonAsLinkProps = ButtonBaseProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "children" | "className"
  > & {
    href: string;
  };

export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "href"
  > & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-gold text-bg-primary hover:bg-gold-light",
  outline:
    "border border-gold bg-transparent text-gold hover:bg-gold hover:text-bg-primary",
};

const baseClasses = [
  "inline-flex items-center justify-center rounded-sm",
  "px-6 py-3 font-sans text-sm font-medium tracking-label uppercase",
  "transition-[color,background-color,border-color]",
  "[transition-duration:var(--duration-fast)]",
  "[transition-timing-function:var(--ease-in-out)]",
  "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-focus",
].join(" ");

export function Button({
  variant = "primary",
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  if (isLinkRest(rest)) {
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { type, ...buttonRest } = rest;

  return (
    <button type={type ?? "button"} className={classes} {...buttonRest}>
      {children}
    </button>
  );
}

function isLinkRest(
  rest: Omit<ButtonProps, "variant" | "children" | "className">,
): rest is Omit<ButtonAsLinkProps, "variant" | "children" | "className"> {
  return "href" in rest && typeof rest.href === "string";
}
