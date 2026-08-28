import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/page-head";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead(
      "Privacy Policy — Strip EXIF & GPS Remover",
      "Strip processes photos in your browser. We do not upload, store, or sell images or GPS tags. AdSense may set cookies after approval.",
      "/privacy",
    ),
  component: Privacy,
});

function Privacy() {
  return (
    <AppShell>
      <Article title="Privacy" updated="Last updated: 28 August 2026">
        <h2>Summary</h2>
        <p>
          Strip removes EXIF, GPS and other common photo metadata entirely in your browser. Photos you drop here
          are not uploaded to our servers for processing. Metadata is read and stripped in this tab only. There is
          no account and no tracking of file contents.
        </p>
        <h2>What we process</h2>
        <ul>
          <li>
            <strong>Files you select</strong> stay on this device. Inspect uses a local parser (exifr). Fast JPEG
            scrub edits the file in memory; Deep clean uses Canvas. Closing the tab discards them.
          </li>
          <li>
            <strong>GPS and camera fields</strong> are shown only in this tab so you can see what would leak. They
            are not sent to a map service or any other host.
          </li>
          <li>
            <strong>Technical logs:</strong> hosting / CDN (Vercel) may log IP, user-agent, and request paths for
            security and reliability. Those logs do not include your images or their metadata.
          </li>
          <li>
            <strong>Advertising:</strong> Google AdSense (publisher ca-pub-7636435144500691) may set cookies after
            the site is approved. Ads are independent of image processing. See{" "}
            <a href="https://policies.google.com/privacy">Google Privacy & Terms</a>.
          </li>
        </ul>
        <h2>What we do not do</h2>
        <ul>
          <li>We do not upload, store, or sell your photos or their GPS tags.</li>
          <li>We do not require an account to strip files.</li>
          <li>We do not use your files to train models.</li>
          <li>We do not add watermarks.</li>
          <li>We do not run a “send us the JPEG” support path — see Contact.</li>
        </ul>
        <h2>Your choices</h2>
        <p>
          Do not select files you do not want processed in this tab. Use browser controls to clear site data. Ad
          settings:{" "}
          <a href="https://adssettings.google.com/">adssettings.google.com</a>. Questions:{" "}
          <Link to="/contact">contact</Link> ({SITE.email}), without attachments.
        </p>
        <h2>Children</h2>
        <p>
          Strip is a general-purpose utility, not directed at children. Do not drop photos of minors if you are not
          allowed to process them. We do not knowingly collect personal information from children because we do not
          collect the photos at all.
        </p>
      </Article>
    </AppShell>
  );
}
