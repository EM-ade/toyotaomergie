"use client";

import { useReveal } from "@/lib/useReveal";
import { cx } from "@/lib/cx";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger in ms, applied via a CSS custom property. */
  delay?: number;
  as?: ElementType;
}

/**
 * Wraps content so it fades/rises in once when it enters view. Content is in
 * the DOM regardless, and reduced-motion renders it immediately.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      data-revealed={revealed ? "true" : "false"}
      className={cx("reveal", className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
