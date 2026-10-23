# Motion Design Plan — Omoregie Motors

**Direction:** *Restrained showroom motion* — motion confirms interaction and reveals product; it never competes with the cars.

**Approved decisions:** Hero "Studio Slice" signature · restrained motion budget · sparse ambient idle · CSS + existing `Reveal` hook (no library).

**Audience:** hand-ready for a designer or front-end developer.

---

## 1. Foundations

### 1.1 Motion tokens — extend `src/styles/tokens.css`

```css
:root {
  /* Duration */
  --dur-instant: 90ms;      /* press feedback, hover colour */
  --dur-ui: 160ms;          /* existing — state changes */
  --dur-control: 240ms;     /* existing — control transitions */
  --dur-reveal: 420ms;      /* NEW — content reveals */
  --dur-editorial: 520ms;   /* existing — image scale, large moves */
  --dur-hero: 1100ms;       /* NEW — signature sequence */
  --dur-idle: 18s;          /* NEW — ambient loops */

  /* Easing */
  --ease-ui: cubic-bezier(0.33, 0, 0.2, 1);        /* existing */
  --ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);   /* existing */
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);         /* NEW — dismissals */
  --ease-measure: cubic-bezier(0.65, 0, 0.35, 1);  /* NEW — signature sweep */

  /* Stagger */
  --stagger-tight: 45ms;
  --stagger-norm: 70ms;
  --stagger-loose: 90ms;
}
```

**Rationale:** one ramp, 90 → 1100ms in ×1.5 steps. Under 90ms reads as a bug; over 1100ms fights the hover feel of a showroom. `--ease-measure` is symmetric (in-out) — correct for a slice travelling across and settling, not for a bounce.

### 1.2 Reduced-motion contract

Extend the existing block:

```css
@media (prefers-reduced-motion: reduce) {
  :root { --dur-hero: 1ms; --dur-idle: 1ms; }
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
```

Also honour `prefers-reduced-transparency` for the glass overlays.

### 1.3 Triggers available today

| Trigger | Mechanism | Use for |
|---|---|---|
| Enter-view | `useReveal` (threshold `.16`, `rootMargin 0 0 -8%`) | All content reveals |
| Scroll position | `scrollY > 24` in `Header` | Header condense |
| Hover / focus | CSS `:hover`, `:focus-visible` | Card lift, slice sweep |
| State change | React state → `data-*` | Accordion, gallery, menu, form |
| Idle | `requestIdleCallback` + activity timer (new) | Ambient loops |

No scroll-progress library. The only scroll listener is the existing passive one.

---

## 2. Section-by-section layout

`D` = delay after trigger. Ordered as the homepage reads.

### 2.1 Header — `Header.tsx`

| Element | Animation | t | Ease | Trigger |
|---|---|---|---|---|
| Utility bar | Height `40px→0` + opacity | 240 / 160 | UI | scrollY > 24 |
| Nav row | `box-shadow` fade | 240 | UI | same |
| Mega menu | opacity, `translateY(-8px)→0`, `scaleY(.98)→1` | 240 | Reveal | hover/focus |
| **Mega menu items** | Stagger `translateY(6px)` | 240, D = i × 40ms | Reveal | menu open |
| Nav underline | `scaleX(0→1)`, origin left | 160 | UI | hover / active |
| Burger ↔ close | Cross-fade + 90° | 160 | UI | toggle |

**Change:** add the item stagger (currently the panel animates as one block). Cap total to **360ms**.

### 2.2 Hero — signature lives here (§3)

| Element | Animation | t | D |
|---|---|---|---|
| Badge | Fade + rise 8px | 420 | 120 |
| Title lines | Fade + rise 14px, per line | 520 | 200 + i×90 |
| Lede | Fade + rise 8px | 420 | 520 |
| Buttons | Fade + rise 8px | 420 | 620 |
| Stats plate | Fade + rise 8px | 420 | 760 |
| Scroll cue | Subtle bob | 18s loop | — |

Copy lives in the lower-left safe zone over the scrim; the signature occupies the image zone. They animate **in parallel**, not sequentially — copy readable at ~400ms.

**Note on the current build:** the hero title uses `.rise` per-line wrappers. These must **not** use `overflow:hidden` masks — wrapped headlines then get clipped. Use a plain fade-up (§3.6) instead.

