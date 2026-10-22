# Toyota Nigeria — Content Inventory & Preservation Matrix

This is the source-of-truth record of what the original site contains, what was preserved, what
was redesigned, and what remains unverified.

## Evidence basis — read this first

Two tiers of evidence were used, and they are **not** equivalent:

| Tier | Source | Confidence |
| --- | --- | --- |
| **A — Visual** | 13 full-page screenshots of the live site, supplied in `toyota_website_pages.zip` | High. Directly observed pixels. |
| **B — Documentary** | The audit package (`website-inventory.md`, `website-content-audit.md`, `website-page-map.md`, `website-design-audit.md`, `website-interactions.md`) | Medium. The audit itself describes its evidence as "indexed evidence; not browser-inspected". |

**The live site was not crawled or browser-inspected in this work.** `https://toyotanigeria.com/`
was never fetched. The audit package repeatedly and explicitly flags its own findings as
"Indexed evidence; not browser-inspected" and "Unverified". Those qualifiers are carried forward
here rather than dropped.

Consequence: every URL below marked *Unverified* is a **proposed route**, not a confirmed
original route. The audit's `website-page-map.md` states this directly: "This map combines indexed
URL evidence with a proposed organization. It is **provisional** until live crawling confirms
routes."

---

## 1. Page inventory and preservation matrix

| # | Original / evidenced page | Evidence | Screenshot? | Redesigned route | Preserved |
| --- | --- | --- | --- | --- | --- |
| 1 | `https://toyotanigeria.com/` — Homepage | A | `01_homepage.png` | `/` | Vehicle promotions, service promotions, Explore with Toyota, Find a Dealer, Parts & Accessories, Contact, footer groups |
| 2 | `/vehicles/` — Vehicle catalogue | A | `02_vehicle_catalogue.png` | `/vehicles` | Vehicle cards, model names, engine/fuel fields, "Request Price" CTA, "Compare" affordance |
| 3 | `/listings/{model}/` — Vehicle detail (Prado evidenced) | A + B | `03_vehicle_detail.png` | `/vehicles/:slug` | Model name, feature & performance copy, image gallery, Find a Dealer, specifications, request-price. Routes: `/vehicles/prado`, `/vehicles/corolla`, `/vehicles/rav4` |
| 4 | `https://www.toyotanigeria.com/listings/` — Vehicle inventory | B | `04_inventory_listings.png` | `/vehicles` (merged) | Search, filter, sort, vehicle listing cards. **Flagged:** may be used/legacy stock, not the official range |
| 5 | `/dealers/` — Dealer directory | A + B | `05_dealer_locator.png` | `/dealers` | Accredited dealer names, map/list toggle, branch addresses, phones, emails, opening hours |
| 6 | `/dealers/metropolitan-motors/` — Dealer detail | B | `06_about_dealer.png` | `/dealers/:slug` | Dealer profile, branch list, contacts. 7 dealer records |
| 7 | `/service/` — Aftersales / service | A + B | `07_service_aftersales.png` | `/service` | Full service taxonomy, operating hours, enquiry form (name, email, phone) |
| 8 | `/catalogue/` — Parts & accessories | A + B | `08_genuine_parts_accessories.png` | `/parts` | Genuine parts & accessories narrative, dealer-collection model, part enquiry |
| 9 | `/faq/` — FAQ / support | A + B | `09_faq.png` | `/faq` | 8 evidenced FAQ topics, categorised accordion |
| 10 | `/about-us/` — Corporate | A + B | `10_about_us.png` | `/about` | 1996 founding, sole distributor status, wholly indigenous private company, seven accredited dealers, values/vision/mission |
| 11 | `/media/` — News & media | A + B | `11_news_media.png` | `/media` | Articles, media hub, categories |
| 12 | Contact | A + B | `12_contact.png` | `/contact` | Contact channels, enquiry routing |
| 13 | Privacy Policy | A + B | `13_privacy_policy.png` | `/legal/privacy` | Legal document layout with updated date |
| 14 | `www.toyotanigeria.com/` — Homepage alternate host | B | — | `/` (canonical) | Content variant noted; canonicalisation **unresolved** |
| 15 | `www.toyotanigeria.com/faq/` + `/faq-2/` — FAQ duplicates | B | — | `/faq` (merged) | **Not merged blindly.** Audit: "Do not merge `/faq/` and `/faq-2/` until the current authoritative copy is approved." Both sets of answers are represented as *separate* FAQ records where wording differed |
| 16 | `/listings/corolla/`, `/listings/rav4/` | B | — | as #3 | As evidenced |
| 17 | `?lightbox=dataItem-ioxo78al` | B | — | — | Transient UI state, not a page. Correctly **not** given a route |
| 18 | `/robots.txt`, `/sitemap.xml` | B | — | — | "Inaccessible via current interface". **Not fabricated** — no robots.txt or sitemap.xml is shipped claiming to be the original's |

