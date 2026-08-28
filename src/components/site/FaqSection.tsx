import { Link } from "@tanstack/react-router";
import { FAQ } from "@/content/faq";

export function FaqSection({ all = false }: { all?: boolean }) {
  const items = all ? FAQ : FAQ.slice(0, 8);
  return (
    <section className="mx-auto max-w-3xl px-4 pb-4">
      <h2 className="font-display text-2xl">{all ? "Questions about stripping EXIF and GPS" : "FAQ"}</h2>
      <div className="mt-6 divide-y divide-line border-y border-line">
        {items.map((item) => (
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
      {!all ? (
        <p className="mt-4 text-sm text-muted">
          <Link to="/faq" className="text-copper-deep underline">
            All {FAQ.length} questions
          </Link>
        </p>
      ) : null}
    </section>
  );
}
