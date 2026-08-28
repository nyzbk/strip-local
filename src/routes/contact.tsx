import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { pageHead } from "@/lib/page-head";
import { SITE } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact Strip — EXIF & GPS Remover Support",
      "Email Ultimatum about Strip. Describe browser and file type. Do not send photos or GPS dumps.",
      "/contact",
    ),
  component: ContactPage,
});

function ContactPage() {
  return (
    <AppShell>
      <Article
        title="Contact"
        lede="Strip is operated by Ultimatum. Product questions about this EXIF/GPS tool belong here. Do not email photographs."
      >
        <p>
          Email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          . That inbox is read by a person. It is the same operator address used across Ultimatum’s local tools.
        </p>
        <h2>What to include</h2>
        <ul>
          <li>Browser and device (for example Safari on iPhone 16, or Chrome on Windows).</li>
          <li>File kind: JPEG, PNG, WebP — not the file itself.</li>
          <li>Mode: Auto, Fast, or Deep, and whether inspect still showed GPS after download.</li>
          <li>Whether the source was HEIC converted to JPEG.</li>
        </ul>
        <h2>What not to send</h2>
        <p>
          Do not attach originals, cleaned files, or screenshots that include coordinates or faces you would not
          post. The point of Strip is that those bytes stay on your device. A text description is enough to debug
          Fast vs Deep or a HEIC rejection.
        </p>
        <h2>What we can and cannot do</h2>
        <p>
          We can explain a mode, a limit, or a bug in this web app. We cannot recover a file you already closed out
          of the tab, provide legal advice, or promise a forensic certificate. Privacy and terms: see the footer.
          There is no phone support and no ticket portal.
        </p>
      </Article>
    </AppShell>
  );
}
