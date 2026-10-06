"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_THEME, type Theme } from "./theme";

// The <html data-theme> attribute is the source of truth; components subscribe to it.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** Current theme. Renders the default on the server, then the real value. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_THEME);
}
