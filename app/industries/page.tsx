import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { IndustriesSection } from "@/components/industries/IndustriesSection";
import { FinalCTA } from "@/components/cta/FinalCTA";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Software for healthcare, agriculture, recycling and manufacturing, retail, transportation, travel, enterprise and startups.",
  alternates: { canonical: "/industries" },
  openGraph: { title: "Industries — Nile Software Solutions", url: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Industries"
        title="Software shaped around how each industry works."
        description="Every industry runs differently. We start with the work itself — the people, the hand-offs, the paperwork — and build software that fits."
      />
      <IndustriesSection />
      <FinalCTA />
    </>
  );
}
