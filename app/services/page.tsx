import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { TechStack } from "@/components/tech/TechStack";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Business management systems, AI-powered applications, web platforms, marketplaces and custom software — designed and built by Nile Software Solutions.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services — Nile Software Solutions", url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Software designed around how your business works."
        description="We design and build business systems, AI applications and digital platforms — from the first workshop to a production system your team relies on, with affordable, transparent pricing."
      >
        <ButtonLink href="/contact" size="lg" arrow>
          Start a Project
        </ButtonLink>
      </PageHeader>
      <ServicesSection />
      <ProcessSection />
      <TechStack />
      <FinalCTA />
    </>
  );
}
