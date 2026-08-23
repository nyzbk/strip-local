export const FAQ = [
  {
    q: "Does Strip upload my photos?",
    a: "No. Inspect and strip run entirely in this tab (exifr + piexif or Canvas). Files never go to a server. You can disconnect after the page loads and it still works.",
  },
  {
    q: "What is EXIF / GPS metadata?",
    a: "Hidden data stored alongside a photo: GPS coordinates, camera make and model, the time it was taken, and sometimes software or copyright tags. Sharing the file can leak that without anyone seeing it in the picture.",
  },
  {
    q: "Will Fast mode reduce quality?",
    a: "No. Fast mode removes the JPEG metadata segment and leaves the pixels untouched. File size usually drops by a few kilobytes — that is the metadata, not compression.",
  },
  {
    q: "When do I need Deep clean?",
    a: "Use Deep clean for PNG and WebP, or when Fast fails on an unusual JPEG. Deep re-encodes pixels through Canvas, which strips container metadata. Optional quality (default 92%) applies only to JPEG/WebP re-encode.",
  },
  {
    q: "Can I strip iPhone photos?",
    a: "Yes, if they are JPG from Camera Roll or Files. HEIC is not stripped in v1 — convert in HEIC Local first, then drop the JPG here.",
  },
  {
    q: "Is batch ZIP still private?",
    a: "Yes. The ZIP is built in the tab with JSZip. Nothing leaves the device.",
  },
  {
    q: "Do I need an account? Is there a watermark or daily limit?",
    a: "No signup, no watermark, no quota. The only limit is this device’s memory — a guard, not a paywall.",
  },
  {
    q: "Is this the same as Crush?",
    a: "No. Crush shrinks file size. Strip removes privacy metadata (GPS, camera, software tags). They are different jobs.",
  },
  {
    q: "Does removing EXIF make the file smaller?",
    a: "Usually slightly — you drop the metadata bytes. Strip is not a compressor. Use Crush if you need a smaller image.",
  },
  {
    q: "Is this a forensic wipe?",
    a: "No. Strip removes common EXIF, GPS, IPTC and XMP that this browser and the libraries can read. It does not claim military-grade or steganographic erasure.",
  },
  {
    q: "Who made Strip?",
    a: "Strip is a free tool from Ultimatum. Other private tools in the family: Crush (compressor), Shift (WebP/AVIF converter), HEIC Local, Folio PDF Toolkit, and Nota Invoice.",
  },
] as const;