### 2.3 Range grid — `.range-grid`

| Element | Animation | t | Ease | Trigger |
|---|---|---|---|---|
| Card enter | opacity + `translateY(18px)→0` | 420 | Reveal | enter-view |
| Stagger | D = i × 70ms, **capped at 3 steps** | — | — | — |
| Card image | `scale(1)→1.04` | 520 | Reveal | hover |
| Border → shadow | colour + shadow | 240 | UI | hover |
| Arrow | `translateX(0→3px)` | 160 | UI | hover |
| Press | `scale(.99)` | 90 | UI | `:active` |

Cap total stagger at **210ms** — a slow phone must not still be animating card four after the user has read it.

The grid is an even four-up row (1-up mobile, 2-up tablet, 4-up desktop). No feature card, so no orphaned third row.

### 2.4 Aftersales band (dark) — `.service-band`

| Element | Animation | t | Trigger |
|---|---|---|---|
| Media | `scale(1.06)→1`, clip inset L→R | 900 | enter-view |
| Headings | Fade + rise 10px | 420, D=80 | enter-view |
| Promo rows | Stagger 45ms | 420 | enter-view |
| Buttons | Fade | 420, D=200 | enter-view |

Slowest, largest move on the page by design — the emotional beat between product and service.

### 2.5 Why-Omoregie timeline — `.story__beat`

| Element | Animation | t | D |
|---|---|---|---|
| Beat block | Fade + rise 16px | 420 | i × 70 |
| Year numeral | Fade + `scale(.96)→1` (no count-up) | 520 | i×70 + 60 |
| Divider rules | `scaleY(0→1)`, origin top | 520 | i×70 + 120 |

### 2.6 Locations — `.loc-card`

Card fade/rise 420ms, D = i × 60. Map pin `translateY(0→-3px→0)` once, +100ms.

### 2.7 Vehicles browser — `VehicleBrowser.tsx`

| Interaction | Animation | t | Ease |
|---|---|---|---|
| Filter change | Old grid →0 (120ms), new from `translateY(6px)` (240ms) | 360 | UI/Reveal |
| Result count | Number flip `-100%` out / `100%` in | 240 | Reveal |
| Empty state | Fade + `scale(.98)→1` | 240 | Reveal |
| Card re-entry | Stagger 40ms, capped 3 | 420 | Reveal |

**Constraint:** list is server-rendered and must stay in the DOM. Animate opacity/transform only — never unmount nodes.

### 2.8 Compare tool

Column swap 240ms · row hover wash 90ms · scrollbar fade-in 240ms.

### 2.9 Forms — `EnquiryForm.tsx`

| Event | Animation | t | Note |
|---|---|---|---|
| Field focus | Ring + border colour | 160 | No scale (layout shift) |
| Validation error | Shake `0,-3,2,-1,0` | 240 | **Once** per submit |
| Error message | Reveal + rise 4px | 160 | — |
| Submit pending | Spinner rotate | 800 loop | While awaiting |
| Success | Fade + rise 8px, check stroke draws | 420 / 360 | Stroke draw on success only |

### 2.10 Vehicle product hero — `VehicleHero.tsx`

The car owns a full-width stage; the model name and actions overlay it. Motion should follow that hierarchy:

| Element | Animation | t | D |
|---|---|---|---|
| Stage image | `scale(1.03)→1` | 900 | 0 |
| Eyebrow | Fade + rise 6px | 420 | 160 |
| Model title | Fade + rise 12px | 520 | 240 |
| Price line | Fade | 420 | 380 |
| Action buttons | Fade + rise 8px | 420 | 460 |
| Thumb rail | Stagger 40ms per thumb, capped 4 | 320 | 520 |
| Spec rail | Stagger 50ms per column | 420 | enter-view |

### 2.11 Other interior pages — `PageHero.tsx`

| Element | t | D |
|---|---|---|
| Breadcrumbs | 240 | 0 |
| Eyebrow | 420 | 60 |
| Page title | 520 | 140 |
| Lede | 420 | 320 |
| Aside / stat block | 420 | 400 |
| Spec rows | 320, stagger 30ms capped 5 | enter-view |

### 2.12 Footer

Columns stagger 50ms · contact rows 40ms · back-to-top smooth scroll (respects reduced-motion).

---

## 3. The signature: **Studio Slice**

