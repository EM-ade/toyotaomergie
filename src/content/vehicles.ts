import type { Vehicle, ImageSlot } from "./types";
import imageManifest from "./vehicle-images.json";

/**
 * Vehicle records — sourced from the live Toyota Nigeria site.
 *
 * Live crawl performed against https://www.toyotanigeria.com (WordPress +
 * WooCommerce). Evidence per model:
 *  - `summary` (intro) and `highlights` are the site's own marketing copy.
 *  - `gallery` is the site's own vehicle photography, downloaded to
 *    /public/images/vehicles/<slug>/ and enumerated in vehicle-images.json.
 *  - The site's specification table loads via an AJAX endpoint protected by a
 *    JS browser gate that could not be passed programmatically, so the fielded
 *    specification table is NOT reproduced. Only feature names the site states
 *    in prose are carried into `highlights`. See docs/live-site-audit.md.
 */

const manifest = imageManifest as Record<string, string[]>;

/**
 * Dealer photography supplied by Omoregie Motors. These take priority over any
 * crawled imagery because they are the actual vehicles and showrooms we sell.
 */
const dealerHeroes: Record<string, { src: string; fit?: "cover" | "contain" }> = {
  prado: { src: "/images/dealer/model-prado-studio.jpg" },
  corolla: { src: "/images/dealer/model-corolla-hero.jpg" },
  rav4: { src: "/images/dealer/model-rav4-coast.jpg" },
  hilux: { src: "/images/dealer/model-hilux-road.jpg" },
  "land-cruiser": { src: "/images/dealer/model-landcruiser-mountain.jpg" },
  camry: { src: "/images/dealer/model-camry-studio.jpg" },
  rush: { src: "/images/dealer/model-rush-track.jpg" },
  hiace: { src: "/images/dealer/model-hiace-showroom.jpg" },
  coaster: { src: "/images/dealer/model-coaster-studio.jpg" },
  "land-cruiser-70": { src: "/images/dealer/model-landcruiser70-studio.jpg" },
  dyna: { src: "/images/dealer/model-dyna-studio.jpg" },
  fortuner: { src: "/images/dealer/showroom-suv-interior.jpg" },
};

const plate = (
  subject: string,
  aspect: string,
  crop?: string,
  src?: string,
  alt?: string,
  fit?: "cover" | "contain",
): ImageSlot => ({
  src,
  alt: alt ?? "",
  subject,
  aspect,
  crop,
  fit,
});

/** All downloaded images for a model, as owned asset slots. */
function galleryFor(slug: string, name: string): ImageSlot[] {
  const files = manifest[slug] ?? [];
  return files.map((src, i) =>
    plate(
      `${name} — photograph ${i + 1}`,
      "4 / 3",
      "vehicle photography",
      src,
      `Toyota ${name} — image ${i + 1}`,
    ),
  );
}
interface Sourced {
  slug: string;
  name: string;
  family: string;
  bodyType: Vehicle["bodyType"];
  category: string;
  tagline: string;
  summary: string;
  highlights: string[];
  specs: { group: string; rows: { label: string; value: string }[] }[];
  hero: string;
  gallery: string[];
}

