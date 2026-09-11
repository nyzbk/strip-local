export const SITE = {
  name: "Strip",
  origin: "https://strip-local.vercel.app",
  email: "ultaultimatum@gmail.com",
  publisher: "Ultimatum",
  hub: "https://ultimatum-hub.vercel.app/",
  lastmod: "2026-09-11",
} as const;

export function absUrl(path: string): string {
  if (!path || path === "/") return `${SITE.origin}/`;
  return `${SITE.origin}${path.startsWith("/") ? path : `/${path}`}`;
}

export const NAV = [
  { to: "/", label: "Tool" },
  { to: "/how-to", label: "How to" },
  { to: "/iphone", label: "iPhone" },
  { to: "/whatsapp", label: "WhatsApp" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/faq", label: "FAQ" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/exif-gps", label: "What GPS leaks" },
  { to: "/why-local", label: "Why local" },
  { to: "/contact", label: "Contact" },
] as const;

export const LEGAL_NAV = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/about", label: "About" },
] as const;
