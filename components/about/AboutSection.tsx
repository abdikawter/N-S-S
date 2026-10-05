import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/Button";
import { SystemsVisual } from "./SystemsVisual";

export const aboutCopy = {
  title: "Technology With a Purpose",
  paragraphs: [
    "Nile Software Solutions is a software development company focused on building practical digital solutions for businesses.",
    "We combine modern software engineering, web technologies, and artificial intelligence to transform business ideas and operational challenges into useful digital products.",
  ],
  mission: "Helping businesses operate smarter, serve customers better, and grow through technology.",
};

export function AboutSection({ headingLevel = "h2", showLink = true }: { headingLevel?: "h1" | "h2"; showLink?: boolean }) {
  const H = headingLevel;
  return (
    <section id="about" aria-labelledby="about-title" className="section-y relative border-t border-line">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              About Nile
            </p>
            <H id="about-title" className="text-display-lg font-semibold text-fg">
              {aboutCopy.title}
            </H>
            <div className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-muted">
              {aboutCopy.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 rounded-2xl border border-line bg-white/[0.02] p-6 md:p-8">
            <p className="eyebrow">Our mission</p>
            <p className="mt-4 font-display text-xl leading-snug tracking-tight text-fg md:text-2xl">{aboutCopy.mission}</p>
          </Reveal>
          {showLink && (
            <Reveal delay={0.15} className="mt-8">
              <ArrowLink href="/about">More about us</ArrowLink>
            </Reveal>
          )}
        </div>
        <Reveal delay={0.1} className="lg:col-span-6">
          <SystemsVisual />
        </Reveal>
      </div>
    </section>
  );
}
