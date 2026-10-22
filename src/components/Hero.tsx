"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageFrame } from "./ImageFrame";
import type { ImageSlot } from "@/content/types";
import { ArrowRight, Phone, Shield } from "./icons";
import { telHref, waHref } from "@/content/site";

/**
 * Showroom hero — product photograph on the right, the offer on the left.
 * Two primary actions (test drive, call) plus a WhatsApp shortcut.
 */
export function Hero({
  image,
  badge,
  titleLines,
  lede,
  primary,
  secondary,
  stats,
}: {
  image: ImageSlot;
  badge: string;
  titleLines: string[];
  lede: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  stats: { value: string; label: string }[];
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }
    const t = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="hero" data-revealed={revealed ? "true" : "false"}>
      <div className="hero__media">
        <ImageFrame
          slot={image}
          priority
          showCaption={false}
          sizes="(min-width: 900px) 62vw, 100vw"
          className="hero__img"
        />
        <div className="hero__scrim" aria-hidden="true" />
      </div>

      <div className="hero__content shell">
        <div className="hero__lead">
          <p className="hero__badge">
            <Shield width={14} height={14} />
            {badge}
          </p>
          <h1 className="hero__title">
            {titleLines.map((line, i) => (
              <span
                className="rise"
                key={line}
                style={{
                  "--reveal-delay": `${160 + i * 80}ms`,
                } as React.CSSProperties}
              >
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero__lede">{lede}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" href={primary.href}>
              {primary.label}
              <ArrowRight width={16} height={16} />
            </Link>
            <Link className="btn btn--outline" href={secondary.href}>
              {secondary.label}
            </Link>
          </div>
          <div className="hero__contact">
            <a href={telHref("+2348038002222")} className="hero__phone">
              <Phone width={15} height={15} />
              +234 803 800 2222
            </a>
            <a
              href={waHref("Hello Omoregie Motors, I'd like to enquire about a Toyota.")}
              className="hero__wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <ul className="hero__stats">
          {stats.map((s) => (
            <li key={s.label}>
              <span className="hero__statvalue">{s.value}</span>
              <span className="hero__statlabel">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
