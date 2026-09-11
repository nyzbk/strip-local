import { createFileRoute } from "@tanstack/react-router";
import { SITE } from "@/content/site";

const PATHS = [
  "/",
  "/how-to",
  "/iphone",
  "/whatsapp",
  "/marketplace",
  "/faq",
  "/use-cases",
  "/exif-gps",
  "/why-local",
  "/contact",
  "/privacy",
  "/terms",
  "/about",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = SITE.origin;
        const lastmod = SITE.lastmod;
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PATHS.map(
  (path) => `  <url>
    <loc>${origin}${path === "/" ? "/" : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`,
).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
