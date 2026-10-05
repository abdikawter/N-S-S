"use client";

import { motion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Bot, Building2, HeartPulse, Store, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelDef {
  label: string;
  icon: ReactNode;
  body: ReactNode;
  className: string;
  depth: number;
  float: number;
}

function Bars() {
  return (
    <div className="flex h-7 items-end gap-1">
      {[40, 64, 52, 78, 60, 92, 70].map((h, i) => (
        <span
          key={i}
          className="w-1.5 rounded-sm bg-gradient-to-t from-accent/40 to-accent"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function Pulse() {
  return (
    <svg viewBox="0 0 120 28" className="h-7 w-[7.5rem]" aria-hidden="true">
      <path
        d="M0 16h28l5-9 6 18 6-14 4 5h71"
        fill="none"
        stroke="#36D6C5"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Typing() {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[0.68rem] text-fg/80">Finding options…</span>
      <span className="flex gap-0.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1 animate-pulse-soft rounded-full bg-teal"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </span>
    </div>
  );
}

function Tiles() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {["from-accent/50", "from-teal/40", "from-white/20"].map((c, i) => (
        <span key={i} className={cn("h-6 w-8 rounded-md bg-gradient-to-br to-transparent", c)} />
      ))}
    </div>
  );
}

function Flow() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full", i === 2 ? "bg-teal" : "bg-accent")} />
          {i < 2 && <span className="h-px w-5 bg-gradient-to-r from-accent to-teal" />}
        </span>
      ))}
      <span className="ml-1 text-[0.68rem] text-fg/70">Auto</span>
    </div>
  );
}

const panels: PanelDef[] = [
  {
    label: "AI",
    icon: <Bot className="size-3.5" />,
    body: <Typing />,
    className: "left-[64%] top-[13%]",
    depth: 26,
    float: 0,
  },
  {
    label: "Business Systems",
    icon: <Building2 className="size-3.5" />,
    body: <Bars />,
    className: "left-[78%] top-[30%]",
    depth: 18,
    float: 1.2,
  },
  {
    label: "Healthcare",
    icon: <HeartPulse className="size-3.5" />,
    body: <Pulse />,
    className: "left-[60%] top-[63%]",
    depth: 34,
    float: 2.1,
  },
  {
    label: "Marketplaces",
    icon: <Store className="size-3.5" />,
    body: <Tiles />,
    className: "left-[83%] top-[66%]",
    depth: 14,
    float: 0.7,
  },
  {
    label: "Automation",
    icon: <Workflow className="size-3.5" />,
    body: <Flow />,
    className: "left-[70%] top-[46%]",
    depth: 22,
    float: 1.7,
  },
];

function Panel({ p, mx, my, index }: { p: PanelDef; mx: MotionValue<number>; my: MotionValue<number>; index: number }) {
  const x = useTransform(mx, (v) => v * p.depth);
  const y = useTransform(my, (v) => v * p.depth);
  return (
    <motion.div className={cn("absolute", p.className)} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.6 + index * 0.12 },
          scale: { duration: 0.8, delay: 0.6 + index * 0.12 },
          y: { duration: 6 + p.float, repeat: Infinity, ease: "easeInOut", delay: p.float },
        }}
        className="glass flex min-w-[9.5rem] flex-col gap-2.5 rounded-xl px-3.5 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
      >
        <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
          <span className="grid size-5 place-items-center rounded-md bg-white/[0.06] text-accent-soft">{p.icon}</span>
          {p.label}
        </span>
        {p.body}
      </motion.div>
    </motion.div>
  );
}

/** DOM panels floating over the 3D flow. Parallax follows the pointer. */
export function FloatingPanels({ pointerX, pointerY }: { pointerX: MotionValue<number>; pointerY: MotionValue<number> }) {
  const mx = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const my = useSpring(pointerY, { stiffness: 60, damping: 20 });
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-[4%]">
      {panels.map((p, i) => (
        <Panel key={p.label} p={p} mx={mx} my={my} index={i} />
      ))}
    </div>
  );
}
