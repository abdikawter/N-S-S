import { site, socialLinks } from "@/data/site";

/** Organization structured data for search engines. */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    email: site.contact.email,
    address: { "@type": "PostalAddress", addressLocality: "Addis Ababa", addressCountry: "ET" },
    sameAs: socialLinks.filter((s) => s.href).map((s) => s.href),
  };
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be injected as raw JSON.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
