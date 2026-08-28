import type { ReactNode } from "react";
import { AdUnit } from "@/components/ads/AdUnit";

export function Article({
  title,
  lede,
  updated,
  children,
}: {
  title: string;
  lede?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-4xl leading-tight">{title}</h1>
      {updated ? <p className="mt-2 text-sm text-muted">{updated}</p> : null}
      {lede ? <p className="mt-6 text-pretty text-lg leading-relaxed">{lede}</p> : null}
      <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted [&_a]:text-copper-deep [&_a]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal [&_strong]:text-ink">
        {children}
      </div>
      <AdUnit slot="mid" className="mt-10" />
    </main>
  );
}
