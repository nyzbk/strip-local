import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { Camera, ChevronDown, Download, Eraser, ImagePlus, Loader2, MapPin, ShieldCheck, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdUnit } from "@/components/ads/AdUnit";
import {
  HEIC_LOCAL_URL,
  WARN_FILE_BYTES,
  describeRemoval,
  isAcceptedImage,
  looksLikeHeic,
  readMeta,
  stripFile,
  type MetaSummary,
  type StripMode,
  type StripOutcome,
} from "@/lib/strip";
import { zipBlobs } from "@/lib/zip";
import { downloadBlob, formatBytes } from "@/lib/utils";

type Stage = "idle" | "ready" | "working" | "done";

type Item = {
  id: string;
  file: File;
  preview: string;
  meta?: MetaSummary;
  inspecting: boolean;
  error?: string;
  result?: StripOutcome & { url: string };
  progress: number;
  expanded: boolean;
};

const ACCEPT = "image/jpeg,image/png,image/webp,image/bmp,image/gif,.jpg,.jpeg,.png,.webp,.bmp,.gif";

const MODES: { value: StripMode; label: string; hint: string }[] = [
  { value: "auto", label: "Auto", hint: "JPEG → Fast · PNG/WebP → Deep" },
  { value: "fast", label: "Fast", hint: "JPEG only · pixels untouched" },
  { value: "deep", label: "Deep", hint: "Re-encode · strips the container" },
];

function cameraLabel(meta?: MetaSummary): string | undefined {
  if (!meta) return undefined;
  const parts = [meta.make, meta.model].filter(Boolean);
  return parts.length ? parts.join(" ") : undefined;
}

function Badge({
  tone,
  children,
}: {
  tone: "gps" | "camera" | "clean" | "error" | "muted";
  children: ReactNode;
}) {
  const cls =
    tone === "gps"
      ? "border-copper bg-copper text-paper"
      : tone === "camera"
        ? "border-line bg-paper text-ink"
        : tone === "clean"
          ? "border-success/30 bg-paper text-success"
          : tone === "error"
            ? "border-warn/40 bg-paper text-warn"
            : "border-line bg-surface text-muted";
  return (
    <span className={`inline-flex min-h-7 items-center gap-1 rounded-full border px-2.5 text-xs font-semibold ${cls}`}>
      {children}
    </span>
  );
}

