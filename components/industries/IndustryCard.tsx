import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Industry } from "@/data/industries";
import { getProject } from "@/data/projects";
import { Icon } from "@/components/ui/Icon";

export function IndustryCard({ industry }: { industry: Industry }) {
  const project = industry.project ? getProject(industry.project) : undefined;
  return (
    <article
      data-spot
      className="group relative flex h-full gap-5 overflow-hidden bg-ink-950 p-6 transition-colors duration-500 hover:bg-ink-900 sm:flex-col sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(66,133,255,0.12), transparent 70%)",
        }}
      />
      <span className="relative grid size-12 shrink-0 place-items-center rounded-2xl border border-line bg-contrast/[0.03] text-accent-soft transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:text-teal">
        <Icon name={industry.icon} className="size-5" />
      </span>
      <div className="relative flex flex-1 flex-col">
        <h3 className="font-display text-lg font-semibold tracking-tight text-fg sm:mt-8">{industry.name}</h3>
        <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{industry.description}</p>
        {project && (
          <Link
            href={`/work/${project.slug}`}
            className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm text-fg/80 transition-colors after:absolute after:inset-0 hover:text-fg sm:mt-auto sm:pt-6"
          >
            <span className="text-subtle">Related:</span> {project.title}
            <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
    </article>
  );
}
