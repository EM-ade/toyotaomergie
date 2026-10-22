import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Accordion } from "@/components/Accordion";
import { ButtonLink, TextLink, VerifyNotice } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import { faqs } from "@/content/faqs";
import { warranty, brand } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Warranty",
  description:
    "Omoregie Motors warranty — 3 years or 100,000km on new vehicles, 12 months or 20,000km on genuine parts, and how to claim through our workshop network.",
  path: "/warranty",
});

const facts = [
  { label: "New vehicle", value: warranty.vehicle },
  { label: "Genuine parts", value: warranty.parts },
  { label: "First service", value: warranty.firstService },
];

export default function WarrantyPage() {
  const warrantyFaqs = faqs.filter((f) =>
    [
      "what-is-warranty",
      "warranty-coverage",
      "claim-warranty",
      "warranty-any-dealer",
      "warranty-replacement",
      "first-service",
      "unofficial-workshops",
      "ssc",
      "recall-involved",
      "recall-notice",
    ].includes(f.id),
  );

  return (
    <>
      <PageHero
        eyebrow="Warranty"
        title="Warranty, stated plainly."
        lede={warranty.coverage}
        crumbs={[{ label: "Home", href: "/" }, { label: "Warranty" }]}
        actions={
          <>
            <ButtonLink href="/dealers" icon={<ArrowRight width={16} height={16} />}>
              Our locations
            </ButtonLink>
            <ButtonLink href="/faq" variant="outline">
              All warranty FAQs
            </ButtonLink>
          </>
        }
        aside={
          <dl className="statblock">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd style={{ fontSize: "var(--step-2)" }}>{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <Section tone="paper" pad="md" aria-labelledby="warranty-detail">
        <div className="shell contact-grid">
          <div>
            <SectionHead
              id="warranty-detail"
              eyebrow="Where to go"
              eyebrowTone="red"
              title="Bring your warranty to us."
            />
            <div className="prose-body" style={{ marginTop: "var(--space-md)" }}>
              <p>
                Every accredited Toyota dealer in Nigeria can perform warranty
                service. We recommend returning to the dealership that sold you
                your vehicle — for us, that means continuing and personal
                interest in your Toyota.
              </p>
              <p>
                If you are touring or relocating and a problem arises, consult a
                local Toyota dealer. Warranty service may not be provided by the
                local dealer, because your Toyota vehicle may not comply with the
                regulatory or environmental requirements of that country.
              </p>
            </div>
          </div>

          <aside>
            <VerifyNotice title="Get assistance" tone="verify">
              <p>
                Our service team handles warranty enquiries and can book your
                vehicle into our Victoria Island or Alaba workshop. Our
                technicians have the tools, equipment and training to service and
                repair your Toyota.
              </p>
              <p style={{ marginTop: "0.5rem" }}>
                <strong>Phone:</strong> {brand.servicePhone.join(" / ")}
                <br />
                <strong>Email:</strong> {brand.emails.service}
              </p>
            </VerifyNotice>
          </aside>
        </div>
      </Section>

      <Section tone="sunk" pad="md" aria-labelledby="warranty-faq">
        <div className="shell">
          <SectionHead
            id="warranty-faq"
            eyebrow="Warranty questions"
            eyebrowTone="red"
            title="The answers the source states."
          />
          <Reveal>
            <Accordion
              allowMultiple={false}
              items={warrantyFaqs.map((f) => ({
                id: f.id,
                question: f.question,
                answer: <p>{f.answer}</p>,
              }))}
            />
          </Reveal>
          <div style={{ marginTop: "var(--space-lg)" }}>
            <TextLink href="/faq" icon={<ArrowRight width={14} height={14} />}>
              All frequently asked questions
            </TextLink>
          </div>
        </div>
      </Section>
    </>
  );
}
