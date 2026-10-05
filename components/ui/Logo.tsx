import Link from "next/link";
import { cn } from "@/lib/utils";

/** Mark: three flowing strokes converging — a stylised river delta / network. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={cn("size-8", className)}>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="#0D121B" stroke="rgba(255,255,255,0.12)" />
      <path d="M7 22c4 0 5-12 9-12s5 12 9 12" stroke="url(#lg-a)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 16.5c3.2 0 4.6-4 9-4s5.8 4 9 4" stroke="url(#lg-b)" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <circle cx="16" cy="10" r="1.8" fill="#F5F7FA" />
      <defs>
        <linearGradient id="lg-a" x1="7" y1="16" x2="25" y2="16" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285FF" />
          <stop offset="1" stopColor="#36D6C5" />
        </linearGradient>
        <linearGradient id="lg-b" x1="7" y1="14" x2="25" y2="14" gradientUnits="userSpaceOnUse">
          <stop stopColor="#36D6C5" />
          <stop offset="1" stopColor="#4285FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("flex items-center gap-3", className)}
      aria-label="Nile Software Solutions — home"
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.05rem] font-semibold tracking-[0.14em] text-fg">NILE</span>
        <span className="mt-1 text-[0.66rem] tracking-[0.04em] text-muted">Nile Software Solutions</span>
      </span>
    </Link>
  );
}
