import { FAQ, type FaqItem } from "@/content/faq";
import { SITE, absUrl } from "@/content/site";

const OG_IMAGE = absUrl("/og.jpg");

const publisher = {
  "@type": "Organization",
  name: SITE.publisher,
  email: SITE.email,
  url: SITE.hub,
  sameAs: [SITE.hub],
};

export type JsonLdOpts = {
  appName: string;
  path: string;
  description: string;
  faqs?: readonly FaqItem[];
  howToName?: string;
  howToSteps?: string[];
  includeApp?: boolean;
};

export function jsonLdScripts(opts: JsonLdOpts) {
  const url = absUrl(opts.path);
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: `${SITE.origin}/`,
    description:
      "Remove EXIF, GPS, camera and software metadata from JPG, PNG and WebP in the browser. No upload, no watermark.",
    inLanguage: "en",
    publisher,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strip",
        item: `${SITE.origin}/`,
      },
      ...(opts.path !== "/"
        ? [
            {
              "@type": "ListItem",
              position: 2,
              name: opts.appName,
              item: url,
            },
          ]
        : []),
    ],
  };
  const scripts: { type: string; children: string }[] = [
    { type: "application/ld+json", children: JSON.stringify(website) },
    { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
  ];
  if (opts.includeApp) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: opts.appName,
        url,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript. Image bytes stay in this tab.",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        description: opts.description,
        featureList: [
          "Remove EXIF and GPS",
          "Inspect tags before wipe",
          "Fast JPEG / Deep Canvas",
          "Batch ZIP",
          "No upload",
        ],
        publisher,
        screenshot: OG_IMAGE,
      }),
    });
  }
  if (opts.faqs?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: opts.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }),
    });
  }
  if (opts.howToName && opts.howToSteps?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: opts.howToName,
        description: opts.description,
        step: opts.howToSteps.map((text, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text,
        })),
      }),
    });
  }
  return scripts;
}

/** @deprecated Prefer jsonLdScripts in page head. Kept so old imports typecheck during emit. */
export function JsonLd() {
  return null;
}

export function FaqJsonLd() {
  return <FaqJsonLdItems items={FAQ} />;
}

export function FaqJsonLdItems({ items }: { items: readonly FaqItem[] }) {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />;
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.origin}${item.path === "/" ? "" : item.path}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
