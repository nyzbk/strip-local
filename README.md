# Strip — Free EXIF & Metadata Remover

Remove GPS, camera, software and other photo metadata **in the browser**. No upload. No signup. No watermark.

- **Live:** https://strip-local.vercel.app
- **Job:** privacy strip (EXIF / GPS / IPTC / XMP). Not a compressor (Crush) and not a format converter (Shift).
- **Engine:** `exifr` inspect · `piexifjs` Fast JPEG scrub (pixels untouched) · Canvas Deep clean
- **Batch ZIP:** JSZip, in-tab

## Stack

Vite · React 19 · TanStack Start · Tailwind · exifr · piexifjs · JSZip · Canvas

## Hard constraints

- Files never leave the tab
- No account, no watermark, no quota
- Ads only after-success / mid / footer (`VITE_ADSENSE_LIVE=false` until Site Ready)
- Isolation: this repo is Strip only (`nyzbk/strip-local`)
