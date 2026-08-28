export const SITE = {
  name: "Strip",
  origin: "https://strip-local.vercel.app",
  email: "ultaultimatum@gmail.com",
  publisher: "Ultimatum",
} as const;

export const NAV = [
  { to: "/", label: "Tool" },
  { to: "/how-to", label: "How to" },
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
