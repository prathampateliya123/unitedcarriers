import Link from "next/link";
import Container from "@/components/Container";
import { services } from "@/data/services";

export default function ServicesPreview() {
  const featured = services.slice(0, 6);

  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <div className="mb-10 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono-label mb-3 text-[11px] text-brand">
              Services
            </p>
            <h2 className="font-display max-w-2xl text-3xl leading-tight tracking-tight text-ink-dark md:text-5xl">
              Everything your freight needs.
            </h2>
          </div>
          <Link
            href="/services"
            className="font-mono-label text-[11px] text-foreground/70 transition hover:text-brand"
          >
            View all services →
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {featured.map((service, index) => (
            <Link
              key={service.slug}
              href="/services"
              className="group bg-surface p-6 transition hover:bg-brand-soft md:p-8"
            >
              <p className="font-mono-label mb-6 text-[10px] text-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-2xl text-ink-dark transition group-hover:text-brand">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
