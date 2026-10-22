import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ImageFrame } from "@/components/ImageFrame";
import { BranchTable } from "@/components/DealerDirectory";
import { TextLink } from "@/components/ui";
import { ArrowRight, WhatsApp } from "@/components/icons";
import { dealerBySlug, dealers } from "@/content/dealers";
import { waHref } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return dealers.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = dealerBySlug(slug);
  if (!d)
    return pageMetadata({ title: "Location", description: "", path: "/dealers" });
  return pageMetadata({
    title: d.name,
    description: `${d.name} — an Omoregie Motors location. Address, phone, opening hours and directions.`,
    path: `/dealers/${d.slug}`,
  });
}

export default async function DealerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dealer = dealerBySlug(slug);
  if (!dealer) notFound();

  const others = dealers.filter((d) => d.slug !== dealer.slug);
  const branch = dealer.branches[0];
  const mapQuery = encodeURIComponent(
    `${dealer.name} ${branch.address ?? branch.city} Lagos Nigeria`,
  );

  return (
    <>
      <PageHero
        eyebrow={dealer.descriptor ?? "Omoregie Motors location"}
        title={dealer.name}
        lede={`An Omoregie Motors location in ${branch.city}. Call, drive in, or message us on WhatsApp.`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/dealers" },
          { label: dealer.name },
        ]}
        actions={
          <>
            <a
              href={waHref(`Hello Omoregie Motors (${dealer.name}), I'd like to enquire.`)}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsApp width={16} height={16} />
              WhatsApp this location
            </a>
            <Link href="/service/request" className="btn btn--outline">
              Book a service
            </Link>
          </>
        }
      />

      <Section tone="paper" pad="md" aria-labelledby="branch-title">
        <div className="shell about-split">
          <div className="about-split__text">
            <h2 id="branch-title" className="display-4">
              Contact &amp; opening hours
            </h2>
            <div style={{ marginTop: "var(--space-md)" }}>
              <BranchTable dealer={dealer} />
            </div>
            <div style={{ marginTop: "var(--space-lg)", display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                className="btn btn--ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
              <Link
                href={`/contact?dealer=${encodeURIComponent(dealer.name)}`}
                className="btn btn--outline"
              >
                Send an enquiry
              </Link>
            </div>
          </div>
          <div className="about-split__media">
            <ImageFrame
              slot={{
                src: "/images/dealer/showroom-surulere.jpg",
                alt: `Omoregie Motors location — ${dealer.name}`,
                subject: dealer.name,
                aspect: "4 / 5",
              }}
              sizes="(min-width: 1000px) 44vw, 100vw"
            />
          </div>
        </div>
      </Section>

      <Section tone="sunk" pad="md" aria-labelledby="other-title">
        <div className="shell">
          <h2 id="other-title" className="display-4">
            Our other locations
          </h2>
          <ul className="dealer-others">
            {others.map((d) => (
              <li key={d.slug}>
                <TextLink
                  href={`/dealers/${d.slug}`}
                  icon={<ArrowRight width={14} height={14} />}
                >
                  {d.name}
                </TextLink>
              </li>
            ))}
            <li>
              <TextLink href="/dealers" icon={<ArrowRight width={14} height={14} />}>
                All locations
              </TextLink>
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
