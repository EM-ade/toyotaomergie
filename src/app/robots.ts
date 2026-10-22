import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

/**
 * robots.txt.
 *
 * The audit found the original site's robots.txt was not accessible, so this
 * file is not presented as a reproduction of it. Legal placeholders are
 * excluded because they carry no indexable content.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/legal/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
