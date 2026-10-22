import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, SectionHead } from "@/components/Section";
import { SpecTable } from "@/components/SpecTable";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleHero } from "@/components/VehicleHero";
import { Chip } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
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
      <VehicleHero
        name={vehicle.name}
        family={vehicle.family}
        bodyType={vehicle.bodyType}
        tagline={vehicle.tagline}
        summary={vehicle.summary}
        images={[vehicle.hero, ...vehicle.gallery]}
        enquireHref={waHref(
          `Hello Omoregie Motors, I'd like to enquire about the ${vehicle.name}.`,
        )}
        priceHref={`/contact?vehicle=${encodeURIComponent(vehicle.slug)}`}
        testDriveHref="/service/request"
      />

      {/* Highlights */}
      {vehicle.highlights.length > 0 && (
        <Section tone="paper" pad="md" aria-labelledby="highlights-title">
          <div className="shell vfeatures">
            <div className="vfeatures__head">
              <p className="eyebrow eyebrow--red">At a glance</p>
              <h2 id="highlights-title" className="display-4">
                Key features.
              </h2>
            </div>
            <ul className="vfeatures__list">
              {vehicle.highlights.map((h, i) => (
                <li key={`h-${i}`}>{h}</li>
              ))}
            </ul>
          </div>
        </Section>
      )}

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
