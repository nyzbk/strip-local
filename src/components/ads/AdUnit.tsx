import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Slot = "after-success" | "mid" | "footer";

type Props = {
  slot: Slot;
  className?: string;
};

function slotIdFor(slot: Slot): string | undefined {
  if (slot === "after-success") return import.meta.env.VITE_ADSENSE_SLOT_AFTER_SUCCESS as string | undefined;
  if (slot === "mid") return import.meta.env.VITE_ADSENSE_SLOT_MID as string | undefined;
  return import.meta.env.VITE_ADSENSE_SLOT_FOOTER as string | undefined;
}

export function AdUnit({ slot, className }: Props) {
  const ref = useRef<HTMLModElement>(null);
  const live = String(import.meta.env.VITE_ADSENSE_LIVE || "false") === "true";
  const client = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;
  const slotId = slotIdFor(slot);

  useEffect(() => {
    if (!live || !client || !slotId) return;
    try {
      // @ts-expect-error adsbygoogle
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore push errors in strict mode double-mount
    }
  }, [live, client, slotId]);

  if (!live || !client || !slotId) {
    return (
      <aside
        data-ad-slot={slot}
        aria-label="Advertisement placeholder"
        className={cn(
          "flex min-h-16 items-center justify-center rounded-md border border-dashed border-line bg-surface/60 px-4 py-5 text-center",
          className,
        )}
      >
        <p className="text-xs tracking-wide text-muted uppercase">Ad Slot — {slot}</p>
      </aside>
    );
  }

  return (
    <aside data-ad-slot={slot} className={cn("min-h-[90px] w-full overflow-hidden", className)}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
