# toyotaomergie

Website for **Omoregie Motors Nigeria Limited** — an accredited Toyota dealer in Nigeria since 1978.

Built with Next.js 15 (App Router), React 19 and TypeScript.

## About the business

Omoregie Motors is an accredited dealer within the Toyota (Nigeria) Limited network,
supplying brand-new Toyota vehicles, genuine spare parts and aftersales across
Lagos and Abuja.

- Head office & showroom — Surulere, Lagos
- Aftersales & spare parts — Victoria Island, Lagos
- Workshop — Alaba, Lagos
- Sales office — Lekki, Lagos
- Branch — Garki, Abuja

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Project structure

```
src/
  app/            Routes (App Router) and global styles
  components/     UI components
  content/        All site content and data (brand, vehicles, dealers, FAQ)
  lib/            Helpers
  styles/         Design tokens
public/
  images/dealer/  Dealer photography
  images/site/    Additional imagery
```

## Content

Most copy and data lives in `src/content/`:

- `site.ts` — brand facts, navigation, contact details, hours, values, legal copy
- `vehicles.ts` — the model range and imagery
- `dealers.ts` — our locations
- `faqs.ts` — frequently asked questions

## Design system

The visual system is defined in `src/styles/tokens.css` (colour, type scale,
spacing, radii, elevation) and applied through component layers in
`src/app/globals.css`. The direction is a bright, technical showroom: white
canvas, a single grotesque typeface, Toyota red for action, and rounded
product cards.

## Notes

- The enquiry forms are front-end only. They validate input but do not submit to
  a backend; a successful submission prompts the customer to call or use WhatsApp.
- Vehicle prices are given on request and confirmed by the sales team.
- Images in `public/images/dealer/` are dealer-supplied photography of Toyota models.
- Raw source assets are excluded from version control via `.gitignore`.
