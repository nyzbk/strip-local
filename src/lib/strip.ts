import exifr from "exifr";
import * as piexifModule from "piexifjs";
import { stemName } from "@/lib/utils";

type PiexifApi = { remove: (jpeg: string) => string };
const piexif: PiexifApi =
  (piexifModule as unknown as { default?: PiexifApi }).default ?? (piexifModule as unknown as PiexifApi);

export type StripMode = "auto" | "fast" | "deep";

export type ImageKind = "jpeg" | "png" | "webp" | "gif" | "bmp" | "heic" | "unknown";

export type MetaSummary = {
  hasGps: boolean;
  make?: string;
  model?: string;
  dateTime?: string;
  software?: string;
  artist?: string;
  copyright?: string;
  orientation?: string;
  tagCount: number;
  latitude?: number;
  longitude?: number;
  fields: Record<string, string>;
};

export type StripOutcome = {
  blob: Blob;
  filename: string;
  modeUsed: "fast" | "deep";
  fallbackFromFast: boolean;
  alreadyClean: boolean;
  summaryBefore: MetaSummary;
  summaryAfter: MetaSummary;
  originalSize: number;
  newSize: number;
  note?: string;
};

export const MAX_FILE_BYTES = 80 * 1024 * 1024;
export const WARN_FILE_BYTES = 25 * 1024 * 1024;
export const HEIC_LOCAL_URL = "https://heic-local.vercel.app";

const HEIC_MSG = `HEIC files need a decode step first. Convert in HEIC Local (${HEIC_LOCAL_URL}), then Strip.`;

function emptyMeta(): MetaSummary {
  return { hasGps: false, tagCount: 0, fields: {} };
}

function indexOfFourCC(buf: Uint8Array, code: string, from = 0, to = buf.length): number {
  const a = code.charCodeAt(0);
  const b = code.charCodeAt(1);
  const c = code.charCodeAt(2);
  const d = code.charCodeAt(3);
  const end = Math.min(buf.length - 4, to);
  for (let i = from; i <= end; i++) {
    if (buf[i] === a && buf[i + 1] === b && buf[i + 2] === c && buf[i + 3] === d) return i;
  }
  return -1;
}

export function looksLikeHeic(head: Uint8Array): boolean {
  const ftyp = indexOfFourCC(head, "ftyp", 0, 16);
  if (ftyp < 0) return false;
  const brands = new TextDecoder("latin1")
    .decode(head.subarray(ftyp, Math.min(head.length, ftyp + 64)))
    .toLowerCase();
  if (brands.includes("avif") || brands.includes("avis")) return false;
  return /heic|heif|heix|heim|heis|mif1|msf1/.test(brands);
}

export function detectKind(head: Uint8Array): ImageKind {
  if (head.length < 4) return "unknown";
  if (head[0] === 0xff && head[1] === 0xd8) return "jpeg";
  if (head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47) return "png";
  if (head[0] === 0x47 && head[1] === 0x49 && head[2] === 0x46) return "gif";
  if (head[0] === 0x42 && head[1] === 0x4d) return "bmp";
  if (
    head[0] === 0x52 &&
    head[1] === 0x49 &&
    head[2] === 0x46 &&
    head[3] === 0x46 &&
    head[8] === 0x57 &&
    head[9] === 0x45 &&
    head[10] === 0x42 &&
    head[11] === 0x50
  ) {
    return "webp";
  }
  if (looksLikeHeic(head)) return "heic";
  return "unknown";
}

export function isAcceptedImage(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  const typeOk =
    type === "image/jpeg" ||
    type === "image/jpg" ||
    type === "image/png" ||
    type === "image/webp" ||
    type === "image/bmp" ||
    type === "image/gif" ||
    type === "image/x-windows-bmp";
  const extOk = /\.(jpe?g|png|webp|bmp|gif)$/.test(name);
  const heicName = /\.(heic|heif)$/.test(name) || type === "image/heic" || type === "image/heif";
  if (heicName) return false;
  return typeOk || extOk;
}

export async function peekKind(file: File): Promise<ImageKind> {
  const head = new Uint8Array(await file.slice(0, 64).arrayBuffer());
  return detectKind(head);
}

export async function assertSafeImage(file: File): Promise<ImageKind> {
  if (file.size <= 0) throw new Error("This file is empty.");
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("This file is too large for this device’s memory. Try a smaller image.");
  }
  const head = new Uint8Array(await file.slice(0, 64).arrayBuffer());
  const kind = detectKind(head);
  if (kind === "heic" || /\.(heic|heif)$/i.test(file.name)) {
    throw new Error(HEIC_MSG);
  }
  if (kind === "unknown" && !isAcceptedImage(file)) {
    throw new Error("Only JPG, PNG, WebP, BMP, or GIF files are accepted.");
  }
  if (kind === "unknown") {
    throw new Error("This file does not look like a valid image.");
  }
  return kind;
}

