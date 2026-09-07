import Image from "next/image";
import Link from "next/link";
import { industries } from "@/data/industries";
import { services } from "@/data/services";
import { legalLinks, navLinks, site } from "@/data/site";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-dark text-white">
      <Container className="py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="font-display text-3xl leading-tight md:text-4xl">
              One operator.
              <br />
              Every leg of the journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono-label text-[10px] text-white/70 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-mono-label mb-3 text-[10px] text-white/50">
                Head Office
              </p>
              {site.address.lines.map((line) => (
                <p key={line} className="text-sm text-white/85">
                  {line}
                </p>
              ))}
              <a
                href={site.address.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-white underline-offset-4 hover:underline"
              >
                Direction on Google
              </a>
            </div>
            <div>
              <p className="font-mono-label mb-3 text-[10px] text-white/50">
                Contact
              </p>
              <a
                href={`mailto:${site.email}`}
                className="block text-sm text-white/85 hover:text-white"
              >
                {site.email}
              </a>
              <a
                href={site.phoneHref}
                className="mt-2 block text-sm text-white/85 hover:text-white"
              >
                {site.phone}
              </a>
              <p className="mt-2 text-sm text-white/60">{site.hours}</p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-mono-label text-[10px] text-white/70 hover:text-white"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-2">
          <div>
            <p className="font-mono-label mb-4 text-[10px] text-white/50">
              Services
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {services.slice(0, 8).map((item) => (
                <Link
                  key={item.slug}
                  href="/services"
                  className="text-sm text-white/75 transition hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono-label mb-4 text-[10px] text-white/50">
              Industries
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {industries.slice(0, 8).map((item) => (
                <Link
                  key={item.slug}
                  href="/industries"
                  className="text-sm text-white/75 transition hover:text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 grid items-end gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto]">
          <div>
            <div className="relative mb-6 h-28 w-full max-w-md overflow-hidden md:h-36">
              <Image
                src={site.map}
                alt="United Carriers operating map"
                fill
                className="object-contain object-left opacity-90"
              />
            </div>
            <p className="font-mono-label text-[10px] text-white/45">
              Operating across Australia / New Zealand / Hong Kong / China
            </p>
          </div>
          <Image
            src={site.logo}
            alt={site.name}
            width={220}
            height={36}
            className="h-8 w-auto brightness-0 invert md:h-10"
          />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] text-white/45">
            © {new Date().getFullYear()} United Carriers APAC Pty Ltd.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono-label text-[9px] text-white/45 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
