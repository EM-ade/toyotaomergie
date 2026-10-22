import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import { brand, dealerReasons } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Why Omoregie",
  description:
    "Why buy and service your Toyota through Omoregie Motors — an accredited Toyota dealer since 1978, with vehicles, genuine parts and aftersales under one relationship.",
  path: "/why-toyota",
});

export default function WhyToyotaPage() {
  return (
    <>
      <PageHero
        eyebrow="Why Omoregie"
        title="One dealer, the whole journey."
        lede={`${brand.appointedLine}, supplying brand-new vehicles, genuine parts and authorised aftersales since ${brand.founded}.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "Why Omoregie" }]}
        actions={
          <>
            <ButtonLink href="/vehicles" icon={<ArrowRight width={16} height={16} />}>
              Explore the range
            </ButtonLink>
            <ButtonLink href="/dealers" variant="outline">
              Find us
            </ButtonLink>
          </>
        }
      />

      <Section tone="paper" pad="md" aria-labelledby="reasons-title">
        <div className="shell">
          <SectionHead
            id="reasons-title"
            layout="split"
            eyebrow="The case"
            eyebrowTone="red"
            title="Six reasons to buy from Omoregie."
            lede="Buying and servicing through an authorised dealer is the difference between a vehicle with a documented history and one without."
          />
          <ol className="reasons">
            {dealerReasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 50} className="reasons__item" as="li">
                <span className="reasons__n folio">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="reasons__title">{r.title}</h3>
                <p className="reasons__body">{r.body}</p>
              </Reveal>
            ))}
          </ol>

          <div className="reasons__actions" style={{ marginTop: "var(--space-2xl)" }}>
            <ButtonLink
              href="/vehicles"
              icon={<ArrowRight width={16} height={16} />}
            >
              Explore the range
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact our team
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