function stringifyField(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed || undefined;
  }
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString();
  if (Array.isArray(value)) {
    const parts = value.map((v) => stringifyField(v)).filter(Boolean);
    return parts.length ? parts.join(", ") : undefined;
  }
  return undefined;
}

function pick(data: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const text = stringifyField(data[key]);
    if (text) return text;
  }
  return undefined;
}

function toCoord(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

export async function readMeta(file: File | Blob): Promise<MetaSummary> {
  try {
    const data = (await exifr.parse(file, {
      gps: true,
      exif: true,
      ifd1: false,
      iptc: true,
      xmp: true,
      icc: false,
      jfif: false,
      ihdr: false,
      mergeOutput: true,
      sanitize: true,
      reviveValues: true,
      translateKeys: true,
    })) as Record<string, unknown> | undefined;

    if (!data || typeof data !== "object") return emptyMeta();

    const latitude = toCoord(data.latitude);
    const longitude = toCoord(data.longitude);
    const hasGps =
      (latitude != null && longitude != null) ||
      data.GPSLatitude != null ||
      data.GPSLongitude != null ||
      data.gpsLatitude != null;

    const fields: Record<string, string> = {};
    const interesting = [
      "Make",
      "Model",
      "LensModel",
      "LensMake",
      "Software",
      "DateTimeOriginal",
      "CreateDate",
      "ModifyDate",
      "DateTime",
      "Artist",
      "Copyright",
      "ImageDescription",
      "Orientation",
      "GPSLatitude",
      "GPSLongitude",
      "latitude",
      "longitude",
    ];
    for (const key of interesting) {
      const text = stringifyField(data[key]);
      if (text) fields[key] = text;
    }
    if (latitude != null && longitude != null) {
      fields.GPS = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }

    const tagCount = Object.keys(data).filter((k) => data[k] != null && data[k] !== "").length;

    return {
      hasGps: Boolean(hasGps),
      make: pick(data, ["Make", "make"]),
      model: pick(data, ["Model", "model"]),
      dateTime: pick(data, ["DateTimeOriginal", "CreateDate", "DateTime", "ModifyDate"]),
      software: pick(data, ["Software", "ProcessingSoftware"]),
      artist: pick(data, ["Artist"]),
      copyright: pick(data, ["Copyright"]),
      orientation: pick(data, ["Orientation"]),
      tagCount,
      latitude,
      longitude,
      fields,
    };
  } catch {
    return emptyMeta();
  }
}

function isPrivacyClean(meta: MetaSummary): boolean {
  return !meta.hasGps && !meta.make && !meta.model && !meta.software && !meta.artist && meta.tagCount === 0;
}

function uint8ToBinaryString(bytes: Uint8Array): string {
  const chunk = 8192;
  let result = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    const slice = bytes.subarray(i, i + chunk);
    result += String.fromCharCode.apply(null, Array.from(slice));
  }
  return result;
}

function binaryStringToUint8(data: string): Uint8Array {
  if (data.startsWith("data:")) {
    const b64 = data.split(",")[1] ?? "";
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) out[i] = data.charCodeAt(i) & 0xff;
  return out;
}

function concatBytes(parts: Uint8Array[]): Uint8Array {
  let total = 0;
  for (const part of parts) total += part.length;
  const out = new Uint8Array(total);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

/** Drop APP1 (EXIF/XMP), APP13 (IPTC), and COM without touching pixels. */
function stripJpegAppSegments(bytes: Uint8Array): Uint8Array {
  if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    throw new Error("Not a JPEG");
  }
  const parts: Uint8Array[] = [bytes.subarray(0, 2)];
  let i = 2;
  while (i < bytes.length) {
    if (bytes[i] !== 0xff) {
      parts.push(bytes.subarray(i));
      break;
    }
    while (i + 1 < bytes.length && bytes[i] === 0xff && bytes[i + 1] === 0xff) {
      i += 1;
    }
    if (i + 1 >= bytes.length) break;
    const marker = bytes[i + 1]!;
    if (marker === 0xd9) {
      parts.push(bytes.subarray(i, i + 2));
      break;
    }
    if (marker === 0xda) {
      parts.push(bytes.subarray(i));
      break;
    }
    if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      parts.push(bytes.subarray(i, i + 2));
      i += 2;
      continue;
    }
    if (i + 3 >= bytes.length) {
      parts.push(bytes.subarray(i));
      break;
    }
    const len = (bytes[i + 2]! << 8) | bytes[i + 3]!;
    const next = i + 2 + len;
    const drop = marker === 0xe1 || marker === 0xed || marker === 0xfe;
    if (!drop && next <= bytes.length) {
      parts.push(bytes.subarray(i, next));
    }
    i = next;
  }
  const out = concatBytes(parts);
  if (out.length < 24) throw new Error("Fast scrub produced an invalid JPEG.");
  return out;
}

