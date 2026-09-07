import Link from "next/link";
import Container from "@/components/Container";
import { insights } from "@/data/insights";

export default function InsightsPreview() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-4 md:mb-14">
          <div>
            <p className="font-mono-label mb-3 text-[11px] text-brand">
              Insights
            </p>
            <h2 className="font-display text-3xl tracking-tight text-ink-dark md:text-5xl">
              News & updates
            </h2>
          </div>
          <Link
            href="/insights"
            className="font-mono-label text-[11px] text-foreground/70 hover:text-brand"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {insights.map((item) => (
            <article
              key={item.slug}
              className="flex flex-col border border-line bg-background p-6"
            >
              <p className="font-mono-label text-[10px] text-muted">
                {item.category} · {item.date}
              </p>
              <h3 className="font-display mt-4 text-xl leading-snug text-ink-dark">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {item.excerpt}
              </p>
              <Link
                href="/insights"
                className="font-mono-label mt-6 text-[10px] text-brand"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
