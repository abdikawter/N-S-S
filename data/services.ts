import type { IconName } from "./types";

export interface Service {
  id: string;
  title: string;
  summary: string;
  icon: IconName;
  items: string[];
  /** Project slugs that demonstrate this service. */
  proof: string[];
}

export const services: Service[] = [
  {
    id: "business-systems",
    title: "Business Management Systems",
    summary:
      "Custom platforms that bring your operations into one structured system, replacing spreadsheets and paperwork with clear, reliable workflows.",
    icon: "layout-dashboard",
    items: ["Operations", "Finance", "Inventory", "Employees", "Workflows", "Reporting"],
    proof: ["prms", "clinic-management", "coffee-washing-station"],
  },
  {
    id: "ai-applications",
    title: "AI-Powered Applications",
    summary:
      "Practical AI built into real products: assistants that understand your data and automations that remove repetitive work.",
    icon: "brain",
    items: [
      "AI Agents",
      "AI Assistants",
      "Chatbots",
      "RAG Applications",
      "AI Automation",
      "Intelligent Business Workflows",
    ],
    proof: ["ai-shopping-agent"],
  },
  {
    id: "web-platforms",
    title: "Web Platforms & Marketplaces",
    summary:
      "Customer-facing platforms designed for growth, from multi-sided marketplaces to SaaS products and self-service portals.",
    icon: "globe",
    items: ["Marketplaces", "Rental Platforms", "E-commerce", "Customer Portals", "SaaS Products"],
    proof: ["ethirent", "ai-shopping-agent"],
  },
  {
    id: "custom-software",
    title: "Custom Software",
    summary:
      "Purpose-built software designed around specific business requirements, when an off-the-shelf tool does not fit the way you work.",
    icon: "code",
    items: ["Requirements & Architecture", "Web Applications", "APIs & Integrations", "Data & Reporting", "Ongoing Support"],
    proof: [],
  },
];
