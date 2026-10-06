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
  | "erp-storekeeper"
  | "erp-stock"
  | "erp-sale"
  | "storefront-flow"
  | "storefront-owner"
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
    slug: "furniture-erp",
    title: "Furniture ERP",
    fullTitle: "Furniture ERP System",
    category: "Business Management / ERP",
    description:
      "An ERP system for a multi-branch furniture business, connecting showrooms and the central warehouse through stock requests, transfers, sales, customer credit and payments.",
    status: "delivered",
    filters: ["business"],
    tags: ["ERP", "Multi-branch Inventory", "Sales & Credit"],
    // PLACEHOLDER — confirm the stack used for the Furniture ERP.
    technologies: ["React", "TypeScript", "Django", "PostgreSQL", "REST APIs"],
    image: {
      mockup: "erp-storekeeper",
      title: "Storekeeper home",
      caption: "Stock requests from the branches, low stock and goods in transit.",
    },
    gallery: [
      {
        mockup: "erp-storekeeper",
        title: "Warehouse requests",
        caption: "The storekeeper acknowledges, releases or rejects stock requests from each branch.",
      },
      {
        mockup: "erp-stock",
        title: "Stock across all locations",
        caption: "Every product by branch, warehouse and in transit, with reserved quantities and minimums.",
      },
      {
        mockup: "erp-sale",
        title: "New sale",
        caption: "Branch sales that draw on warehouse stock, with receipts, partial payment and credit limits.",
      },
    ],
    challenge: [
      "A furniture business that sells from several showrooms and keeps most of its stock in a central warehouse depends on constant coordination: which branch has what, what has been requested, what is on the truck, and what each customer still owes.",
      "When requests travel by phone and stock is counted on paper, sales staff promise items that are not available, transfers go unrecorded and managers cannot see stock or credit across the business.",
    ],
    solution: [
      "The Furniture ERP connects showrooms, the warehouse and the office in one system. Salespeople create sales against live stock at every location; lines that need warehouse stock automatically become stock requests the storekeeper can acknowledge and release, to the branch or for customer pickup.",
      "Every movement is a numbered document — sale, stock request, release, transfer, receipt, adjustment — so stock, customer credit and payments always reconcile, and each role sees only the actions it is allowed to take.",
    ],
    features: [
      { title: "Multi-location Stock", description: "Stock by branch, warehouse and in transit, with minimum levels.", icon: "boxes" },
      { title: "Stock Requests & Releases", description: "Branches request; the warehouse acknowledges and releases in full or in part.", icon: "workflow" },
      { title: "Transfers", description: "Goods in transit tracked until the receiving branch confirms.", icon: "truck" },
      { title: "Sales & Receipts", description: "Walk-in and phone sales, official receipts and drafts.", icon: "receipt" },
      { title: "Customer Credit", description: "Outstanding balances and credit limits checked at every sale.", icon: "credit-card" },
      { title: "Payments", description: "Payments recorded against sales and verified by accounts.", icon: "file-text" },
      { title: "Role-Based Access", description: "Storekeepers, salespeople and accountants each see their own work.", icon: "shield" },
      { title: "Audit History", description: "Every document keeps a full history of who did what and when.", icon: "clipboard" },
    ],
    outcome: [
      { title: "One View of Stock", description: "Every branch and the warehouse in a single, current picture." },
      { title: "Coordinated Branches", description: "Requests, releases and transfers replace phone calls and paper." },
      { title: "Controlled Credit", description: "Customer balances and limits visible before a sale is confirmed." },
      { title: "Traceable Documents", description: "Numbered records for every sale, movement and payment." },
    ],
    ctaLabel: "View Case Study",
  },
  {
    slug: "storefront-et",
    title: "StoreFront.et",
    fullTitle: "AI-Assisted Telegram Commerce Platform",
    category: "AI / Social Commerce",
    description:
      "A platform that lets Ethiopian shops sell straight from their Telegram channel: customers order through the shop’s own AI-assisted bot in Amharic or English, staff confirm orders in their group, and stock updates itself.",
    status: "delivered",
    filters: ["ai", "marketplaces"],
    tags: ["AI Bot", "Telegram Commerce", "SaaS"],
    // PLACEHOLDER — confirm the stack and AI provider used.
    technologies: ["Python", "Node.js", "PostgreSQL", "Telegram Bot API", "AI Integrations"],
    image: {
      mockup: "storefront-flow",
      title: "Order flow",
      caption: "From a channel post to a confirmed order in the staff group.",
    },
    gallery: [
      {
        mockup: "storefront-flow",
        title: "Channel, bot and staff group",
        caption: "Customers tap Order on a post, the bot takes the order, and staff confirm it in their group.",
      },
      {
        mockup: "storefront-owner",
        title: "The owner’s view",
        caption: "Sales by channel, best sellers, discounts by staff, and stock by colour and size.",
      },
    ],
    challenge: [
      "Many Ethiopian shops sell through Telegram channels, but every order is handled by hand: the same price and size questions all day, messages that arrive at night and go unanswered, and a channel that says “available” when the shelf is empty.",
      "Sales made in the physical shop are invisible next to Telegram orders, so owners cannot see what sold, who sold it, or what discounts were given.",
    ],
    solution: [
      "StoreFront.et gives each shop its own bot connected to its channel and staff group. Customers tap Order on a post and choose colour, size, delivery and payment with buttons; AI helps the bot understand messages written in their own words, while prices, stock and payments always come from the shop.",
      "Orders arrive in the staff group ready to confirm, in-shop sales are recorded from the phone, and every sale updates stock and the channel post — showing SOLD OUT automatically. The owner gets a dashboard inside Telegram, with nothing to install.",
    ],
    features: [
      { title: "Order from the Channel", description: "Customers order from a post with buttons, no app to install.", icon: "shopping-cart" },
      { title: "AI-Assisted Bot", description: "Understands Amharic and English in the customer’s own words.", icon: "bot" },
      { title: "Staff Group Orders", description: "Orders and payment screenshots land in the staff group to confirm.", icon: "users" },
      { title: "Self-Updating Stock", description: "Every sale updates stock by colour and size, and the channel post.", icon: "boxes" },
      { title: "In-Shop Sales", description: "Walk-in sales recorded from the phone, with discount limits.", icon: "store" },
      { title: "Owner Dashboard", description: "Sales, best sellers and discounts by staff, inside Telegram.", icon: "chart" },
      { title: "Human Handover", description: "Bargaining, complaints or unclear requests go to a person.", icon: "message" },
    ],
    outcome: [
      { title: "Open Around the Clock", description: "Orders taken any time, without staff answering every message." },
      { title: "Accurate Availability", description: "Customers only see what is really in stock." },
      { title: "One Record of Sales", description: "Telegram and in-shop sales tracked together." },
      { title: "AI with Guardrails", description: "Helpful automation, with prices and payments controlled by the shop." },
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
    status: "delivered",
    filters: ["agriculture", "business"],
    tags: ["Agriculture", "Operations", "Traceability"],
    // PLACEHOLDER — confirm the stack used for the washing station system.
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
      "The platform digitises station workflows from cherry intake through processing to parchment inventory, so every lot can be followed from the farmer to the warehouse.",
      "Station managers get structured, real-time operational data on production, resources and staff, with reports built on the same records.",
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
      { title: "Lot Traceability", description: "Each lot followed through every processing stage." },
      { title: "Digital Station Records", description: "Paper logs replaced with structured, searchable records." },
      { title: "Production Visibility", description: "A clear view of output across the season." },
      { title: "Reliable Reporting", description: "Reports generated directly from operational data." },
    ],
    ctaLabel: "View Case Study",
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