### Additional routes built

| Route | Why it exists |
| --- | --- |
| `/why-toyota` | Audit page-map lists `Why Toyota?` as a footer-discovered label |
| `/vehicles/compare` | Audit interaction inventory lists a "Compare" action evidenced in vehicle page content |
| `/service/request` | Audit content-audit asks to "separate general service information from an actual appointment workflow" |
| `/faq` category deep links | FAQ is categorised, so category anchors are addressable |
| `/legal/terms`, `/legal/cookies` | Placeholders. See §4. |

### Footer destinations carried from the original

Vehicles · More Vehicles · After Sales · Company — preserved as four footer column groups, matching
the indexed original footer structure (`website-content-audit.md` §Homepage).

Vehicle labels evidenced in footer/nav text and carried through: Starlet, Starlet Cross, Corolla,
Camry, Hilux, RAV4, Hiace, Land Cruiser 70, Land Cruiser, Rush, Prado, Fortuner, Dyna, Coaster,
Rumion, LC300, Urban Cruiser, Avensis.
Aftersales: Service Info., Warranty, Parts & Accessories.
Company/content: Toyota Dream Car Artist Room / TDAC Artist Room, Blog, Contact Us, Why Toyota?,
Videos, Awards, Privacy Policy.

---

## 2. Content that is verified and preserved

These are the facts the redesign states as fact, because they are evidenced at tier A or B.

**Company**
- Toyota (Nigeria) Limited commenced operations in **1996**.
- Described as a **wholly indigenous, privately owned company**.
- Appointed **sole distributor** for Toyota in Nigeria.
- **Seven accredited dealers.**