export function StripperApp() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [stage, setStage] = useState<Stage>("idle");
  const [mode, setMode] = useState<StripMode>("auto");
  const [quality, setQuality] = useState(0.92);
  const [dragOver, setDragOver] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const inspectFile = useCallback(async (id: string, file: File) => {
    try {
      const meta = await readMeta(file);
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, meta, inspecting: false } : item)));
    } catch {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, inspecting: false, meta: undefined } : item)),
      );
    }
  }, []);

  const addFiles = useCallback(
    (list: FileList | File[]) => {
      const next: Item[] = [];
      const warnings: string[] = [];
      Array.from(list).forEach((file) => {
        void file.slice(0, 64).arrayBuffer().then((buf) => {
          const head = new Uint8Array(buf);
          if (looksLikeHeic(head) || /\.(heic|heif)$/i.test(file.name)) {
            setBanner((prev) => {
              const msg = `${file.name}: convert in HEIC Local first, then Strip.`;
              return prev ? `${prev} ${msg}` : msg;
            });
          }
        });
        if (/\.(heic|heif)$/i.test(file.name) || file.type === "image/heic" || file.type === "image/heif") {
          warnings.push(`${file.name} is HEIC — convert in HEIC Local first.`);
          return;
        }
        if (!isAcceptedImage(file)) {
          warnings.push(`${file.name} is not a supported image.`);
          return;
        }
        if (file.size > WARN_FILE_BYTES) {
          warnings.push(`${file.name} is large (${formatBytes(file.size)}). Stripping may be slow on this device.`);
        }
        next.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
          file,
          preview: URL.createObjectURL(file),
          inspecting: true,
          progress: 0,
          expanded: false,
        });
      });
      if (warnings.length) setBanner(warnings.join(" "));
      else setBanner(null);
      setItems((prev) => {
        const merged = [...prev, ...next];
        setStage(merged.length ? "ready" : "idle");
        return merged;
      });
      next.forEach((item) => void inspectFile(item.id, item.file));
    },
    [inspectFile],
  );

  function remove(id: string) {
    setItems((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) {
        URL.revokeObjectURL(item.preview);
        if (item.result) URL.revokeObjectURL(item.result.url);
      }
      const rest = prev.filter((p) => p.id !== id);
      if (!rest.length) setStage("idle");
      return rest;
    });
  }

  function clearAll() {
    items.forEach((item) => {
      URL.revokeObjectURL(item.preview);
      if (item.result) URL.revokeObjectURL(item.result.url);
    });
    setItems([]);
    setStage("idle");
    setBanner(null);
  }

  function toggleExpand(id: string) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, expanded: !item.expanded } : item)));
  }

  async function runStrip() {
    if (!items.length) {
      setBanner("Choose at least one image to strip.");
      return;
    }
    setStage("working");
    const next = [...items];
    for (let i = 0; i < next.length; i++) {
      const item = next[i];
      if (!item) continue;
      next[i] = { ...item, progress: 12, error: undefined };
      setItems([...next]);
      try {
        const outcome = await stripFile(item.file, mode, quality);
        if (item.result) URL.revokeObjectURL(item.result.url);
        next[i] = {
          ...item,
          progress: 100,
          error: undefined,
          result: { ...outcome, url: URL.createObjectURL(outcome.blob) },
        };
      } catch (err) {
        next[i] = {
          ...item,
          progress: 0,
          error: err instanceof Error ? err.message : "Could not strip this image.",
        };
      }
      setItems([...next]);
    }
    setStage("done");
  }

  async function downloadZip() {
    const files = items
      .filter((item) => item.result)
      .map((item) => ({ name: item.result!.filename, blob: item.result!.blob }));
    if (!files.length) return;
    const blob = await zipBlobs(files);
    await downloadBlob(blob, `strip-${files.length}-images.zip`);
  }

  const totals = useMemo(() => {
    const done = items.filter((i) => i.result);
    const gpsGone = done.filter((i) => i.result!.summaryBefore.hasGps && !i.result!.summaryAfter.hasGps).length;
    return { count: done.length, gpsGone, errors: items.filter((i) => i.error).length };
  }, [items]);

  const overall = items.length ? Math.round(items.reduce((s, i) => s + i.progress, 0) / items.length) : 0;
  const showQuality = mode !== "fast";

  return (
    <div>
      <section
        className={`rounded-2xl border border-dashed bg-surface p-6 text-center transition-colors duration-150 sm:p-10 ${
          dragOver ? "border-copper bg-paper" : "border-line"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
        }}
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-paper text-copper">
          <ImagePlus className="size-6" />
        </div>
        <h2 className="mt-4 font-display text-xl">Drop photos here</h2>
        <p className="mt-1 text-sm text-muted">JPG, PNG, WebP, BMP, GIF — they never leave this tab.</p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button type="button" variant="copper" onClick={() => inputRef.current?.click()}>
            Choose files
          </Button>
          {items.length > 0 && (
            <Button type="button" variant="outline" onClick={clearAll}>
              Clear all
            </Button>
          )}
        </div>
        <p className="mt-3 text-xs text-muted">
          HEIC? Convert in{" "}
          <a className="font-medium text-copper-deep underline-offset-2 hover:underline" href={HEIC_LOCAL_URL}>
            HEIC Local
          </a>{" "}
          first.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-surface p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">Strip mode</h3>
        <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Strip mode">
          {MODES.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={mode === opt.value}
              onClick={() => setMode(opt.value)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors duration-150 ${
                mode === opt.value ? "bg-ink text-paper" : "border border-line bg-paper text-ink"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-muted">{MODES.find((m) => m.value === mode)?.hint}</p>
        {showQuality && (
          <div className="mt-4">
            <label htmlFor="quality" className="flex justify-between text-sm font-medium">
              Deep clean quality <span className="tabular-nums text-muted">{Math.round(quality * 100)}%</span>
            </label>
            <input
              id="quality"
              type="range"
              min={0.7}
              max={1}
              step={0.01}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="mt-1 w-full accent-copper"
            />
            <p className="mt-1 text-xs text-muted">
              Applies when a file is re-encoded (PNG/WebP, or JPEG Deep). Fast JPEG ignores this.
            </p>
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={() => void runStrip()}
            disabled={!items.length || stage === "working"}
            aria-busy={stage === "working"}
          >
            {stage === "working" ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Stripping…
              </>
            ) : (
              <>
                <Eraser className="size-4" /> Strip{items.length ? ` ${items.length}` : ""}
              </>
            )}
          </Button>
          {stage === "working" && <span className="text-sm tabular-nums text-muted">{overall}%</span>}
        </div>
        {banner && <p className="mt-3 text-sm text-copper-deep">{banner}</p>}
      </section>

      {items.length > 0 && (
        <ul className="mt-6 space-y-3">
          {items.map((item) => {
            const meta = item.result?.summaryBefore ?? item.meta;
            const after = item.result?.summaryAfter;
            const cam = cameraLabel(meta);
            return (
              <li key={item.id} className="rounded-2xl border border-line bg-surface p-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                  <img
                    src={item.result?.url ?? item.preview}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-xl bg-paper object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.file.name}</p>
                    <p className="text-sm tabular-nums text-muted">
                      {formatBytes(item.file.size)}
                      {item.result ? ` → ${formatBytes(item.result.newSize)}` : ""}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.inspecting && <Badge tone="muted">Reading metadata…</Badge>}
                      {item.error && <Badge tone="error">Error</Badge>}
                      {!item.inspecting && !item.error && !item.result && meta?.hasGps && (
                        <Badge tone="gps">
                          <MapPin className="size-3" /> Has GPS
                        </Badge>
                      )}
                      {!item.inspecting && !item.error && !item.result && cam && (
                        <Badge tone="camera">
                          <Camera className="size-3" /> {cam}
                        </Badge>
                      )}
                      {!item.inspecting && !item.error && !item.result && meta && !meta.hasGps && !cam && (
                        <Badge tone="clean">
                          <ShieldCheck className="size-3" /> Clean
                        </Badge>
                      )}
                      {item.result && (
                        <Badge tone="clean">
                          <ShieldCheck className="size-3" /> {describeRemoval(item.result.summaryBefore, after!)}
                        </Badge>
                      )}
                      {item.result?.fallbackFromFast && <Badge tone="muted">Deep fallback</Badge>}
                    </div>
                    {item.error && <p className="mt-2 text-sm text-copper-deep">{item.error}</p>}
                    {item.result?.note && <p className="mt-2 text-xs text-muted">{item.result.note}</p>}
                    {stage === "working" && (
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full bg-copper transition-[width] duration-200"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    )}
                    {meta && Object.keys(meta.fields).length > 0 && (
                      <button
                        type="button"
                        className="mt-2 inline-flex min-h-11 items-center gap-1 text-xs font-medium text-muted hover:text-ink"
                        onClick={() => toggleExpand(item.id)}
                        aria-expanded={item.expanded}
                      >
                        <ChevronDown className={`size-4 transition-transform duration-150 ${item.expanded ? "rotate-180" : ""}`} />
                        {item.expanded ? "Hide fields" : "Show what leaks"}
                      </button>
                    )}
                    {item.expanded && meta && (
                      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-xl bg-paper px-3 py-2 text-xs">
                        {Object.entries(meta.fields).map(([key, value]) => (
                          <div key={key} className="contents">
                            <dt className="text-muted">{key}</dt>
                            <dd className="truncate font-medium tabular-nums">{value}</dd>
                          </div>
                        ))}
                        <div className="contents">
                          <dt className="text-muted">Tags</dt>
                          <dd className="tabular-nums">{meta.tagCount}</dd>
                        </div>
                      </dl>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {item.result && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => void downloadBlob(item.result!.blob, item.result!.filename)}
                      >
                        <Download className="size-4" /> Download
                      </Button>
                    )}
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(item.id)} aria-label="Remove">
                      <X className="size-4" />
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {stage === "done" && totals.count > 0 && (
        <section className="mt-6 rounded-2xl border border-line bg-paper p-5">
          <p className="font-display text-xl">
            Stripped {totals.count} {totals.count === 1 ? "file" : "files"}
            {totals.gpsGone ? ` · GPS removed on ${totals.gpsGone}` : ""}
          </p>
          <p className="mt-1 text-sm text-muted">
            Common EXIF, GPS, IPTC and XMP this browser can read. Not a forensic wipe.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {totals.count >= 2 && (
              <Button type="button" variant="copper" onClick={() => void downloadZip()}>
                <Download className="size-4" /> Download ZIP
              </Button>
            )}
            <Button type="button" variant="outline" onClick={clearAll}>
              <Trash2 className="size-4" /> Start over
            </Button>
          </div>
          <AdUnit slot="after-success" className="mt-5" />
        </section>
      )}

      {stage === "done" && <AdUnit slot="mid" className="mt-6" />}
    </div>
  );
}
