import Image from "next/image";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink-dark text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/6a4c6cb6a5d96145b3b34612_start-blur.avif"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-dark/40 via-ink-dark/55 to-ink-dark" />
        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[42vmin] w-[42vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-3xl animate-pulse-glow" />
        <div className="pointer-events-none absolute left-[58%] top-[48%] h-[28vmin] w-[28vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm/30 blur-3xl animate-pulse-glow" />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-28 md:pb-24 md:pt-36">
        <div className="max-w-3xl animate-rise">
          <p className="font-mono-label mb-4 text-[11px] text-white/70">
            Global freight forwarding & logistics
          </p>
          <h1 className="font-display text-5xl leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
            United
            <br />
            Carriers
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            {site.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="light">
              Work with us
            </Button>
            <Button href="/services" variant="outline" className="text-white">
              Explore services
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/15 pt-6 sm:grid-cols-3">
          {[
            "Real-time freight tracking",
            "Global network coverage",
            "24/7 operational support",
          ].map((item) => (
            <p
              key={item}
              className="font-mono-label text-[10px] text-white/65"
            >
              {item}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
