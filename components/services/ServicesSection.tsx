import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "./ServiceCard";

export function ServicesSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  return (
    <section id="services" aria-labelledby="services-title" className="section-y relative border-t border-line">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 bg-accent" />
              Services
            </p>
            <H id="services-title" className="text-display-lg font-semibold text-fg">
              What We Build
            </H>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              Four areas of focus, one approach: understand the business first, then design and engineer software that fits it — and your budget. Quality software shouldn&apos;t be out of reach for small and growing businesses.
            </p>
            <ButtonLink href="/contact" variant="secondary" arrow className="mt-8">
              Discuss your project
            </ButtonLink>
          </Reveal>
        </div>
        <div className="flex flex-col gap-5 lg:col-span-8">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
