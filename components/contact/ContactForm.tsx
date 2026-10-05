"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  budgetRanges,
  emptyInquiry,
  projectTypes,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
} from "@/lib/inquiry/schema";
import { submitInquiry } from "@/lib/inquiry/client";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const fieldOrder: InquiryField[] = ["name", "company", "email", "phone", "projectType", "budget", "message"];

const inputBase =
  "w-full rounded-xl border bg-white/[0.025] px-4 text-[0.95rem] text-fg placeholder:text-subtle transition-[border-color,background-color,box-shadow] duration-200 hover:border-line-strong focus:border-accent focus:bg-white/[0.04] focus:outline-none focus:ring-4 focus:ring-accent/15";

function Field({
  id,
  label,
  optional,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium text-fg/90">
        {label}
        {optional ? <span className="text-xs font-normal text-subtle">Optional</span> : <span className="sr-only">(required)</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-[0.82rem] text-[#FF8A8A]"
          >
            <AlertCircle aria-hidden="true" className="size-3.5 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const [data, setData] = useState<Inquiry>(emptyInquiry);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const update = (field: InquiryField) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...data, [field]: e.target.value };
    setData(next);
    // Re-validate as the visitor fixes a field they've already left.
    if (touched[field] || errors[field]) {
      const v = validateInquiry(next);
      setErrors((prev) => ({ ...prev, [field]: v[field] }));
    }
  };

  const blur = (field: InquiryField) => () => {
    setTouched((t) => ({ ...t, [field]: true }));
    const v = validateInquiry(data);
    setErrors((prev) => ({ ...prev, [field]: v[field] }));
  };

  const focusFirstError = (errs: InquiryErrors) => {
    const first = fieldOrder.find((f) => errs[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const v = validateInquiry(data);
    setErrors(v);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    if (Object.keys(v).length) {
      focusFirstError(v);
      return;
    }
    setStatus("submitting");
    setServerError(null);
    const result = await submitInquiry({ ...data, website: honeypot });
    if (result.ok) {
      setStatus("success");
      return;
    }
    if (result.errors) {
      setErrors(result.errors);
      focusFirstError(result.errors);
    }
    setServerError(result.error ?? "Something went wrong. Please try again.");
    setStatus("error");
  }

  const describe = (f: InquiryField) => (errors[f] ? `${id(f)}-error` : undefined);
  const errClass = (f: InquiryField) => (errors[f] ? "border-[#FF8A8A]/60" : "border-line");

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="surface flex flex-col items-start gap-5 rounded-3xl p-8 md:p-12"
      >
        <span className="grid size-14 place-items-center rounded-2xl bg-teal/10 text-teal">
          <CheckCircle2 aria-hidden="true" className="size-7" />
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Thank you, {data.name.split(" ")[0]}.</h2>
        <p className="max-w-md leading-relaxed text-muted">
          Your project inquiry has been received. We&apos;ll review the details and reply to <span className="text-fg">{data.email}</span>.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            setData(emptyInquiry);
            setErrors({});
            setTouched({});
            setStatus("idle");
          }}
        >
          Send another inquiry
        </Button>
      </motion.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} className="surface rounded-3xl p-6 md:p-10">
      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.div
            role="alert"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-8 flex items-start gap-3 rounded-xl border border-[#FF8A8A]/30 bg-[#FF8A8A]/[0.07] p-4 text-sm text-[#FFC2C2]"
          >
            <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <span>{serverError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <fieldset disabled={submitting} className="grid gap-6 md:grid-cols-2">
        <legend className="sr-only">Project inquiry</legend>

        <Field id={id("name")} label="Name" error={errors.name}>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={update("name")}
            onBlur={blur("name")}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            aria-required="true"
            className={cn(inputBase, "h-12", errClass("name"))}
            placeholder="Your full name"
          />
        </Field>

        <Field id={id("company")} label="Company" optional error={errors.company}>
          <input
            id={id("company")}
            name="company"
            autoComplete="organization"
            value={data.company}
            onChange={update("company")}
            onBlur={blur("company")}
            aria-invalid={!!errors.company}
            aria-describedby={describe("company")}
            className={cn(inputBase, "h-12", errClass("company"))}
            placeholder="Company or organisation"
          />
        </Field>

        <Field id={id("email")} label="Email" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={data.email}
            onChange={update("email")}
            onBlur={blur("email")}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            aria-required="true"
            className={cn(inputBase, "h-12", errClass("email"))}
            placeholder="name@company.com"
          />
        </Field>

        <Field id={id("phone")} label="Phone" optional error={errors.phone}>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={data.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={describe("phone")}
            className={cn(inputBase, "h-12", errClass("phone"))}
            placeholder="+251 ..."
          />
        </Field>

        <Field id={id("projectType")} label="Project type" error={errors.projectType}>
          <div className="relative">
            <select
              id={id("projectType")}
              name="projectType"
              value={data.projectType}
              onChange={update("projectType")}
              onBlur={blur("projectType")}
              aria-invalid={!!errors.projectType}
              aria-describedby={describe("projectType")}
              aria-required="true"
              className={cn(inputBase, "h-12 appearance-none pr-10", !data.projectType && "text-subtle", errClass("projectType"))}
            >
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((p) => (
                <option key={p} value={p} className="bg-ink-900 text-fg">
                  {p}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field id={id("budget")} label="Budget" optional error={errors.budget}>
          <div className="relative">
            <select
              id={id("budget")}
              name="budget"
              value={data.budget}
              onChange={update("budget")}
              onBlur={blur("budget")}
              aria-invalid={!!errors.budget}
              aria-describedby={describe("budget")}
              className={cn(inputBase, "h-12 appearance-none pr-10", !data.budget && "text-subtle", errClass("budget"))}
            >
              <option value="">Select a range</option>
              {budgetRanges.map((b) => (
                <option key={b} value={b} className="bg-ink-900 text-fg">
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          </div>
        </Field>

        <Field id={id("message")} label="Message" error={errors.message} className="md:col-span-2">
          <textarea
            id={id("message")}
            name="message"
            rows={6}
            value={data.message}
            onChange={update("message")}
            onBlur={blur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={describe("message")}
            aria-required="true"
            className={cn(inputBase, "resize-y py-3.5 leading-relaxed", errClass("message"))}
            placeholder="What are you trying to build? What problem should it solve, and who will use it?"
          />
        </Field>

        {/* Honeypot (hidden from people and assistive tech) */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
          </label>
        </div>

        <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-subtle">We’ll review your details and reply by email.</p>
          <Button type="submit" size="lg" arrow={!submitting} className="w-full md:w-auto">
            {submitting ? (
              <>
                <Loader2 aria-hidden="true" className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Send Project Inquiry"
            )}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
