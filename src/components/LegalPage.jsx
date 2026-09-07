import Container from "@/components/Container";
import PageHero from "@/components/PageHero";

export default function LegalPage({ title, children }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        description="United Carriers APAC Pty Ltd policy information."
        ctaHref="/contact"
        ctaLabel="Contact us"
      />
      <section className="bg-surface py-14 md:py-20">
        <Container>
          <div className="prose-uc max-w-3xl space-y-4 text-sm leading-relaxed text-muted md:text-base">
            {children}
          </div>
        </Container>
      </section>
    </>
  );
}