**Dealers** (names evidenced in the audit's dealer-directory finding)
Elizade Nigeria Limited · R.T. Briscoe · Omoregie Motors · Germaine Auto Centre · Mandillas ·
Kojo Motors · Metropolitan Motors

**Service taxonomy** (from `/service/`, tier A + B)
General repair · Preventative maintenance · Air-conditioning · Cooling system / radiator ·
Oil & filter replacement · Brakes · Diagnostics · Belts, hoses & fluids · Transmission services

**Homepage service promotions** (tier A)
Body & Paint · Mobile Workshop · Vehicle Diagnostics · Genuine Parts

**FAQ topics** (tier B)
Accredited dealer purchasing · Nigeria-market specification & grey imports · Financing through some
dealers · Genuine parts & VIN use · Parts warranty · Vehicle warranty, service intervals & claims ·
Recall / special service campaigns · Customer service contacts

**Header tagline** (tier A, read directly from the screenshot)
"Move a Better Tomorrow"

---

## 3. Content that is deliberately NOT stated

The brief forbids inventing vehicle specifications, availability, prices, warranty details, dealer
records or company claims. The following were therefore **not** fabricated, and where the original
site displays something in their place, the redesign shows an honest, labelled placeholder.

| Not stated | Why | What the site shows instead |
| --- | --- | --- |
| Prices | Audit: "Verify prices are not published as fixed values if the official process is dealer enquiry" | "Price on request" + a working enquiry path |
| Nigerian trim/variant names | Not evidenced for any model | A labelled `VERIFY` chip: "Nigerian variant and pricing to be confirmed with Toyota Nigeria" |
| Engine output, torque, fuel economy | Emitting a kW/Nm/L-100km figure we cannot verify would be fabrication | Specification tables contain only fields evidenced in the screenshots (body type, seating, drivetrain, transmission, fuel type, model year where shown). Unverified fields are omitted, not guessed |
| Warranty periods | Audit: "Verify warranty statements and service intervals against current approved policy" | Warranty FAQ answers describe the process and explicitly route the owner to the dealer for current terms |
| Dealer phone numbers, street addresses, emails | Not readable from screenshots; audit says verify with the dealer relations team | Dealer records carry **where evidenced** contact fields. Missing fields render as "Contact details held by Toyota Nigeria — verify with dealer relations" |
| Financing rates | Audit: financing is "available through some dealers" | Stated exactly that, and no more |
| Model year of current line-up | Audit: "Treat the current official model range as unverified" | The range is presented as "model families with evidenced detail pages". No year is asserted |

---

## 4. Unverified content, documented rather than concealed

| Item | Status |
| --- | --- |
| Whether the official current new-vehicle range matches the footer model list | **Unverified.** Footer list is presented as the *evidenced navigation set*, with a visible note that the current official range must be confirmed |
| Which models are officially offered in Nigeria | **Unverified.** Only Prado, Corolla and RAV4 have evidenced detail routes |
| Whether `/listings/` is official stock or legacy/used inventory | **Unverified and material.** The audit calls this a "critical content governance issue". The redesign surfaces the distinction in the UI rather than hiding it |
| `/catalogue/` — parts catalogue, body-shop catalogue, or campaign microsite? | **Unverified.** Presented as Parts & Accessories with an explicit note |
| `/faq/` vs `/faq-2/` authoritative copy | **Unresolved.** Both variants are preserved as separate records with a source attribution, per the audit's instruction not to merge blindly |
| Canonical hostname (`www` vs bare) | **Unresolved.** The site declares a single canonical origin via one `<link rel="canonical">` per page but does **not** claim to have resolved the original's |
| Legal text | **Placeholder.** `/legal/privacy`, `/legal/terms`, `/legal/cookies` carry a clear notice that the text is a structural placeholder pending approved legal copy. No legal compliance is invented |
| TDAC Artist Room, Awards, Videos, Blog | **Named but not built as pages.** They are listed in the footer as evidenced destinations with a "verify" state, rather than fabricated content pages |

---

## 5. Assets

**None of the original site's imagery is present.** The screenshots are page captures; no image
files were supplied, and no licence to the original's photography exists.

Accordingly:
- No image URL is invented.
- No remote image is hot-linked or assumed to stay available.
- No stock photograph of an unrelated vehicle is used to fill space.
- Every image position renders through `ImageFrame`, which shows a designed placeholder naming the
  intended subject, the crop and the aspect ratio.

To attach real photography later, add files under `public/images/` and set `image` on the relevant
record in `src/content/`. No layout code changes. See `README.md`.

---

## 6. URL migration

No redirect map is shipped, because no live crawl confirmed the original's actual URL shapes. What
the redesign does instead:

- Uses **stable, human-readable, lowercase slugs** (`/vehicles/prado`, `/dealers/elizade-nigeria-limited`).
- Preserves the original's evidenced slug words where they exist (`prado`, `corolla`, `rav4`,
  `metropolitan-motors` → `metropolitan-motors`).
- Consolidates the evidenced duplicates (`/vehicles/` and `/listings/` → `/vehicles`) and documents
  the consolidation here rather than silently.
- Does **not** assert that a 301 map would point the right way, because that requires the live crawl.

`docs/url-migration.md` records this in detail.
