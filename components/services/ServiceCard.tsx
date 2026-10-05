import Link from "next/link";
import { Check } from "lucide-react";
import type { Service } from "@/data/services";
import { getProject } from "@/data/projects";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { pad } from "@/lib/utils";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const proof = service.proof.map(getProject).filter((p) => p !== undefined);
  return (
    <Reveal
      as="article"
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className="group surface relative scroll-mt-28 overflow-hidden rounded-3xl p-7 transition-colors duration-500 hover:border-line-strong md:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />
      <div className="relative flex items-start justify-between gap-6">
        <span className="grid size-12 place-items-center rounded-2xl border border-line bg-white/[0.03] text-accent-soft">
          <Icon name={service.icon} className="size-5" />
        </span>
        <span className="font-mono text-sm text-subtle">{pad(index + 1)}</span>
      </div>
      <h3 id={`${service.id}-title`} className="relative mt-8 text-2xl font-semibold tracking-tight text-fg md:text-[1.75rem]">
        {service.title}
      </h3>
      <p className="relative mt-4 max-w-xl leading-relaxed text-muted">{service.summary}</p>

      <ul className="relative mt-8 grid gap-x-6 gap-y-3 border-t border-line pt-7 sm:grid-cols-2">
        {service.items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-[0.95rem] text-fg/90">
            <Check aria-hidden="true" className="size-4 shrink-0 text-teal" strokeWidth={2} />
            {item}
          </li>
        ))}
      </ul>

      {proof.length > 0 && (
        <p className="relative mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
          <span className="eyebrow">Related work</span>
          {proof.map((p, i) => (
            <span key={p.slug} className="flex items-center gap-3">
              <Link href={`/work/${p.slug}`} className="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent">
                {p.title}
              </Link>
              {i < proof.length - 1 && <span aria-hidden="true" className="text-subtle">/</span>}
            </span>
          ))}
        </p>
      )}
    </Reveal>
  );
}
