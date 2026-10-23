"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ImageFrame } from "./ImageFrame";
import type { ImageSlot } from "@/content/types";
import { ArrowRight, Phone, Shield } from "./icons";
import { telHref, waHref } from "@/content/site";

const ROTATE_MS = 6000;
/** Tile grids chosen so tiles land close to square per breakpoint. */
const GRID = { desktop: { cols: 8, rows: 4 }, mobile: { cols: 4, rows: 5 } };
const TILE_STEP_MS = 58; // cascade step from the random origin (45 + 30%)

/** djb2 string hash — stable across server and client. */
function hashSeed(str: string): number {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

/** Mulberry32 — tiny deterministic PRNG. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Showroom hero with the checkerboard reveal.
 *
 * The photo is cut into a grid of tiles; on load, and every time the hero
 * advances to another car, the tiles cascade outward from a starting tile,
 * each framing its own piece of the image, until the photo is assembled.
 * One system is both the load reveal and the car-to-car transition.
 *
 * The starting tile is randomised per car — but via a seeded PRNG rather
 * than Math.random(), because the tiles render on the server: unseeded
 * randomness would differ between server and client and break hydration.
 *
 * The cascade is ambient-gated: rotation advances only while the page is
 * idle, pauses in hidden tabs, and never runs under reduced motion (where
 * the photo is simply present). Ticks under the photo jump to a car.
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
  /** The cars to present; the first is shown on load. */
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
  const [compact, setCompact] = useState(false);

  // Load reveal for the text column; the tiles choreograph themselves in CSS.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Track the breakpoint so tiles stay close to square.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Rotation gate: no reduced motion, at least two cars.
  useEffect(() => {
    if (images.length < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    setRotate(true);
  }, [images.length]);

  useEffect(() => {
    if (!rotate || images.length < 2) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      // Ambient only: hold the current car while the visitor is interacting.
      if (document.documentElement.dataset.idle === "false") return;
      setActive((a) => (a + 1) % images.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [rotate, images.length, active]);

  const { cols, rows } = compact ? GRID.mobile : GRID.desktop;
  const slide = images[active] ?? images[0];
  const hasAsset = Boolean(slide?.src);

  // Random origin tile for this car's cascade. Seeded by the car name so the
  // server and client compute the same values (hydration-safe), while each
  // car starts somewhere different.
  const origin = (() => {
    const rand = mulberry32(hashSeed(`${slide?.subject ?? "hero"}-${active}`));
    return {
      row: Math.floor(rand() * rows),
      col: Math.floor(rand() * cols),
    };
  })();

  // Cascade order: Manhattan distance from the origin, so tiles ripple
  // outward in diamond rings until the grid is filled.
  const tiles: { col: number; row: number; delay: number }[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dist = Math.abs(row - origin.row) + Math.abs(col - origin.col);
      tiles.push({ col, row, delay: dist * TILE_STEP_MS });
    }
  }

  return (
    <section className="hero" data-revealed={revealed ? "true" : "false"}>
      <div className="hero__media" aria-hidden="true">
        {hasAsset ? (
          <div
            key={`${active}-${slide.subject}`}
            className="hero__tiles"
            style={{ "--cols": cols, "--rows": rows } as React.CSSProperties}
          >
            {tiles.map((t) => (
              <span
                key={`${t.row}-${t.col}`}
                className="hero__tile"
                style={
                  {
                    "--tile-col": t.col,
                    "--tile-row": t.row,
                    "--tile-delay": `${t.delay}ms`,
                  } as React.CSSProperties
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.src} alt="" decoding="async" />
              </span>
            ))}
          </div>
        ) : (
          <ImageFrame
            slot={slide}
            priority
            showCaption={false}
            sizes="(min-width: 900px) 62vw, 100vw"
            className="hero__img"
          />
        )}
        <span className="visually-hidden">{slide.subject}</span>

        <div className="hero__scrim" aria-hidden="true" />

        {rotate && images.length > 1 && (
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
