import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FilterableProjects } from "./FilterableProjects";
import { ProjectShowcase } from "./ProjectShowcase";

export function SelectedWork({
  headingLevel = "h2",
  eyebrow = "Selected work",
}: {
  headingLevel?: "h1" | "h2";
  eyebrow?: string;
}) {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y relative">
      <div className="container-site">
        <SectionHeading
          id="work-title"
          as={headingLevel}
          eyebrow={eyebrow}
          align="split"
          title="Software Built to Solve Real Problems."
          description="Explore selected digital products and business solutions developed by Nile Software Solutions."
        />
        <FilterableProjects
          id="work"
          className="mt-14 md:mt-20"
          items={projects.map((p, i) => ({
            slug: p.slug,
            filters: p.filters,
            node: <ProjectShowcase project={p} index={i} />,
          }))}
        />
      </div>
    </section>
  );
}
