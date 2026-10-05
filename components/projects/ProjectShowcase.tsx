import Link from "next/link";
import type { Project } from "@/data/projects";
import { ArrowLink } from "@/components/ui/Button";
import { StatusBadge, Tag } from "@/components/ui/Badge";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";
import { ProjectMedia } from "./ProjectMedia";

/**
 * Editorial, launch-style presentation of one project: headline block on top,
 * a large product screen below.
 */
export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const href = `/work/${project.slug}`;
  const titleId = `project-${project.slug}`;
  const inDev = project.status === "in-development";

  return (
    <article aria-labelledby={titleId} className="group/project relative">
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-accent-soft">{pad(index + 1)}</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span className="eyebrow">{project.category}</span>
            {inDev && <StatusBadge status={project.status} />}
          </div>
          <h3 id={titleId} className="mt-6 text-display-md font-semibold text-fg">
            <Link href={href} className="transition-colors hover:text-white">
              {project.title}
            </Link>
          </h3>
          {project.fullTitle !== project.title && (
            <p className="mt-3 font-display text-lg text-muted md:text-xl">{project.fullTitle}</p>
          )}
        </div>
        <div className="flex flex-col gap-6 lg:col-span-5">
          <p className="text-[1.05rem] leading-relaxed text-muted">{project.description}</p>
          <ul className="flex flex-wrap gap-2" aria-label="Tags">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
          <ArrowLink href={href} aria-label={`${project.ctaLabel}: ${project.title}`}>
            {project.ctaLabel}
          </ArrowLink>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="relative mt-10 md:mt-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -inset-y-12 md:-inset-x-10 -z-10 rounded-[40px] bg-[radial-gradient(60%_60%_at_50%_45%,rgba(66,133,255,0.16),transparent_70%)] opacity-70 transition-opacity duration-700 group-hover/project:opacity-100"
        />
        <Parallax offset={24}>
          <Link
            href={href}
            tabIndex={-1}
            aria-hidden="true"
            className="block transition-transform duration-700 ease-out-expo group-hover/project:-translate-y-1.5"
          >
            <ProjectMedia screen={project.image} projectTitle={project.title} />
          </Link>
        </Parallax>
        {inDev && (
          <p className="mt-10 flex items-center gap-2 text-sm text-muted">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-warn" />
            Currently in development — interface shown is a work-in-progress preview.
          </p>
        )}
      </Reveal>
    </article>
  );
}
