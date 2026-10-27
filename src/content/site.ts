import type {
  Article,
  LegalDocument,
  NavItem,
  ServiceItem,
} from "./types";
import { evidencedVehicles, unverifiedVehicles } from "./vehicles";

/* ---------------------------------------------------------------------------
   Brand facts — Omoregie Motors Nigeria Limited, an accredited Toyota dealer.
   Sourced from the dealer's own published corporate profile.
   Toyota (Nigeria) Limited is the national distributor; Omoregie is one of its
   accredited dealers, so the distributor is referenced as the credential.
--------------------------------------------------------------------------- */

export const brand = {
  name: "Omoregie Motors",
  legalName: "Omoregie Motors Nigeria Limited",
  tagline: "Excellence in Motion. Trust in Every Mile.",
  descriptor: "Accredited Toyota Dealer",
  certifiedLine: "Accredited Toyota dealer in Nigeria",
  founded: 1978,
  foundedLine: "Serving Nigerian motorists since 1978",
  distributorLine: "An accredited dealer in the Toyota (Nigeria) Limited network",
  appointedLine: "Accredited by Toyota (Nigeria) Limited",
  branchCount: 5,
  hours: {
    weekday: "8:00am – 5:30pm",
    saturday: "8:00am – 2:00pm",
    sunday: "Closed",
    lines: [
      { day: "Monday – Friday", hours: "8:00am – 5:30pm" },
      { day: "Saturday", hours: "8:00am – 2:00pm" },
      { day: "Sunday", hours: "Closed" },
    ],
  },
  salesPhone: ["+2348038002222", "+2349035634038", "+2348167990752"],
  servicePhone: ["+2347088148071", "+2348025014218"],
  whatsapp: "2348038002222",
  whatsapp2: "2349035634038",
  socials: {
    instagram: "https://www.instagram.com/omoregie_motors",
  },
  emails: {
    sales: "info@omoregiemotorsng.com",
    service: "omoregiemotorsservice@gmail.com",
  },
  specialties: [
    "Brand-new Toyota vehicles",
    "Genuine Toyota spare parts",
    "Repairs & maintenance",
  ],
} as const;

