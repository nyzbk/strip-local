import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  variant?: "footer" | "after-success";
};

export function SoftAgencyCta({ className, variant = "footer" }: Props) {
  const url = (import.meta.env.VITE_AGENCY_URL as string | undefined) || "/about";
  const name = (import.meta.env.VITE_AGENCY_NAME as string | undefined) || "Ultimatum";

  if (variant === "after-success") {
    return (
      <p className={cn("mt-4 text-sm text-muted", className)}>
        Need a custom site or brand system?{" "}
        <a href={url} className="font-medium text-ink underline-offset-2 hover:underline" rel="noopener noreferrer">
          See {name}
        </a>
        .
      </p>
    );
  }

  return (
    <section className={cn("mx-auto max-w-3xl px-4 pb-10", className)}>
      <p className="max-w-xl text-sm leading-relaxed text-ink">
        Built by {name} — we create $10k websites & brand systems.{" "}
        <a href={url} className="font-medium underline-offset-2 hover:underline" rel="noopener noreferrer">
          Portfolio
        </a>
      </p>
    </section>
  );
}
