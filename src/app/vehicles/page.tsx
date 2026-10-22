import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { VehicleBrowser } from "@/components/VehicleBrowser";
import { vehicles, bodyTypes } from "@/content/vehicles";
import { brand } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Vehicles",
  description:
    "The Toyota range in Nigeria — SUVs, sedans, pickups, buses and vans, available through five Omoregie Motors locations.",
  path: "/vehicles",
});

export default function VehiclesPage() {
  return (
    <>
      <PageHero
        eyebrow="The range"
        title="Find your Toyota."
        lede="The full Toyota line-up for Nigeria — SUVs, sedans, pickups, buses and vans. Filter by body type, open a model, and choose one of our locations to confirm specification and price."
        crumbs={[{ label: "Home", href: "/" }, { label: "Vehicles" }]}
        aside={
          <dl className="statblock">
            <div>
              <dt>Models in the range</dt>
              <dd className="tabular">{vehicles.length}</dd>
            </div>
            <div>
              <dt>Body types</dt>
              <dd className="tabular">{bodyTypes.length}</dd>
            </div>
            <div>
              <dt>Our locations</dt>
              <dd className="tabular">{brand.branchCount}</dd>
            </div>
          </dl>
        }
      />

      <Section tone="paper" pad="md">
        <div className="shell">
          <VehicleBrowser vehicles={vehicles} />
        </div>
      </Section>
    </>
  );
}
