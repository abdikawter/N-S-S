import Link from "next/link";
import { ArrowLeft, CircleDashed, Target } from "lucide-react";
import type { CSSProperties } from "react";
import { getRelatedProjects, projectFilters, statusLabel, type Project } from "@/data/projects";
import { processSteps } from "@/data/process";
import { ProjectMedia } from "@/components/projects/ProjectMedia";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { StatusBadge, Tag } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { pad } from "@/lib/utils";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="text-accent-soft">{n}</span>
      <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
      {children}
    </p>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const inDev = project.status === "in-development";
  const related = getRelatedProjects(project.slug, 2);
  // The cover already appears in the hero; avoid repeating it when there are other screens.
  const gallery =
    project.gallery.length > 2 ? project.gallery.filter((s) => s.mockup !== project.image.mockup) : project.gallery;
  const industries = project.filters
    .map((f) => projectFilters.find((pf) => pf.id === f)?.label)
    .filter(Boolean)
    .join(", ");

  const facts: { label: string; value: string }[] = [
    { label: "Category", value: project.category },
    { label: "Status", value: statusLabel[project.status] },
    { label: "Focus", value: industries },
    ...(project.meta?.client ? [{ label: "Client", value: project.meta.client }] : []),
    ...(project.meta?.year ? [{ label: "Year", value: project.meta.year }] : []),
    ...(project.meta?.role ? [{ label: "Our role", value: project.meta.role }] : []),
  ];

  return (
    <article aria-labelledby="cs-title">
      {/* ------------------------------------------------------------ Hero */}
      <header className="relative isolate overflow-hidden pt-32 md:pt-40">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 -z-10 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-accent/[0.12] blur-[140px]"
        />
        <div className="container-site">
          <Link
            href="/work"
            className="rise-in inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden="true" className="size-4" /> All work
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="rise-in flex flex-wrap items-center gap-3" style={delay(40)}>
                <span className="eyebrow">{project.category}</span>
                <StatusBadge status={project.status} />
              </div>
              <h1 id="cs-title" className="rise-in mt-6 text-display-xl font-semibold" style={delay(100)}>
                {project.title}
              </h1>
              {project.fullTitle !== project.title && (
                <p className="rise-in mt-4 font-display text-xl text-muted md:text-2xl" style={delay(160)}>
                  {project.fullTitle}
                </p>
              )}
            </div>
            <div className="rise-in flex flex-col gap-6 lg:col-span-4" style={delay(220)}>
              <p className="text-lg leading-relaxed text-muted">{project.description}</p>
              <ul className="flex flex-wrap gap-2" aria-label="Tags">
                {project.tags.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rise-in relative mt-14 md:mt-20" style={delay(320)}>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -inset-y-10 -z-10 md:-inset-x-8 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(66,133,255,0.18),transparent_70%)]"
            />
            <ProjectMedia screen={project.image} projectTitle={project.title} priority />
          </div>
        </div>
      </header>

      {/* -------------------------------------------------------- Overview */}
      <section aria-labelledby="cs-overview" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label n="01">Project overview</Label>
            <h2 id="cs-overview" className="mt-6 text-display-md font-semibold">
              {inDev ? "A platform in active development." : "A product built around real operations."}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <dl className="divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[8rem_1fr] gap-4 py-4 text-[0.95rem]">
                  <dt className="text-muted">{f.label}</dt>
                  <dd className="text-fg">{f.value}</dd>
                </div>
              ))}
            </dl>
            {inDev && (
              <p className="mt-6 flex items-start gap-3 rounded-xl border border-warn/25 bg-warn/[0.06] p-4 text-sm leading-relaxed text-fg/85">
                <CircleDashed aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-warn" />
                This system is currently in development. Features and screens described here reflect the planned scope and may change.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------- Challenge / Solution */}
      <section aria-label="Challenge and solution" className="border-t border-line">
        <div className="container-site grid lg:grid-cols-2">
          <Reveal className="border-b border-line py-16 md:py-24 lg:border-b-0 lg:border-r lg:pr-16">
            <Label n="02">The challenge</Label>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">The problem to solve</h2>
            <div className="mt-6 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-muted">
              {project.challenge.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="py-16 md:py-24 lg:pl-16">
            <Label n="03">The solution</Label>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {inDev ? "What we’re building" : "What we built"}
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-muted">
              {project.solution.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------- Key features */}
      <section aria-labelledby="cs-features" className="section-y border-t border-line">
        <div className="container-site">
          <Reveal>
            <Label n="04">Key features</Label>
            <h2 id="cs-features" className="mt-6 max-w-2xl text-display-md font-semibold">
              {inDev ? "Planned capabilities" : "Everything in one platform"}
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.features.map((f, i) => (
              <Reveal as="li" key={f.title} delay={(i % 3) * 0.05} className="group surface rounded-2xl p-7 transition-colors duration-500 hover:border-line-strong md:p-8">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-contrast/[0.03] text-accent-soft transition-colors duration-500 group-hover:text-teal">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{f.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ Product interface */}
      <section aria-labelledby="cs-gallery" className="section-y border-t border-line bg-ink-900/40">
        <div className="container-site">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Label n="05">Product interface</Label>
              <h2 id="cs-gallery" className="mt-6 text-display-md font-semibold">
                {inDev ? "Work-in-progress screens" : "Inside the product"}
              </h2>
            </div>
            <p className="max-w-sm text-sm text-subtle">Screens show fictional demo data, not real customer information.</p>
          </Reveal>
          <ol className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28">
            {gallery.map((screen, i) => (
              <Reveal as="li" key={screen.mockup + i}>
                <figure>
                  <ProjectMedia screen={screen} projectTitle={project.title} />
                  <figcaption className="mt-6 grid gap-2 md:grid-cols-12 md:gap-10">
                    <span className="flex items-baseline gap-3 font-display text-lg font-semibold text-fg md:col-span-5">
                      <span className="font-mono text-sm font-normal text-accent-soft">{pad(i + 1)}</span>
                      {screen.title}
                    </span>
                    <span className="text-muted md:col-span-7">{screen.caption}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------- Technology + process */}
      <section aria-label="Technology and development process" className="section-y border-t border-line">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <Label n="06">Technology</Label>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">Stack</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-lg border border-line bg-contrast/[0.02] px-3 py-2 font-mono text-[0.8rem] text-fg/85">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7 lg:col-start-6">
            <Label n="07">Development process</Label>
            <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">How it came together</h2>
            <ol className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
              {processSteps.map((s, i) => {
                const pending = inDev && i >= 3;
                return (
                  <li key={s.id} className="bg-ink-950 p-5">
                    <span className="font-mono text-xs text-subtle">{pad(i + 1)}</span>
                    <p className="mt-3 font-display font-semibold">{s.title}</p>
                    <p className="mt-1 text-[0.82rem] leading-snug text-muted">{s.description}</p>
                    {inDev && (
                      <p className="mt-3 text-[0.72rem] font-mono uppercase tracking-[0.12em] text-subtle">
                        {pending ? "Upcoming" : i === 2 ? "In progress" : "Done"}
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Outcome */}
      <section aria-labelledby="cs-outcome" className="section-y border-t border-line">
        <div className="container-site">
          <Reveal>
            <Label n="08">{inDev ? "Planned outcomes" : "Results & deliverables"}</Label>
            <h2 id="cs-outcome" className="mt-6 max-w-3xl text-display-md font-semibold">
              {inDev ? "What the platform is designed to achieve" : "What the business gained"}
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {project.outcome.map((o, i) => (
              <Reveal as="li" key={o.title} delay={i * 0.06} className="surface relative overflow-hidden rounded-2xl p-7">
                <Target aria-hidden="true" className="size-5 text-teal" strokeWidth={1.6} />
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight">{o.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{o.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------- Related */}
      <section aria-labelledby="cs-related" className="section-y border-t border-line">
        <div className="container-site">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 id="cs-related" className="text-display-md font-semibold">
              More work
            </h2>
            <Link href="/work" className="hidden text-sm text-muted transition-colors hover:text-fg sm:block">
              View all projects →
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {related.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        title={inDev ? "Planning a similar platform?" : "Need a system like this for your business?"}
        description="Tell us what you're trying to build. Let's turn the idea into a useful digital solution."
      />
    </article>
  );
}
