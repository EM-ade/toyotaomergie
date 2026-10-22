"use client";

import { useState, useId } from "react";
import { cx } from "@/lib/cx";

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  meta?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Allow several open at once. FAQ uses single-open for scanability. */
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

/**
 * Accessible accordion. Each trigger is a real <button> with aria-expanded and
 * aria-controls; the panel uses the grid-template-rows 0fr->1fr technique so
 * the height animates without measuring in JS, and content stays in the DOM
 * (good for find-in-page and search engines).
 */
export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenId,
  className,
}: AccordionProps) {
  const [open, setOpen] = useState<string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );
  const baseId = useId();

  const toggle = (id: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(id);
      if (isOpen) return prev.filter((x) => x !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={cx("accordion", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(item.id);
        const panelId = `${baseId}-panel-${item.id}`;
        const triggerId = `${baseId}-trigger-${item.id}`;
        return (
          <div
            key={item.id}
            className="accordion__item"
            data-open={isOpen ? "true" : "false"}
          >
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={triggerId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className="accordion__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="accordion__question">{item.question}</span>
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className="accordion__panel"
              hidden={!isOpen}
            >
              <div>
                <div className="accordion__answer">
                  {item.answer}
                  {item.meta && (
                    <div style={{ marginTop: "0.75rem" }}>{item.meta}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
