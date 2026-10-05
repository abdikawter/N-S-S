/**
 * Project inquiry shape and validation, shared by the client form and the
 * API route so rules never drift apart.
 */

export const projectTypes = [
  "Business Management System",
  "AI-Powered Application",
  "Web Platform / Marketplace",
  "E-commerce",
  "Custom Software",
  "Not sure yet",
] as const;

// PLACEHOLDER — adjust ranges and currency to how Nile quotes projects.
export const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $40,000",
  "$40,000+",
  "Not sure yet",
] as const;

export interface Inquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

export type InquiryField = keyof Inquiry;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const emptyInquiry: Inquiry = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  message: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s\d]{7,20}$/;

export function validateInquiry(data: Inquiry): InquiryErrors {
  const e: InquiryErrors = {};
  const name = data.name.trim();
  if (!name) e.name = "Please tell us your name.";
  else if (name.length > 100) e.name = "Name is too long.";

  if (data.company.length > 120) e.company = "Company name is too long.";

  const email = data.email.trim();
  if (!email) e.email = "We need an email address to reply.";
  else if (!EMAIL.test(email)) e.email = "Enter a valid email, like name@company.com.";

  if (data.phone.trim() && !PHONE.test(data.phone.trim())) e.phone = "Enter a valid phone number, including country code.";

  if (!data.projectType) e.projectType = "Choose the type of project.";
  else if (!(projectTypes as readonly string[]).includes(data.projectType)) e.projectType = "Choose an option from the list.";

  if (data.budget && !(budgetRanges as readonly string[]).includes(data.budget)) e.budget = "Choose an option from the list.";

  const message = data.message.trim();
  if (!message) e.message = "Tell us a little about the project.";
  else if (message.length < 20) e.message = "A few more details help us respond well (20+ characters).";
  else if (message.length > 4000) e.message = "Please keep the message under 4,000 characters.";

  return e;
}

/** Coerce unknown JSON into an Inquiry (strings only). */
export function parseInquiry(input: unknown): Inquiry {
  const src = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const s = (k: InquiryField) => (typeof src[k] === "string" ? (src[k] as string) : "");
  return {
    name: s("name"),
    company: s("company"),
    email: s("email"),
    phone: s("phone"),
    projectType: s("projectType"),
    budget: s("budget"),
    message: s("message"),
  };
}
