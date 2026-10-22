import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ImageFrame } from "@/components/ImageFrame";
import { ButtonLink } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import {
  brand,
  coreValues,
  heritageBeats,
  mission,
  vision,
} from "@/content/site";
import { dealers } from "@/content/dealers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About Omoregie Motors",
  description:
    "Omoregie Motors Nigeria Limited has been an accredited Toyota dealer since 1978, supplying brand-new Toyota vehicles, genuine spare parts and aftersales across Lagos and Abuja.",
  path: "/about",
});

const facts = [
  { label: "Trading since", value: String(brand.founded) },
  { label: "Role", value: brand.descriptor },
  { label: "Locations", value: String(dealers.length) },
  { label: "Serving", value: "Lagos & Abuja" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The dealer"
        title="Excellence in Motion. Trust in Every Mile."
        lede={`${brand.legalName} is an ${brand.certifiedLine}, incorporated in Nigeria in ${brand.founded} and trusted by motorists, businesses and government institutions ever since.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        aside={
          <dl className="statblock">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd className="tabular" style={{ fontSize: "var(--step-2)" }}>
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Story */}
      <Section tone="paper" pad="md" aria-labelledby="story-title">
        <div className="shell about-split">
          <Reveal className="about-split__text">
            <p className="eyebrow eyebrow--red">Our story</p>
            <h2 id="story-title" className="display-3">
              A Nigerian dealership, carrying a global standard.
            </h2>
            <div className="prose-body">
              <p>
                Omoregie Motors Nigeria Limited was incorporated in{" "}
                {brand.founded}. For more than four decades we have supplied
                brand-new Toyota vehicles, genuine spare parts and professional
                maintenance and repair services to customers across Nigeria.
              </p>
              <p>
                As an accredited Toyota dealer, we serve government agencies,
                corporate organisations and individual customers who value
                quality, reliability, performance and professional service. Our
                approach combines product quality, industry knowledge and an
                understanding of the diverse transport needs of our customers.
              </p>
              <p>
                A vehicle is more than a means of transport. For individuals it
                is convenience and freedom; for businesses, productivity; for
                government institutions, effective service delivery. That
                understanding shapes everything we sell and everything we
                service.
              </p>
            </div>
            <ButtonLink
              href="/why-toyota"
              variant="outline"
              icon={<ArrowRight width={16} height={16} />}
            >
              Why buy from Omoregie
            </ButtonLink>
          </Reveal>

          <Reveal className="about-split__media" delay={100}>
            <ImageFrame
              slot={{
                src: "/images/dealer/showroom-surulere.jpg",
                alt: "Omoregie Motors Toyota dealership building in Surulere, Lagos",
                subject: "Omoregie Motors, Surulere",
                aspect: "4 / 5",
              }}
              sizes="(min-width: 1000px) 44vw, 100vw"
            />
          </Reveal>
        </div>
      </Section>

      {/* Values */}
      <Section tone="raised" pad="md" aria-labelledby="values-title" id="values">
        <div className="shell">
          <SectionHead
            id="values-title"
            layout="split"
            eyebrow="What guides us"
            eyebrowTone="red"
            title="Our core values."
            lede="Six principles that govern how we work with every customer, supplier and partner."
          />
          <div className="values-grid">
            {coreValues.map((v, i) => (
              <Reveal key={v.title} delay={i * 50} className="values-grid__item">
                <span className="folio">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="values-grid__title">{v.title}</h3>
                <p className="values-grid__body">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Vision & mission */}
      <Section tone="paper" pad="md" aria-labelledby="vm-title">
        <div className="shell vm">
          <Reveal className="vm__item">
            <p className="eyebrow eyebrow--red">Our vision</p>
            <p className="vm__statement">{vision}</p>
          </Reveal>
          <Reveal className="vm__item" delay={80}>
            <p className="eyebrow eyebrow--red">Our mission</p>
            <p className="vm__statement">{mission}</p>
          </Reveal>
        </div>
      </Section>

      {/* Heritage arc */}
      <Section tone="raised" pad="md" aria-labelledby="history-title">
        <div className="shell">
          <SectionHead
            id="history-title"
            eyebrow="Our history"
            eyebrowTone="red"
            title="From 1978 to today."
          />
          <ol className="story">
            {heritageBeats.map((b, i) => (
              <Reveal key={b.year} delay={i * 70} className="story__beat" as="li">
                <span className="story__year">{b.year}</span>
                <h3 className="story__title">{b.title}</h3>
                <p className="story__body">{b.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* Locations */}
      <Section tone="paper" pad="md" aria-labelledby="network-title">
        <div className="shell">
          <SectionHead
            id="network-title"
            eyebrow="Locations"
            title="Where to find us."
          />
          <ol className="network-list">
            {dealers.map((d, i) => (
              <li key={d.slug}>
                <span className="folio">{String(i + 1).padStart(2, "0")}</span>
                <span className="network-list__name">{d.name}</span>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: "var(--space-lg)" }}>
            <ButtonLink
              href="/dealers"
              variant="ink"
              icon={<ArrowRight width={16} height={16} />}
            >
              See all locations
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