### 3.1 Concept

The hero photo is revealed as **horizontal strips sweeping into place** — like a light-bar passing over a car on a turntable — then settles into a still. A thin **Toyota-red measure line** draws beneath the car with the model name, then fades to the resting state.

**Why it works here:**
- Uses **only studio renders already on the site** (Prado, Hilux, RAV4, Camry on grey seamless). No new photography.
- Automotive-specific: reads as body-panel seams and studio lighting, not a generic fade.
- **One-time on load** — zero cost after 1.1s, consistent with the restrained budget.
- The measure-line callout does what the hero copy can't: it *names the car*.

### 3.2 Placement

**Homepage hero only** (`Hero.tsx`), image zone, desktop + mobile. Not on interior pages — a repeated signature isn't a signature. Interior `PageHero` and `VehicleHero` keep the standard reveal.

### 3.3 Exact timeline

```
0ms     Image zone empty (surface-raised). Copy begins its normal fade.
60ms    7 horizontal bands visible, each scaleX(0), origins alternating L/R.
        Band 4 (centre) leads by 60ms — the "focus" strip.
80ms    Centre band sweeps scaleX(0→1) over 380ms, ease-measure.
        Adjacent bands follow, D = ±60ms per step from centre.
        Bands are the mask — the photo is revealed, not faded in.
840ms   All 7 bands at scaleX(1). Photo fully assembled.
        Bands fade out over 120ms.
960ms   Red measure line draws scaleX(0→1), origin left, 300ms,
        under the vehicle's front-to-rear extent.
1100ms  Callout rises 6px beside the line end:
        "LAND CRUISER PRADO" — Inter 700, 12px, .12em
        "Book a test drive →" or price on request
1560ms  Measure line + callout fade out over 400ms.
        Resting hero state.
```

**Total 1.96s to rest; the car is fully legible at 840ms.** That is the number to defend — if it ever reads slow, cut the callout phase (ends 1.1s) before shortening the sweep, which *is* the identity.

### 3.4 Visual specs

| Property | Value |
|---|---|
| Bands | 7 equal, `overflow:hidden` |
| Transform | `scaleX(0)→1`, origins alternating |
| Band fill | `var(--surface-raised)` over photo, then fades |
| Sweep easing | `--ease-measure` |
| Measure line | 1px, `var(--red)`, 90% width, `left:5%` |
| Callout | Inter 600/700, 12px, `.12em` uppercase |
| Mobile | **5 bands**, 320ms sweep, callout omitted (line + name only) |
| Photo scale | `scale(1.03)→1` over 1100ms, concurrent |

### 3.5 Interaction & integration rules

1. **Photo in the DOM from first paint.** Bands are overlays; the real `<img alt>` is immediate for a11y and crawlers.
2. **Skip on any interaction.** Scroll/tap/key in the first 1.1s jumps to the resting state.
3. **Once per session** via `sessionStorage.heroPlayed`.
4. **Never blocks LCP.** `priority` img; `will-change` only during the sequence.
5. **Reduced motion:** no bands, resting state at 1ms.
6. **Copy is independent** — readable by 620ms regardless of the car.

### 3.6 Implementation sketch

```tsx
const [phase, setPhase] = useState<"idle"|"running"|"done">("idle");

useEffect(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const played = sessionStorage.getItem("heroPlayed") === "1";
  if (reduce || played) { setPhase("done"); return; }
  setPhase("running");
  const skip = () => setPhase("done");
  const t = setTimeout(skip, 2000);
  addEventListener("scroll", skip, { passive: true, once: true });
  addEventListener("pointerdown", skip, { once: true });
  return () => { clearTimeout(t); removeEventListener("scroll", skip); };
}, []);
```

```css
.hero__bands { position:absolute; inset:0; display:grid; grid-template-rows:repeat(7,1fr); }
.hero__band  { background:var(--surface-raised); transform:scaleX(0); will-change:transform;
               animation:bandIn var(--dur-hero) var(--ease-measure) forwards;
               animation-delay:calc(var(--band-i) * 60ms); }
.hero__band:nth-child(odd){ transform-origin:left; }
.hero__band:nth-child(even){ transform-origin:right; }
@keyframes bandIn { to { transform:scaleX(1); } }
.hero[data-phase="done"] .hero__bands { display:none; }
```

