import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { Article } from "@/components/site/Article";
import { SoftAgencyCta } from "@/components/ads/SoftAgencyCta";
import { pageHead } from "@/lib/page-head";

export const Route = createFileRoute("/use-cases")({
  head: () =>
    pageHead(
      "When to Strip GPS from Photos — Social, Marketplace, Field Work | Strip",
      "Three real jobs: posting travel photos without a home pin, selling goods shot in a driveway, and publishing field pictures without source coordinates.",
      "/use-cases",
    ),
  component: UseCasesPage,
});

function UseCasesPage() {
  return (
    <AppShell>
      <Article
        title="When stripping GPS is the actual job"
        lede="These are situations where a compressor or a format converter does not help. The file looks fine. The tag sheet does not."
        updated="Updated 28 August 2026"
      >
        <h2>Posting travel and daily photos without handing out a pin</h2>
        <p>
          People still download originals. A feed may show a square crop; the file behind “open original” or a
          desktop save can still carry GPSLatitude and GPSLongitude from the hotel, the rental, or the street you
          walked home on. Location services on a phone are doing their job for your map — they are not doing a
          privacy job for a public post.
        </p>
        <p>
          Before you attach a weekend set to X, Instagram (via a desktop uploader), a newsletter, or a shared album
          you do not administrate, run the JPEGs through Strip. Inspect should show the pin if the camera had a
          lock. Fast mode is usually enough for those JPEGs: pixels stay as shot, the APP1 block goes away. Then
          re-drop one download to confirm the GPS badge is gone.
        </p>
        <p>
          This does not hide a recognizable storefront in the frame. If the picture is the front of your building,
          crop or shoot another frame. Metadata removal is for the invisible layer — the WGS-84 coordinate, the
          camera body, the exact minute. Families sending school-event photos to a group chat that later leaks
          similarly benefit: the chat app’s preview might be clean while the file you dropped in was not.
        </p>
        <p>
          iPhone users: export HEIC to JPEG first. Many “I already shared it, so it’s clean” assumptions fail
          because the Camera Roll original never changed. Strip the copy you intend to upload, and upload that copy
          from Downloads, not from the live album. Desktop apps (Lightroom publish, a blog CMS, an email attach)
          are the worst offenders: they often send the file on disk, not the recompressed preview you saw in a
          mobile share sheet. If you post the same trip set to a public Flickr-style original download, treat every
          still as hostile until inspect is empty. Related:{" "}
          <Link to="/how-to">how-to</Link> and{" "}
          <Link to="/exif-gps">what the GPS block contains</Link>.
        </p>

        <h2>Marketplace and product photos shot at home or in a yard</h2>
        <p>
          Listings for furniture, bikes, plants, and cars are often photographed in a driveway, spare room, or
          building entrance. Buyers need to see the object. They do not need a machine-readable coordinate of the
          pickup address in the JPEG. Some marketplaces recompress; some pass the original through. You do not
          control which path a particular app takes this month.
        </p>
        <p>
          Workflow: shoot as usual, transfer JPEGs to the computer or Files app, strip GPS (and, if you want, camera
          make — it rarely helps a listing), then upload the cleaned files. Keep a private original if you need it
          for insurance. Fast mode keeps fabric and scratch detail identical on JPEG product shots, which matters
          more than a 3 KB size win.
        </p>
        <p>
          Deep clean is for PNG screenshots of a serial number or WebP exports from an editor that stuffed XMP into
          the file. If a PNG still shows software tags after Fast (Fast will refuse PNG), Deep is the mode Auto
          already picks. Do not flatten a transparent cutout to JPEG unless you accept a matte; Strip’s Keep-format
          path on Deep PNG preserves an alpha raster the Canvas can represent.
        </p>
        <p>
          Avoid photographing mail, badges, or open laptops in the background. Those are pixel leaks. Strip will
          happily remove GPS from a photo that still shows your surname on a package. Use the inspector as a
          metadata checklist, then look at the picture as a picture. That two-pass habit is the difference between
          a clean listing and a clean-looking file that still doxes a hallway. If you shoot a dozen angles, strip
          the batch once and ZIP; do not upload “just this one extra original” from Camera Roll because you were
          in a hurry. Marketplace apps also store drafts — replace the draft image with the cleaned file, don’t
          append.
        </p>

        <h2>Field notes, journalism, and research photos</h2>
        <p>
          A reporter, NGO worker, or researcher may need the scene and must not publish a geotag that identifies a
          source’s home, clinic, or meeting point. Phones write GPS by default. Drones almost always write it.
          Publishing “the JPEG straight from the body” is how coordinates end up in a zip the desk did not review.
        </p>
        <p>
          Policy here is boring on purpose: Strip is a local cleaner, not a secure messenger and not a newsroom
          CMS. Use it on the stills you are about to attach to an email or CMS, on a machine you control, offline
          after the page loads if that is the requirement. Then verify. Do not send originals to a random “EXIF
          remover” web API — that duplicates the leak to a third host.
        </p>
        <p>
          Fast JPEG keeps the photographic evidence (the pixels) while dropping the GPS IFD. If a newsroom later
          needs the geotag internally, that belongs in a sidecar you keep offline, not in the public file. Deep
          clean when a wire photo already went through Photoshop and grew XMP. Strip does not claim MakerNote
          completeness for every body; if a desk has a forensic requirement, they already have other tools. This
          page is for the common case: the public JPEG must not include GPSLatitude.
        </p>
        <p>
          We do not pitch Strip for hiding illegal activity, and we do not walk through stripping IDs or passports.
          The legitimate field use is “the picture is the story, the pin is not.” Combine with crop and caption
          discipline. After Strip,{" "}
          <Link to="/why-local">keep the work in-browser</Link> so the coordinates never transit a helper server on
          the way to being deleted. If a desk uses a DAM that re-attaches IPTC from the original, strip again on
          the export that actually goes to the wire. Re-inspect is cheaper than a correction.
        </p>
      </Article>
      <SoftAgencyCta />
    </AppShell>
  );
}
