import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/why-local")({
  head: () =>
    pageHead(
      "Why Strip GPS Locally — Don’t Upload Photos to Remove EXIF | Strip",
      "Uploading a geotagged JPEG to a cloud “EXIF remover” sends the coordinates to that host. Strip reads and clears tags in this tab.",
      "/why-local",
    ),
  component: WhyLocalPage,
});

function WhyLocalPage() {
  return (
    <AppShell>
      <Article
        title="Why GPS stripping has to happen on this device"
        lede="The privacy job is deleting coordinates. Handing those coordinates to a stranger’s server so they can delete them is a contradiction. Strip exists so you do not have to do that."
        updated="Updated 28 August 2026"
      >
        <h2>What a cloud stripper actually receives</h2>
        <p>
          A typical “remove EXIF online” form is a multipart upload. The JPEG on the wire includes APP1. APP1
          includes the GPS IFD. The operator of that form, their CDN, their virus scanner, and anyone with log
          access can read the same tags you were trying to hide — before their code deletes them on a copy they
          send back. You cannot audit their retention. You cannot see whether they write GPS to a side table “for
          abuse detection.”
        </p>
        <p>
          Strip never takes that path. Inspect uses a parser in JavaScript. Fast mode rewrites JPEG segments in an
          ArrayBuffer. Deep mode uses Canvas in this process. ZIP uses JSZip in this process. The Network panel
          during a strip should not show image POST/PUT to strip-local. If you see one, something is wrong; stop
          and tell us from the contact page without attaching the photo.
        </p>
        <h2>Offline after load is a feature, not a slogan</h2>
        <p>
          Once HTML, JS, and fonts are cached, airplane mode still lets you inspect and download. That is the test
          we care about. A site that “processes in the browser” but still posts a thumbnail for “preview generation”
          fails the test. Ads, when approved, load from Google’s ad paths and are unrelated to your JPEGs; they are
          not an image-processing backend.
        </p>
        <h2>What local cannot promise</h2>
        <p>
          On-device code can only see bytes the browser can read. HEIC often needs a convert step. Some MakerNotes
          are undocumented. A Canvas export is not a bit-perfect clone of a JPEG. We document Fast vs Deep so you
          can choose identical pixels (Fast) versus a cleaner container (Deep). Local also means we do not store a
          history of your files — there is no cloud trash can to empty, because there is no cloud copy.
        </p>
        <h2>How this sits next to other local tools</h2>
        <p>
          Ultimatum ships other in-browser utilities (compress, convert, HEIC, PDF). Each one has a different file
          job. Strip’s job is GPS and camera tags. Using a compressor first can drop some tags as a side effect and
          still leave others; do not use size reduction as a substitute for an inspectable GPS-empty file. Sequence
          when you need both: Strip (verify), then compress or convert the cleaned output.
        </p>
        <p>
          Read the{" "}
          <Link to="/how-to">how-to</Link> for the click path, or{" "}
          <Link to="/privacy">privacy</Link> for what hosting logs may still contain (IP and URLs, not image bytes).
        </p>
      </Article>
      <SoftAgencyCta />
    </AppShell>
  );
}
