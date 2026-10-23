"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageFrame } from "./ImageFrame";
import type { ImageSlot } from "@/content/types";
import { ArrowRight, Phone, Shield } from "./icons";
import { telHref, waHref } from "@/content/site";

const ROTATE_MS = 6000;

/**
 * Showroom hero.
 *
 * Load: the whole media block wipes in (scale 1.06 -> 1 with a fade) — the
 * reveal kept from the earlier build. Afterwards the studio renders crossfade
 * slowly, one car at a time. The rotation is ambient: it advances only while
 * the page is idle (html[data-idel="true"], set by the shared idle controller)
 * and never with reduced motion. Selecting a tick shows that car directly.
 */
export function Hero({
  images,
  badge,
  titleLines,
  lede,
  primary,
  secondary,
  stats,
}: {
  /** The cars to present; the first is shown on load and for reduced motion. */
  images: ImageSlot[];
  badge: string;
  titleLines: string[];
  lede: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  stats: { value: string; label: string }[];
}) {
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState(0);
  const [rotate, setRotate] = useState(false);

  const count = images.length;

  // Load reveal — two frames so the initial state paints first.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(true);
      return;
    }
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rotation: allowed only without reduced motion and with 2+ cars. Ticks
  // advance under the same gate; the interval resets on every change so a
  // manual selection always gets its full six seconds.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || count < 2) return;
    setRotate(true);
  }, [count]);

  useEffect(() => {
    if (!rotate || count < 2) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      // Ambient only: hold the current car while the visitor is interacting.
      if (document.documentElement.dataset.idle === "false") return;
      setActive((a) => (a + 1) % count);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [rotate, count, active]);

  return (
    <section className="hero" data-revealed={revealed ? "true" : "false"}>
      <div className="hero__media">
        {images.map((img, i) => (
          <div
            key={`${img.subject}-${i}`}
            className={i === active ? "hero__slide is-active" : "hero__slide"}
            aria-hidden={i !== active}
          >
            <ImageFrame
              slot={img}
              priority={i === 0}
              showCaption={false}
              sizes="(min-width: 900px) 62vw, 100vw"
              className="hero__img"
            />
          </div>
        ))}

        <div className="hero__scrim" aria-hidden="true" />

        {rotate && count > 1 && (
          <ul className="hero__ticks" aria-label="Featured vehicles">
            {images.map((img, i) => (
              <li key={`tick-${img.subject}-${i}`}>
                <button
                  type="button"
                  className={i === active ? "hero__tick is-active" : "hero__tick"}
                  aria-label={`Show ${img.subject}`}
                  aria-pressed={i === active}
                  onClick={() => setActive(i)}
                />
              </li>
            ))}
          </ul>
        )}
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
                style={
                  {
                    "--reveal-delay": `${160 + i * 90}ms`,
                  } as React.CSSProperties
                }
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
