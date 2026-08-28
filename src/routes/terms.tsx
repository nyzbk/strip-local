import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/page-head";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead(
      "Terms of Use — Strip EXIF & GPS Remover",
      "Strip is provided as-is. Fast mode does not re-encode JPEG pixels. Deep clean uses Canvas. Not a forensic wipe.",
      "/terms",
    ),
  component: Terms,
});

function Terms() {
  return (
    <AppShell>
      <Article title="Terms" updated="Last updated: 28 August 2026">
        <p>
          Strip is provided as-is, free of charge, by Ultimatum. Fast mode removes JPEG EXIF/GPS segments without
          re-encoding pixels. Deep clean re-encodes through the browser Canvas and is limited by this device’s
          memory and codec support.
        </p>
        <p>
          Strip removes common EXIF, GPS, IPTC and XMP metadata that this browser and the bundled libraries can
          read. It is not a forensic or military-grade wipe and does not claim to erase every possible hidden
          channel, MakerNote, or steganographic payload. Re-inspect a download to see what is left.
        </p>
        <p>
          You are responsible for having the right to process the images you drop here. Do not use Strip to violate
          copyright or privacy of others. Do not use it to conceal evidence you are legally required to keep. Pixel
          content (faces, locations visible in the scene) is unchanged by a metadata strip.
        </p>
        <p>
          No watermark is added. No daily quota is enforced by us. The only limit is this device’s memory. HEIC is
          out of scope until converted. We may reject or fail files the parser or Canvas cannot handle.
        </p>
        <p>
          Ads, when live, are served by Google AdSense under Google’s policies. Placeholder slots may appear before
          the site is approved to show ads. Soft studio notes on this site are not advertisements. Auto ads are not
          used.
        </p>
        <p>
          The service may change or go offline. We are not liable for lost files, leftover tags you did not
          re-inspect, or downstream posts. Contact:{" "}
          <Link to="/contact">{SITE.email}</Link>. Related:{" "}
          <Link to="/privacy">Privacy</Link>.
        </p>
      </Article>
    </AppShell>
  );
}
