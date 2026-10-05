"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : () => {};

/**
 * Renders a mockup at its native design size (e.g. 1280×800) and scales it to
 * fit the container, so interfaces look like true screenshots at any width.
 */
export function ScaledFrame({
  width = 1280,
  height = 800,
  children,
  className,
  label,
}: {
  width?: number;
  height?: number;
  children: ReactNode;
  className?: string;
  label: string;
}) {
  // Below this scale UI text becomes unreadable, so on small screens the
  // frame zooms in and crops to the top-left of the interface instead of
  // shrinking the whole screen.
  const minScale = 0.42;
  const outer = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const cropped = scale !== null && scale === minScale;

  useIsoLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const update = () => setScale(Math.max(el.clientWidth / width, minScale));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={outer}
      role="img"
      aria-label={label}
      className={cn("relative w-full overflow-hidden", className)}
      style={cropped ? { aspectRatio: "4 / 3.4" } : { aspectRatio: `${width} / ${height}` }}
    >
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 origin-top-left transition-opacity duration-500"
        style={{
          width,
          height,
          transform: `scale(${scale ?? 1})`,
          opacity: scale === null ? 0 : 1,
        }}
        // Mockups are pictures: keep their internals out of the tab order.
        inert
      >
        {children}
      </div>
    </div>
  );
}
