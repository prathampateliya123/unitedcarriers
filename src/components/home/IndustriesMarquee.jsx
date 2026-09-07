import Link from "next/link";
import { industries } from "@/data/industries";

export default function IndustriesMarquee() {
  const loop = [...industries, ...industries];

  return (
    <section className="overflow-hidden border-y border-line bg-surface py-10">
      <div className="mb-6 px-5 md:px-8">
        <p className="font-mono-label text-[11px] text-brand">Industries</p>
      </div>
      <div className="flex w-max animate-marquee gap-10 pr-10">
        {loop.map((item, index) => (
          <Link
            key={`${item.slug}-${index}`}
            href="/industries"
            className="font-display whitespace-nowrap text-3xl text-ink-dark transition hover:text-brand md:text-5xl"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
