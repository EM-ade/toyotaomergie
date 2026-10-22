import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Gallery } from "@/components/Gallery";
import { SpecTable } from "@/components/SpecTable";
import { VehicleCard } from "@/components/VehicleCard";
import { Chip, TextLink } from "@/components/ui";
import { ArrowRight, WhatsApp } from "@/components/icons";
import { vehicleBySlug, vehicles } from "@/content/vehicles";
import { waHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = vehicleBySlug(slug);
  if (!v) return pageMetadata({ title: "Vehicle", description: "", path: "/vehicles" });
  return pageMetadata({
    title: v.name,
    description: v.summary,
    path: `/vehicles/${v.slug}`,
  });
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = vehicleBySlug(slug);
  if (!vehicle) notFound();

  const related = vehicles
    .filter((v) => v.slug !== vehicle.slug && v.family === vehicle.family)
    .slice(0, 3);
  const fallbackRelated = vehicles
    .filter((v) => v.slug !== vehicle.slug && v.hasEvidencedDetail)
    .slice(0, 3);
  const relatedSet = related.length ? related : fallbackRelated;

  return (
    <>
      <PageHero
        eyebrow={vehicle.tagline ?? vehicle.family}
        title={vehicle.name}
        lede={vehicle.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Vehicles", href: "/vehicles" },
          { label: vehicle.name },
        ]}
        actions={
          <>
            <a
              href={waHref(`Hello Omoregie Motors, I'd like to enquire about the ${vehicle.name}.`)}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp width={16} height={16} />
              Enquire on WhatsApp
            </a>
            <Link
              href={`/contact?vehicle=${encodeURIComponent(vehicle.slug)}`}
              className="btn btn--outline"
            >
              Request price
            </Link>
            <Link href="/service/request" className="btn btn--outline">
              Book a test drive
            </Link>
          </>
        }
        aside={
          <div className="detailmeta">
            <dl>
              <div>
                <dt>Body type</dt>
                <dd>{vehicle.bodyType}</dd>
              </div>
              <div>
                <dt>Model family</dt>
                <dd>{vehicle.family}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>On request</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Available through Omoregie Motors</dd>
              </div>
            </dl>
          </div>
        }
      />

      {/* Gallery + highlights */}
      <Section tone="paper" pad="md">
        <div className="shell detail-grid">
          <div className="detail-grid__media">
            <Gallery images={[vehicle.hero, ...vehicle.gallery]} name={vehicle.name} />
          </div>

          <div className="detail-grid__aside">
            {vehicle.highlights.length > 0 ? (
              <>
                <p className="eyebrow eyebrow--red">At a glance</p>
                <ul className="detail-highlights">
                  {vehicle.highlights.map((h, i) => (
                    <li key={`aside-${i}`}>{h}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="detail-callout">
                <p className="eyebrow eyebrow--red">Available to order</p>
                <p className="prose-body">
                  The {vehicle.name} is part of the Toyota range we supply.
                  Specification, trim and current price for the Nigerian market
                  are confirmed by our sales team — talk to us to order.
                </p>
              </div>
            )}

            <div className="detail-actions">
              <TextLink href="/dealers" icon={<ArrowRight width={14} height={14} />}>
                Visit our showroom
              </TextLink>
              <TextLink
                href={`/contact?vehicle=${encodeURIComponent(vehicle.slug)}`}
                icon={<ArrowRight width={14} height={14} />}
              >
                Request price for the {vehicle.name}
              </TextLink>
            </div>
          </div>
        </div>
      </Section>

      {/* Specifications */}
      <Section tone="sunk" pad="md" aria-labelledby="specs-title">
        <div className="shell specs-grid">
          <div className="specs-grid__head">
            <SectionHead
              id="specs-title"
              eyebrow="Specifications"
              eyebrowTone="red"
              title="Features, and the full specification."
            />
            <p className="prose-body" style={{ marginTop: "var(--space-md)" }}>
              The equipment and performance features of the {vehicle.name} are
              listed here. The full fielded specification — variant, trim and
              current Nigerian-market pricing — is confirmed by our sales team,
              who will match it to the exact vehicle available to you.
            </p>
            <div style={{ marginTop: "var(--space-md)" }}>
              <Chip tone="verify">Full spec on request</Chip>
            </div>
          </div>
          <div className="specs-grid__tables">
            {vehicle.specifications.length > 0 ? (
              <SpecTable groups={vehicle.specifications} />
            ) : (
              <div className="specs">
                <div>
                  <p className="notice__title">Feature overview</p>
                  <ul className="detail-highlights" style={{ marginTop: "var(--space-sm)" }}>
                    {vehicle.highlights.length > 0 ? (
                      vehicle.highlights.map((h, i) => (
                        <li key={`spec-${i}`}>{h}</li>
                      ))
                    ) : (
                      <li>Detailed specification available from our sales team.</li>
                    )}
                  </ul>
                </div>
                <div>
                  <p className="notice__title">Full specification</p>
                  <p className="prose-body" style={{ marginTop: "var(--space-sm)" }}>
                    Request the full specification, variant and pricing for the{" "}
                    {vehicle.name} from our sales team, who will confirm current
                    availability in Nigeria.
                  </p>
                  <div style={{ marginTop: "var(--space-md)" }}>
                    <Link
                      href={`/contact?vehicle=${encodeURIComponent(vehicle.slug)}`}
                      className="btn btn--ink"
                    >
                      Request specification
                      <ArrowRight width={16} height={16} />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Related */}
      {relatedSet.length > 0 && (
        <Section tone="paper" pad="md" aria-labelledby="related-title">
          <div className="shell">
            <SectionHead
              id="related-title"
              eyebrow="Also consider"
              title="Other models in the range."
            />
            <ul className="related-grid">
              {relatedSet.map((v) => (
                <li key={v.slug}>
                  <VehicleCard vehicle={v} />
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </>
  );
}
