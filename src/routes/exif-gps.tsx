import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { ExifInspect } from "@/components/strip/ExifInspect";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/exif-gps")({
  head: () =>
    pageHead(
      "Inspect GPS and EXIF tags in a photo | Strip",
      "Read GPS IFD, DateTimeOriginal, camera make and other JPEG tags in this tab. Inspection does not strip. No upload.",
      "/exif-gps",
      { appName: "Inspect GPS and EXIF" },
    ),
  component: ExifGpsPage,
});

function ExifGpsPage() {
  return (
    <AppShell>
      <Article
        title="What GPS and EXIF actually store in a photo"
        lede="The picture is the payload people look at. The tag sheet is the payload people forget. This page names the fields Strip can show — and lets you inspect one file without wiping it. It is not a complete ISO 12234 textbook, and it is not the remover."
        updated="Updated 10 September 2026"
      >
        <ExifInspect />

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
          not — which is why inspect beats folklore. The table above reports <code>hasGps</code>, latitude and
          longitude when the parser can revive them. Empty cells mean this tab did not see those keys, not that a
          forensic lab would find nothing.
        </p>

        <h2>This page inspects. The homepage removes.</h2>
        <p>
          Two jobs share one origin and must stay distinct. Here you drop a still, <code>readMeta</code> runs, a
          table lists GPS, camera and dates. There is no Fast/Deep switch and no “Download clean”. Bytes on disk
          do not change. If the table shows a pin and you need those keys gone, open{" "}
          <Link to="/">Remove these tags</Link> and run the stripper. Mixing inspect with wipe on this URL would
          make the lecture a second copy of the tool. The numbered wipe lives on{" "}
          <Link to="/how-to">how-to</Link>.
        </p>
        <p>
          Re-inspect after a wipe is the honesty check: drop the downloaded file here again. If GPS is still Yes,
          the copy you picked is not the stripped blob — a common iPhone mix-up documented on{" "}
          <Link to="/iphone">iPhone</Link>.
        </p>

        <h2>IFD0 and Exif IFD: who shot it, when, with what</h2>
        <p>
          Make and Model name the body or phone. DateTimeOriginal is the capture clock, which may disagree with the
          filesystem timestamp. Software names the editor. Orientation tells viewers to rotate; Strip’s Deep path
          on the homepage applies orientation via createImageBitmap so the pixels you download already face the
          right way. Fast leaves pixel blocks alone, including orientation tags if they live outside the segments
          we cut — if a viewer then disagrees, Deep is the fix. This inspect table does not apply orientation. It
          only prints the tag.
        </p>
        <p>
          Artist and Copyright are IPTC/EXIF cousins. Photojournalism may need them after a wipe, added in a tool
          that does not copy GPS from the original. Strip will not invent a byline.
        </p>

        <h2>Thumbnails, IPTC, XMP</h2>
        <p>
          A JPEG can hide a smaller JPEG with its own EXIF. IPTC (often APP13) holds captions and bylines. XMP is
          an XML packet editors love. Fast mode on the homepage is a segment-level scrub aimed at the usual APP1
          EXIF and common extra segments. Deep mode is a new file from pixels, which is how stubborn packets
          disappear. Inspection here uses the same parser as the stripper’s “before” summary. It will not expand
          every MakerNote blob into a second table.
        </p>

        <h2>How to read the table</h2>
        <p>
          <strong>GPS present</strong> is the boolean the stripper uses for the copper badge. Latitude and
          longitude are decimal, five places when revived. <strong>Readable tags</strong> is a count of non-empty
          keys the parser merged — not an ISO inventory. Extra rows (LensModel, ImageDescription, GPS pair as a
          single string) appear when those keys exist. A screenshot with tag count 0 is a normal outcome. A phone
          JPEG with Make, Model, DateTimeOriginal and GPS is the usual leak.
        </p>
        <p>
          Dates in the table are capture metadata. They are not the “Date modified” Finder shows after you
          download. If you need the clock gone as well as the pin, that is a wipe on the homepage, then confirm
          here.
        </p>
        <p>
          Phone galleries often hide the same numbers behind an “i” or Info panel. That UI is not a strip, and it
          is not this table. iOS Photos can show a map pin while the JPEG you later export is a different object —
          a copy, a share-sheet still, a WhatsApp recode. Inspect the file you are about to send, not the preview
          in Recents. Decimal degrees in this table are revived from rationals; five places is street-level, not
          survey-grade. Do not treat a missing altitude row as “no GPS”: latitude plus longitude is enough to name
          a building.
        </p>
        <p>
          Software tags tell you an editor touched the container. They do not prove GPS was removed. An export
          from a messenger can say WhatsApp in Software and still carry a pin, or drop the pin and keep Make.
          Read the GPS row first. Then the camera row. Then decide whether the homepage wipe is needed. Folklore
          (“Instagram already cleaned it”) is how listings leak a house.
        </p>

        <h2>What pixels still say</h2>
        <p>
          Reflections, street signs, unique windows, and faces are not EXIF. Strip will not invent a blur. If the
          story is the scene, crop. If the story is the object, fill the frame. Use this page as a map of the
          hidden layer only. Marketplace listings keep a CDN copy that is not this file —{" "}
          <Link to="/marketplace">marketplace</Link>. Chat bubbles are not Files —{" "}
          <Link to="/whatsapp">WhatsApp</Link>.
        </p>

        <h2>Honesty limits</h2>
        <p>
          MakerNotes are vendor-specific. Steganography is out of scope. PDF, video, and RAW/DNG are other
          containers — Strip is a still-image utility. HEIC is rejected on purpose. We would rather list those
          limits than advertise a “military wipe.” Empty GPS on re-inspect is the success criterion after a
          homepage strip. This URL will not call piexif, will not rasterize Deep, and will not draw a map of the
          pin. Related ceilings:{" "}
          <Link to="/iphone">iPhone album</Link>,{" "}
          <Link to="/whatsapp">WhatsApp bubble</Link>,{" "}
          <Link to="/marketplace">marketplace CDN</Link>.
        </p>
      </Article>
      <SoftAgencyCta />
    </AppShell>
  );
}
