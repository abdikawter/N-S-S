import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/data/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description:
    "Tell us what you're trying to build. Send a project inquiry to Nile Software Solutions and let's turn the idea into a useful digital solution.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Start a Project — Nile Software Solutions", url: "/contact" },
};

export default function ContactPage() {
  return (
    <section aria-labelledby="contact-title" className="relative isolate overflow-hidden pb-24 pt-36 md:pb-36 md:pt-48">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div
        aria-hidden="true"
        className="absolute -top-48 right-0 -z-10 h-[520px] w-[760px] rounded-full bg-accent/[0.1] blur-[130px]"
      />
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
        <div className="lg:col-span-5 lg:row-start-1">
          <p className="eyebrow rise-in flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-6 bg-accent" />
            Start a project
          </p>
          <h1 id="contact-title" className="rise-in mt-6 text-display-lg font-semibold" style={{ "--d": "80ms" } as CSSProperties}>
            Tell us what you&apos;re trying to build.
          </h1>
          <p className="rise-in mt-6 max-w-md text-lg leading-relaxed text-muted" style={{ "--d": "160ms" } as CSSProperties}>
            Share a few details about your business and the problem you want to solve. We&apos;ll turn the idea into a useful digital solution.
          </p>
        </div>

        {/* On mobile the form comes straight after the intro; details follow. */}
        <div className="order-3 lg:order-none lg:col-span-5 lg:row-start-2">
          <div className="border-t border-line pt-8 lg:mt-12">
            <h2 className="eyebrow">What happens next</h2>
            <ol className="mt-6 flex flex-col gap-5">
              {[
                "We read your inquiry and reply with any questions.",
                "A short discovery call to understand the business and users.",
                "A proposal covering scope, approach and timeline.",
              ].map((s, i) => (
                <li key={s} className="flex gap-4">
                  <span className="font-mono text-sm text-accent-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[0.95rem] leading-relaxed text-fg/85">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <ul className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-[0.95rem]">
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-4 text-muted" />
              <a href={`mailto:${site.contact.email}`} className="hover:text-accent-soft">
                {site.contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden="true" className="size-4 text-muted" />
              <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="hover:text-accent-soft">
                {site.contact.phone}
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted">
              <MapPin aria-hidden="true" className="size-4" />
              {site.contact.location}
            </li>
          </ul>
        </div>
        <div className="rise-in lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1" style={{ "--d": "200ms" } as CSSProperties}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
