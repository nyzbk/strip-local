export const FAQ = [
  {
    q: "Does Strip upload my photos?",
    a: "No. Strip inspects and cleans photos entirely in this browser tab. The EXIF parser (exifr), the Fast JPEG scrub (piexif / APP1 surgery), Deep clean (Canvas re-encode), and the ZIP builder (JSZip) all run in memory on your device. Closing the tab discards the files. You can load the page, turn on airplane mode, and still strip GPS. Hosting logs may record that you requested HTML or ads.txt — they never receive the image bytes. If a site asks you to “upload to strip EXIF,” that site is doing a different, riskier job than Strip.",
  },
  {
    q: "What is EXIF / GPS metadata, and why does it leak?",
    a: "EXIF is a sidecar of technical tags stored inside many JPEG (and some PNG/WebP) files. Typical tags include GPSLatitude / GPSLongitude, camera make and model, DateTimeOriginal, software name, and sometimes a small thumbnail. The picture you see in a feed does not show those tags, but the file still carries them. A stranger who downloads the original can plot the coordinates and infer a home, hotel, studio, or protest site. Strip’s job is to show those fields, then remove the containers that hold them so the downloaded file is safe to post.",
  },
  {
    q: "Will Fast mode reduce photo quality?",
    a: "No. Fast mode is JPEG-only surgery: it removes the APP1 EXIF segment (and related APP13 / COM segments when present) and leaves the compressed pixel blocks untouched. There is no quality slider and no new generation of artifacts. File size usually drops by a few kilobytes — that is the metadata, not compression. If Fast cannot parse an unusual JPEG, use Deep clean instead. Deep clean does re-encode pixels through Canvas, so use the quality slider there (default 92%) only when you need a container rewrite.",
  },
  {
    q: "When do I need Deep clean instead of Fast?",
    a: "Use Deep clean for PNG and WebP, for JPEGs where Fast reports leftover tags, and whenever you need the whole container rewritten. Some cameras store a second EXIF block inside a thumbnail IFD; some editors write XMP packets that Fast’s JPEG-segment pass may miss. Deep clean draws the pixels onto a Canvas with orientation applied and exports a new file, which drops those extra packets. The tradeoff is a re-encode: JPEG and WebP use the quality slider; PNG keeps a lossless raster. Auto mode already picks Fast for typical JPEGs and Deep for PNG/WebP.",
  },
  {
    q: "Can I strip GPS from iPhone photos?",
    a: "Yes, if the file is a JPEG from Camera Roll or the Files app. Many iPhones still default to HEIC. Strip v1 does not strip HEIC containers — convert the shot in HEIC Local first, then drop the JPEG here. After conversion, inspect the JPEG: iOS often copies GPS into the new file. Android JPEGs from Google Camera usually carry GPS in the same EXIF GPS IFD Strip reads. Live Photos are two files (a still plus a video); Strip only processes the still image you select, not the paired .MOV.",
  },
  {
    q: "Is a batch ZIP still private?",
    a: "Yes. When you add several photos, Strip strips each one in this tab and can pack the cleaned files with JSZip in the same tab. The ZIP never goes to a server to be assembled. Filenames stay under your control; we prefix cleaned files so you can tell them apart from originals. Memory is the only practical limit — very large batches on an old phone may warn you. That warning is a device guard, not a quota and not an upsell.",
  },
  {
    q: "Do I need an account? Is there a watermark or daily limit?",
    a: "No account, no email wall, no watermark, no daily cap. Strip is a local utility: you choose files, you download files. The only limit is this device’s RAM and the browser’s Canvas/blob budget. Ads, when the site is approved, sit after a successful strip, in a mid slot below results, or in the footer — never on top of Choose, Strip, or Download. Soft notes about the studio that built Strip are not ads.",
  },
  {
    q: "Is Strip the same as Crush or Shift?",
    a: "No. Crush shrinks bytes (compression). Shift changes container/codec (WebP/AVIF). Strip removes privacy metadata — GPS, camera, timestamps, software tags — without trying to make the file smaller or change format as its primary job. Fast mode does not recompress JPEG pixels. If you need a smaller Instagram upload after stripping GPS, run Crush on the cleaned file. If you need WebP, run Shift after Strip so the converted file does not re-inherit tags from an unstripped original.",
  },
  {
    q: "Does removing EXIF always make the file smaller?",
    a: "Usually a little, because you drop the APP1/XMP bytes. That is not Strip’s product promise. Deep clean can even grow a file slightly if you re-encode a highly optimized JPEG at quality 0.92. Treat size change as a side effect. If the goal is kilobytes, use a compressor. If the goal is “this JPEG no longer contains 37.77°N, 122.41°W,” use Strip.",
  },
  {
    q: "Is this a forensic or military-grade wipe?",
    a: "No, and we will not market it as one. Strip removes common EXIF, GPS, IPTC and XMP that this browser and the bundled libraries can read. It does not hunt steganography, printer microdots, or every vendor MakerNote. Screenshots of a map still show a place in the pixels. Blurring a house in the picture is a different tool. After you download, you can re-open the file in Strip’s inspector (or any EXIF viewer) to confirm GPS fields are gone. That check is the honest bar.",
  },
  {
    q: "Does Strip blur faces or hide the location inside the picture?",
    a: "No. Metadata stripping is not redaction of pixels. A photo of your front door still shows your front door after Strip. GPS tags are invisible extras; the scene is not. If the picture itself identifies a place, crop or shoot differently. Strip’s inspect panel exists so you can see the hidden layer — coordinates, camera body, capture time — and decide whether the file is safe to attach to a tweet, listing, or press drop.",
  },
  {
    q: "What about XMP, IPTC, Photoshop thumbnails, and color profiles?",
    a: "Fast JPEG mode targets the usual EXIF APP1 block and common IPTC/COM segments. XMP packets and leftover thumbnail IFDs are why Deep clean exists: a Canvas export writes a new container. Color profiles may be replaced by the browser’s export defaults; that can shift appearance slightly on Deep, not on Fast. ICC/profile-critical print work should use Fast on a JPEG you already trust, then verify. We do not claim every MakerNote from every camera brand is enumerated.",
  },
  {
    q: "How do I verify GPS is actually gone after download?",
    a: "Download the cleaned file, then drop it back onto Strip. The inspector should no longer show a GPS badge or coordinates. You can also open the file in a desktop EXIF viewer. Fast mode should report empty GPS IFD on typical JPEGs. If you still see tags, run Deep clean once and re-check. Do not trust a social network’s “we strip EXIF” claim as a substitute: many apps strip on their CDN copy but leave the original on your camera roll, and some desktop uploaders send the original bytes.",
  },
] as const;
