import { Link } from "@tanstack/react-router";
import { FAQ, type FaqItem } from "@/content/faq";

export function FaqSection({
  all = false,
  items,
}: {
  all?: boolean;
  items?: readonly FaqItem[];
}) {
  const custom = Boolean(items && items.length > 0);
  const list = custom ? items! : all ? FAQ : FAQ.slice(0, 8);
  return (
    <section className="mx-auto max-w-3xl px-4 pb-4">
      <h2 className="font-display text-2xl">
        {custom ? "FAQ for this job" : all ? "Questions about stripping EXIF and GPS" : "FAQ"}
      </h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {list.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-medium">
              <span>{item.q}</span>
              <span className="text-muted transition-transform duration-150 group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
      {!all && !custom ? (
        <p className="mt-4 text-sm text-muted">
          <Link to="/faq" className="text-copper-deep underline">
            All {FAQ.length} questions
          </Link>
        </p>
      ) : null}
    </section>
  );
}
