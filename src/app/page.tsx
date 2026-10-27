import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { VehicleCard } from "@/components/VehicleCard";
import { ImageFrame } from "@/components/ImageFrame";
import { TextLink } from "@/components/ui";
import { FaInstagram } from "react-icons/fa6";
import {
  ArrowRight,
  Clock,
  Phone,
  Pin,
  Shield,
  WhatsApp,
} from "@/components/icons";
import {
  brand,
  dealerReasons,
  heritageBeats,
  servicePromotions,
  telHref,
  waHref,
} from "@/content/site";
import { vehicles } from "@/content/vehicles";
import { dealers } from "@/content/dealers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Omoregie Motors — Certified Toyota Dealer in Nigeria",
  description:
    "Omoregie Motors Nigeria Limited, an accredited Toyota dealer since 1978. Brand-new Toyota vehicles, genuine spare parts and aftersales across Lagos and Abuja.",
  path: "/",
});

/** The cars crossfaded in the hero — headliners of the showroom floor. */
const heroCarousel = ["prado", "hilux", "rav4", "camry"]
  .map((slug) => vehicles.find((v) => v.slug === slug))
  .filter(Boolean)
  .map((v) => (v as (typeof vehicles)[number]).hero);

/**
 * Homepage range: exactly four models, laid out as one wide feature card plus
 * three standard cards so every row stays full at every breakpoint.
 */
const primarySlug = "prado";
const secondarySlugs = ["hilux", "rav4", "camry"];
const featureVehicle = vehicles.find((v) => v.slug === primarySlug);
const gridVehicles = secondarySlugs
  .map((slug) => vehicles.find((v) => v.slug === slug))
  .filter(Boolean) as typeof vehicles;

