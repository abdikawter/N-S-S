import Link from "next/link";
import { navigation, site, socialLinks } from "@/data/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const socials = socialLinks.filter((s) => s.href);
  const year = 2026;

  return (
    <footer className="relative border-t border-line bg-ink-950">
      <div className="container-site grid gap-14 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-6 max-w-xs font-display text-xl leading-snug tracking-tight text-fg">
            {site.tagline}
          </p>
          <address className="mt-6 flex flex-col gap-1 text-sm not-italic text-muted">
            <span>{site.contact.location}</span>
            <a href={`mailto:${site.contact.email}`} className="w-fit hover:text-fg">
              {site.contact.email}
            </a>
          </address>
          {socials.length > 0 && (
            <ul className="mt-8 flex gap-2">
              {socials.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <SocialIcon platform={s.platform} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          <div>
            <h2 className="eyebrow mb-5 font-mono">Company</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5 font-mono">Work</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link href={`/work/${p.slug}`} className="text-muted transition-colors hover:text-fg">
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className="eyebrow mb-5 font-mono">Services</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="text-muted transition-colors hover:text-fg">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Nile Software Solutions. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.14em]">Addis Ababa · Working globally</p>
        </div>
      </div>
    </footer>
  );
}
