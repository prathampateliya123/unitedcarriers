import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { site } from "@/data/site";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-brand py-20 text-white md:py-28">
      <div className="absolute inset-0 opacity-25">
        <Image
          src={site.footerThumb}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-brand/85" />

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
            Ready to move smarter?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
            We are here to help you grow without hassle. No call centres. No
            runaround. Just experienced people ready to help.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="light">
              Work with us
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
