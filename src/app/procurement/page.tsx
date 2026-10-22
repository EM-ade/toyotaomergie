import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ImageFrame } from "@/components/ImageFrame";
import { ButtonLink } from "@/components/ui";
import { ArrowRight, Check } from "@/components/icons";
import { brand, procurementClients } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Corporate & government vehicle procurement",
  description:
    "Omoregie Motors supplies brand-new Toyota vehicles, genuine spare parts and maintenance to government agencies, corporate organisations and fleet operators across Nigeria.",
  path: "/procurement",
});

const steps = [
  {
    title: "Requirements",
    body: "Tell us the models, quantities and operational use. We help match vehicles to the specification and budget you are working within.",
  },
  {
    title: "Documentation",
    body: "We support procurement documentation and delivery coordination appropriate to institutional purchasing.",
  },
  {
    title: "Supply & delivery",
    body: "Brand-new Toyota vehicles supplied through our accredited dealership, with delivery arranged to your location.",
  },
  {
    title: "Ongoing care",
    body: "Genuine spare parts and workshop maintenance keep the fleet in service long after delivery.",
  },
];

export default function ProcurementPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet & government"
        title="A reliable partner for institutional procurement."
        lede="Omoregie Motors supplies brand-new Toyota vehicles, genuine spare parts and maintenance to government agencies, corporate organisations and fleet operators."
        crumbs={[{ label: "Home", href: "/" }, { label: "Procurement" }]}
        actions={
          <>
            <ButtonLink href="/contact" icon={<ArrowRight width={16} height={16} />}>
              Discuss your requirements
            </ButtonLink>
            <ButtonLink href="/dealers" variant="outline">
              Our locations
            </ButtonLink>
          </>
        }
      />

      <Section tone="paper" pad="md" aria-labelledby="who-title">
        <div className="shell about-split">
          <Reveal className="about-split__text">
            <p className="eyebrow eyebrow--red">Who we serve</p>
            <h2 id="who-title" className="display-3">
              Institutions, companies and fleets.
            </h2>
            <p className="prose-body">
              Institutional vehicle procurement often extends beyond the
              purchase itself — to specification, budget, documentation,
              delivery and ongoing maintenance. We support each of these through
              a professional, customer-focused approach.
            </p>
            <ul className="checklist" style={{ marginTop: "var(--space-md)" }}>
              {procurementClients.map((c) => (
                <li key={c}>
                  <Check width={16} height={16} />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about-split__media" delay={90}>
            <ImageFrame
              slot={{
                src: "/images/dealer/model-hiace-showroom.jpg",
                alt: "Toyota Hiace van available for fleet supply",
                subject: "Toyota Hiace fleet vehicle",
                aspect: "4 / 5",
              }}
              sizes="(min-width: 1000px) 44vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="raised" pad="md" aria-labelledby="fleet-title" id="fleet">
        <div className="shell">
          <SectionHead
            id="fleet-title"
            layout="split"
            eyebrow="How it works"
            eyebrowTone="red"
            title="From requirement to delivery."
            lede="A straightforward procurement path, with aftersales support built in."
          />
          <ol className="story">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 60} className="story__beat" as="li">
                <span className="story__year">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="story__title">{s.title}</h3>
                <p className="story__body">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="paper" pad="md">
        <div className="shell closing">
          <Reveal>
            <p className="eyebrow eyebrow--red">Procurement enquiry</p>
            <h2 className="display-4 closing__title">
              Let&rsquo;s discuss your fleet requirements.
            </h2>
            <p className="prose-body" style={{ marginTop: "0.75rem" }}>
              Email or call our sales team to begin a procurement conversation.
            </p>
          </Reveal>
          <Reveal className="closing__actions" delay={80}>
            <a href={`mailto:${brand.emails.sales}`} className="btn btn--primary">
              {brand.emails.sales}
            </a>
            <ButtonLink href="/contact" variant="outline">
              Contact form
            </ButtonLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