const quickLinks = [
  { label: "Explore the range", href: "/vehicles", icon: <ArrowRight width={16} height={16} /> },
  { label: "Book a service", href: "/service/request", icon: <Clock width={16} height={16} /> },
  { label: "Genuine parts", href: "/parts", icon: <Shield width={16} height={16} /> },
  { label: "Our locations", href: "/dealers", icon: <Pin width={16} height={16} /> },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — HERO: the showroom offer. */}
      <Hero
        images={heroCarousel}
        badge={`${brand.descriptor} · Since ${brand.founded}`}
        titleLines={["Authentic Toyota.", "Locally delivered."]}
        lede="Brand-new Toyota vehicles, genuine spare parts and expert aftersales — from an accredited Toyota dealer serving Nigeria for over four decades."
        primary={{ label: "Explore the range", href: "/vehicles" }}
        secondary={{ label: "Book a test drive", href: "/contact" }}
        stats={[
          { value: String(brand.founded), label: "Trading since" },
          { value: String(dealers.length), label: "Locations" },
          { value: "100%", label: "Genuine Toyota" },
        ]}
      />

      {/* 2 — Quick-action rail. */}
      <nav className="quicklinks" aria-label="Quick links">
        {quickLinks.map((q) => (
          <Link key={q.href} href={q.href} className="quicklink">
            {q.icon}
            {q.label}
          </Link>
        ))}
      </nav>

      {/* 3 — THE RANGE: product grid. */}
      <Section tone="paper" pad="lg" aria-labelledby="range-title">
        <div className="shell">
          <SectionHead
            id="range-title"
            layout="split"
            eyebrow="Shop Toyota"
            eyebrowTone="red"
            title="Choose your Toyota."
            lede="From the legendary Land Cruiser and Hilux to the Corolla, Camry and RAV4 — browse the range and speak to our sales team about specification, price and availability."
            action={
              <TextLink href="/vehicles" icon={<ArrowRight width={14} height={14} />}>
                View all models
              </TextLink>
            }
          />

          <div className="range-grid">
            {featureVehicle && (
              <Reveal className="range-grid__item">
                <VehicleCard vehicle={featureVehicle} />
              </Reveal>
            )}
            {gridVehicles.map((v, i) => (
              <Reveal key={v.slug} className="range-grid__item" delay={60 + i * 50}>
                <VehicleCard vehicle={v} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* 4 — AFTESALES: dark band, workshop. */}
      <Section tone="night" pad="none" aria-labelledby="service-title">
        <div className="service-band">
          <Reveal className="service-band__media">
            <ImageFrame
              slot={{
                src: "/images/dealer/showroom-suv-interior.jpg",
                alt: "Toyota SUV in the Omoregie Motors showroom",
                subject: "Omoregie Motors showroom",
                aspect: "16 / 9",
              }}
              tone="night"
              sizes="(min-width: 900px) 50vw, 100vw"
            />
          </Reveal>
          <div className="service-band__panel">
            <Reveal>
              <p className="eyebrow">Aftersales</p>
              <h2 id="service-title" className="display-3 service-band__title">
                Kept on the road by the people who sold it.
              </h2>
              <p className="lede service-band__lede">
                Genuine-parts servicing, diagnostics and repair at our Victoria
                Island and Alaba workshops. One team, from purchase to every
                service after it.
              </p>

              <ul className="service-band__promos">
                {servicePromotions.map((p) => (
                  <li key={p.name}>
                    <span className="service-band__promoname">{p.name}</span>
                    <span className="service-band__promoblurb">{p.blurb}</span>
                  </li>
                ))}
              </ul>

              <div className="service-band__actions">
                <Link href="/service/request" className="btn btn--primary">
                  Book a service
                  <ArrowRight width={16} height={16} />
                </Link>
                <Link href="/service" className="btn btn--on-night">
                  Our services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 5 — WHY OMOREGIE: three-column proof. */}
      <Section tone="paper" pad="lg" aria-labelledby="why-title">
        <div className="shell">
          <SectionHead
            id="why-title"
            layout="split"
            eyebrow="Why Omoregie"
            eyebrowTone="red"
            title="Buy from a dealer that stays with you."
            lede="An accredited Toyota dealer since 1978 — supplying the vehicles, the genuine parts and the service that keep them on the road."
            action={
              <TextLink href="/why-toyota" icon={<ArrowRight width={14} height={14} />}>
                Why buy from us
              </TextLink>
            }
          />
          <ol className="story">
            {heritageBeats.map((b, i) => (
              <Reveal key={b.year} delay={i * 70} className="story__beat" as="li">
                <span className="story__year">{b.year}</span>
                <h3 className="story__title">{b.title}</h3>
                <p className="story__body">{b.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="story__proof">
            <p className="eyebrow eyebrow--bare">What we do</p>
            <ul className="story__awards">
              {dealerReasons.slice(0, 3).map((r) => (
                <li key={r.title}>
                  <span className="story__awardtitle">{r.title}</span>
                  <span className="story__awardbody">{r.body}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 6 — LOCATIONS. */}
      <Section tone="paper" pad="lg" aria-labelledby="locations-title">
        <div className="shell">
          <SectionHead
            id="locations-title"
            layout="split"
            eyebrow="Locations"
            eyebrowTone="red"
            title="Find us in Lagos and Abuja."
            lede="Showroom, workshops and sales offices across Lagos and Abuja. Call ahead and we'll have the vehicle ready."
            action={
              <TextLink href="/dealers" icon={<ArrowRight width={14} height={14} />}>
                All locations
              </TextLink>
            }
          />
          <div className="loc-grid">
            {dealers.map((d, i) => {
              const b = d.branches[0];
              return (
                <Reveal key={d.slug} delay={i * 60}>
                  <article className="loc-card">
                    <p className="loc-card__kind">{d.descriptor}</p>
                    <h3 className="loc-card__name">{d.name}</h3>
                    <p className="loc-card__row">
                      <Pin width={15} height={15} />
                      {b.address ?? b.city}
                    </p>
                    <p className="loc-card__row">
                      <Phone width={15} height={15} />
                      {b.phone?.split(" / ")[0] ?? "Call us"}
                    </p>
                    <p className="loc-card__row">
                      <Clock width={15} height={15} />
                      {brand.hours.weekday} · Sat {brand.hours.saturday}
                    </p>
                    <div className="loc-card__actions">
                      <Link href={`/dealers/${d.slug}`} className="btn btn--ink">
                        Details
                      </Link>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${d.name} ${b.address ?? b.city}`,
                        )}`}
                        className="btn btn--outline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Directions
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 7 — CONTACT CTA. */}
      <Section tone="sunk" pad="md">
        <div className="shell closing">
          <Reveal>
            <p className="eyebrow eyebrow--red">Ready when you are</p>
            <h2 className="display-4 closing__title">
              Talk to Omoregie Motors today.
            </h2>
            <p className="prose-body" style={{ marginTop: "0.75rem" }}>
              Call, message on WhatsApp, or visit our Surulere showroom.
            </p>
          </Reveal>
          <Reveal className="closing__actions" delay={90}>
            <a href={telHref(brand.salesPhone[0])} className="btn btn--primary">
              <Phone width={16} height={16} />
              {brand.salesPhone[0]}
            </a>
            <a
              href={waHref("Hello Omoregie Motors, I'd like to enquire about a Toyota.")}
              className="btn btn--outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp width={16} height={16} />
              WhatsApp
            </a>
            <a
              href={brand.socials.instagram}
              className="btn btn--outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram aria-hidden="true" />
              Instagram
            </a>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
