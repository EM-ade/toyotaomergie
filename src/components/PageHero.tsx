import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  /** Right-hand column: an image, a stat block, or nothing. */
  aside?: ReactNode;
  tone?: "paper" | "sunk";
  className?: string;
}

/**
 * The editorial header used by every interior page. Deliberately asymmetric:
 * the statement sits in the left columns, and the aside occupies the right.
 * A single hairline rule closes the block.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  actions,
  aside,
  tone = "paper",
  className,
}: PageHeroProps) {
  return (
    <header className={cx("page-hero", `page-hero--${tone}`, className)}>
      <div className="shell">
        {crumbs && (
          <div className="page-hero__crumbs">
            <Breadcrumbs items={crumbs} />
          </div>
        )}
        <div className="page-hero__grid">
          <div className="page-hero__lead">
            {eyebrow && <p className="eyebrow eyebrow--red">{eyebrow}</p>}
            <h1 className="display-2 page-hero__title">{title}</h1>
            {lede && <div className="lede page-hero__lede">{lede}</div>}
            {actions && <div className="page-hero__actions">{actions}</div>}
          </div>
          {aside && <div className="page-hero__aside">{aside}</div>}
        </div>
      </div>
    </header>
  );
}
