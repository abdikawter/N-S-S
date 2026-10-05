import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Absolute URL for a site path, used by metadata, sitemap and Open Graph. */
export function absoluteUrl(path = "/"): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nilesoftware.example";
  return new URL(path, base).toString();
}

/** Zero-pad an index for editorial numbering: 1 -> "01". */
export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
