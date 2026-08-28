import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { FaqSection } from "@/components/site/FaqSection";
import { FaqJsonLd } from "@/lib/seo";
import { AdUnit } from "@/components/ads/AdUnit";
import { pageHead } from "@/lib/page-head";
import { FAQ } from "@/content/faq";

export const Route = createFileRoute("/faq")({
  head: () =>
    pageHead(
      "EXIF & GPS Stripper FAQ — Upload, Fast vs Deep, iPhone | Strip",
      "Answers about local EXIF removal: no upload, Fast JPEG vs Deep Canvas, HEIC, ZIP privacy, verification, and what Strip does not claim.",
      "/faq",
    ),
  component: FaqPage,
});

function FaqPage() {
  return (
    <AppShell>
      <FaqJsonLd />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-4xl leading-tight">FAQ</h1>
        <p className="mt-4 max-w-2xl text-pretty text-muted">
          {FAQ.length} questions about stripping GPS and camera tags in the browser. Short version: files stay on
          this device, Fast does not recompress JPEG pixels, Deep rewrites the container, HEIC is out of scope until
          converted.
        </p>
      </main>
      <FaqSection all />
      <div className="mx-auto max-w-3xl px-4 pb-10">
        <AdUnit slot="mid" />
      </div>
    </AppShell>
  );
}