export async function stripJpegFast(file: File | Blob): Promise<Blob> {
  const original = new Uint8Array(await file.arrayBuffer());
  let bytes: Uint8Array = original;
  try {
    const removed = piexif.remove(uint8ToBinaryString(original));
    bytes = binaryStringToUint8(removed);
  } catch {
    bytes = original;
  }
  const stripped = stripJpegAppSegments(bytes);
  const copy = new ArrayBuffer(stripped.byteLength);
  new Uint8Array(copy).set(stripped);
  return new Blob([copy], { type: "image/jpeg" });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) reject(new Error("Could not encode this image on this device."));
        else resolve(blob);
      },
      type,
      quality,
    );
  });
}

function memoryError(err: unknown): Error {
  const message = err instanceof Error ? err.message : String(err);
  if (/memory|allocation|source image is too large/i.test(message)) {
    return new Error("This image is too large for this device’s memory. Try a smaller photo.");
  }
  return err instanceof Error ? err : new Error("Could not read this image in the browser.");
}

async function decodeFile(file: File | Blob): Promise<ImageBitmap> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" } as ImageBitmapOptions);
  } catch {
    try {
      return await createImageBitmap(file);
    } catch (err) {
      throw memoryError(err);
    }
  }
}

export async function stripDeep(
  file: File | Blob,
  quality = 0.92,
  outType?: string,
): Promise<Blob> {
  const q = Math.min(1, Math.max(0.7, quality));
  const type = outType || (file instanceof File ? file.type : "") || "image/jpeg";
  const mime =
    type === "image/png" || type === "image/webp" || type === "image/jpeg" ? type : "image/png";

  const bitmap = await decodeFile(file);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d", { alpha: mime !== "image/jpeg" });
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    if (mime === "image/jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(bitmap, 0, 0);
    const blob = await canvasToBlob(canvas, mime, mime === "image/png" ? undefined : q);
    canvas.width = 0;
    canvas.height = 0;
    return blob;
  } finally {
    bitmap.close();
  }
}

function extForMime(mime: string): string {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function deepMimeForKind(kind: ImageKind): string {
  if (kind === "png") return "image/png";
  if (kind === "webp") return "image/webp";
  if (kind === "jpeg") return "image/jpeg";
  return "image/png";
}

function strippedName(file: File, mime: string): string {
  return `${stemName(file.name)}-stripped.${extForMime(mime)}`;
}

export function describeRemoval(before: MetaSummary, after: MetaSummary): string {
  if (isPrivacyClean(before) && !after.hasGps) return "Already clean / no EXIF detected";
  const bits: string[] = [];
  if (before.hasGps && !after.hasGps) bits.push("GPS");
  if (before.make && !after.make) bits.push("Make");
  if (before.model && !after.model) bits.push("camera");
  if (before.software && !after.software) bits.push("software");
  if (before.dateTime && !after.dateTime) bits.push("date");
  if (bits.length) return `Removed ${bits.join(" · ")} · ${before.tagCount} tags`;
  if (!after.hasGps) return `Metadata removed · ${before.tagCount} tags`;
  return "Stripped";
}

export async function stripFile(
  file: File,
  mode: StripMode,
  quality = 0.92,
): Promise<StripOutcome> {
  const kind = await assertSafeImage(file);
  const summaryBefore = await readMeta(file);
  const alreadyClean = isPrivacyClean(summaryBefore);

  const wantFast = mode === "fast" || (mode === "auto" && kind === "jpeg");
  let modeUsed: "fast" | "deep" = wantFast && kind === "jpeg" ? "fast" : "deep";
  let fallbackFromFast = false;
  let note: string | undefined;
  let blob: Blob;

  if (mode === "fast" && kind !== "jpeg") {
    modeUsed = "deep";
    note = "Fast scrub is JPEG-only — used Deep clean for this file.";
  }

  if (modeUsed === "fast") {
    try {
      blob = await stripJpegFast(file);
      const afterFast = await readMeta(blob);
      if (afterFast.hasGps) {
        blob = await stripDeep(file, quality, "image/jpeg");
        modeUsed = "deep";
        fallbackFromFast = true;
        note = "Fast scrub left GPS tags — fell back to Deep clean.";
      }
    } catch {
      blob = await stripDeep(file, quality, "image/jpeg");
      modeUsed = "deep";
      fallbackFromFast = true;
      note = "Fast scrub failed on this JPEG — used Deep clean.";
    }
  } else {
    blob = await stripDeep(file, quality, deepMimeForKind(kind));
  }

  const summaryAfter = await readMeta(blob);
  return {
    blob,
    filename: strippedName(file, blob.type || deepMimeForKind(kind)),
    modeUsed,
    fallbackFromFast,
    alreadyClean,
    summaryBefore,
    summaryAfter,
    originalSize: file.size,
    newSize: blob.size,
    note,
  };
}
