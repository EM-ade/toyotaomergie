# Toyota Nigeria — Creative Direction

Status: **decided and implemented**. This document records the three directions considered and the
reasoning for the one that was built, so the decision is auditable rather than implicit.

---

## 1. What the source material gives us

The audit package (`website-inventory.md`, `website-content-audit.md`,
`website-design-audit.md`, `website-interactions.md`, `website-page-map.md`) establishes the real
information architecture. The 13 original-site screenshots
(`toyota_website_pages.zip`) give us the actual visual register of the site we are replacing.

Two facts from the screenshots shaped the direction more than anything else:

1. **The original site is a dark, hi-visibility dealership site.** Near-black chassis, red
   accents, condensed uppercase headings, chrome and lens flare. It reads as *dealer stock*,
   not *brand*.
2. **The original site is image-starved but layout-rich.** Vehicle cards carry long specification
   word-lists where photography should be. There is real information — engines, fuel type,
   model years, seven accredited dealers, a genuine service taxonomy — but nowhere for the eye
   to rest.

A third fact comes from the brief itself: the earlier Stitch attempt (supplied as
`stitch_toyota_nigeria_digital_redesign.zip`) took the opposite route — a Material 3 dark
surface stack (`#121316` on `#0d0e11`), Space Grotesk display type, JetBrains Mono technical
labels, and a denser-than-the-original coating of technical chrome tags. It is a *more*
elaborate version of the original's problem. It is in the rejected pile.

So the two failure modes to avoid are now concrete and opposite:

| Failure | What it looks like |
| --- | --- |
| Dealer-stock density | Dark chassis, red-on-black everywhere, spec word-lists, no negative space |
| Premium-by-darkness | Material dark surface stack, glow, monospace labels as decoration, hovering UI |

---

## 2. Three directions considered

### Direction A — "Showroom Daylight"

**Central idea.** Flip the register from showroom-at-night to *showroom in daylight*. The whole
site sits on a warm, paper-like neutral. Vehicles are presented as full-bleed photography on wide
cinematic bands, and between those bands sit quiet, precise **editorial pages** with real
typographic hierarchy — the composition logic of a car brochure, not a landing page.

- **Photography.** Full-bleed, one vehicle per frame, generous surrounding space. Close-up detail
  crops (grille, wheel, headlamp) used as editorial punctuation.
- **Typography.** A high-contrast editorial serif for statements and model names; a neutral
  grotesque for UI and body. Uppercase is used once, at small size, for structural labels — not
  as a default treatment for headings.
- **Navigation.** Two-layer: a thin utility band (dealer, search, contact) and a large,
  typographically set primary nav with a photography-led mega menu.
- **Motion.** Slow, single gesture per section: a masked image reveal, a short line-rise on
  headline. Nothing moves continuously. Nothing hijacks the scroll.
- **Toyota red.** Used as a rule, a mark, and an action colour. Never a background field.
- **Suitability.** Brand credibility is high — it reads like a manufacturer, which is what
  "sole distributor appointed by Toyota Motor Corporation" should look like. Usability is high
  because the light canvas and clear hierarchy carry dense specification content well.
- **Complexity.** Medium-low. No 3D, no WebGL, no scroll library. Performs well on the
  mobile-first Nigerian network conditions the brief cares about.
- **Risk.** Depends on photography quality. Needs a disciplined placeholder system so the layout
  is honest when a real image is not yet available.

### Direction B — "Built for the Real Journey"

**Central idea.** Organise the site around Nigerian use — city movement, family journeys, long
distance, work vehicles, and the aftersales reality behind them. Journey is the primary navigation
axis; models are the destination.

- Photography must be genuinely local, which we do not have and must not fabricate.
- Navigation by journey is a strong idea but conflicts with the audit's finding that customers
  arrive looking for a specific model or a specific dealer.
- **Verdict: rejected as the primary concept.** Its best asset — real Nigerian ownership context —
  is an *imagery* requirement we cannot meet honestly. It is, however, adopted as a secondary
  layer: every vehicle detail page carries a "where this car actually lives" context band framed
  around Nigerian road and load conditions, and the aftersales section is written for owners
  rather than for browsers.

### Direction C — "The Automotive Design Journal"

**Central idea.** A magazine-like digital showroom built on annotated detail crops, material
studies, feature diagrams and long-form model stories.

- **Verdict: rejected as the primary concept.** It is the most distinctive of the three, but it
  inverts the content priority. The audit is explicit that the site's first job is
  *discover a model → request pricing → find a dealer → get service*. A journal buries those
  actions under an editorial layer, and it demands a volume of captioned technical imagery that
  does not exist in the supplied assets. Its best asset is adopted as a secondary layer: the
  vehicle detail page uses annotated detail crops and a proper specification table rather than a
  specification word-list.

---

## 3. Decision

**Direction A — "Showroom Daylight"**, with Direction B's Nigerian ownership context folded in as
a secondary layer and Direction C's technical clarity folded in as the specification treatment.

The audit's own recommendation was "Direction A: Precision in Motion, borrowing B's authentic
Nigerian context and C's technical clarity". The relationship is worth stating plainly: **the
concept is the audit's; the execution is ours.** "Showroom Daylight" departs from the audit's
working palette (which proposed warm white with charcoal, close to ours) in one decisive respect —
where the audit described a cinematic *dark* automotive experience, we invert to daylight, because
the rejected Stitch attempt demonstrated that a dark automotive site with technical chrome is
exactly the generic pattern the brief prohibits.

