import { Link } from "@tanstack/react-router";
import { AdUnit } from "@/components/ads/AdUnit";
import { LEGAL_NAV, NAV } from "@/content/site";

export function Footer() {
  const links = [...NAV, ...LEGAL_NAV];
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <AdUnit slot="footer" className="mb-6" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <p className="text-sm text-muted">Strip · files stay on this device · no upload</p>
          <nav aria-label="Footer" className="flex max-w-xl flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            {links.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="inline-flex min-h-11 items-center hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
