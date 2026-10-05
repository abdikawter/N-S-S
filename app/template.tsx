"use client";

import { motion } from "motion/react";
import { useEffect, type ReactNode } from "react";

// The first render (server + hydration) is shown immediately so content is
// never hidden behind JavaScript; later client navigations fade in.
let hasNavigated = false;

/** Page transition: a short fade on every client-side route change. */
export default function Template({ children }: { children: ReactNode }) {
  const animateIn = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
