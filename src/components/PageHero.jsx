import Button from "./Button";
import Container from "./Container";

export default function PageHero({
  eyebrow,
  title,
  description,
  ctaHref = "/contact",
  ctaLabel = "Work with us",
}) {
  return (
    <section className="border-b border-line bg-surface pt-28 md:pt-36">
      <Container className="pb-14 md:pb-20">
        {eyebrow ? (
          <p className="font-mono-label mb-4 text-[11px] text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display max-w-4xl text-4xl leading-[1.05] tracking-tight text-ink-dark md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {description}
          </p>
        ) : null}
        <div className="mt-8">
          <Button href={ctaHref}>{ctaLabel}</Button>
        </div>
      </Container>
    </section>
  );
}
