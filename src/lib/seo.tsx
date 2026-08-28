import { FAQ } from "@/content/faq";
import { SITE } from "@/content/site";

export function JsonLd() {
  const app = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Strip",
    url: SITE.origin,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description:
      "Remove EXIF, GPS, camera and software metadata from JPG, PNG and WebP in the browser. Batch, private, no watermark.",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />;
}

export function FaqJsonLd() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />;
}
