import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ImageFrame } from "@/components/ImageFrame";
import { ButtonLink, TextLink, VerifyNotice } from "@/components/ui";
import { ArrowRight, Check } from "@/components/icons";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Genuine parts & accessories",
  description:
    "Genuine Toyota parts and accessories from our spare parts department in Lagos, matched to the correct component using your VIN.",
  path: "/parts",
});

const points = [
  "Genuine Toyota parts and accessories are supplied from our spare parts department.",
  "Our parts team identifies the correct component for your vehicle using its VIN.",
  "Have your VIN ready before you enquire, so the right component can be matched first time.",
  "Parts warranty terms are confirmed when you order.",
];

export default function PartsPage() {
  return (
    <>
      <PageHero
        eyebrow="Parts & accessories"
        title="Genuine parts, matched to your vehicle."
        lede="Genuine Toyota parts and accessories, supplied from our own spare parts department and matched to the exact build of your vehicle."
        crumbs={[{ label: "Home", href: "/" }, { label: "Parts & accessories" }]}
        actions={
          <>
            <ButtonLink
              href="/contact?subject=Genuine%20parts%20enquiry"
              icon={<ArrowRight width={16} height={16} />}
            >
              Parts enquiry
            </ButtonLink>
            <ButtonLink href="/dealers" variant="outline">
              Contact parts
            </ButtonLink>
          </>
        }
      />

      <Section tone="paper" pad="md" aria-labelledby="parts-title">
        <div className="shell parts-grid">
          <Reveal className="parts-grid__media">
            <ImageFrame
              slot={{
                src: "/images/site/parts-01.jpg",
                alt: "Omoregie Motors genuine parts",
                subject: "Toyota genuine parts",
                crop: "studio macro",
                aspect: "4 / 5",
              }}
              sizes="(min-width: 1000px) 44vw, 100vw"
            />
          </Reveal>

          <div className="parts-grid__body">
            <SectionHead
              id="parts-title"
              eyebrow="Why genuine"
              eyebrowTone="red"
              title="The right part, sourced the right way."
            />
            <ul className="checklist">
              {points.map((p) => (
                <li key={p}>
                  <Check width={16} height={16} />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <VerifyNotice title="Ordering and collection" tone="verify">
              <p>
                The source site describes a dealer-collection model for parts.
                Send a parts enquiry with your VIN and our team will confirm
                availability and price, and arrange collection or delivery.
              </p>
            </VerifyNotice>
          </div>
        </div>
      </Section>

      <Section tone="sunk" pad="md">
        <div className="shell parts-cta">
          <div>
            <h2 className="display-4" style={{ maxWidth: "22ch" }}>
              Have your VIN ready.
            </h2>
            <p className="prose-body" style={{ marginTop: "var(--space-sm)" }}>
              The vehicle identification number lets our parts team match the exact
              component for your build.
            </p>
          </div>
          <TextLink href="/faq#spare-parts" icon={<ArrowRight width={14} height={14} />}>
            Parts FAQ
          </TextLink>
        </div>
      </Section>
    </>
  );
}