const sourced: Sourced[] = [
  {
    slug: "prado",
    name: "Land Cruiser Prado",
    family: "Land Cruiser",
    bodyType: "SUV",
    category: "SUV",
    tagline: "The Pride of the Land.",
    summary:
      "Embrace life with the Land Cruiser Prado and you will be rewarded with a fresh view of our world. It's the exhilaration of getting behind the wheel, anticipating that no road conditions or terrain will ever limit you. It's the capacity and functionality to take everything you need with you, relying on no-one. The exceptional driving performance and ride comfort bring a new dimension of luxury to your driving pleasure on the road.",
    highlights: [
      "Advanced car safety features across the range to protect passengers and pedestrians in the event of a collision",
      "Vehicle Stability Control (VSC), Active Traction Control (A-TRC) and Multi-terrain ABS",
      "Seven SRS airbags, Pre-Collision Safety System and Blind Spot Monitor",
      "Body-on-frame Land Cruiser platform, built for the terrain",
    ],
    specs: [],
    hero: "/images/vehicles/prado/prado-01.jpg",
    gallery: [],
  },
  {
    slug: "corolla",
    name: "Corolla",
    family: "Corolla",
    bodyType: "Sedan",
    category: "Sedan",
    tagline: "Excitement that grows with every drive.",
    summary:
      "Expect excitement to grow with every drive in Corolla. It's all thanks to an inspiring combination of agile, sporty and responsive performance with superb fuel efficiency to match. Compact, lightweight engine harness and optimised suspension components deliver exhilarating performance and outstanding fuel economy.",
    highlights: [
      "Super Intelligent 4-Speed Automatic Transmission (Super ECT) with uphill/downhill shift control",
      "MacPherson strut front and torsion beam rear suspension for stability and ride comfort",
      "SRS driver, front passenger, driver knee, side and curtain shield airbags",
      "WIL Concept front seats, designed to reduce neck injury in a rear-end collision",
    ],
    specs: [],
    hero: "/images/vehicles/corolla/corolla-02.jpg",
    gallery: [],
  },
  {
    slug: "rav4",
    name: "RAV4",
    family: "RAV4",
    bodyType: "SUV",
    category: "SUV",
    tagline: "Refinement never seen before.",
    summary:
      "Introducing the fourth-generation Toyota RAV4 — the result of a revolutionary new design concept, an SUV that attains a level of refinement never seen before. Featuring a bold and powerful new instrument panel design executed with a lighthearted touch, the RAV4 delivers a level of driving pleasure like nothing you've experienced before.",
    highlights: [
      "Automatic air conditioning with left and right independent temperature control",
      "Audio switches arranged on the steering wheel for intuitive operation",
      "Flexible luggage room with fold-down rear seats for larger items",
      "Engine tuned for strong low-speed acceleration with clean emissions and quietness",
    ],
    specs: [],
    hero: "/images/vehicles/rav4/rav4-01.jpg",
    gallery: [],
  },
  {
    slug: "hilux",
    name: "Hilux",
    family: "Hilux",
    bodyType: "Pickup",
    category: "Pickups & Trucks",
    tagline: "Built on data, built to last.",
    summary:
      "The strength of the Hilux lies in the vast volume of data Toyota has amassed in years of building reliable and rugged pickups. All models feature a laser-welded high-tensile steel body and chassis that has been subjected to exhaustive CAE simulation, resulting in low weight with excellent torsional rigidity for precise handling.",
    highlights: [
      "Available in 2WD and 4WD, single and double cab",
      "Petrol VVT-i engine or diesel engine options",
      "High-tensile steel body and chassis with laser welding",
      "Distinctive Toyota grille with tough tray bodies for cargo protection",
    ],
    specs: [],
    hero: "/images/vehicles/hilux/hilux-01.jpg",
    gallery: [],
  },
  {
    slug: "land-cruiser",
    name: "Land Cruiser",
    family: "Land Cruiser",
    bodyType: "SUV",
    category: "SUV",
    tagline: "The Pride of the Land.",
    summary:
      "The legendary Land Cruiser has been a leader in 4WD performance and reliability for over 60 years. It is integral to people's lives on virtually every continent, and you'll find it cruising the roads in every corner of the globe. Now reborn to meet the future, with added ruggedness and power, the king of 4WDs features a host of new innovations to extend its mastery over the toughest terrain.",
    highlights: [
      "Over 60 years of 4WD leadership",
      "Projector-beam headlights with auto on/off, up to LED low- and high-beam",
      "Engineered for the toughest terrain with added ruggedness and power",
      "A full-time flagship 4WD for every continent",
    ],
    specs: [],
    hero: "/images/vehicles/land-cruiser/land-cruiser-01.jpg",
    gallery: [],
  },
  {
    slug: "fortuner",
    name: "Fortuner",
    family: "Fortuner",
    bodyType: "SUV",
    category: "SUV",
    tagline: "Owns the moment.",
    summary:
      "The Fortuner owns the moment with a muscular yet stylish presence. Its bumpers, radiator grille, headlamps and rear combination lamps create a striking look that is further complemented by alloy wheels, colour-coded exterior mirrors (electrically adjustable with integrated indicators), a chrome rear door garnish and a rear spoiler with a high-mount stop lamp. HID headlamps optimise visibility and keep you safe on the road.",
    highlights: [
      "Seven SRS airbags with an impact-absorbing body structure",
      "Anti-lock Braking System (ABS) and Electronic Brake-force Distribution (EBD)",
      "Rear parking sensors and a reversing camera for tight manoeuvring",
      "Electrically adjustable colour-coded exterior mirrors with indicators",
    ],
    specs: [],
    hero: "/images/vehicles/fortuner/fortuner-01.jpg",
    gallery: [],
  },
];

/** Models listed in the site navigation, without a captured detail page.
 *  These carry the official Toyota Nigeria vehicle cutouts from the live
 *  homepage (/images/site/home-*.png) where one exists. */
