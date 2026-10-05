import type { Metadata } from "next";
import { Compass, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { AboutSection } from "@/components/about/AboutSection";
import { Stats } from "@/components/about/Stats";
import { ProcessSection } from "@/components/process/ProcessSection";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nile Software Solutions is a software development company building practical digital solutions for businesses with modern engineering and AI.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About — Nile Software Solutions", url: "/about" },
};

const principles = [
  { icon: Compass, title: "Business first", body: "We start by understanding how your business operates before we write a line of code." },
  { icon: Layers, title: "Product quality", body: "Interfaces your team actually wants to use, built on clean, maintainable architecture." },
  { icon: Sparkles, title: "Practical AI", body: "AI where it creates real value — grounded in your data and your workflows." },
  { icon: ShieldCheck, title: "Built to last", body: "Reliable, secure systems that are supported and improved as you grow." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A software company built around real business problems."
        description="We design and engineer digital products for businesses in Ethiopia and beyond."
      />
      <AboutSection showLink={false} />
      <section aria-labelledby="principles-title" className="section-y border-t border-line">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow mb-5">How we think</p>
            <h2 id="principles-title" className="max-w-2xl text-display-md font-semibold">
              What guides our work
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="surface rounded-2xl p-7">
                <p.icon aria-hidden="true" className="size-5 text-accent-soft" strokeWidth={1.6} />
                <h3 className="mt-6 font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
      <Stats />
      <ProcessSection />
      <FinalCTA />
    </>
  );
}
