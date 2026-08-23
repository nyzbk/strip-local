import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/about")({ component: About });

function About() {
  return (
    <AppShell>
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-display text-4xl">About Strip</h1>
        <p className="mt-6 text-pretty">
          Strip is a free, private EXIF and metadata remover. It exists because most “free” metadata tools upload your
          photos to a server — which is the opposite of a privacy job — or hide GPS behind a signup wall.
        </p>
        <p className="mt-4 text-pretty text-muted">
          It is made by Ultimatum, a brand-marketing studio. Other private tools in this family:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm">
          <li>
            <a className="text-copper-deep underline" href="https://crush-local.vercel.app">
              Crush
            </a>{" "}
            — compress JPG, PNG and WebP in the browser
          </li>
          <li>
            <a className="text-copper-deep underline" href="https://shift-local.vercel.app">
              Shift
            </a>{" "}
            — convert to WebP and AVIF in the browser
          </li>
          <li>
            <a className="text-copper-deep underline" href="https://heic-local.vercel.app">
              HEIC Local
            </a>{" "}
            — HEIC to JPG/PNG in the browser
          </li>
          <li>
            <a className="text-copper-deep underline" href="https://folio-pdf-toolkit.vercel.app">
              Folio PDF Toolkit
            </a>{" "}
            — merge, split, compress PDFs
          </li>
          <li>
            <a className="text-copper-deep underline" href="https://nota-invoice-mu.vercel.app">
              Nota
            </a>{" "}
            — free invoice PDF generator
          </li>
        </ul>
      </main>
    </AppShell>
  );
}
