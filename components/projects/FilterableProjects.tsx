"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState, type ReactNode } from "react";
import { projectFilters, type ProjectFilterId } from "@/data/projects";
import { ProjectFilter, type FilterValue } from "./ProjectFilter";
import { cn } from "@/lib/utils";

export interface FilterableItem {
  slug: string;
  filters: ProjectFilterId[];
  /** Server-rendered project presentation (keeps mockups out of the client bundle). */
  node: ReactNode;
}

/** Client-side category filtering with animated enter/exit. */
export function FilterableProjects({
  items,
  className,
  gapClassName = "gap-28 md:gap-40",
  id,
}: {
  items: FilterableItem[];
  className?: string;
  gapClassName?: string;
  id?: string;
}) {
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const c = Object.fromEntries(projectFilters.map((f) => [f.id, 0])) as Record<FilterValue, number>;
    c.all = items.length;
    for (const item of items) for (const f of item.filters) c[f] += 1;
    return c;
  }, [items]);

  const visible = filter === "all" ? items : items.filter((i) => i.filters.includes(filter));
  const activeLabel = projectFilters.find((f) => f.id === filter)?.label ?? "All";

  return (
    <div className={className}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ProjectFilter value={filter} onChange={setFilter} counts={counts} id={id} />
        <p aria-live="polite" className="text-sm text-muted">
          Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
          {filter !== "all" && <> in {activeLabel}</>}
        </p>
      </div>

      <motion.ul layout className={cn("mt-16 flex flex-col md:mt-20", gapClassName)}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item) => (
            <motion.li
              key={item.slug}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {item.node}
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
