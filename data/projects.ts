import type { IconName } from "./types";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type ProjectFilterId = "business" | "ai" | "healthcare" | "marketplaces" | "agriculture";

export const projectFilters: { id: "all" | ProjectFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "business", label: "Business Systems" },
  { id: "ai", label: "AI & Automation" },
  { id: "healthcare", label: "Healthcare" },
  { id: "marketplaces", label: "Marketplaces" },
  { id: "agriculture", label: "Agriculture" },
];

export type ProjectStatus = "delivered" | "in-development";

export const statusLabel: Record<ProjectStatus, string> = {
  delivered: "Implemented",
  "in-development": "In Development",
};

/**
 * Interface screens rendered as coded product mockups
 * (see `components/projects/mockups`). When real screenshots exist, set
 * `image` on a screen to a file in `/public/images/projects/...` and it will be
 * shown with next/image instead of the mockup.
 */
export type MockupId =
  | "prms-dashboard"
  | "prms-materials"
  | "prms-employees"
  | "prms-expenses"
  | "clinic-reception"
  | "clinic-doctor"
  | "clinic-lab"
  | "ethirent-browse"
  | "ethirent-detail"
  | "shop-assistant"
  | "shop-product"
  | "coffee-operations"
  | "coffee-lots";

export interface ProjectScreen {
  mockup: MockupId;
  title: string;
  caption: string;
  /** Optional real screenshot path, e.g. "/images/projects/prms/dashboard.webp". */
  image?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProjectOutcome {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  title: string;
  fullTitle: string;
  category: string;
  description: string;
  status: ProjectStatus;
  filters: ProjectFilterId[];
  /** Short labels shown on cards and the case-study hero. Edit freely. */
  tags: string[];
  /** PLACEHOLDER where noted — replace with the project's confirmed stack. */
  technologies: string[];
  /** Cover screen used on showcase cards. */
  image: ProjectScreen;
  /** Screens for the case-study gallery. */
  gallery: ProjectScreen[];
  challenge: string[];
  solution: string[];
  features: ProjectFeature[];
  /** Qualitative outcomes only. Never add unverified numbers. */
  outcome: ProjectOutcome[];
  ctaLabel: string;
  /** Optional facts; rendered only when present. Fill in once confirmed. */
  meta?: { client?: string; year?: string; role?: string };
}

/* -------------------------------------------------------------------------- */
/*  Projects — add a new project by appending an object to this array.        */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    slug: "prms",
    title: "PRMS",
    fullTitle: "Plastic Recycling Management System",
    category: "Business Management / Operations",
    description:
      "A digital management platform designed to help recycling businesses organize materials, employees, expenses, and operational activities.",
    status: "delivered",
    filters: ["business"],
    tags: ["Business Management", "Operations", "Dashboard"],
    // PLACEHOLDER — confirm the stack used for PRMS.
    technologies: ["React", "TypeScript", "Django", "PostgreSQL", "REST APIs"],
    image: {
      mockup: "prms-dashboard",
      title: "Operations dashboard",
      caption: "A single view of intake, stock, workforce and spending.",
    },
    gallery: [
      {
        mockup: "prms-dashboard",
        title: "Operations dashboard",
        caption: "Key operational figures, material flow and recent activity in one place.",
      },
      {
        mockup: "prms-materials",
        title: "Raw material management",
        caption: "Material intake, grades and stock levels tracked by type and batch.",
      },
      {
        mockup: "prms-employees",
        title: "Employee management",
        caption: "Staff records, roles, shifts and attendance for the whole facility.",
      },
      {
        mockup: "prms-expenses",
        title: "Expense tracking",
        caption: "Operational spending recorded, categorised and reviewed over time.",
      },
    ],
    challenge: [
      "Recycling businesses run on many moving parts: incoming plastic from suppliers and collectors, materials sorted by type and grade, production shifts, and a steady stream of operational expenses.",
      "When this information lives in notebooks, spreadsheets and separate messages, managers struggle to see what is in stock, what is being spent, and how the operation is performing day to day.",
    ],
    solution: [
      "PRMS brings these activities into one structured platform. Material intake, inventory, employees and expenses are recorded in the same system, so every team works from shared, up-to-date information.",
      "A central dashboard turns that operational data into clear figures and charts, while role-based access keeps each user focused on the parts of the business they are responsible for.",
    ],
    features: [
      { title: "Operations Dashboard", description: "Live overview of intake, stock, staffing and spending.", icon: "layout-dashboard" },
      { title: "Raw Material Management", description: "Track material types, grades, suppliers and stock levels.", icon: "package" },
      { title: "Employee Management", description: "Records, roles, shifts and attendance in one place.", icon: "users" },
      { title: "Expense Tracking", description: "Log, categorise and review operational costs.", icon: "receipt" },
      { title: "Analytics", description: "Charts that reveal trends in material flow and costs.", icon: "chart" },
      { title: "Role-Based Access", description: "Permissions that match responsibilities across the team.", icon: "shield" },
      { title: "Reporting", description: "Structured reports ready for management review.", icon: "file-text" },
    ],
    outcome: [
      { title: "Centralized Operations", description: "Materials, people and spending managed from one platform." },
      { title: "Digital Workflows", description: "Paper and spreadsheet processes replaced by structured records." },
      { title: "Improved Visibility", description: "Managers can see the state of the operation at a glance." },
      { title: "Structured Reporting", description: "Consistent, reviewable data for better decisions." },
    ],
    ctaLabel: "View Case Study",
  },
  {
    slug: "clinic-management",
    title: "Clinic Management System",
    fullTitle: "Clinic Management System",
    category: "Healthcare / Workflow Management",
    description:
      "A clinic management platform connecting reception, doctors, laboratory technicians, payments, and patient reporting through a coordinated digital workflow.",
    status: "delivered",
    filters: ["healthcare", "business"],
    tags: ["Healthcare", "Workflow", "Patient Records"],
    // PLACEHOLDER — confirm the stack used for the clinic system.
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST APIs"],
    image: {
      mockup: "clinic-reception",
      title: "Reception & patient queue",
      caption: "Registration, queue status and notifications for the front desk.",
    },
    gallery: [
      {
        mockup: "clinic-reception",
        title: "Reception workflow",
        caption: "Patients are registered once and move through the clinic with a visible status.",
      },
      {
        mockup: "clinic-doctor",
        title: "Doctor workflow",
        caption: "Consultation notes, vitals, history and lab requests on a single screen.",
      },
      {
        mockup: "clinic-lab",
        title: "Laboratory & payments",
        caption: "Lab results flow back to the doctor while payments are tracked at reception.",
      },
    ],
    challenge: [
      "In many clinics, a single patient visit passes through reception, a doctor, the laboratory and the cashier. Each hand-off is a chance for paperwork to be delayed, duplicated or lost.",
      "Without a shared system, staff spend time chasing files and results instead of caring for patients, and management has little insight into daily activity.",
    ],
    solution: [
      "The Clinic Management System connects every role in a coordinated digital workflow. Reception registers patients and manages the queue, doctors record consultations and request tests, and lab technicians return results directly to the patient record.",
      "Payments and reports sit on the same data, and notifications let each team know when a patient is ready for the next step.",
    ],
    features: [
      { title: "Patient Dashboard", description: "Complete patient profile, visits and history.", icon: "users" },
      { title: "Reception Workflow", description: "Registration, triage and queue management.", icon: "clipboard" },
      { title: "Doctor Workflow", description: "Consultations, diagnoses and lab requests.", icon: "stethoscope" },
      { title: "Laboratory Results", description: "Test requests and results linked to each visit.", icon: "flask" },
      { title: "Payments", description: "Service billing and payment status tracking.", icon: "credit-card" },
      { title: "Reports & Notifications", description: "Daily reports and real-time hand-off alerts.", icon: "bell" },
    ],
    outcome: [
      { title: "Coordinated Care", description: "Every role works from the same patient record." },
      { title: "Fewer Hand-off Gaps", description: "Patients move between departments with clear status." },
      { title: "Connected Billing", description: "Payments tied directly to services delivered." },
      { title: "Operational Insight", description: "Structured reports on clinic activity." },
    ],
    ctaLabel: "View Case Study",
  },
  {
    slug: "ethirent",
    title: "ETHIRENT",
    fullTitle: "Equipment Rental Marketplace",
    category: "Marketplace / Rental Platform",
    description: "A digital marketplace for discovering and renting office and home equipment.",
    status: "delivered",
    filters: ["marketplaces"],
    tags: ["Marketplace", "Rentals", "Booking"],
    // PLACEHOLDER — confirm the stack used for ETHIRENT.
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    image: {
      mockup: "ethirent-browse",
      title: "Browse & search",
      caption: "Location-aware search across rental categories.",
    },
    gallery: [
      {
        mockup: "ethirent-browse",
        title: "Discovery",
        caption: "Search, categories and listings designed for quick comparison.",
      },
      {
        mockup: "ethirent-detail",
        title: "Listing & booking",
        caption: "Clear rental pricing, availability and pickup location before booking.",
      },
    ],
    challenge: [
      "Finding office or home equipment to rent often depends on word of mouth, phone calls and scattered social media posts, with little clarity on price, availability or location.",
      "Owners with equipment to rent have no simple way to reach customers or manage bookings.",
    ],
    solution: [
      "ETHIRENT is a marketplace that brings rental listings into one searchable place. Customers can browse categories, compare rental prices and book equipment for the dates they need.",
      "Each listing presents pricing, availability and location clearly, making renting as straightforward as buying online.",
    ],
    features: [
      { title: "Search & Discovery", description: "Keyword and location search across listings.", icon: "search" },
      { title: "Categories", description: "Office, electronics, furniture, events and more.", icon: "layers" },
      { title: "Rental Pricing", description: "Daily, weekly and monthly rates at a glance.", icon: "receipt" },
      { title: "Booking", description: "Date selection and booking requests.", icon: "calendar" },
      { title: "Location", description: "Pickup areas shown on every listing.", icon: "map-pin" },
      { title: "User Accounts", description: "Profiles for renters and equipment owners.", icon: "users" },
    ],
    outcome: [
      { title: "One Marketplace", description: "Rental listings gathered in a single searchable platform." },
      { title: "Transparent Pricing", description: "Customers see rates and availability before they ask." },
      { title: "Simpler Booking", description: "A guided flow from discovery to rental request." },
      { title: "New Channel for Owners", description: "Equipment owners can reach customers online." },
    ],
    ctaLabel: "View Case Study",
  },
  {
    slug: "ai-shopping-agent",
    title: "AI Shopping Agent",
    fullTitle: "AI Shopping Agent",
    category: "AI / E-commerce",
    description:
      "An AI-powered clothing shopping experience that helps customers discover products and interact with an intelligent shopping assistant.",
    status: "delivered",
    filters: ["ai", "marketplaces"],
    tags: ["AI Agent", "E-commerce", "Recommendations"],
    // PLACEHOLDER — confirm the stack and AI provider used.
    technologies: ["Next.js", "TypeScript", "Python", "AI Integrations"],
    image: {
      mockup: "shop-assistant",
      title: "Assistant-led shopping",
      caption: "The assistant filters, compares and recommends inside the catalogue.",
    },
    gallery: [
      {
        mockup: "shop-assistant",
        title: "Shopping with the assistant",
        caption: "Natural-language requests become filters and curated recommendations.",
      },
      {
        mockup: "shop-product",
        title: "Product detail & cart",
        caption: "The assistant suggests pairings and sizes alongside the product and cart.",
      },
    ],
    challenge: [
      "Online clothing stores often leave customers scrolling through long catalogues and juggling filters to find something that fits their style, occasion and budget.",
      "Generic chatbots bolted onto a store rarely understand the catalogue, so they cannot actually help a customer decide.",
    ],
    solution: [
      "The AI Shopping Agent is built into the shopping experience itself. Customers describe what they need in their own words, and the assistant translates that into filters, recommendations and outfit suggestions drawn from the real catalogue.",
      "Recommendations, product details and the cart work together, so the assistant feels like a knowledgeable stylist rather than a separate chat window.",
    ],
    features: [
      { title: "Integrated AI Assistant", description: "Conversational shopping inside the catalogue.", icon: "sparkles" },
      { title: "Smart Filtering", description: "Requests turned into precise product filters.", icon: "filter" },
      { title: "Recommendations", description: "Suggestions based on style, occasion and budget.", icon: "brain" },
      { title: "Product Details", description: "Sizes, materials and pairing suggestions.", icon: "eye" },
      { title: "Shopping Cart", description: "A cart the assistant can reason about.", icon: "shopping-cart" },
      { title: "Product Discovery", description: "Browse and compare with less effort.", icon: "shopping-bag" },
    ],
    outcome: [
      { title: "Guided Discovery", description: "Customers reach relevant products faster." },
      { title: "Catalogue-Aware AI", description: "Answers grounded in real products and stock." },
      { title: "Personal Experience", description: "Recommendations shaped by each customer’s needs." },
      { title: "Reusable AI Foundation", description: "An agent pattern that extends to other retail use cases." },
    ],
    ctaLabel: "View Case Study",
  },
  {
    slug: "coffee-washing-station",
    title: "Coffee Washing Station Management System",
    fullTitle: "Coffee Washing Station Management System",
    category: "Agriculture / Operations",
    description:
      "A digital operations platform designed to manage coffee washing station workflows, production activities, resources, and operational data.",
    status: "in-development",
    filters: ["agriculture", "business"],
    tags: ["Agriculture", "Operations", "Traceability"],
    // PLACEHOLDER — confirm the planned stack.
    technologies: ["React", "TypeScript", "Django", "PostgreSQL"],
    image: {
      mockup: "coffee-operations",
      title: "Station operations",
      caption: "Cherry intake, processing stages and station activity.",
    },
    gallery: [
      {
        mockup: "coffee-operations",
        title: "Operations overview",
        caption: "Daily intake and the progress of lots through each processing stage.",
      },
      {
        mockup: "coffee-lots",
        title: "Lots, inventory & staff",
        caption: "Parchment inventory by lot, alongside workforce and reports.",
      },
    ],
    challenge: [
      "Coffee washing stations manage intense seasonal activity: cherry deliveries from many farmers, multiple processing stages, drying beds, storage and seasonal workers.",
      "Tracking this on paper makes it hard to follow each lot through processing, understand production, and report accurately.",
    ],
    solution: [
      "This platform, currently in development, is designed to digitise station workflows from cherry intake through processing to parchment inventory.",
      "It aims to give station managers structured, real-time operational data on production, resources and staff, with reports built on the same records.",
    ],
    features: [
      { title: "Coffee Intake", description: "Record cherry deliveries by farmer, weight and grade.", icon: "coffee" },
      { title: "Processing Stages", description: "Follow lots from pulping to drying and storage.", icon: "workflow" },
      { title: "Production", description: "Track output across the season.", icon: "chart" },
      { title: "Inventory", description: "Parchment stock by lot and storage location.", icon: "boxes" },
      { title: "Employees", description: "Seasonal and permanent staff management.", icon: "users" },
      { title: "Reports", description: "Operational statistics and reporting.", icon: "file-text" },
    ],
    outcome: [
      { title: "Lot Traceability", description: "Planned: follow each lot through every stage." },
      { title: "Digital Station Records", description: "Planned: replace paper logs with structured data." },
      { title: "Production Visibility", description: "Planned: clear view of seasonal output." },
      { title: "Reliable Reporting", description: "Planned: reports generated from operational data." },
    ],
    ctaLabel: "Explore Project",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(slug: string, count = 2): Project[] {
  const current = getProject(slug);
  const others = projects.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, count);
  const scored = others
    .map((p) => ({ p, score: p.filters.filter((f) => current.filters.includes(f)).length }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.p);
}
