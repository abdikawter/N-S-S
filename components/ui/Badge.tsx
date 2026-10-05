import { CircleDashed, CircleCheck } from "lucide-react";
import type { ReactNode } from "react";
import type { ProjectStatus } from "@/data/projects";
import { statusLabel } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/[0.025] px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Project status. Uses an icon and text, never colour alone. */
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const inDev = status === "in-development";
  const IconCmp = inDev ? CircleDashed : CircleCheck;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em]",
        inDev
          ? "border-warn/30 bg-warn/10 text-warn"
          : "border-teal/25 bg-teal/[0.08] text-teal",
        className,
      )}
    >
      <IconCmp aria-hidden="true" className="size-3.5" strokeWidth={2} />
      {statusLabel[status]}
    </span>
  );
}
