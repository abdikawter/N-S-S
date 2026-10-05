import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { StatusBadge } from "@/components/ui/Badge";
import { ProjectMedia } from "./ProjectMedia";

/** Compact project card used for related work and cross-links. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group surface flex h-full flex-col overflow-hidden rounded-2xl p-3 transition-colors duration-500 hover:border-line-strong"
    >
      <div className="overflow-hidden rounded-xl">
        <div className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]">
          <ProjectMedia screen={project.image} projectTitle={project.title} className="rounded-xl md:rounded-xl" />
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 px-3 pb-3 pt-6">
        <div>
          <p className="eyebrow">{project.category}</p>
          <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-fg md:text-2xl">{project.title}</h3>
          {project.status === "in-development" && <StatusBadge status={project.status} className="mt-3" />}
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-500 group-hover:border-fg group-hover:bg-fg group-hover:text-ink-950">
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </Link>
  );
}
