/**
 * Toyota Nigeria — content types.
 *
 * Every record here is either (a) evidenced in the source screenshots / audit
 * package, or (b) explicitly marked as unverified via `verification`. There is
 * no third state. See docs/content-inventory.md.
 */

export type Verification = "verified" | "unverified" | "placeholder";

export interface ImageSlot {
  /**
   * Relative path under /public, e.g. "/images/vehicles/prado-hero.jpg".
   * When absent (or when the file is not present), <ImageFrame> renders the
   * designed placeholder. Never a hot-linked remote URL.
   */
  src?: string;
  /** Descriptive alt text. Required when `src` is set. */
  alt: string;
  /** What the intended photograph shows — shown in the placeholder. */
  subject: string;
  /** Intended crop, e.g. "3/4 front, low angle". */
  crop?: string;
  /** CSS aspect ratio, e.g. "16 / 9". */
  aspect: string;
  /** Optional art-direction focal point. */
  position?: string;
  /** How the image fills its frame. Cutouts use "contain". */
  fit?: "cover" | "contain";
}

export type VehicleBodyType =
  | "SUV"
  | "Pickup"
  | "Sedan"
  | "Hatchback"
  | "MPV"
  | "Van"
  | "Bus"
  | "Truck"
  | "Crossover";

export interface Vehicle {
  slug: string;
  name: string;
  family: string;
  bodyType: VehicleBodyType;
  /** Short editorial line from the source site, where stated. */
  tagline?: string;
  summary: string;
  /** Preserved feature / performance copy, where evidenced. */
  highlights: string[];
  hero: ImageSlot;
  gallery: ImageSlot[];
  /** Specification groups. Never invented — only evidenced fields. */
  specifications: SpecGroup[];
  /** Models with an evidenced detail route in the source audit. */
  hasEvidencedDetail: boolean;
  verification: Verification;
}

export interface SpecGroup {
  group: string;
  rows: { label: string; value: string }[];
}

export interface Dealer {
  slug: string;
  name: string;
  /** Short descriptor, only where evidenced. */
  descriptor?: string;
  branches: DealerBranch[];
  verification: Verification;
}

export interface DealerBranch {
  city: string;
  state?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  verification: Verification;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  /** Where the original FAQ copy lives when the audit found a duplicate set. */
  source?: string;
  verification: Verification;
}

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: ImageSlot;
  verification: Verification;
}

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  image?: ImageSlot;
  badge?: string;
}

export interface NavGroup {
  label: string;
  children: NavChild[];
  /** A column can be prose rather than links. */
  note?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** Mega-menu columns. Absent => a plain link. */
  groups?: NavGroup[];
  /** Featured panel shown beside the mega menu. */
  feature?: {
    label: string;
    href: string;
    title: string;
    body: string;
    image: ImageSlot;
  };
}

export interface ServiceItem {
  name: string;
  description: string;
}

export interface LegalDocument {
  slug: string;
  title: string;
  updated?: string;
  paragraphs: string[];
  isPlaceholder: boolean;
}
