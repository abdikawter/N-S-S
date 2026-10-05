"use client";

import { motion } from "motion/react";
import { projectFilters, type ProjectFilterId } from "@/data/projects";
import { cn } from "@/lib/utils";

export type FilterValue = "all" | ProjectFilterId;

export function ProjectFilter({
  value,
  onChange,
  counts,
  id = "filter",
}: {
  value: FilterValue;
  onChange: (v: FilterValue) => void;
  counts: Record<FilterValue, number>;
  id?: string;
}) {
  return (
    <div role="group" aria-label="Filter projects by category" className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0">
      <ul className="flex w-max gap-1.5 rounded-full border border-line bg-white/[0.02] p-1.5">
        {projectFilters.map((f) => {
          const active = value === f.id;
          const empty = counts[f.id] === 0;
          return (
            <li key={f.id}>
              <button
                type="button"
                aria-pressed={active}
                disabled={empty}
                onClick={() => onChange(f.id)}
                className={cn(
                  "relative flex h-9 items-center gap-2 rounded-full px-4 text-[0.85rem] transition-colors duration-300",
                  active ? "text-ink-950" : "text-muted hover:text-fg",
                  empty && "opacity-40",
                )}
              >
                {active && (
                  <motion.span
                    layoutId={`${id}-pill`}
                    className="absolute inset-0 -z-0 rounded-full bg-fg"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative">{f.label}</span>
                <span className={cn("relative font-mono text-[0.7rem]", active ? "text-ink-950/60" : "text-subtle")}>
                  {counts[f.id]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
