import { industries } from "@/data/industries";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Spotlight";
import { IndustryCard } from "./IndustryCard";

export function IndustriesSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="industries" aria-labelledby="industries-title" className="section-y relative border-t border-line">
      <div className="container-site">
        <SectionHeading
          id="industries-title"
          as={headingLevel}
          eyebrow="Industries"
          align="split"
          title="Technology for Real‑World Industries"
          description="We work close to how businesses actually operate — on the floor, at the front desk, in the field — and design software around it."
        />
        <Reveal delay={0.05} className="mt-14 md:mt-20">
          <Spotlight>
            <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind) => (
                <li key={ind.id}>
                  <IndustryCard industry={ind} />
                </li>
              ))}
            </ul>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
