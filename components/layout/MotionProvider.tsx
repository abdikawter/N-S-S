"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Global motion settings: honour the OS reduced-motion preference everywhere. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </MotionConfig>
  );
}