/** Display helpers for contact links. */
export const telHref = (p: string) => `tel:${p.replace(/[^+\d]/g, "")}`;
export const waHref = (message?: string, phone: string = brand.whatsapp) =>
  `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

/* ---------------------------------------------------------------------------
   Navigation — grouped exactly as the live site groups it:
   Models · After Sales · Company.
--------------------------------------------------------------------------- */

const modelChildren = [
  ...evidencedVehicles.map((v) => ({
    label: v.name,
    href: `/vehicles/${v.slug}`,
    description: v.tagline,
  })),
  ...unverifiedVehicles.map((v) => ({
    label: v.name,
    href: `/vehicles/${v.slug}`,
    badge: "Ask dealer",
  })),
];

export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Vehicles",
    href: "/vehicles",
    groups: [
      {
        label: "SUV",
        children: [
          "Land Cruiser Prado",
          "Land Cruiser",
          "Land Cruiser 300",
          "RAV4",
          "Fortuner",
          "Rush",
        ]
          .map((n) => modelChildren.find((c) => c.label === n))
          .filter(Boolean) as typeof modelChildren,
      },
      {
        label: "Sedan & Hatch",
        children: ["Corolla", "Camry", "Starlet", "Starlet Cross", "Urban Cruiser", "Rumion"]
          .map((n) => modelChildren.find((c) => c.label === n))
          .filter(Boolean) as typeof modelChildren,
      },
      {
        label: "Pickups, Buses & Trucks",
        children: ["Hilux", "Land Cruiser 70", "Hiace", "Coaster"]
          .map((n) => modelChildren.find((c) => c.label === n))
          .filter(Boolean) as typeof modelChildren,
      },
      {
        label: "Shop",
        children: [
          { label: "Browse every model", href: "/vehicles", description: "The full Toyota range" },
          { label: "Compare vehicles", href: "/vehicles/compare", description: "Put models side by side" },
        ],
      },
    ],
    feature: {
      label: "Featured",
      href: "/vehicles/prado",
      title: "Land Cruiser Prado",
      body: "Embrace life with the Land Cruiser Prado — the exhilaration of anticipating that no terrain will ever limit you.",
      image: {
        src: "/images/dealer/model-prado-studio.jpg",
        alt: "Toyota Land Cruiser Prado",
        subject: "Land Cruiser Prado",
        aspect: "4 / 3",
      },
    },
  },
  {
    label: "Service",
    href: "/service",
    groups: [
      {
        label: "Workshop",
        children: [
          { label: "Service & repairs", href: "/service", description: "Our services include" },
          { label: "General maintenance", href: "/service#taxonomy", description: "Scheduled servicing" },
          { label: "Vehicle diagnostics", href: "/service#promotions", description: "Electronic fault-finding" },
          { label: "Body & paint", href: "/service#promotions", description: "Panel and paintwork" },
          { label: "Book a service", href: "/service/request", description: "Schedule with us" },
        ],
      },
      {
        label: "Parts",
        children: [
          { label: "Genuine spare parts", href: "/parts", description: "Omoregie genuine parts" },
          { label: "Recognise genuine parts", href: "/parts#genuine", description: "Authenticity matters" },
        ],
      },
      {
        label: "Ownership",
        children: [
          { label: "Warranty", href: "/warranty", description: "3 years / 100,000km" },
          { label: "FAQ", href: "/faq", description: "Sales, parts and service" },
          { label: "Our locations", href: "/dealers", description: "Lagos & Abuja" },
        ],
      },
    ],
    feature: {
      label: "Aftersales",
      href: "/service/request",
      title: "Book a service",
      body: "Genuine-parts servicing at our Victoria Island and Alaba workshops. Book a slot with our team.",
      image: {
        src: "/images/dealer/showroom-suv-interior.jpg",
        alt: "Toyota vehicle in the Omoregie showroom",
        subject: "Showroom service",
        aspect: "4 / 3",
      },
    },
  },
  {
    label: "Locations",
    href: "/dealers",
    groups: [
      {
        label: "Lagos",
        children: [
          { label: "Surulere — Head office", href: "/dealers/surulere-head-office", description: "Showroom & corporate office" },
          { label: "Victoria Island", href: "/dealers/victoria-island-workshop", description: "Workshop & spare parts" },
          { label: "Lekki office", href: "/dealers/lekki", description: "Sales office" },
          { label: "Alaba workshop", href: "/dealers/alaba-workshop", description: "Badagry Expressway" },
        ],
      },
      {
        label: "Abuja",
        children: [
          { label: "Garki", href: "/dealers/abuja", description: "Vehicle sales & aftersales" },
        ],
      },
      {
        label: "Contact",
        children: [
          { label: "Contact us", href: "/contact", description: "Sales, service and parts" },
          { label: "Opening hours", href: "/contact#hours", description: "Mon–Sat" },
        ],
      },
    ],
    feature: {
      label: "Our showroom",
      href: "/dealers/surulere-head-office",
      title: "Surulere head office",
      body: "45 Alhaji Tokan Street, Alaka Estate, Surulere — our corporate head office and main vehicle showroom.",
      image: {
        src: "/images/dealer/showroom-surulere.jpg",
        alt: "Omoregie Motors Toyota showroom in Surulere, Lagos",
        subject: "Omoregie Motors showroom",
        aspect: "4 / 3",
      },
    },
  },
];

export const utilityNav = {
  primary: [
    { label: "Our locations", href: "/dealers" },
    { label: "Book a service", href: "/service/request" },
    { label: "Contact", href: "/contact" },
  ],
};

/* ---------------------------------------------------------------------------
   Footer — the live site's four column groups.
--------------------------------------------------------------------------- */

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Vehicles",
    links: [
      { label: "All vehicles", href: "/vehicles" },
      { label: "Land Cruiser Prado", href: "/vehicles/prado" },
      { label: "Hilux", href: "/vehicles/hilux" },
      { label: "RAV4", href: "/vehicles/rav4" },
      { label: "Corolla", href: "/vehicles/corolla" },
      { label: "Camry", href: "/vehicles/camry" },
    ],
  },
  {
    title: "Aftersales",
    links: [
      { label: "Service & repairs", href: "/service" },
      { label: "Genuine spare parts", href: "/parts" },
      { label: "Book a service", href: "/service/request" },
      { label: "Warranty", href: "/warranty" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Surulere head office", href: "/dealers/surulere-head-office" },
      { label: "Victoria Island", href: "/dealers/victoria-island-workshop" },
      { label: "Lekki office", href: "/dealers/lekki" },
      { label: "Alaba workshop", href: "/dealers/alaba-workshop" },
      { label: "Abuja branch", href: "/dealers/abuja" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Why Omoregie", href: "/why-toyota" },
      { label: "Contact us", href: "/contact" },
      { label: "Privacy policy", href: "/legal/privacy" },
    ],
  },
];



/* ---------------------------------------------------------------------------
   Aftersales — our workshop services and opening hours.
--------------------------------------------------------------------------- */

export const serviceTaxonomy: ServiceItem[] = [
  { name: "General automotive repair", description: "Mechanical repair carried out by our workshop using genuine Toyota components." },
  { name: "Preventative car maintenance", description: "Scheduled maintenance to keep your vehicle within its service plan and ahead of wear." },
  { name: "Air conditioning service", description: "A/C diagnosis, service and repair — a first-order requirement in Nigerian conditions." },
  { name: "Cooling system and radiator repair", description: "Cooling system inspection, flush and repair, including radiator work." },
  { name: "Synthetic motor oil replacement", description: "Full synthetic oil change to the schedule for your model and mileage." },
  { name: "Oil filter replacement", description: "Routine oil filter replacement with genuine Toyota parts." },
  { name: "Brake repair", description: "Brake inspection, pad and disc replacement, and system checks." },
  { name: "Engine diagnostic", description: "Electronic fault diagnosis against the vehicle's own systems, to locate faults before parts are replaced." },
  { name: "Belts, hoses, fluids", description: "Replacement of belts and hoses and top-up of the vehicle's fluids." },
  { name: "Transmission services", description: "Transmission service and repair carried out in our workshops." },
];

export const serviceHours: { day: string; hours: string }[] = [
  { day: "Monday – Friday", hours: "8:00am – 5:30pm" },
  { day: "Saturday", hours: "8:00am – 2:00pm" },
  { day: "Sunday", hours: "Closed" },
];

/** Homepage service highlights. */
export const servicePromotions: { name: string; blurb: string; href: string }[] = [
  { name: "Vehicle diagnostics", blurb: "Electronic fault-finding before parts are replaced.", href: "/service#taxonomy" },
  { name: "Genuine spare parts", blurb: "Toyota components from our spare parts department.", href: "/parts" },
  { name: "Scheduled servicing", blurb: "Maintenance to your model's service schedule.", href: "/service/request" },
  { name: "Air conditioning", blurb: "A/C service and repair for Nigerian conditions.", href: "/service#taxonomy" },
];

/* ---------------------------------------------------------------------------
   The Omoregie story — heritage arc grounded in the dealer's own profile.
   --------------------------------------------------------------------------- */

export const heritageBeats: { year: string; title: string; body: string }[] = [
  {
    year: "1978",
    title: "Incorporated in Nigeria",
    body: "Omoregie Motors Nigeria Limited has been trading since 1978, building decades of experience across Toyota vehicle sales, genuine parts and vehicle maintenance.",
  },
  {
    year: "Certified",
    title: "An accredited Toyota dealer",
    body: "We are an accredited dealer within the Toyota (Nigeria) Limited network — brand-new Toyota vehicles, genuine parts and authorised aftersales through one trusted relationship.",
  },
  {
    year: "Today",
    title: "Four locations, one standard",
    body: "Head office and showroom in Surulere, aftersales workshops in Victoria Island and Alaba, and an Abuja branch — serving individuals, businesses and government institutions.",
  },
];

/** Core values, stated by the dealer. */
export const coreValues: { title: string; body: string }[] = [
  { title: "Integrity", body: "Honesty, transparency and accountability in every transaction." },
  { title: "Excellence", body: "High standards in products, services and customer relationships." },
  { title: "Reliability", body: "Dependable vehicles, responsive service and responsible business." },
  { title: "Professionalism", body: "Respect, competence and a commitment to quality in every engagement." },
  { title: "Customer satisfaction", body: "Our customers' needs sit at the centre of the business." },
  { title: "Continuous improvement", body: "Improving service delivery as the automotive market evolves." },
];

export const vision =
  "To be recognised as one of Nigeria's most trusted and respected automotive dealerships, distinguished by excellence in Toyota vehicle supply, genuine spare parts, professional maintenance services and enduring customer relationships.";

export const mission =
  "To provide dependable Toyota automotive solutions through quality products, professional service, genuine spare parts and reliable vehicle maintenance, while consistently upholding the principles of integrity, customer satisfaction and operational excellence.";

/** Why choose Omoregie — the dealer's own case. */
export const dealerReasons: { title: string; body: string }[] = [
  {
    title: "Accredited Toyota dealership",
    body: "We are an accredited Toyota dealer, supplying brand-new vehicles and related Toyota solutions through the authorised network.",
  },
  {
    title: "Comprehensive solutions",
    body: "Vehicle supply, genuine spare parts, repairs and maintenance under one business relationship.",
  },
  {
    title: "Serving diverse customers",
    body: "Government agencies, corporate organisations and individual motorists, each with a professional, responsive approach.",
  },
  {
    title: "Commitment to genuine parts",
    body: "Genuine Toyota components preserve the performance, reliability and durability the vehicle was built for.",
  },
  {
    title: "Professional customer service",
    body: "We understand customer requirements and maintain professional communication throughout each engagement.",
  },
  {
    title: "Long-term relationships",
    body: "Lasting relationships built on trust, consistency, accountability and responsiveness.",
  },
];

/** Institutional clientele, as stated by the dealer. */
export const procurementClients: string[] = [
  "Federal and state government ministries, departments and agencies",
  "Public-sector institutions and government-owned organisations",
  "Private-sector companies and multinational organisations",
  "Corporate executives and business leaders",
  "Organisations requiring vehicles for operational and administrative use",
  "Businesses seeking suitable vehicles for fleet deployment",
];

/* ---------------------------------------------------------------------------
   Warranty — stated by Toyota Nigeria on the live FAQ.
   --------------------------------------------------------------------------- */
export const warranty = {
  vehicle: "3 years or 100,000km, whichever comes first after purchase",
  parts: "12 months / 20,000km on parts purchased from accredited dealers (terms and conditions apply)",
  firstService: "First service at 1,000km",
  coverage:
    "Warranty is an assurance by the manufacturer that it will repair, replace or adjust at its option any factory installed part that is defective in materials or workmanship under normal use, at no cost to the customer.",
} as const;

/* ---------------------------------------------------------------------------
   Awards — read from the live Awards & Rating page.
--------------------------------------------------------------------------- */

export const awards: { title: string; body: string; year: string }[] = [
  { title: "Silver Sponsor of the 19th Presidential Inauguration Dinner", body: "Nigerian British Chamber of Commerce (NBCC)", year: "2025" },
  { title: "Workshop of the Year", body: "Toyota Workshop, Isolo, Lagos — Nigeria Auto Journalists Association (NAJA)", year: "2025" },
  { title: "Minibus of the Year", body: "Toyota Hiace — Nigeria Auto Journalists Association (NAJA)", year: "2025" },
  { title: "Pick Up of the Year", body: "Toyota Hilux — Nigeria Auto Journalists Association (NAJA)", year: "2025" },
  { title: "Auto Company of the Decade", body: "Nigeria Auto Journalists Association (NAJA)", year: "2024" },
  { title: "Product Launch of the Year", body: "Toyota Belta & Rumion — Nigeria Auto Journalists Association (NAJA)", year: "2024" },
  { title: "Minibus of the Year", body: "Toyota Hiace — Nigeria Auto Journalists Association (NAJA)", year: "2024" },
  { title: "Automotive Sponsor of the Year", body: "Strap & Safe Child Foundation", year: "2024" },
  { title: "5-Star Leadership", body: "On the Highway Magazine", year: "2024" },
  { title: "The Most Valuable Automobile Brand", body: "Top 50 Brands Nigeria", year: "2024" },
];

/* ---------------------------------------------------------------------------
   Media / blog
--------------------------------------------------------------------------- */

export const articles: Article[] = [
  {
    slug: "camry-new-generation",
    title: "Toyota Nigeria Ltd unveils the new generation Camry in Nigeria",
    date: "2025-01-01",
    category: "News",
    excerpt:
      "Toyota (Nigeria) Limited launched the new generation Camry in Nigeria, continuing the model's long history in the market.",
    image: { alt: "Toyota Camry", subject: "Toyota Nigeria editorial", crop: "editorial", aspect: "16 / 9", src: "/images/site/news-camry.jpg" },
    verification: "verified",
  },
  {
    slug: "rush-launch",
    title: "Toyota Nigeria Limited launches the Toyota Rush",
    date: "2025-01-01",
    category: "News",
    excerpt:
      "The Toyota Rush joined the model line-up, extending the SUV range distributed through the accredited dealer network.",
    image: { alt: "Toyota Rush", subject: "Toyota Nigeria editorial", crop: "editorial", aspect: "16 / 9", src: "/images/site/model-rush-photo.jpg" },
    verification: "verified",
  },
  {
    slug: "dream-car-art-contest",
    title: "The Toyota Dream Car Art Contest",
    date: "2025-01-01",
    category: "CSR",
    excerpt:
      "Toyota (Nigeria) Limited organises the annual Dream Car Art Contest among Nigerian children, giving expression to budding creative talents.",
    image: { alt: "Toyota Dream Car Art Contest", subject: "Toyota Nigeria editorial", crop: "editorial", aspect: "16 / 9", src: "/images/site/news-dreamcar.jpg" },
    verification: "verified",
  },
  {
    slug: "female-technicians",
    title: "Meet our accredited Toyota Nigeria female technicians",
    date: "2025-01-01",
    category: "People",
    excerpt:
      "The technicians who service and repair Toyota vehicles across the accredited dealer network.",
    image: { alt: "Toyota service", subject: "Toyota Nigeria editorial", crop: "editorial", aspect: "16 / 9", src: "/images/site/service-01.jpg" },
    verification: "verified",
  },
  {
    slug: "hilux-banner",
    title: "Toyota Hilux: built for the terrain",
    date: "2025-01-01",
    category: "Ownership",
    excerpt:
      "The Hilux range is available in 2WD and 4WD, single and double cab, with petrol and diesel engines.",
    image: { alt: "Toyota Hilux", subject: "Toyota Nigeria editorial", crop: "editorial", aspect: "16 / 9", src: "/images/site/news-hilux.png" },
    verification: "verified",
  },
  {
    slug: "origin-of-the-toyota-logo",
    title: "The origin of the Toyota logo",
    date: "2025-01-01",
    category: "Company",
    excerpt:
      "The story behind the three overlapping ellipses that form the Toyota emblem.",
    image: { alt: "Toyota emblem", subject: "Toyota Nigeria editorial", crop: "editorial", aspect: "16 / 9", src: "/images/site/news-origin.jpg" },
    verification: "verified",
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);

/* ---------------------------------------------------------------------------
   Legal
--------------------------------------------------------------------------- */

export const legalDocuments: LegalDocument[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    isPlaceholder: false,
    paragraphs: [
      "Omoregie Motors Nigeria Limited collects personal information you choose to give us — such as your name, phone number, email address, vehicle details and VIN — when you call, message us on WhatsApp, submit a form, visit a showroom or book a service.",
      "We use that information only to respond to your enquiry, process a purchase or service request, arrange delivery, provide warranty support and keep you informed about your vehicle. We do not sell your information.",
      "Where necessary, we share information with Toyota (Nigeria) Limited and its authorised network for warranty claims, service campaigns and vehicle identification. We keep information only for as long as needed for these purposes or as required by law.",
      "You may request access to, correction of, or deletion of your personal information by contacting us at info@omoregiemotorsng.com or on +234 803 800 2222.",
      "This policy is a plain-language summary. For any specific legal question, please contact us before submitting information.",
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    isPlaceholder: false,
    paragraphs: [
      "This website is operated by Omoregie Motors Nigeria Limited, an accredited Toyota dealer. By using it you agree to these terms.",
      "Vehicle imagery, specifications, prices and availability are provided for guidance. Prices are quoted on request and confirmed by our sales team at the point of sale. Images may show models or trim levels that differ from vehicles available at a given time.",
      "Toyota, the Toyota emblem and model names are trademarks of Toyota Motor Corporation. They are used here to identify the genuine products and services we are authorised to supply.",
      "We aim to keep the information on this site accurate but do not warrant that it is complete or current at all times. To the extent permitted by law, we are not liable for decisions made solely on the basis of website content.",
      "These terms are governed by the laws of the Federal Republic of Nigeria.",
    ],
  },
  {
    slug: "cookies",
    title: "Cookies",
    isPlaceholder: false,
    paragraphs: [
      "This website uses only the cookies needed for it to work correctly and to understand, in aggregate, how pages are used. We do not use cookies to build advertising profiles.",
      "You can block or delete cookies in your browser settings. Blocking essential cookies may affect parts of the site.",
      "If we introduce analytics or advertising cookies in future, this page will describe them and how to opt out.",
    ],
  },
];

export const legalBySlug = (slug: string) => legalDocuments.find((d) => d.slug === slug);

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.toyotanigeria.com";
