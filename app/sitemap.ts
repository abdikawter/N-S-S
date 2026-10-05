import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = ["/", "/work", "/services", "/industries", "/about", "/contact"].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));
  const work = projects.map((p) => ({
    url: absoluteUrl(`/work/${p.slug}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...work];
}
