"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { navigation } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll and support Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-expo",
          solid
            ? "border-b border-line bg-ink-950/75 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Main" className="container-site flex h-[4.5rem] items-center justify-between gap-6">
          <Logo onClick={() => setOpen(false)} />

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[0.9rem] transition-colors duration-300",
                      active ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-contrast/[0.06]"
                        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ButtonLink href="/contact" arrow className="hidden h-10 px-4 text-[0.85rem] sm:inline-flex">
              Start a Project
            </ButtonLink>
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              className="relative grid size-11 place-items-center rounded-full border border-line bg-contrast/[0.03] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-[18px]" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-full rounded bg-fg transition-transform duration-300 ease-out-expo",
                    open ? "top-[5px] rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-full rounded bg-fg transition-transform duration-300 ease-out-expo",
                    open ? "top-[5px] -rotate-45" : "top-[10px]",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-ink-950/[0.97] backdrop-blur-xl lg:hidden"
          >
            <div className="container-site flex min-h-full flex-col justify-between pb-10 pt-8">
              <ul className="flex flex-col">
                {navigation.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.5 }}
                      className="border-b border-line"
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className="flex items-center justify-between py-5 font-display text-[1.75rem] font-medium tracking-tight"
                      >
                        <span className={active ? "text-fg" : "text-fg/80"}>{item.label}</span>
                        <ArrowRight aria-hidden="true" className="size-5 text-subtle" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-10 flex flex-col gap-4"
              >
                <ButtonLink href="/contact" size="lg" arrow className="w-full">
                  Start a Project
                </ButtonLink>
                <p className="text-center text-sm text-muted">Nile Software Solutions</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
