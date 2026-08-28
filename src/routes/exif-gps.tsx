import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/exif-gps")({
  head: () =>
    pageHead(
      "What GPS and EXIF Tags Leak in a Photo | Strip",
      "GPS IFD, DateTimeOriginal, camera make, XMP and thumbnails — what a JPEG can reveal besides the picture, and what Strip inspects.",
      "/exif-gps",
    ),
  component: ExifGpsPage,
});

function ExifGpsPage() {
  return (
    <AppShell>
      <Article
        title="What GPS and EXIF actually store in a photo"
        lede="The picture is the payload people look at. The tag sheet is the payload people forget. This page names the fields Strip is built to show and remove — not a complete ISO 12234 textbook."
        updated="Updated 28 August 2026"
      >
        <h2>GPS IFD: a pin, not a caption</h2>
        <p>
          JPEG EXIF can include a GPS Image File Directory. Common tags: GPSLatitude, GPSLongitude, GPSLatitudeRef
          (N/S), GPSLongitudeRef (E/W), sometimes GPSAltitude and GPSDateStamp. Values are often rational numbers
          (degrees, minutes, seconds). A library converts those to decimal degrees. About five decimals is enough
          to name a building. That is why a “nice sunset JPEG” can be a home address.
        </p>
        <p>
          Phones write this when Location is on for the camera. Some cameras write it from a paired phone. Drones
          write it as a matter of course. Screenshots usually do not. Edited exports sometimes keep it, sometimes
          not — which is why inspect beats folklore.
        </p>
        <h2>IFD0 and Exif IFD: who shot it, when, with what</h2>
        <p>
          Make and Model name the body or phone. DateTimeOriginal is the capture clock, which may disagree with the
          filesystem timestamp. Software names the editor. Orientation tells viewers to rotate; Strip’s Deep path
          applies orientation via createImageBitmap so the pixels you download already face the right way. Fast
          leaves pixel blocks alone, including orientation tags if they live outside the segments we cut — if a
          viewer then disagrees, Deep is the fix.
        </p>
        <h2>Thumbnails, IPTC, XMP</h2>
        <p>
          A JPEG can hide a smaller JPEG with its own EXIF. IPTC (often APP13) holds captions and bylines. XMP is
          an XML packet editors love. Fast mode is a segment-level scrub aimed at the usual APP1 EXIF and common
          extra segments. Deep mode is a new file from pixels, which is how stubborn packets disappear. If you
          publish photojournalism, you may want IPTC captions — add them after strip in a tool that does not
          re-copy GPS from the original.
        </p>
        <h2>What pixels still say</h2>
        <p>
          Reflections, street signs, unique windows, and faces are not EXIF. Strip will not invent a blur. If the
          story is the scene, crop. If the story is the object, fill the frame. Use this page as a map of the
          hidden layer only. Then run{" "}
          <Link to="/">the tool</Link> and verify with{" "}
          <Link to="/how-to">step 9</Link>.
        </p>
        <h2>Honesty limits</h2>
        <p>
          MakerNotes are vendor-specific. Steganography is out of scope. PDF, video, and RAW/DNG are other
          containers — Strip is a still-image utility. We would rather list those limits than advertise a
          “military wipe.” Empty GPS on re-inspect is the success criterion.
        </p>
      </Article>
      <SoftAgencyCta />
    </AppShell>
  );
}