### Why this one

1. **It is the largest single move available.** Everything about the source material is dark. A
   disciplined daylight system on the same content is immediately, visibly authored.
2. **It solves the real content problem.** The site's weakness is dense specification text. Light
   canvas, editorial hierarchy and generous spacing are what make dense text legible. A dark
   system makes it worse — which is precisely what the original site suffers from.
3. **Toyota red becomes meaningful.** On a light field, red is an event. On black, red is
   decoration. This is the brief's instruction — "restrained and intelligent use of Toyota red" —
   taken literally.
4. **It is honest about what we have.** No 3D, no WebGL, no fabricated local photography. The
   direction is carried by composition and typography, both of which we fully control, and it
   degrades gracefully into a proper placeholder system.

---

## 4. The visual system

Tokens live in `src/styles/tokens.css` and are the single source of truth.

### Surface and ink

A staged warm-neutral ladder rather than one flat white, so that sections can be separated by
tone instead of by borders.

| Token | Value | Use |
| --- | --- | --- |
| `--toyota-paper` | `#F4F2ED` | Page canvas — warm, slightly grey, never pure white |
| `--toyota-paper-raised` | `#FFFFFF` | Raised panels, specification tables |
| `--toyota-paper-sunk` | `#E8E5DE` | Recessed bands, form fields |
| `--toyota-ink` | `#14161A` | Primary text, deep graphite — not pure black |
| `--toyota-ink-muted` | `#5A5F68` | Secondary text, verified contrast on paper |
| `--toyota-rule` | `#D6D2C8` | Hairline rules — the primary structural device |
| `--toyota-night` | `#0E1013` | Hero and full-bleed photographic bands only |

Night is used **only** where a photograph runs full-bleed and demands a dark surround. It is never
the page canvas. This is the whole point of the direction.

### Red

| Token | Value | Use |
| --- | --- | --- |
| `--toyota-red` | `#D0021B` | Primary action, active rule, focus ring |
| `--toyota-red-deep` | `#97000F` | Hover / pressed |
| `--toyota-red-wash` | `#FBECEE` | Tinted background for notices, never for sections |

Red appears as: a 2px rule under an active nav item, the fill of a primary button, a small square
mark beside a section eyebrow, a focus ring. It does not appear as a section background, a
gradient, or a glow.

### Typography

Three roles, three families, no more.

| Role | Family | Notes |
| --- | --- | --- |
| Display | **Fraunces** (variable serif) | Model names, section statements, editorial headlines |
| UI / body | **Inter** | Navigation, body, forms, tables |
| Numerals / spec | **Inter**, `font-variant-numeric: tabular-nums` | Specifications, prices-on-request, opening hours |

The serif/grotesque pairing is the single most legible signal that this is an authored system
rather than a component library default. Fraunces is variable, so weight and optical size are used
expressively at full-bleed sizes and neutrally at reading sizes.

**Rule:** uppercase is reserved for `.eyebrow` labels (11px, `0.14em` tracking) and for nothing
else. Display headings keep their natural case, which is what makes them read as editorial.

Type scale is fluid (`clamp()`) between a 360px and a 1600px viewport, defined once in tokens.

### Layout

- 12-column grid, `--content-max: 1560px`, `--content-pad` fluid from 20px to 64px.
- Structural separation is done with **hairline rules**, not with cards, shadows or borders on
  every element. This is the discipline that keeps the site from looking like a component library.
- Asymmetry is used deliberately: editorial sections place text in columns 1–5 and imagery in
  columns 6–12 (or the reverse), rather than centring everything.
- Radius is near-zero (`--radius-sm: 2px`) except on controls. No pill buttons.

### Motion

- **One gesture per element.** Masked reveal, or line rise, or opacity — not all three.
- Durations: 180ms UI, 320ms control, 620ms editorial reveal.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for reveals; `ease-out` for UI.
- Implemented with CSS transitions plus one shared `IntersectionObserver` hook. **No animation
  library is added** — nothing in this direction needs one.
- `prefers-reduced-motion: reduce` collapses all durations to `1ms` and disables transforms.
- No scroll-jacking. No fake cursors. No loading screen. Content is never withheld behind motion.

### What was deliberately not built

Stated explicitly because the brief asks for it, and because several of these were tempting:

- No WebGL or 3D. The concept does not need it and it would cost the performance budget.
- No glassmorphism, no glow, no decorative gradients.
- No random technical labels scattered as texture. Technical labels appear only where they carry
  information (a specification key, a section number in a long document).
- No card grid as the default answer to every content problem — the homepage deliberately uses
  five different section compositions.
- No dark premium interface.

---

## 5. How the direction survives contact with real content

The direction is only credible if it can hold the actual material. Three cases:

**Dense specification.** The vehicle detail page renders specifications in a full-width table on
`--toyota-paper-raised`, keyed by group (Engine, Dimensions, Safety), with tabular numerals. This
is Direction C's technical clarity, in Direction A's light system.

**Dealer records.** Seven dealers, each with multiple branches, addresses, phones, hours. Rendered
as an editorial directory — a list with hairline separators and a real filter — rather than as a
grid of identical cards. Branch data is grouped under the dealer that owns it, because that is how
the source data is actually structured.

**Missing photography.** Handled by `ImageFrame` + `VehiclePlate`: a designed placeholder that
states the intended subject, the crop and the aspect ratio, and is visibly a placeholder. It is not
a grey box and it is not a stock photo of an unrelated car.
