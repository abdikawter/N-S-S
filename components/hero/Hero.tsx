import Link from "next/link";
import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[4.5rem]"
    >
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-grid opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -top-40 right-[-10%] -z-20 h-[640px] w-[820px] rounded-full bg-accent/[0.12] blur-[140px]"
      />

      {/* Visual: background on desktop, a framed band on mobile */}
      <div className="absolute inset-0 -z-10 hidden lg:block">
        <HeroVisual />
        {/* Keep the copy legible over the flow. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hero-scrim"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink-950 to-transparent"
        />
      </div>

      <div className="container-site flex flex-1 flex-col justify-center pb-10 pt-14 lg:pb-16 lg:pt-10">
        <div className="max-w-[50rem]">
          <p className="eyebrow rise-in flex items-center gap-3" style={delay(0)}>
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            {site.name}
          </p>

          <h1
            id="hero-title"
            className="rise-in mt-7 text-display-xl font-semibold text-fg"
            style={delay(80)}
          >
            We Build Software for Businesses{" "}
            <span className="text-gradient">Ready to Grow.</span>
          </h1>

          <p className="rise-in mt-7 max-w-[34rem] text-lg leading-relaxed text-muted md:text-xl" style={delay(180)}>
            {site.description}
          </p>

          <div className="rise-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={delay(280)}>
            <ButtonLink href="/work" size="lg" arrow>
              Explore Our Work
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Start a Project
            </ButtonLink>
          </div>

          <p
            className="rise-in mt-10 inline-flex items-center gap-2.5 rounded-full border border-line bg-contrast/[0.03] py-1.5 pl-2.5 pr-4 text-[0.82rem] text-muted"
            style={delay(380)}
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal/60" />
              <span className="relative inline-flex size-2 rounded-full bg-teal" />
            </span>
            Building practical digital solutions
          </p>
        </div>
      </div>

      {/* Mobile / tablet visual band */}
      <div className="relative mx-5 mb-8 h-[220px] overflow-hidden rounded-2xl border border-line bg-ink-900/60 md:mx-8 md:h-[300px] lg:hidden">
        <HeroVisual variant="band" />
        <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap gap-2" aria-hidden="true">
          {["AI", "Business Systems", "Healthcare", "Marketplaces"].map((l) => (
            <span key={l} className="glass rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Proof strip: implemented products, linked */}
      <div className="rise-in relative hidden border-t border-line bg-ink-950/40 backdrop-blur-sm md:block" style={delay(500)}>
        <div className="container-site flex flex-col gap-3 py-5 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow shrink-0">Selected work</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="text-muted transition-colors hover:text-fg">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
