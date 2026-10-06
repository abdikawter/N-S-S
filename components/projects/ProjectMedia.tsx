import Image from "next/image";
import type { ComponentType } from "react";
import type { MockupId, ProjectScreen } from "@/data/projects";
import { ScaledFrame } from "./mockups/ScaledFrame";
import { PrmsDashboard, PrmsEmployees, PrmsExpenses, PrmsMaterials } from "./mockups/prms";
import { ClinicDoctor, ClinicLab, ClinicReception } from "./mockups/clinic";
import { ErpNewSale, ErpStockMatrix, ErpStorekeeper } from "./mockups/furniture-erp";
import { StorefrontFlow, StorefrontOwner } from "./mockups/storefront";
import { CoffeeLots, CoffeeOperations } from "./mockups/coffee";
import { cn } from "@/lib/utils";

const mockups: Record<MockupId, ComponentType> = {
  "prms-dashboard": PrmsDashboard,
  "prms-materials": PrmsMaterials,
  "prms-employees": PrmsEmployees,
  "prms-expenses": PrmsExpenses,
  "clinic-reception": ClinicReception,
  "clinic-doctor": ClinicDoctor,
  "clinic-lab": ClinicLab,
  "erp-storekeeper": ErpStorekeeper,
  "erp-stock": ErpStockMatrix,
  "erp-sale": ErpNewSale,
  "storefront-flow": StorefrontFlow,
  "storefront-owner": StorefrontOwner,
  "coffee-operations": CoffeeOperations,
  "coffee-lots": CoffeeLots,
};

/**
 * A product screen: a real screenshot when `screen.image` is set, otherwise
 * the coded interface mockup rendered at native size and scaled to fit.
 */
export function ProjectMedia({
  screen,
  projectTitle,
  className,
  priority = false,
  sizes = "(min-width: 1280px) 1200px, 100vw",
}: {
  screen: ProjectScreen;
  projectTitle: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const label = `${projectTitle} — ${screen.title}. ${screen.caption} Interface shown with fictional demo data.`;
  const frame = cn(
    "overflow-hidden rounded-[14px] border border-line-strong bg-ink-900 shadow-[0_40px_120px_-40px_var(--shadow-color)] md:rounded-[18px]",
    className,
  );

  if (screen.image) {
    return (
      <div className={cn(frame, "relative aspect-[16/10]")}>
        <Image src={screen.image} alt={label} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }

  const Mockup = mockups[screen.mockup];
  return (
    <ScaledFrame label={label} className={frame}>
      <Mockup />
    </ScaledFrame>
  );
}
