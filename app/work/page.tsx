import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { PageHeader } from "@/components/layout/PageHeader";
import { FilterableProjects } from "@/components/projects/FilterableProjects";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { FinalCTA } from "@/components/cta/FinalCTA";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Software products and business systems built by Nile Software Solutions — from operations platforms, ERP and clinic workflows to AI-assisted Telegram commerce.",
  alternates: { canonical: "/work" },
  openGraph: { title: "Work — Nile Software Solutions", url: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Software Built to Solve Real Problems."
        description="Explore selected digital products and business solutions developed by Nile Software Solutions."
      />
      <section aria-label="Projects" className="pb-28 md:pb-40">
        <div className="container-site">
          <FilterableProjects
            id="work-page"
            items={projects.map((p, i) => ({
              slug: p.slug,
              filters: p.filters,
              node: <ProjectShowcase project={p} index={i} />,
            }))}
          />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
