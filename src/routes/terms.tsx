import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/terms")({ component: Terms });

function Terms() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl">Terms</h1>
        <p className="mt-2 text-sm text-muted">Last updated: 23 August 2026</p>
        <p className="mt-6 text-pretty">
          Strip is provided as-is, free of charge. Fast mode removes JPEG EXIF/GPS segments without re-encoding pixels.
          Deep clean re-encodes through the browser Canvas and is limited by this device’s memory and codec support.
        </p>
        <p className="mt-4 text-pretty text-muted">
          Strip removes common EXIF, GPS, IPTC and XMP metadata that this browser and the bundled libraries can read.
          It is not a forensic or military-grade wipe and does not claim to erase every possible hidden channel.
        </p>
        <p className="mt-4 text-pretty text-muted">
          You are responsible for having the right to process the images you drop here. Do not use Strip to violate
          copyright or privacy of others.
        </p>
        <p className="mt-4 text-pretty text-muted">
          No watermark is added. No daily quota is enforced by us. The only limit is this device’s memory.
        </p>
        <p className="mt-4 text-pretty text-muted">
          Ads, when live, are served by Google AdSense under Google’s policies. Soft studio notes on this site are not
          advertisements.
        </p>
      </main>
    </AppShell>
  );
}
