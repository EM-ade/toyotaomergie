"use client";

import { useIdleController } from "@/lib/useIdle";

/**
 * Mounts the idle controller once for the whole app. Renders nothing — it only
 * sets `data-idle` on <html> so CSS can pause ambient animation.
 */
export function IdleProvider() {
  useIdleController();
  return null;
}
