import { Reveal } from "@/components/ui/Reveal";
import { ProcessTimeline } from "./ProcessTimeline";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-title" className="section-y relative border-t border-line">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40" />
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              How we work
            </p>
            <h2 id="process-title" className="text-display-lg font-semibold text-fg">
              From Business Problem to Working Product
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              A clear, collaborative process that keeps you involved from the first conversation to launch — and after.
            </p>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <ProcessTimeline />
        </div>
      </div>
    </section>
  );
}
