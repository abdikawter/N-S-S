import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-ink-950 shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_30px_-8px_rgba(66,133,255,0.55)] hover:bg-white hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2),0_10px_40px_-6px_rgba(66,133,255,0.75)]",
  secondary:
    "border border-line-strong bg-white/[0.03] text-fg hover:border-white/25 hover:bg-white/[0.07]",
  ghost: "text-fg hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-13 px-7 text-[0.95rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5"
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  ...props
}: CommonProps & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  ...props
}: CommonProps & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

/** Inline text link with an animated arrow, used for "View Case Study →". */
export function ArrowLink({
  children,
  className,
  ...props
}: { children: ReactNode; className?: string } & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <Link
      className={cn(
        "group/btn inline-flex items-center gap-2 text-[0.95rem] font-medium text-fg transition-colors hover:text-accent-soft",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out-expo group-hover/btn:scale-x-100" />
      </span>
      <Arrow />
    </Link>
  );
}
