import type { Metadata } from "next";
import { siteUrl } from "@/content/site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Set true for pages that should not be indexed as primary content. */
  noindex?: boolean;
}

/**
 * Consistent metadata for every route. Canonical URLs are emitted from the one
 * declared origin; this is a declared choice for the redesign, not a claim to
 * have resolved the original site's canonical hostname (see docs/url-migration.md).
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: PageMetaInput): Metadata {
  const url = `${siteUrl}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url,
      siteName: "Omoregie Motors",
      type: "website",
    },
  };
}

export const titleTemplate = (t: string) => t;
