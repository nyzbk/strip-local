import { SITE, absUrl } from "@/content/site";
import { jsonLdScripts, type JsonLdOpts } from "@/lib/seo";

const OG_IMAGE = absUrl("/og.jpg");

export type PageHeadExtra = Omit<JsonLdOpts, "path" | "description">;

export function pageHead(title: string, description: string, path: string, extra?: PageHeadExtra) {
  const url = absUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:url", content: url },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLdScripts({
      appName: extra?.appName ?? title,
      path,
      description,
      faqs: extra?.faqs,
      howToName: extra?.howToName,
      howToSteps: extra?.howToSteps,
      includeApp: extra?.includeApp ?? false,
    }),
  };
}