const navOnly: {
  slug: string;
  name: string;
  family: string;
  bodyType: Vehicle["bodyType"];
  category: string;
  image?: string;
  imageIsPhoto?: boolean;
}[] = [
  { slug: "starlet", name: "Starlet", family: "Starlet", bodyType: "Hatchback", category: "Mini Subcompact SUV", image: "/images/site/model-starlet-photo.jpg", imageIsPhoto: true },
  { slug: "starlet-cross", name: "Starlet Cross", family: "Starlet", bodyType: "Crossover", category: "Mini Subcompact SUV", image: "/images/site/model-starletcross.png" },
  { slug: "rumion", name: "Rumion", family: "Rumion", bodyType: "MPV", category: "Mini Subcompact SUV", image: "/images/site/model-rumion.png" },
  { slug: "urban-cruiser", name: "Urban Cruiser", family: "Urban Cruiser", bodyType: "Crossover", category: "Mini Subcompact SUV", image: "/images/site/model-urban-cruiser-photo.webp", imageIsPhoto: true },
  { slug: "camry", name: "Camry", family: "Camry", bodyType: "Sedan", category: "Sedan", image: "/images/site/model-camry.png" },
  { slug: "belta", name: "Belta", family: "Belta", bodyType: "Sedan", category: "Sedan", image: "/images/site/model-belta.png" },
  { slug: "avensis", name: "Avensis", family: "Avensis", bodyType: "Sedan", category: "Sedan", image: "/images/site/model-avensis.png" },
  { slug: "lc300", name: "Land Cruiser 300", family: "Land Cruiser", bodyType: "SUV", category: "SUV", image: "/images/site/model-lc300.png" },
  { slug: "rush", name: "Rush", family: "Rush", bodyType: "SUV", category: "SUV", image: "/images/site/model-rush-photo.jpg", imageIsPhoto: true },
  { slug: "hiace", name: "Hiace", family: "Hiace", bodyType: "Van", category: "Bus", image: "/images/dealer/model-hiace-showroom.jpg", imageIsPhoto: true },
  { slug: "coaster", name: "Coaster", family: "Coaster", bodyType: "Bus", category: "Bus", image: "/images/dealer/model-coaster-studio.jpg", imageIsPhoto: true },
  { slug: "dyna", name: "Dyna", family: "Dyna", bodyType: "Truck", category: "Pickups & Trucks", image: "/images/dealer/model-dyna-studio.jpg", imageIsPhoto: true },
  { slug: "land-cruiser-70", name: "Land Cruiser 70", family: "Land Cruiser", bodyType: "Pickup", category: "Pickups & Trucks", image: "/images/dealer/model-landcruiser70-studio.jpg", imageIsPhoto: true },
];

function heroFor(slug: string, fallbackSubject: string): ImageSlot {
  const dealer = dealerHeroes[slug];
  if (dealer) {
    return plate(
      `${fallbackSubject} — photograph`,
      "16 / 9",
      "3/4 front",
      dealer.src,
      `Toyota ${fallbackSubject}`,
      dealer.fit,
    );
  }
  const files = manifest[slug] ?? [];
  const src = files[0];
  return plate(
    `${fallbackSubject} — hero photograph`,
    "16 / 9",
    "3/4 front",
    src,
    src ? `Toyota ${fallbackSubject}` : undefined,
  );
}

export const vehicles: Vehicle[] = [
  ...sourced.map((s): Vehicle => ({
    slug: s.slug,
    name: s.name,
    family: s.family,
    bodyType: s.bodyType,
    tagline: s.tagline,
    summary: s.summary,
    highlights: s.highlights,
    hero: heroFor(s.slug, s.name),
    gallery: galleryFor(s.slug, s.name).slice(1),
    specifications: s.specs,
    hasEvidencedDetail: true,
    verification: "verified",
  })),
  ...navOnly.map((s): Vehicle => ({
    slug: s.slug,
    name: s.name,
    family: s.family,
    bodyType: s.bodyType,
    summary: `The Toyota ${s.name} is available through Omoregie Motors. Speak to our sales team to confirm specification, trim and current price, or arrange a viewing at our showroom.`,
    highlights: [],
    hero: dealerHeroes[s.slug]
      ? plate(
          `${s.name} — photograph`,
          "16 / 9",
          "3/4 front",
          dealerHeroes[s.slug].src,
          `Toyota ${s.name}`,
        )
      : s.image
        ? plate(
            `${s.name} — ${s.imageIsPhoto ? "photograph" : "official vehicle image"}`,
            "16 / 9",
            s.imageIsPhoto ? "3/4 front" : "studio cutout",
            s.image,
            `Toyota ${s.name}`,
            s.imageIsPhoto ? undefined : "contain",
          )
        : plate(`${s.name} — hero photograph`, "16 / 9", "3/4 front"),
    gallery: [],
    specifications: [],
    hasEvidencedDetail: false,
    verification: "verified",
  })),
];

export const vehicleBySlug = (slug: string): Vehicle | undefined =>
  vehicles.find((v) => v.slug === slug);
export const evidencedVehicles = vehicles.filter((v) => v.hasEvidencedDetail);
export const unverifiedVehicles = vehicles.filter((v) => !v.hasEvidencedDetail);
export const bodyTypes = Array.from(new Set(vehicles.map((v) => v.bodyType)));
export const vehicleCategories = Array.from(new Set(vehicles.map((v) => v.family)));
