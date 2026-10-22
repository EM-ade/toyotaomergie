import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ImageFrame } from "@/components/ImageFrame";
import { Reveal } from "@/components/Reveal";

import { ArrowRight } from "@/components/icons";
import { articles } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Media",
  description:
    "Omoregie Motors news, announcements and ownership articles.",
  path: "/media",
});

const fmt = new Intl.DateTimeFormat("en-NG", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default function MediaPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        eyebrow="News & media"
        title="Latest from Omoregie Motors."
        lede="Announcements, model news and ownership articles from our dealership."
        crumbs={[{ label: "Home", href: "/" }, { label: "News" }]}
      />

      <Section tone="paper" pad="md">
        <div className="shell">
          {/* Lead article — full-bleed editorial treatment. */}
          <article className="medium-lead">
            <Reveal className="medium-lead__media">
              <ImageFrame
                slot={lead.image}
                sizes="(min-width: 1000px) 60vw, 100vw"
                showCaption
              />
            </Reveal>
            <Reveal className="medium-lead__body" delay={80}>
              <p className="medium-meta">
                <span className="medium-meta__cat">{lead.category}</span>
                <time dateTime={lead.date}>{fmt.format(new Date(lead.date))}</time>
              </p>
              <h2 className="display-3">{lead.title}</h2>
              <p className="prose-body">{lead.excerpt}</p>
            </Reveal>
          </article>

          <ul className="medium-list">
            {rest.map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={i * 60} className="medium-item">
                  <div className="medium-item__media">
                    <ImageFrame slot={a.image} showCaption={false} sizes="(min-width: 720px) 300px, 40vw" />
                  </div>
                  <div className="medium-item__body">
                    <p className="medium-meta">
                      <span className="medium-meta__cat">{a.category}</span>
                      <time dateTime={a.date}>{fmt.format(new Date(a.date))}</time>
                    </p>
                    <h3 className="medium-item__title">{a.title}</h3>
                    <p className="medium-item__excerpt">{a.excerpt}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="medium-foot">
            <p className="prose-body">
              For press and media enquiries, contact our team directly.
            </p>
            <Link href="/contact" className="link-rule">
              Media enquiries <ArrowRight width={14} height={14} />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
