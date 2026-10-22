import Link from "next/link";
import { cx } from "@/lib/cx";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Chip — status / verification marker.
--------------------------------------------------------------------------- */

export function Chip({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "verify";
  className?: string;
}) {
  return (
    <span
      className={cx("chip", tone === "verify" && "chip--verify", className)}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Verification notice — used everywhere a fact is not evidenced.
   Honest by design: it states what is known and what must be confirmed.
--------------------------------------------------------------------------- */

export function VerifyNotice({
  children,
  title = "To be confirmed",
  tone = "verify",
  className,
}: {
  children: ReactNode;
  title?: string;
  tone?: "verify" | "internal" | "neutral";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "notice",
        tone === "verify" && "notice--verify",
        tone === "internal" && "notice--internal",
        className,
      )}
      role="note"
    >
      <p className="notice__title">{title}</p>
      <div className="prose-body" style={{ fontSize: "0.9375rem" }}>
        {children}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   CTA link styled as a button, and a plain text link with a rule.
--------------------------------------------------------------------------- */

type Variant = "primary" | "ink" | "outline" | "quiet" | "on-night";

const variantClass: Record<Variant, string> = {
  primary: "btn--primary",
  ink: "btn--ink",
  outline: "btn--outline",
  quiet: "btn--quiet",
  "on-night": "btn--on-night",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  icon,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <Link href={href} className={cx("btn", variantClass[variant], className)}>
      {children}
      {icon}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
  icon,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <Link href={href} className={cx("link-rule", className)}>
      {children}
      {icon}
    </Link>
  );
}
