"use client";

import dynamic from "next/dynamic";
import { useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NileFlow } from "@/components/three/NileFlow";
import { FloatingPanels } from "./FloatingPanels";
import { useTheme } from "@/lib/use-theme";
import { cn } from "@/lib/utils";

// Three.js is code-split and only fetched on capable desktop devices.
const NileScene = dynamic(() => import("@/components/three/NileScene"), { ssr: false });

type Mode = "fallback" | "3d";

function canUse3D(): boolean {
  if (typeof window === "undefined") return false;
  const wide = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  const saveData = nav.connection?.saveData === true;
  const lowEnd = (nav.hardwareConcurrency ?? 8) < 4 || (nav.deviceMemory ?? 8) < 4;
  if (!wide || saveData || lowEnd) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") ?? c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function HeroVisual({ variant = "full" }: { variant?: "full" | "band" }) {
  const full = variant === "full";
  const reduced = useReducedMotion();
  const [mode, setMode] = useState<Mode>("fallback");
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // The 3D flow is additive light and disappears on a light background, so the
  // light theme keeps the SVG flow.
  const theme = useTheme();
  const show3D = mode === "3d" && theme === "dark";

  useEffect(() => {
    if (!show3D) setReady(false);
  }, [show3D]);

  // Decide on 3D only after the page is idle so it never competes with first paint.
  useEffect(() => {
    if (!full || reduced || !canUse3D()) return;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMode("3d"), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setMode("3d"), 600);
    return () => window.clearTimeout(t);
  }, [reduced, full]);

  // Pause the render loop when the hero is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry?.isIntersecting ?? true), {
      rootMargin: "100px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!full || reduced) return;
    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [full, reduced, pointerX, pointerY]);

  return (
    <div ref={ref} className="absolute inset-0">
      {/* Fallback is always rendered first; it fades out once WebGL is ready. */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          ready ? "opacity-0" : "opacity-100",
          full && "left-[28%]",
        )}
      >
        <NileFlow id={`hero-flow-${variant}`} />
      </div>

      {show3D && (
        <div className={cn("absolute inset-0 transition-opacity duration-[1400ms]", ready ? "opacity-100" : "opacity-0")}>
          <NileScene animate={!reduced} paused={!inView} onReady={() => setReady(true)} />
        </div>
      )}

      {full && <FloatingPanels pointerX={pointerX} pointerY={pointerY} />}
    </div>
  );
}
