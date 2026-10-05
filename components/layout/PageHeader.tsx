import type { CSSProperties, ReactNode } from "react";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Header for inner pages. Animates in CSS so it shows without waiting for JS. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden pb-14 pt-36 md:pb-20 md:pt-48">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -top-48 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/[0.1] blur-[130px]"
      />
      <div className="container-site">
        <p className="eyebrow rise-in flex items-center gap-3" style={delay(0)}>
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          {eyebrow}
        </p>
        <h1 className="rise-in mt-6 max-w-4xl text-display-xl font-semibold text-fg" style={delay(80)}>
          {title}
        </h1>
        {description && (
          <p className="rise-in mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={delay(160)}>
            {description}
          </p>
        )}
        {children && (
          <div className="rise-in mt-10" style={delay(240)}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
