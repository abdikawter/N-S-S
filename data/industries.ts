import type { IconName } from "./types";

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  /** Slug of a related project, if one exists. */
  project?: string;
}

export const industries: Industry[] = [
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Patient workflows, clinical records, laboratory and billing systems.",
    icon: "heart-pulse",
    project: "clinic-management",
  },
  {
    id: "agriculture",
    name: "Agriculture",
    description: "Operations, traceability and production tracking for agri-businesses.",
    icon: "sprout",
    project: "coffee-washing-station",
  },
  {
    id: "recycling",
    name: "Recycling & Manufacturing",
    description: "Material, inventory, workforce and production management.",
    icon: "recycle",
    project: "prms",
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    description: "Online and social commerce, multi-branch sales and inventory tools.",
    icon: "shopping-bag",
    project: "storefront-et",
  },
  {
    id: "transportation",
    name: "Transportation",
    description: "Fleet, dispatch, booking and logistics platforms.",
    icon: "truck",
  },
  {
    id: "travel",
    name: "Travel & Tourism",
    description: "Booking systems, guest portals and operator tools.",
    icon: "plane",
  },
  {
    id: "enterprise",
    name: "Business & Enterprise",
    description: "ERP systems, internal tools, workflow automation and reporting.",
    icon: "building",
    project: "furniture-erp",
  },
  {
    id: "startups",
    name: "Startups & Digital Products",
    description: "MVPs, SaaS products and marketplaces ready to scale.",
    icon: "rocket",
    project: "storefront-et",
  },
];
