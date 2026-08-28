import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { StripperApp } from "@/components/strip/StripperApp";
import { HowItWorks } from "@/components/site/HowItWorks";
import { FaqSection } from "@/components/site/FaqSection";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { JsonLd } from "@/lib/seo";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Remove EXIF & GPS from Photos Online Free — No Upload | Strip",
      "Strip location, camera and metadata from JPG, PNG and WebP in your browser. Batch, private, no watermark.",
      "/",
    ),
  component: Home,
});

function Home() {
  return (
    <AppShell>
      <JsonLd />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Private · in your browser</p>
        <h1 className="mt-3 font-display text-4xl leading-tight sm:text-5xl">
          Remove GPS & EXIF from photos — free, private, no upload
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-muted">
          See what leaks — location, camera, date, software — then strip it. Batch download or a ZIP. Files never leave
          this tab.
        </p>

        <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted">
          <p>
            A JPEG from a phone is rarely “just a picture.” Cameras write a hidden GPS tag with the latitude and
            longitude of the shot, plus the body that took it and the clock time. Posting the original file can place
            your apartment, studio, hotel, or a source’s street on a map for anyone who downloads it. Social apps
            sometimes strip tags on their own copy and still leave the original sitting in your camera roll for the
            next upload.
          </p>
          <p>
            Strip is a local EXIF and GPS cleaner. You drop a JPG, PNG, or WebP; this tab reads the tags with a
            client-side parser; you choose Fast (JPEG segments, pixels untouched) or Deep (Canvas rewrite of the
            container). There is no account, no watermark, and no server-side image pipeline. If you disconnect after
            the page loads, stripping still works.
          </p>
          <p>
            Use it before you attach a vacation photo to a listing, a press drop, a marketplace post, or a family
            album you do not control. Strip does not blur faces or redraw the scene — it removes the invisible
            sidecar. Read{" "}
            <Link to="/exif-gps" className="text-copper-deep underline">
              what GPS in a photo actually contains
            </Link>
            , then run the tool below.
          </p>
        </div>

        <div className="mt-8">
          <StripperApp />
        </div>
      </main>
      <HowItWorks />

      <section className="mx-auto max-w-3xl px-4 pb-10">
        <h2 className="font-display text-2xl">Limits, browsers, and what never leaves the device</h2>
        <div className="mt-4 space-y-4 text-pretty leading-relaxed text-muted">
          <p>
            Processing happens in RAM on this phone or computer. We do not receive your image bytes, GPS coordinates,
            or camera serial. Closing the tab drops the blobs. Hosting may log ordinary page requests (this HTML,
            robots.txt, ads.txt) without file contents.
          </p>
          <p>
            Supported stills: JPEG/JPG, PNG, WebP, BMP, and static GIF. Animated GIF is not a metadata-strip product
            here. HEIC/HEIF is rejected on purpose — convert it, then strip the JPEG. Very large files may trip a
            soft memory warning; that is a crash guard, not a paywall. Deep clean uses the browser Canvas, so export
            is limited by what this browser can encode.
          </p>
          <p>
            Safari on iPhone, Chrome on Android, and current desktop Chromium/Firefox/Safari are the intended path.
            Fast mode needs a JPEG the parser understands. If inspect shows GPS after Fast, run Deep once and
            re-inspect. Color-critical print jobs should prefer Fast so pixels stay bit-identical.
          </p>
          <p>
            Strip is not a forensic wipe, not a face redactor, and not a compressor. Sister tools exist for size and
            format; this page’s only job is metadata privacy. Guides:{" "}
            <Link to="/how-to" className="text-copper-deep underline">
              step-by-step how-to
            </Link>
            ,{" "}
            <Link to="/use-cases" className="text-copper-deep underline">
              use cases
            </Link>
            ,{" "}
            <Link to="/why-local" className="text-copper-deep underline">
              why the work must stay local
            </Link>
            .
          </p>
        </div>
      </section>

      <FaqSection />
      <p className="mx-auto max-w-3xl px-4 pb-6 text-sm text-muted">
        Longer answers live on the{" "}
        <Link to="/faq" className="text-copper-deep underline">
          FAQ page
        </Link>
        .
      </p>
      <SoftAgencyCta />
    </AppShell>
  );
}
