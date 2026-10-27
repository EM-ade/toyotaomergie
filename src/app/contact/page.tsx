import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, SectionHead } from "@/components/Section";
import { ButtonLink } from "@/components/ui";
import { ArrowRight, Clock, Mail, Phone, Pin, WhatsApp } from "@/components/icons";
import { brand, telHref, waHref } from "@/content/site";
import { dealers } from "@/content/dealers";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Omoregie Motors for Toyota vehicle sales, genuine spare parts, service and warranty support across Lagos and Abuja.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Omoregie Motors."
        lede="Call, message on WhatsApp, or visit our Surulere showroom. Our team handles vehicle enquiries, service bookings, spare parts and warranty support."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        aside={
          <div className="contactcards">
            <a
              className="contactcard"
              href={telHref(brand.salesPhone[0])}
            >
              <Phone width={18} height={18} />
              <p className="contactcard__label">Sales &amp; general</p>
              <p className="contactcard__value">{brand.salesPhone[0]}</p>
            </a>
            <a
              className="contactcard"
              href={waHref("Hello Omoregie Motors, I'd like to enquire.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp width={18} height={18} />
              <p className="contactcard__label">WhatsApp</p>
              <p className="contactcard__value">Chat with our team</p>
            </a>
            <a className="contactcard" href={`mailto:${brand.emails.sales}`}>
              <Mail width={18} height={18} />
              <p className="contactcard__label">Email</p>
              <p className="contactcard__value">{brand.emails.sales}</p>
            </a>
          </div>
        }
      />

      <Section tone="paper" pad="md" aria-labelledby="channels-title">
        <div className="shell">
          <SectionHead
            id="channels-title"
            layout="split"
            eyebrow="Talk to us now"
            eyebrowTone="red"
            title="Direct lines, no forms."
            lede="Message or call the team directly - or email us and we will respond within business hours."
          />

          <div className="contactcards contactcards--wide">
            <a className="contactcard" href={telHref(brand.salesPhone[0])}>
              <Phone width={18} height={18} />
              <p className="contactcard__label">Sales &amp; general</p>
              <p className="contactcard__value">{brand.salesPhone[0]}</p>
            </a>
            <a
              className="contactcard"
              href={waHref("Hello Omoregie Motors, I'd like to enquire.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp width={18} height={18} />
              <p className="contactcard__label">WhatsApp</p>
              <p className="contactcard__value">+234 803 800 2222</p>
            </a>
            <a
              className="contactcard"
              href={waHref("Hello Omoregie Motors, I'd like to enquire.", brand.whatsapp2)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp width={18} height={18} />
              <p className="contactcard__label">WhatsApp</p>
              <p className="contactcard__value">+234 903 563 4038</p>
            </a>
            <a className="contactcard" href={`mailto:${brand.emails.sales}`}>
              <Mail width={18} height={18} />
              <p className="contactcard__label">Email</p>
              <p className="contactcard__value">{brand.emails.sales}</p>
            </a>
          </div>

          <div style={{ marginTop: "var(--space-xl)" }}>
            <aside>
              <SectionHead
                eyebrow="Visit us"
                eyebrowTone="red"
                title="Find a location."
              />
              <p className="prose-body">
                {brand.branchCount} locations across Lagos and Abuja. Call ahead
                and we&rsquo;ll have the vehicle ready.
              </p>

              <ul className="contact-locations" id="hours">
                {dealers.map((d) => {
                  const b = d.branches[0];
                  return (
                    <li key={d.slug}>
                      <Link href={`/dealers/${d.slug}`} className="contact-locations__name">
                        {d.name}
                      </Link>
                      <p className="contact-locations__addr">
                        <Pin width={14} height={14} />
                        {b.address ?? b.city}
                      </p>
                      <p className="contact-locations__hours">
                        <Clock width={14} height={14} />
                        Mon–Fri {brand.hours.weekday} · Sat {brand.hours.saturday}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div style={{ marginTop: "var(--space-md)" }}>
                <ButtonLink
                  href="/dealers"
                  variant="ink"
                  icon={<ArrowRight width={16} height={16} />}
                >
                  All locations
                </ButtonLink>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    </>
  );
}
