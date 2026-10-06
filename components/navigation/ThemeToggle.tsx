"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import { applyTheme, readStoredTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Switches between the dark and light themes and remembers the choice.
 * The icon is chosen in CSS from <html data-theme>, so it is correct from the
 * first paint, before React hydrates.
 */
export function ThemeToggle({ className }: { className?: string }) {
  // In development React's Strict Mode remount resets <html> attributes, clearing
  // the one set by the inline script; re-apply it. A no-op in production.
  useLayoutEffect(() => {
    const stored = readStoredTheme();
    if (document.documentElement.getAttribute("data-theme") !== stored) {
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const toggle = () => {
    const isLight = document.documentElement.getAttribute("data-theme") === "light";
    applyTheme(isLight ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full border border-line bg-contrast/[0.03] text-muted transition-colors duration-300 hover:border-line-strong hover:text-fg",
        className,
      )}
    >
      <Sun aria-hidden="true" className="size-[18px] light:hidden" strokeWidth={1.8} />
      <Moon aria-hidden="true" className="hidden size-[18px] light:block" strokeWidth={1.8} />
    </button>
  );
}
