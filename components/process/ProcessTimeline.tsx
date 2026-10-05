"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { processSteps } from "@/data/process";
import { pad } from "@/lib/utils";

/** Vertical timeline whose rail fills as the visitor scrolls through it. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative flex flex-col">
      <span aria-hidden="true" className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line md:left-[1.65rem]" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: fill }}
        className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-gradient-to-b from-accent to-teal md:left-[1.65rem]"
      />
      {processSteps.map((step, i) => (
        <motion.li
          key={step.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group relative grid grid-cols-[2.8rem_1fr] gap-5 py-6 md:grid-cols-[3.3rem_1fr] md:gap-8 md:py-8"
        >
          <span className="relative z-10 grid size-11 place-items-center rounded-full border border-line-strong bg-ink-950 font-mono text-[0.8rem] text-fg transition-colors duration-500 group-hover:border-accent md:size-[3.3rem] md:text-sm">
            {pad(i + 1)}
          </span>
          <div className="flex flex-col gap-5 border-b border-line pb-8 group-last:border-0 md:flex-row md:items-start md:justify-between md:gap-10">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-fg md:text-[1.75rem]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2 md:max-w-[16rem] md:justify-end md:pt-1.5" aria-label={`${step.title} activities`}>
              {step.activities.map((a) => (
                <li key={a} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
