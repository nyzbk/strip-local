/**
 * Strip three-checks (local): GPS JPEG in → no GPS out, no image POST, pages 200.
 * Run: node scripts/strip-three-checks.mjs [baseUrl]
 */
import { chromium } from "playwright";
import piexif from "piexifjs";
import exifr from "exifr";

const BASE = process.argv[2] || "http://127.0.0.1:8080";

function binaryToUint8(data) {
  if (data.startsWith("data:")) {
    const b64 = data.split(",")[1] ?? "";
    const bin = Buffer.from(b64, "base64");
    return new Uint8Array(bin);
  }
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) out[i] = data.charCodeAt(i) & 0xff;
  return out;
}

async function makeGpsJpeg() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const dataUrl = await page.evaluate(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 48;
    canvas.height = 48;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#c45c12";
    ctx.fillRect(0, 0, 48, 48);
    ctx.fillStyle = "#faf7f1";
    ctx.fillRect(8, 8, 32, 32);
    return canvas.toDataURL("image/jpeg", 0.92);
  });
  await browser.close();

  const gps = {};
  gps[piexif.GPSIFD.GPSVersionID] = [2, 3, 0, 0];
  gps[piexif.GPSIFD.GPSLatitudeRef] = "N";
  gps[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(37.7749);
  gps[piexif.GPSIFD.GPSLongitudeRef] = "W";
  gps[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(122.4194);
  const zeroth = {};
  zeroth[piexif.ImageIFD.Make] = "StripTestCam";
  zeroth[piexif.ImageIFD.Model] = "QA-1";
  zeroth[piexif.ImageIFD.Software] = "StripQA";
  const exifBytes = piexif.dump({ "0th": zeroth, Exif: {}, GPS: gps });
  const withExif = piexif.insert(exifBytes, dataUrl);
  return Buffer.from(binaryToUint8(withExif));
}

async function main() {
  const jpeg = await makeGpsJpeg();
  const before = await exifr.parse(jpeg, { gps: true, exif: true });
  if (!before?.latitude || !before?.Make) {
    throw new Error(`Fixture EXIF missing: ${JSON.stringify(before)}`);
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const posts = [];
  page.on("request", (req) => {
    if (["POST", "PUT"].includes(req.method()) && req.url().startsWith(BASE)) {
      posts.push({ method: req.method(), url: req.url() });
    }
  });

  for (const path of ["/", "/privacy", "/terms", "/about", "/ads.txt", "/robots.txt", "/sitemap.xml"]) {
    const res = await page.goto(BASE + path, { waitUntil: "domcontentloaded" });
    if (!res || res.status() >= 400) throw new Error(`${path} → ${res?.status()}`);
  }

  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.setInputFiles('input[type="file"]', {
    name: "gps-photo.jpg",
    mimeType: "image/jpeg",
    buffer: jpeg,
  });
  await page.getByText("Has GPS", { exact: false }).first().waitFor({ timeout: 8000 });
  await page.getByRole("button", { name: /^Strip/ }).click();
  await page.getByText(/GPS removed|Removed GPS|Clean/i).first().waitFor({ timeout: 15000 });

  const blobB64 = await page.evaluate(async () => {
    const btn = [...document.querySelectorAll("button")].find((b) => b.textContent?.includes("Download") && !b.textContent.includes("ZIP"));
    if (!btn) throw new Error("Download button missing");
    const img = document.querySelector("li img");
    const src = img?.getAttribute("src");
    if (!src) throw new Error("result preview missing");
    const res = await fetch(src);
    const buf = await res.arrayBuffer();
    const bytes = new Uint8Array(buf);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  });
  const out = Buffer.from(blobB64, "base64");
  const after = (await exifr.parse(out, { gps: true, exif: true })) || {};
  if (after.latitude != null || after.longitude != null || after.GPSLatitude != null) {
    throw new Error(`GPS still present after strip: ${JSON.stringify(after)}`);
  }
  if (after.Make === "StripTestCam" || after.Software === "StripQA") {
    throw new Error(`Camera/software tags remain: ${JSON.stringify(after)}`);
  }
  if (posts.length) throw new Error(`Image POST/PUT detected: ${JSON.stringify(posts)}`);

  await page.screenshot({ path: "/workspace/screenshots/strip-after-success.png", fullPage: true });
  await browser.close();
  console.log(
    JSON.stringify(
      {
        ok: true,
        beforeGps: { lat: before.latitude, lon: before.longitude, make: before.Make },
        afterKeys: Object.keys(after),
        posts,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
