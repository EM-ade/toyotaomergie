import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ImageFrame } from "@/components/ImageFrame";
import { ButtonLink, TextLink } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import { serviceHours, servicePromotions, serviceTaxonomy } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Service & aftersales",
  description:
    "Omoregie Motors aftersales — general repair, preventative maintenance, air-conditioning, cooling, brakes, diagnostics, belts and fluids, and transmission services at our Lagos workshops.",
  path: "/service",
});

export default function ServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Service & aftersales"
        title="Servicing and repair, done properly."
        lede="Service, maintenance and repair at our Victoria Island and Alaba workshops — genuine components and the vehicle's own diagnostic systems."
        crumbs={[{ label: "Home", href: "/" }, { label: "After sales" }]}
        actions={
          <>
            <ButtonLink
              href="/service/request"
              icon={<ArrowRight width={16} height={16} />}
            >
              Book a service
            </ButtonLink>
            <ButtonLink href="/dealers" variant="outline">
              Our workshops
            </ButtonLink>
          </>
        }
        aside={
          <ImageFrame
            slot={{
              src: "/images/site/service-01.jpg",
              alt: "Toyota service",
              subject: "Toyota service",
              crop: "documentary, 4/3",
              aspect: "4 / 3",
            }}
            sizes="(min-width: 1000px) 46vw, 100vw"
          />
        }
      />

      {/* Service taxonomy — the full evidenced list, as an editorial index. */}
      <Section tone="paper" pad="md" aria-labelledby="taxonomy-title">
        <div className="shell">
          <SectionHead
            id="taxonomy-title"
            layout="split"
            eyebrow="What we service"
            eyebrowTone="red"
            title="What we service."
            lede="The work our workshops carry out on Toyota vehicles, from routine servicing to diagnostics and repair."
          />

          <ol className="taxonomy">
            {serviceTaxonomy.map((s, i) => (
              <li key={s.name} className="taxonomy__item">
                <Reveal delay={i * 40}>
                  <span className="taxonomy__index folio">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="taxonomy__body">
                    <span className="taxonomy__name">{s.name}</span>
                    <span className="taxonomy__desc">{s.description}</span>
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Promotions — the four evidenced homepage service promotions. */}
      <Section tone="sunk" pad="md" aria-labelledby="promos-title" id="promotions">
        <div className="shell">
          <SectionHead
            id="promos-title"
            eyebrow="Also available"
            title="Popular service areas."
          />
          <div className="promogrid">
            {servicePromotions.map((p, i) => (
              <Reveal key={p.name} delay={i * 60} className="promogrid__item">
                <span className="folio">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="promogrid__name">{p.name}</h3>
                <p className="promogrid__blurb">{p.blurb}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Hours of operation — as published on the source service page. */}
      <Section tone="paper" pad="md" aria-labelledby="hours-title">
        <div className="shell hours-grid">
          <div>
            <SectionHead
              id="hours-title"
              eyebrow="Hours of operation"
              eyebrowTone="red"
              layout="stacked"
              title="When the workshops are open."
            />
          </div>
          <dl className="hours-list">
            {serviceHours.map((h) => (
              <div key={h.day} className={h.hours === "Closed" ? "hours-row is-closed" : "hours-row"}>
                <dt>{h.day}</dt>
                <dd className="tabular">{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="paper" pad="md">
        <div className="shell service-cta">
          <div>
            <h2 className="display-3" style={{ maxWidth: "18ch" }}>
              Book with the team that knows your vehicle.
            </h2>
            <p className="prose-body" style={{ marginTop: "var(--space-md)" }}>
              A service enquiry comes straight to our service team, who confirm
              the schedule that applies to your model and its current mileage.
            </p>
          </div>
          <div className="service-cta__actions">
            <ButtonLink
              href="/service/request"
              variant="primary"
              icon={<ArrowRight width={16} height={16} />}
            >
              Book a service
            </ButtonLink>
            <TextLink href="/faq" icon={<ArrowRight width={14} height={14} />}>
              Service and warranty FAQ
            </TextLink>
          </div>
        </div>
      </Section>
    </>
  );
}
