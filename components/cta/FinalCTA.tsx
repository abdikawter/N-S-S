import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NileFlow } from "@/components/three/NileFlow";

export function FinalCTA({
  title = "Have a Business Problem That Software Could Solve?",
  description = "Tell us what you're trying to build. Let's turn the idea into a useful digital solution.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative isolate overflow-hidden rounded-[28px] border border-line bg-ink-900 md:rounded-[40px]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-90">
          <NileFlow id="cta-flow" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 cta-scrim"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-50" />

        <div className="container-site flex flex-col items-center py-24 text-center md:py-36 lg:py-44">
          <Reveal className="flex flex-col items-center">
            <p className="eyebrow mb-6">Start a project</p>
            <h2 id="cta-title" className="max-w-4xl text-display-lg font-semibold text-fg">
              {title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{description}</p>
            <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <ButtonLink href="/contact" size="lg" arrow>
                Start a Project
              </ButtonLink>
              <ButtonLink href="/work" size="lg" variant="secondary">
                Explore Our Work
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
