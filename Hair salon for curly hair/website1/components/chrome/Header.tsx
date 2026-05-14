"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { navItems, site } from "@/lib/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { useCart } from "@/lib/cart/useCart";
import { useCartUI } from "@/lib/cart/useCartUI";
import { CartDrawer } from "@/components/shop/CartDrawer";

export function Header() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();
  const { open: openCartDrawer } = useCartUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-cream/90 backdrop-blur border-b border-line"
          : "bg-transparent"
      )}
    >
      <Container width="wide" className="flex items-center justify-between h-16 md:h-20">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="Jackson & Coil — home"
          className="font-display text-[22px] md:text-[26px] tracking-display leading-none text-ink hover:text-terracotta-deep transition-colors"
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-wide text-ink-soft hover:text-ink transition-colors"
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <div className="hidden md:flex items-center text-[12px] tracking-wider font-mono">
            <button
              onClick={() => setLang("en")}
              className={cn(
                "px-1.5 py-0.5 transition-colors",
                lang === "en" ? "text-ink" : "text-ink-muted hover:text-ink"
              )}
              aria-label="Switch to English"
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <span className="text-line">/</span>
            <button
              onClick={() => setLang("no")}
              className={cn(
                "px-1.5 py-0.5 transition-colors",
                lang === "no" ? "text-ink" : "text-ink-muted hover:text-ink"
              )}
              aria-label="Bytt til norsk"
              aria-pressed={lang === "no"}
            >
              NO
            </button>
          </div>

          {/* Cart bobble */}
          <button
            type="button"
            onClick={openCartDrawer}
            aria-label={t({
              en: count > 0 ? `Open bag, ${count} items` : "Open bag",
              no: count > 0 ? `Åpne pose, ${count} varer` : "Åpne pose",
            })}
            className="relative inline-flex h-10 w-10 items-center justify-center text-ink hover:text-terracotta-deep transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 7h12l-1.2 11.3a2 2 0 0 1-2 1.7H9.2a2 2 0 0 1-2-1.7L6 7Z" />
              <path d="M9 7V5a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-terracotta text-cream font-mono text-[10px] leading-[18px] text-center tracking-wide"
              >
                {count}
              </span>
            )}
          </button>

          {/* Book CTA */}
          <Link
            href="/booking"
            className="hidden sm:inline-flex h-10 px-5 items-center bg-ink text-cream text-[13px] tracking-wide hover:bg-terracotta transition-colors"
          >
            {t({ en: "Book", no: "Book" })}
          </Link>

          {/* Mobile menu */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((s) => !s)}
            className="lg:hidden inline-flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
          >
            <span
              className={cn(
                "block h-px w-5 bg-ink transition-transform",
                mobileOpen && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-px w-5 bg-ink transition-transform",
                mobileOpen && "-translate-y-[3px] -rotate-45"
              )}
            />
          </button>
        </div>
      </Container>

      {/* Mobile drawer */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-cream border-b border-line",
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <Container className="py-8">
          <nav className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-3xl tracking-display text-ink hover:text-terracotta-deep transition-colors"
              >
                {t(item.label)}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex h-12 px-6 items-center justify-center bg-ink text-cream text-sm tracking-wide self-start"
            >
              {t({ en: "Book", no: "Book" })}
            </Link>
            <div className="mt-2 flex items-center gap-2 text-[12px] font-mono tracking-wider text-ink-muted">
              <button
                onClick={() => setLang("en")}
                className={cn("px-1.5 py-0.5", lang === "en" && "text-ink")}
              >
                EN
              </button>
              <span className="text-line">/</span>
              <button
                onClick={() => setLang("no")}
                className={cn("px-1.5 py-0.5", lang === "no" && "text-ink")}
              >
                NO
              </button>
            </div>
          </nav>
        </Container>
      </div>

      <CartDrawer />
    </header>
  );
}
