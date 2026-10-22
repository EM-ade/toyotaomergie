import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { FaqSection } from "@/components/FaqSection";
import { TextLink, VerifyNotice } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import { faqCategories, faqs, faqSourceNote } from "@/content/faqs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Frequently asked questions",
  description:
    "Answers on buying, Nigerian specification, finance, genuine parts, warranty, service intervals and service campaigns from Omoregie Motors.",
  path: "/faq",
});

/** Slug for category anchors, so each category is addressable. */
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Questions owners and buyers actually ask."
        lede="Straight answers on buying, specification, parts, warranty and service — from Omoregie Motors."
        crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        aside={
          <div className="faq-jump">
            <p className="eyebrow eyebrow--bare">Jump to a category</p>
            <ul>
              {faqCategories.map((c) => (
                <li key={c}>
                  <a href={`#${slugify(c)}`} className="link-rule">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section tone="paper" pad="md">
        <div className="shell" style={{ maxWidth: "72rem" }}>
          <VerifyNotice title="A note on the source FAQ" tone="neutral">
            <p>{faqSourceNote}</p>
          </VerifyNotice>

          {faqCategories.map((category) => {
            const items = faqs.filter((f) => f.category === category);
            if (!items.length) return null;
            return (
              <FaqSection
                key={category}
                id={slugify(category)}
                title={category}
                items={items}
              />
            );
          })}

          <div className="faq-foot">
            <h2 className="display-4">Still need an answer?</h2>
            <p className="prose-body">
              For anything specific to your vehicle, our service team is the
              fastest route. Call, message or visit either workshop.
            </p>
            <div className="faq-foot__actions">
              <TextLink href="/dealers" icon={<ArrowRight width={14} height={14} />}>
                Our locations
              </TextLink>
              <TextLink href="/contact" icon={<ArrowRight width={14} height={14} />}>
                Contact Omoregie Motors
              </TextLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
