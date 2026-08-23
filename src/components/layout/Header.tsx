import { Link } from "@tanstack/react-router";

function StripMark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
      <rect width="32" height="32" rx="16" fill="currentColor" className="text-copper" />
      <rect x="8" y="8" width="16" height="16" rx="2.5" fill="none" stroke="#faf7f1" strokeWidth="2.2" />
      <path d="M8 8h7l-7 7V8z" fill="#faf7f1" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-center gap-2">
          <StripMark />
          <span className="font-display text-lg tracking-tight">Strip</span>
          <span className="hidden text-sm text-muted sm:inline">Free EXIF / Metadata Remover</span>
        </Link>
        <p className="max-w-[46%] text-right text-xs uppercase tracking-wider text-muted">
          No upload. No signup. No watermark.
        </p>
      </div>
    </header>
  );
}
