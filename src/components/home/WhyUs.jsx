import Container from "@/components/Container";
import { whyUs } from "@/data/insights";

export default function WhyUs() {
  return (
    <section className="bg-background py-16 md:py-24">
      <Container>
        <div className="mb-10 max-w-3xl md:mb-14">
          <p className="font-mono-label mb-3 text-[11px] text-brand">
            Why United Carriers
          </p>
          <h2 className="font-display text-3xl leading-tight tracking-tight text-ink-dark md:text-5xl">
            Logistics that works as hard as you do.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Built for businesses that need one accountable operator across
            freight, customs, warehousing, and domestic transport.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((item) => (
            <article
              key={item.title}
              className="border-t border-line pt-5"
            >
              <h3 className="font-display text-xl text-ink-dark">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
