import { Link } from "@tanstack/react-router";

const STEPS = [
  {
    title: "Choose photos on this device",
    body: "Use Choose files or drop JPEGs, PNGs, or WebP onto the tray. Nothing is posted to a server. HEIC from iPhone is rejected with a pointer to convert first — Strip is a metadata tool, not a HEIC decoder.",
  },
  {
    title: "Inspect what would leak",
    body: "The inspector reads GPS, camera make/model, capture time, and software tags in this tab. Coordinates are never sent to a map API. If you see a GPS badge, the original file would tell a downloader where it was shot.",
  },
  {
    title: "Pick Auto, Fast, or Deep, then Strip",
    body: "Auto uses Fast on typical JPEGs (pixels untouched) and Deep on PNG/WebP (Canvas rewrite). Fast fails on odd JPEGs → switch to Deep. Quality applies only to lossy Deep exports.",
  },
  {
    title: "Download a clean file or a ZIP",
    body: "Each cleaned image stays in memory until you save it. Batch ZIP is built here with JSZip. Re-drop the download into Strip to confirm GPS fields are gone. No watermark and no account.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h2 className="font-display text-2xl">How it works</h2>
      <p className="mt-3 max-w-2xl text-pretty text-sm text-muted">
        Four steps, all on-device. For a longer walkthrough with failure cases, see the{" "}
        <Link to="/how-to" className="text-copper-deep underline">
          how-to guide
        </Link>
        .
      </p>
      <ol className="mt-6 space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-sm font-semibold">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="font-medium">{step.title}</p>
              <p className="mt-1 text-sm text-pretty text-muted">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
