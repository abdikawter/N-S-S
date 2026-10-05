import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center pt-24">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="container-site">
        <p className="eyebrow">404</p>
        <h1 className="mt-6 max-w-2xl text-display-lg font-semibold">This page doesn&apos;t exist.</h1>
        <p className="mt-6 max-w-md text-lg text-muted">The link may be outdated, or the page may have moved.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/work" size="lg" variant="secondary">
            Explore Our Work
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
