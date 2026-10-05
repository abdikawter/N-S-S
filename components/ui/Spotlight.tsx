"use client";

import type { ReactNode, PointerEvent } from "react";

/**
 * Sets --spot-x / --spot-y on whichever `[data-spot]` child is under the
 * pointer, so cards can paint a soft light that follows the cursor (CSS only).
 */
export function Spotlight({ children, className }: { children: ReactNode; className?: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest<HTMLElement>("[data-spot]");
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    card.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };
  return (
    <div className={className} onPointerMove={onMove}>
      {children}
    </div>
  );
}
