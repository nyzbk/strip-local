import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/page-head";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead(
      "About Strip — Local EXIF and GPS Remover by Ultimatum",
      "Strip is a free in-browser tool that removes GPS and camera metadata from photos. No upload, no account. Built by Ultimatum.",
      "/about",
    ),
  component: About,
});

function About() {
  return (
    <AppShell>
      <Article title="About Strip" updated="Updated 28 August 2026">
        <p>
          Strip is a free EXIF and GPS remover that runs in your browser. It exists because a privacy tool that
          asks you to upload the photo is asking you to share the leak in order to hide the leak. We got tired of
          that pattern: cloud forms, signup walls in front of “download without GPS,” and watermarks on a job that
          should be boring infrastructure.
        </p>
        <h2>What this product is for</h2>
        <p>
          You have a JPEG (or PNG/WebP) that still contains a GPS IFD, a camera body tag, or an editor’s XMP
          packet. You want a copy you can post without that sidecar. Strip shows the tags, then Fast-scrubs JPEG
          segments or Deep-rewrites the container through Canvas. Batch ZIP is local. There is no account because
          there is nothing to store.
        </p>
        <p>
          Strip is not a compressor, not a format converter, not a HEIC decoder, and not a redaction brush. Those
          are different jobs. If you need size or WebP, do that after you have a GPS-empty file you have
          re-inspected.
        </p>
        <h2>Who operates it</h2>
        <p>
          Strip is made by Ultimatum, a brand-marketing studio that also ships other local-first utilities. The
          studio note in the footer is not an ad network unit. For this product, write{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> — and do not attach photos.
        </p>
        <p>
          Other Ultimatum local tools (compress, convert, HEIC, PDF, invoices) live on their own sites. This site
          is only the metadata cleaner. We mention the family once so you do not mistake Strip for a
          one-click “do everything to my photo” portal.
        </p>
        <h2>What we refuse to claim</h2>
        <p>
          No forensic wipe. No guarantee that every MakerNote is gone. No promise that a picture of your house
          stops being a picture of your house. Success is: inspect no longer shows GPS, and you downloaded the
          file you verified. Limits and modes are documented in the{" "}
          <Link to="/how-to">how-to</Link> and{" "}
          <Link to="/faq">FAQ</Link>.
        </p>
        <h2>Why the site looks like a tool plus articles</h2>
        <p>
          A dropzone alone does not tell a reviewer — or a new user — what GPS tags are, when Fast is enough, or
          why HEIC is rejected. The guides exist so the page is still useful if you never click an ad. Navigation
          in the header and footer is the same on every public URL: tool, how-to, FAQ, use cases, contact, legal.
        </p>
      </Article>
    </AppShell>
  );
}
