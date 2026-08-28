import { SITE } from "@/content/site";

export function pageHead(title: string, description: string, path: string) {
  const canonical = `${SITE.origin}${path === "/" ? "" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
