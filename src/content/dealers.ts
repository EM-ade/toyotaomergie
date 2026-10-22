import type { Dealer } from "./types";

/**
 * Omoregie Motors — our own locations.
 *
 * Sourced from the dealer's published corporate profile:
 * head office and showroom, aftersales main workshop and spare parts, an Abuja
 * branch, and a Lekki office. These are our branches, not a competitor list.
 */

const SALES_HOURS = "Mon–Fri 8:00am–5:30pm · Sat 8:00am–2:00pm";
const SERVICE_HOURS = "Mon–Fri 8:00am–5:30pm · Sat 8:00am–2:00pm";

export const dealers: Dealer[] = [
  {
    slug: "surulere-head-office",
    name: "Surulere — Head Office & Showroom",
    descriptor: "Corporate head office and vehicle showroom",
    branches: [
      {
        city: "Surulere, Lagos",
        address: "45 Alhaji Tokan Street, Alaka Estate, near National Stadium, Surulere, Lagos",
        phone: "+234 803 800 2222 / +234 903 563 4038 / +234 816 799 0752",
        email: "info@omoregiemotorsng.com / sunnymotorsoa@yahoo.com",
        hours: SALES_HOURS,
        verification: "verified",
      },
    ],
    verification: "verified",
  },
  {
    slug: "victoria-island-workshop",
    name: "Victoria Island — Aftersales & Spare Parts",
    descriptor: "Main workshop and genuine spare parts",
    branches: [
      {
        city: "Victoria Island, Lagos",
        address: "1 Akarigbare Close, off Idejo Street, Victoria Island, Lagos",
        phone: "+234 708 814 8071 / +234 903 563 4038 / +234 802 501 4218",
        email: "omoregiemotorsservice@gmail.com / osamotor27@yahoo.com",
        hours: SERVICE_HOURS,
        verification: "verified",
      },
    ],
    verification: "verified",
  },
  {
    slug: "abuja",
    name: "Abuja Branch",
    descriptor: "Vehicle sales and aftersales",
    branches: [
      {
        city: "Garki, Abuja",
        address: "Plot 1481, Muhammadu Buhari Way, Cadastral Zone A3, Garki Central District, Abuja",
        phone: "+234 704 700 9102 / +234 803 629 9913",
        hours: SALES_HOURS,
        verification: "verified",
      },
    ],
    verification: "verified",
  },
  {
    slug: "lekki",
    name: "Lekki Office",
    descriptor: "Sales office",
    branches: [
      {
        city: "Lekki Phase 1, Lagos",
        address: "3 Adedoyin Ogungbe Crescent, Plot 5 Block A12, 1st Roundabout, Lekki Phase 1, Lagos",
        phone: "+234 816 799 0752",
        hours: SALES_HOURS,
        verification: "verified",
      },
    ],
    verification: "verified",
  },
  {
    slug: "alaba-workshop",
    name: "Alaba — Aftersales Workshop",
    descriptor: "Satellite workshop on the Badagry Expressway",
    branches: [
      {
        city: "Alaba, Lagos",
        address: "Km 6 Lagos–Badagry Expressway, opposite Eleganza Plaza, Alaba Suru bus stop, old Alaba, Lagos",
        phone: "+234 708 814 8071 / +234 802 501 4218",
        email: "omoregiemotorsservice@gmail.com",
        hours: SERVICE_HOURS,
        verification: "verified",
      },
    ],
    verification: "verified",
  },
];

export const dealerBySlug = (slug: string): Dealer | undefined =>
  dealers.find((d) => d.slug === slug);

export const dealerCount = dealers.length;
