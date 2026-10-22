import { cx } from "@/lib/cx";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  /** Background tone. Sections separate by tone, not by borders. */
  tone?: "paper" | "sunk" | "raised" | "night";
  /** Vertical rhythm. */
  pad?: "sm" | "md" | "lg" | "none";
  id?: string;
  /** Renders a hairline rule at the top of the section. */
  divider?: boolean;
  "aria-labelledby"?: string;
}

export function Section({
  children,
  className,
  tone = "paper",
  pad = "lg",
  id,
  divider = false,
  "aria-labelledby": labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        "section",
        `section--${tone}`,
        pad !== "none" && `section--pad-${pad}`,
        divider && "section--divider",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Right-aligned action, e.g. a "view all" link. */
  action?: ReactNode;
  id?: string;
  className?: string;
  /** "editorial" places the head in the left column of a 12-col grid. */
  layout?: "stacked" | "split";
  eyebrowTone?: "default" | "red";
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  action,
  id,
  className,
  layout = "stacked",
  eyebrowTone = "default",
}: SectionHeadProps) {
  if (layout === "split") {
    return (
      <div className={cx("section-head section-head--split", className)}>
        <div className="section-head__lead">
          {eyebrow && (
            <p
              className={cx(
                "eyebrow",
                eyebrowTone === "red" && "eyebrow--red",
              )}
            >
              {eyebrow}
            </p>
          )}
          <h2 id={id} className="display-3 section-head__title">
            {title}
          </h2>
        </div>
        <div className="section-head__aside">
          {lede && <div className="lede">{lede}</div>}
          {action && <div className="section-head__action">{action}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={cx("section-head", className)}>
      {eyebrow && (
        <p className={cx("eyebrow", eyebrowTone === "red" && "eyebrow--red")}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="display-3 section-head__title">
        {title}
      </h2>
      {lede && <div className="lede section-head__lede">{lede}</div>}
      {action && <div className="section-head__action">{action}</div>}
    </div>
  );
}
