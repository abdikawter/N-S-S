import { Info } from "lucide-react";
import { companyStats } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Company statistics, driven by `data/site.ts`. While the figures are
 * unconfirmed they are visibly marked as placeholders so nothing unverified
 * is ever presented as fact.
 */
export function Stats() {
  const { confirmed, items } = companyStats;
  return (
    <section aria-labelledby="stats-title" className="relative border-t border-line py-16 md:py-24">
      <div className="container-site">
        <h2 id="stats-title" className="sr-only">
          Company at a glance
        </h2>
        <Reveal>
          <dl className={cn("grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4", !confirmed && "border-dashed")}>
            {items.map((s) => (
              <div key={s.label} className="flex flex-col gap-3 bg-ink-950 p-6 md:p-10">
                <dt className="order-2 text-sm text-muted md:text-base">{s.label}</dt>
                <dd className="order-1 font-display text-4xl font-semibold tracking-tight text-fg md:text-6xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        {!confirmed && (
          <p className="mt-4 flex items-center gap-2 text-xs text-subtle">
            <Info aria-hidden="true" className="size-3.5" />
            Placeholder figures — to be confirmed before publishing (edit <code className="font-mono">data/site.ts</code>).
          </p>
        )}
      </div>
    </section>
  );
}
