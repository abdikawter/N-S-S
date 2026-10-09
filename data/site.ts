/**
 * Site-wide configuration. Edit values here; components read from this file.
 */

export const site = {
  name: "Nile Software Solutions",
  shortName: "NILE",
  tagline: "Software that solves real business problems.",
  headline: "We Build Software for Businesses Ready to Grow.",
  description:
    "From business management systems to AI-powered platforms, we design and build digital solutions that solve real business problems — at prices that work for growing businesses.",
  // PLACEHOLDER — replace with the production domain before launch (also set NEXT_PUBLIC_SITE_URL).
  url: "https://nilesoftware.example",
  locale: "en_US",
  // PLACEHOLDER — confirm the public contact details.
  contact: {
    email: "hello@nilesoftware.example",
    phone: "+251 900 000 000",
    location: "Addis Ababa, Ethiopia",
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navigation: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type SocialPlatform = "linkedin" | "github" | "x" | "telegram" | "facebook" | "instagram";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

/**
 * Social profiles shown in the footer. Leave `href` empty to hide a link.
 * PLACEHOLDER — add the company's real profile URLs.
 */
export const socialLinks: SocialLink[] = [
  { platform: "linkedin", label: "LinkedIn", href: "" },
  { platform: "github", label: "GitHub", href: "" },
  { platform: "x", label: "X", href: "" },
  { platform: "telegram", label: "Telegram", href: "" },
];

export interface Stat {
  value: string;
  label: string;
}

/**
 * Company statistics.
 * IMPORTANT: these are PLACEHOLDERS. While `confirmed` is false the section
 * is visibly labelled as placeholder content. Replace the values with
 * verified figures, then set `confirmed: true`.
 */
export const companyStats: { confirmed: boolean; items: Stat[] } = {
  confirmed: false,
  items: [
    { value: "10+", label: "Projects Delivered" },
    { value: "8+", label: "Business Solutions" },
    { value: "6+", label: "Industries" },
    { value: "20+", label: "Technologies & Tools" },
  ],
};
