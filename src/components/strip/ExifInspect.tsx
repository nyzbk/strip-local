import { useCallback, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ImagePlus, Loader2, MapPin, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAcceptedImage, looksLikeHeic, readMeta, type MetaSummary } from "@/lib/strip";
import { formatBytes } from "@/lib/utils";

const ACCEPT = "image/jpeg,image/png,image/webp,image/bmp,image/gif,.jpg,.jpeg,.png,.webp,.bmp,.gif";

type Row = { label: string; value: string };

function rowsFromMeta(meta: MetaSummary): Row[] {
  const rows: Row[] = [
    { label: "GPS present", value: meta.hasGps ? "Yes" : "No" },
  ];
  if (meta.latitude != null && Number.isFinite(meta.latitude)) {
    rows.push({ label: "Latitude", value: meta.latitude.toFixed(5) });
  }
  if (meta.longitude != null && Number.isFinite(meta.longitude)) {
    rows.push({ label: "Longitude", value: meta.longitude.toFixed(5) });
  }
  if (meta.make) rows.push({ label: "Make", value: meta.make });
  if (meta.model) rows.push({ label: "Model", value: meta.model });
  if (meta.dateTime) rows.push({ label: "DateTimeOriginal", value: meta.dateTime });
  if (meta.software) rows.push({ label: "Software", value: meta.software });
  if (meta.artist) rows.push({ label: "Artist", value: meta.artist });
  if (meta.copyright) rows.push({ label: "Copyright", value: meta.copyright });
  if (meta.orientation) rows.push({ label: "Orientation", value: meta.orientation });
  rows.push({ label: "Readable tags", value: String(meta.tagCount) });

  const seen = new Set(rows.map((r) => r.label.toLowerCase()));
  for (const [key, value] of Object.entries(meta.fields)) {
    const k = key.toLowerCase();
    if (seen.has(k) || seen.has(key)) continue;
    if (k === "gps" && meta.latitude != null) continue;
    seen.add(k);
    rows.push({ label: key, value });
  }
  return rows;
}

export function ExifInspect() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [meta, setMeta] = useState<MetaSummary | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const reset = useCallback(() => {
    setFile(null);
    setMeta(null);
    setError(null);
    setBusy(false);
    setPreview((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
  }, []);

  const inspect = useCallback(async (next: File) => {
    setError(null);
    setMeta(null);
    if (/\.(heic|heif)$/i.test(next.name) || next.type === "image/heic" || next.type === "image/heif") {
      setError("HEIC is not inspected here. Convert to JPEG first, then drop that file.");
      return;
    }
    const head = new Uint8Array(await next.slice(0, 64).arrayBuffer());
    if (looksLikeHeic(head)) {
      setError("This file looks like HEIC. Convert to JPEG first.");
      return;
    }
    if (!isAcceptedImage(next)) {
      setError("Only JPG, PNG, WebP, BMP, or GIF.");
      return;
    }
    setFile(next);
    setPreview((url) => {
      if (url) URL.revokeObjectURL(url);
      return URL.createObjectURL(next);
    });
    setBusy(true);
    try {
      const summary = await readMeta(next);
      setMeta(summary);
    } catch {
      setError("This tab could not read tags from that file.");
    } finally {
      setBusy(false);
    }
  }, []);

  const onFiles = (list: FileList | null) => {
    const first = list?.[0];
    if (first) void inspect(first);
  };

  const rows = meta ? rowsFromMeta(meta) : [];

  return (
    <section className="text-ink" aria-label="Inspect EXIF and GPS">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-copper">Inspect only · no strip</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Drop a still. This page calls <code className="text-ink">readMeta</code> and prints what the parser sees. It
        does not rewrite the file. To wipe tags, use{" "}
        <Link to="/" className="text-copper-deep underline">
          Remove these tags
        </Link>{" "}
        on the homepage.
      </p>

      <div
        className={`mt-4 rounded-2xl border border-dashed p-5 transition-colors ${
          dragOver ? "border-copper bg-paper" : "border-line bg-surface"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          onFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="sr-only"
          onChange={(e) => {
            onFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" onClick={() => inputRef.current?.click()}>
            {busy ? <Loader2 className="size-4 animate-spin" /> : <ImagePlus className="size-4" />}
            Choose a photo
          </Button>
          <p className="text-sm text-muted">JPG, PNG, WebP, BMP, GIF · stays in this tab</p>
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-copper-deep">{error}</p> : null}

      {file ? (
        <div className="mt-4 rounded-2xl border border-line bg-surface p-4">
          <div className="flex items-start gap-3">
            {preview ? (
              <img src={preview} alt="" className="h-16 w-16 shrink-0 rounded-xl bg-paper object-cover" />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-sm tabular-nums text-muted">{formatBytes(file.size)}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {busy ? (
                  <span className="inline-flex min-h-7 items-center rounded-full border border-line px-2.5 text-xs">
                    Reading tags…
                  </span>
                ) : null}
                {meta?.hasGps ? (
                  <span className="inline-flex min-h-7 items-center gap-1 rounded-full border border-copper bg-copper px-2.5 text-xs font-semibold text-paper">
                    <MapPin className="size-3" /> Has GPS
                  </span>
                ) : null}
                {meta && !meta.hasGps && !busy ? (
                  <span className="inline-flex min-h-7 items-center gap-1 rounded-full border border-success/30 px-2.5 text-xs font-semibold text-success">
                    <ShieldCheck className="size-3" /> No GPS this parser can see
                  </span>
                ) : null}
              </div>
            </div>
            <Button type="button" variant="ghost" size="sm" onClick={reset} aria-label="Clear file">
              <X className="size-4" />
            </Button>
          </div>

          {meta && rows.length > 0 ? (
            <table className="mt-4 w-full text-sm">
              <caption className="sr-only">EXIF and GPS tags this tab can read</caption>
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                  <th className="py-2 pr-3 font-semibold">Tag</th>
                  <th className="py-2 font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-line/70">
                    <th className="py-2 pr-3 align-top font-medium text-muted">{row.label}</th>
                    <td className="py-2 break-all font-medium tabular-nums">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}

          {meta && !busy ? (
            <p className="mt-4 text-sm text-muted">
              Inspection does not change bytes.{" "}
              <Link to="/" className="font-semibold text-copper-deep underline">
                Remove these tags
              </Link>{" "}
              on the homepage if you need a clean download.
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