**Layering:** `0` photo · `1` bands · `2` scrim · `3` measure line · `4` callout · `5` copy/stats/CTAs.

---

## 4. Idle system

**Philosophy:** present enough that a showroom screen feels alive; absent enough that it never distracts from a price or phone number.

| # | Element | What moves | Subtlety | Loop | Stops when |
|---|---|---|---|---|---|
| **I1** | Hero photo (post-signature) | Ken Burns `scale(1→1.04)`, `translateY(0→-1%)` | 2/10 | 18s alternate | 8s no scroll |
| **I2** | Scroll cue | Chevron bob `-4px→4px`, opacity 1→.5 | 3/10 | 2.6s | Scrolled past hero |
| **I3** | Primary CTA glow | `box-shadow` breath | 1/10 | 4s | Any interaction; needs 5s idle |
| **I4** | Section eyebrows | Red rule `scaleX(0→1)` | 4/10 | Plays once | — |
| **I5** | Logo dot | Opacity 1→.4 | 1/10 | 6s | Homepage only, 10s idle |
| **I6** | Location pins | `translateY(0→-2px→0)` | 2/10 | 3s, +400ms stagger | Runs twice, then stops |
| **I7** | Gallery autoplay | — | — | **None** | Deliberately excluded |

### 4.2 Idle governance

One controller, not seven timers:

```ts
// lib/useIdle.ts (~25 lines) — sets html[data-idle]
const IDLE_MS = 5000;
```

- Activity listeners (`scroll`, `pointerdown`, `keydown`, `touchstart`), passive + debounced.
- Sets `html[data-idle="true|false"]`. **All idle animations are CSS driven off that attribute** — no per-component JS.
- Starts `true` on load (hero drifts immediately), `false` on first input.
- Reduced-motion → permanently `false`.

```css
html[data-idle="false"] .idle-kenburns,
html[data-idle="false"] .idle-glow { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .idle-kenburns, .idle-glow, .idle-dot, .idle-cue { animation: none; }
}
```

### 4.3 Budget rules

- **Max 2 concurrent loops on screen.** I1 and I3 never co-exist.
- Animate only `transform` / `opacity` (`box-shadow` once).
- **No idle loop on anything containing a price or phone number.**
- Pause via `animation-play-state`, never re-trigger (avoids restart flash).
- Must hold 60fps on a 4× throttled mobile CPU.

---

## 5. Rationale

**Signature in the hero** — a dealer's first job is "real cars, real stock, now." The slice says that in under a second while the copy explains the offer in parallel. Anywhere else buries the one moment every visitor sees.

**Slice-mask, not fade/zoom** — every dealer site fades or zooms. Horizontal band sweeps borrow studio lighting and panel seams; they flatter the grey seamless photography instead of fighting it.

**Restrained overall** — the audience spans a 4G phone in Lagos and a showroom display. Restraint protects the two things that must never move (price, phone number) and keeps 1.1s of hero as the single memorable moment.

**Sparse idle** — idle earns its place only on an unattended screen. On a customer's phone it drains battery and implies loading. Two loops, gated at 5s, excluded from price/contact regions resolves that.

**No library** — one observer, one attribute, CSS keyframes. 40KB of JS to save a few lines of CSS would be paid on every page load.

---

## 6. Handoff checklist

- [ ] Add 5 duration + 2 easing + 3 stagger tokens to `tokens.css`
- [ ] Extend the reduced-motion block (hero/idle durations + global keyframe kill)
- [ ] Build `lib/useIdle.ts` and set `html[data-idle]` in `layout.tsx`
- [ ] Hero: bands markup, 3-phase state, skip-on-interaction, sessionStorage guard
- [ ] Hero title: plain fade-up, **no clipping mask** on wrapped lines
- [ ] Add mega-menu item stagger
- [ ] Cap card stagger at 3 steps
- [ ] Vehicle hero: stage image scale + staged text/actions/thumb reveal
- [ ] Form: single shake, check stroke on success
- [ ] Verify LCP unchanged, CLS 0, 60fps throttled, reduced-motion static
- [ ] Verify bands `aria-hidden`, photo `alt` at first paint

**Two things to confirm before build:** (1) should the callout show a price placeholder or a CTA; (2) is the **showroom kiosk** (unattended display) a real target — if so, lengthen I1 and add a kiosk-only looping hero.
