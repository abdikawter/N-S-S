import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "split";
  id?: string;
  as?: "h1" | "h2";
  className?: string;
  children?: ReactNode;
}

/**
 * Consistent section header. `split` places the description beside the title
 * on large screens, which keeps long sections editorial rather than centred.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  as: Tag = "h2",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        align === "split"
          ? "grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10"
          : "flex max-w-3xl flex-col gap-5",
        className,
      )}
    >
      <div className={cn(align === "split" && "lg:col-span-7")}>
        {eyebrow && (
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            {eyebrow}
          </p>
        )}
        <Tag id={id} className="text-display-lg font-semibold text-fg">
          {title}
        </Tag>
      </div>
      {(description || children) && (
        <div className={cn("flex flex-col gap-6", align === "split" && "lg:col-span-5 lg:pb-2")}>
          {description && <p className="max-w-xl text-lg leading-relaxed text-muted">{description}</p>}
          {children}
        </div>
      )}
    </Reveal>
  );
}
