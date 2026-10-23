"use client";

import { useEffect } from "react";

/**
 * Idle controller.
 *
 * Sets `data-idle="true|false"` on <html> so ambient animations can be paused
 * purely in CSS (`animation-play-state`) — there is no per-component JS.
 *
 * - Starts active so the hero drifts immediately on load.
 * - Drops to inactive on any real interaction, and returns after IDLE_MS.
 * - Honours `prefers-reduced-motion` by staying inactive permanently.
 *
 * Pausing (rather than removing the animation) avoids a restart flash when
 * activity resumes mid-loop.
 */
const IDLE_MS = 5000;

export function useIdleController() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      root.dataset.idle = "false";
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    const goIdle = () => {
      root.dataset.idle = "true";
    };

    const onActivity = () => {
      if (root.dataset.idle !== "false") root.dataset.idle = "false";
      if (timer) clearTimeout(timer);
      timer = setTimeout(goIdle, IDLE_MS);
    };

    goIdle();

    const events = ["scroll", "pointerdown", "keydown", "touchstart", "wheel"] as const;
    for (const evt of events) {
      window.addEventListener(evt, onActivity, { passive: true });
    }

    // Pause ambient motion while the tab is hidden.
    const onVisibility = () => {
      if (document.hidden) {
        root.dataset.idle = "false";
        if (timer) clearTimeout(timer);
      } else {
        onActivity();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (timer) clearTimeout(timer);
      for (const evt of events) window.removeEventListener(evt, onActivity);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
}
