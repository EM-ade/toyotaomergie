import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { vehicles } from "@/content/vehicles";
import { dealers } from "@/content/dealers";
import { legalDocuments } from "@/content/site";

/**
 * Sitemap.
 *
 * Only pages whose content is evidenced are submitted at full priority.
 * Unverified vehicle pages and legal placeholders are included but marked
 * low priority, and legal pages are excluded from indexing by their own
 * metadata. This is a declared choice for the redesign; no claim is made that
 * it reproduces the original site's sitemap, which was not accessible.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${siteUrl}/`, changeFrequency: "monthly", priority: 1 },
      { url: `${siteUrl}/vehicles`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${siteUrl}/dealers`, changeFrequency: "monthly", priority: 0.9 },
      { url: `${siteUrl}/service`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${siteUrl}/parts`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${siteUrl}/faq`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${siteUrl}/about`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${siteUrl}/why-toyota`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${siteUrl}/warranty`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${siteUrl}/awards`, changeFrequency: "yearly", priority: 0.5 },
      { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
      { url: `${siteUrl}/service/request`, changeFrequency: "yearly", priority: 0.5 },
      { url: `${siteUrl}/vehicles/compare`, changeFrequency: "monthly", priority: 0.4 },
    ] as const
  ).map((r) => ({ ...r, lastModified: now }));

  const vehicleRoutes: MetadataRoute.Sitemap = vehicles.map((v) => ({
    url: `${siteUrl}/vehicles/${v.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: v.hasEvidencedDetail ? 0.8 : 0.3,
  }));

  const dealerRoutes: MetadataRoute.Sitemap = dealers.map((d) => ({
    url: `${siteUrl}/dealers/${d.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const legalRoutes: MetadataRoute.Sitemap = legalDocuments.map((d) => ({
    url: `${siteUrl}/legal/${d.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.1,
  }));

  return [...staticRoutes, ...vehicleRoutes, ...dealerRoutes, ...legalRoutes];
}
