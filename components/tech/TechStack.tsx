import { technologies } from "@/data/process";
import { Reveal } from "@/components/ui/Reveal";

/** Deliberately restrained: the projects are the proof, this is the toolkit. */
export function TechStack() {
  return (
    <section id="technology" aria-labelledby="tech-title" className="relative border-t border-line py-20 md:py-28">
      <div className="container-site grid gap-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow mb-4">Technology</p>
          <h2 id="tech-title" className="font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
            Built With Modern Technology
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">
            Proven, well-supported tools chosen for reliability and long-term maintainability.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-8">
          <ul className="flex flex-wrap gap-2.5">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-xl border border-line bg-white/[0.02] px-4 py-2.5 font-mono text-[0.82rem] text-fg/85 transition-colors duration-300 hover:border-line-strong hover:text-fg"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
