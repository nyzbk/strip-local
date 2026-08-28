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

const LINKS = [
  { to: "/how-to", label: "How to" },
  { to: "/faq", label: "FAQ" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3">
        <Link to="/" className="flex min-h-11 items-center gap-2">
          <StripMark />
          <span className="font-display text-lg tracking-tight">Strip</span>
          <span className="hidden text-sm text-muted sm:inline">Free EXIF / Metadata Remover</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
