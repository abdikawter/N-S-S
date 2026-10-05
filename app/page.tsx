import { Hero } from "@/components/hero/Hero";
import { SelectedWork } from "@/components/projects/SelectedWork";
import { ServicesSection } from "@/components/services/ServicesSection";
import { IndustriesSection } from "@/components/industries/IndustriesSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { TechStack } from "@/components/tech/TechStack";
import { AboutSection } from "@/components/about/AboutSection";
import { Stats } from "@/components/about/Stats";
import { FinalCTA } from "@/components/cta/FinalCTA";
import { OrganizationJsonLd } from "@/components/layout/JsonLd";

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <Hero />
      <SelectedWork />
      <ServicesSection />
      <IndustriesSection />
      <ProcessSection />
      <TechStack />
      <AboutSection />
      <Stats />
      <FinalCTA />
    </>
  );
}
