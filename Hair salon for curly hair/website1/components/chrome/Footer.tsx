"use client";

import Link from "next/link";
import { useLang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";
import { navItems, site } from "@/lib/content/site";

export function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 md:mt-40 bg-ink text-cream">
      <Container width="wide" className="py-20 md:py-28">
        {/* Big wordmark + sign-off */}
        <div className="border-b border-cream/15 pb-14 md:pb-20">
          <Link
            href="/"
            className="font-display block text-[clamp(56px,12vw,200px)] tracking-display leading-[0.85] text-cream hover:text-terracotta-soft transition-colors"
          >
            {site.name}.
          </Link>
          <p className="mt-6 max-w-xl font-display text-2xl md:text-3xl tracking-tight leading-tight text-cream/80">
            {t({
              en: "Every curl pattern. One place. Trained for your hair, not against it.",
              no: "Alle krøller. Ett sted. Stylister som er utdannet for håret ditt, ikke mot det.",
            })}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 pt-14">
          {/* Visit */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50 mb-4">
              {t({ en: "Visit", no: "Besøk" })}
            </h3>
            <p className="text-[14px] leading-relaxed text-cream/80">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {t({ en: "Norway", no: "Norge" })}
            </p>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50 mb-4">
              {t({ en: "Hours", no: "Åpningstider" })}
            </h3>
            <ul className="space-y-1 text-[14px] leading-relaxed text-cream/80">
              {site.hours.map((row) => (
                <li key={row.day.en} className="flex justify-between gap-3">
                  <span>{t(row.day)}</span>
                  <span className="font-mono text-[12px] text-cream/60">
                    {typeof row.time === "string" ? row.time : t(row.time)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50 mb-4">
              {t({ en: "Contact", no: "Kontakt" })}
            </h3>
            <ul className="space-y-2 text-[14px] leading-relaxed text-cream/80">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="hover:text-terracotta-soft transition-colors"
                >
                  {site.email}
                </a>
              </li>
              <li className="font-mono text-[13px] text-cream/70">{site.phone}</li>
              <li className="pt-2">
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-terracotta-soft transition-colors"
                >
                  {site.instagram.handle}
                </a>
              </li>
            </ul>
          </div>

          {/* Site map */}
          <div>
            <h3 className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/50 mb-4">
              {t({ en: "Pages", no: "Sider" })}
            </h3>
            <ul className="space-y-2 text-[14px] leading-relaxed text-cream/80">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-terracotta-soft transition-colors"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="hover:text-terracotta-soft transition-colors"
                >
                  {t({ en: "Book", no: "Book" })}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 pt-8 border-t border-cream/15 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[12px] font-mono tracking-wider text-cream/50">
          <span>
            © {year} {site.name}. {t({ en: "All rights reserved.", no: "Alle rettigheter forbeholdt." })}
          </span>
          <span lang={lang}>
            {t({
              en: "Curl-specialist hair salon. Grünerløkka, Oslo.",
              no: "Krøll-spesialisert frisørsalong. Grünerløkka, Oslo.",
            })}
          </span>
        </div>
      </Container>
    </footer>
  );
}
