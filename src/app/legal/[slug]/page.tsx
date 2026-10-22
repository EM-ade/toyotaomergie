import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { VerifyNotice } from "@/components/ui";
import { legalBySlug, legalDocuments } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return legalDocuments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = legalBySlug(slug);
  if (!doc)
    return pageMetadata({ title: "Legal", description: "", path: "/legal" });
  return pageMetadata({
    title: doc.title,
    description: `${doc.title} — structural placeholder pending approved legal copy.`,
    path: `/legal/${doc.slug}`,
    noindex: true,
  });
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = legalBySlug(slug);
  if (!doc) notFound();

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Legal" },
          { label: doc.title },
        ]}
      />

      <Section tone="paper" pad="md">
        <div className="shell legal-doc">
          {doc.isPlaceholder && (
            <VerifyNotice title="Placeholder — not approved legal copy" tone="internal">
              <p>
                The approved text for this document was not supplied with the
                source material. The structure is reproduced here so the page
                exists and can be populated, but the wording is not invented and
                no legal commitment is stated.
              </p>
            </VerifyNotice>
          )}

          <div className="prose-body">
            {doc.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <nav className="legal-doc__nav" aria-label="Other legal documents">
            {legalDocuments
              .filter((d) => d.slug !== doc.slug)
              .map((d) => (
                <a key={d.slug} href={`/legal/${d.slug}`} className="link-rule">
                  {d.title}
                </a>
              ))}
          </nav>
        </div>
      </Section>
    </>
  );
}
