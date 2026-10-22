import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { DealerDirectory } from "@/components/DealerDirectory";
import { dealers } from "@/content/dealers";
import { brand } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Our locations",
  description:
    "Omoregie Motors locations in Lagos and Abuja — Surulere head office, Victoria Island and Alaba workshops, Lekki office and the Abuja branch.",
  path: "/dealers",
});

export default function DealersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our locations"
        title="Find us in Lagos and Abuja."
        lede={`${dealers.length} locations across Lagos and Abuja — showrooms, workshops and sales offices serving customers since ${brand.founded}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
        aside={
          <dl className="statblock">
            <div>
              <dt>Locations</dt>
              <dd className="tabular">{dealers.length}</dd>
            </div>
            <div>
              <dt>Trading since</dt>
              <dd className="tabular">{brand.founded}</dd>
            </div>
            <div>
              <dt>Role</dt>
              <dd>{brand.descriptor}</dd>
            </div>
          </dl>
        }
      />

      <Section tone="paper" pad="md">
        <div className="shell">
          <DealerDirectory dealers={dealers} />
        </div>
      </Section>
    </>
  );
}
