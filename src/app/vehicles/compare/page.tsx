import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { CompareTool } from "@/components/CompareTool";
import { vehicles } from "@/content/vehicles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "Compare models",
    description:
      "Compare Toyota models side by side on body type, model family and the specification we hold, with anything unconfirmed clearly labelled.",
    path: "/vehicles/compare",
  }),
};

export default function ComparePage() {
  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Compare Toyota models."
        lede="Put models next to each other and compare body type, family and the specification we hold. Anything we cannot yet confirm is clearly labelled."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Vehicles", href: "/vehicles" },
          { label: "Compare" },
        ]}
      />
      <Section tone="paper" pad="md">
        <div className="shell">
          <CompareTool vehicles={vehicles} />
        </div>
      </Section>
    </>
  );
}
