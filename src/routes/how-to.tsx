import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/how-to")({
  head: () =>
    pageHead(
      "How to Remove GPS and EXIF from Photos in the Browser | Strip",
      "Step-by-step: inspect JPEG location tags, Fast vs Deep clean, iPhone HEIC, verify GPS is gone, batch ZIP. No upload.",
      "/how-to",
    ),
  component: HowToPage,
});

function HowToPage() {
  return (
    <AppShell>
      <Article
        title="How to strip GPS and EXIF from a photo"
        lede="A practical sequence for JPEG, PNG and WebP on a phone or laptop. Every step runs in this tab. If a step fails, skip to the matching error note rather than uploading the file somewhere else."
        updated="Updated 28 August 2026"
      >
        <h2>1. Decide whether the file even has a privacy problem</h2>
        <p>
          Open the original in your gallery. If it is a screenshot of a website, it often has little or no GPS. If it
          is a camera still — iPhone, Pixel, DSLR, drone — assume it has a GPS IFD until an inspector says otherwise.
          Screenshots of maps still show a place in the pixels; Strip cannot un-draw a street. Metadata stripping
          only helps when the leak is in tags, not in the scene.
        </p>
        <h2>2. Export a JPEG if the phone shot HEIC</h2>
        <p>
          iOS frequently stores Camera Roll stills as HEIC. Strip v1 does not parse HEIC containers. Share or export
          the shot as JPEG (Files app, “Duplicate as JPEG”, or convert in HEIC Local), then bring that JPEG here.
          Conversion can copy GPS into the new file — converting is not the same as stripping. After conversion you
          still need this guide.
        </p>
        <h2>3. Open Strip on this site and keep the tab in the foreground</h2>
        <p>
          Use the homepage tool, not an email attachment workflow. On iPhone Safari, Choose files is the reliable
          control; drag-and-drop is optional. You do not create an account. If the page is loaded, airplane mode is
          fine: inspect and strip do not need a network.
        </p>
        <h2>4. Add one photo first, then batch</h2>
        <p>
          Start with a single JPEG you know was shot outdoors with location services on. Confirm the inspector shows
          a GPS badge and coordinates before you trust a 40-file ZIP. Then add the rest. Remove anything you did not
          mean to include. Soft warnings appear around very large files so the tab does not crash; split the batch
          if you hit that guard.
        </p>
        <h2>5. Read the inspect panel like a checklist</h2>
        <p>
          Look for GPS (latitude/longitude), camera make and model, capture time, and software. Coordinates are
          displayed only in this tab — they are not reverse-geocoded on a map server. If GPS is absent but Make and
          DateTimeOriginal are present, you may still want a strip: a camera body plus a timestamp can be identifying
          in a small community even without a pin.
        </p>
        <h2>6. Choose Auto, Fast, or Deep</h2>
        <p>
          Auto is correct for mixed trays: Fast on garden-variety JPEGs, Deep on PNG/WebP. Fast deletes JPEG metadata
          segments and does not re-encode pixels — no quality slider, no new blocking artifacts. Deep draws the
          bitmap with orientation applied and exports a new file, which is how leftover XMP or thumbnail IFDs die.
          Set Deep JPEG/WebP quality to 0.92 unless you have a reason to go lower. Do not pick Deep “for safety” on
          a print-critical JPEG if Fast already clears GPS; Fast keeps the original coefficients.
        </p>
        <h2>7. Tap Strip and wait for per-file progress</h2>
        <p>
          Each item shows progress. Failures should name the cause (HEIC, unsupported type, encode error) instead of
          hanging the page. Leave the tab open until the batch finishes. If one JPEG fails Fast, re-run that file
          with Deep rather than retrying Fast in a loop.
        </p>
        <h2>8. Download the cleaned still or a ZIP</h2>
        <p>
          Use Download on a single result or Download ZIP for the batch. iPhone may offer a Share sheet; that is
          still a local save. Keep originals in a private folder if you still need GPS for your own map. Do not
          overwrite the only copy of a RAW/DNG — Strip is for the JPEGs you publish, not for destroying archival
          sidecars you might want later.
        </p>
        <h2>9. Verify: drop the download back onto Strip</h2>
        <p>
          The inspector should no longer show GPS. This is the whole quality bar. A desktop EXIF viewer is a second
          opinion, not a requirement. If tags remain, Deep clean once more. Do not assume Instagram, X, or WhatsApp
          already did this for the file that still sits in Photos.
        </p>
        <h2>10. Typical errors and what they mean</h2>
        <p>
          <strong>HEIC rejected.</strong> Convert, then strip. <strong>Empty tray.</strong> Choose at least one
          accepted type. <strong>Fast did not clear GPS.</strong> Unusual JPEG; Deep. <strong>Tab slowed down.</strong>{" "}
          Fewer files, or smaller long-edge, then retry. <strong>Download did nothing on iOS.</strong> Use the Share
          path from the button, or long-press the preview. <strong>Colors shifted after Deep.</strong> Canvas export
          dropped or replaced a profile; for that file, Fast is the better mode if it already removed tags.
        </p>
        <h2>11. What this guide will not do</h2>
        <p>
          It will not walk you through blurring a house, scrubbing a license plate, or claiming a courtroom-grade
          wipe. Those are other jobs. Strip’s how-to ends when the GPS IFD is empty and you hold a file you are
          willing to attach. Related reading:{" "}
          <Link to="/use-cases">use cases</Link>,{" "}
          <Link to="/why-local">why local</Link>,{" "}
          <Link to="/exif-gps">what the GPS block contains</Link>.
        </p>
        <h2>12. Aftercare for the original</h2>
        <p>
          The cleaned download is what you post. The original in Camera Roll still has GPS until you delete or
          replace it. If a messaging app “helps” by sending a compressed copy, check which file left the device —
          some desktop uploaders grab the full original from a synced folder. When in doubt, upload the file you
          just verified in Strip, from the Downloads folder, not from the camera album.
        </p>
      </Article>
      <SoftAgencyCta />
    </AppShell>
  );
}
