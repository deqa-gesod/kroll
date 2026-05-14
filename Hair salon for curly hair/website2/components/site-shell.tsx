"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, ShoppingBag, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useCopy, useLanguage } from "@/components/language-provider";
import { navItems } from "@/lib/content";
import { useCart } from "@/lib/cart/useCart";
import { useCartUI } from "@/lib/cart/useCartUI";
import { CartDrawer } from "@/components/shop/CartDrawer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const copy = useCopy();
  const { locale, toggleLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const { open: openCartDrawer } = useCartUI();

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-clay selection:text-paper">
      <a
        href="#main"
        className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        {copy.common.skip}
      </a>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-paper/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="Jackson & Coil home">
            <span className="grid h-9 w-9 place-items-center bg-clay text-sm font-semibold text-paper">
              J&C
            </span>
            <span className="font-display text-xl font-semibold tracking-tight text-ink group-hover:text-clay">
              Jackson & Coil
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label={copy.common.primaryNav}>
            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="nav-link text-sm font-medium text-ink/72 hover:text-ink aria-[current=page]:text-clay"
              >
                {copy.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={toggleLocale}
              className="border border-ink/15 px-3 py-2 font-mono text-xs uppercase tracking-[0.18em] text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
              aria-label={copy.common.toggleLanguage}
            >
              {locale === "en" ? "NO" : "EN"}
            </button>
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label={
                locale === "no"
                  ? count > 0
                    ? `Åpne pose, ${count} varer`
                    : "Åpne pose"
                  : count > 0
                    ? `Open bag, ${count} items`
                    : "Open bag"
              }
              className="relative grid h-11 w-11 place-items-center border border-ink/15 text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-clay text-paper font-mono text-[10px] leading-[18px] text-center tracking-wide"
                >
                  {count}
                </span>
              )}
            </button>
            <Link href="/booking" className="btn btn-primary text-sm">
              {copy.common.bookNow}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label={
                locale === "no"
                  ? count > 0
                    ? `Åpne pose, ${count} varer`
                    : "Åpne pose"
                  : count > 0
                    ? `Open bag, ${count} items`
                    : "Open bag"
              }
              className="relative grid h-11 w-11 place-items-center border border-ink/15 text-ink"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-clay text-paper font-mono text-[10px] leading-[18px] text-center tracking-wide"
                >
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? copy.common.closeMenu : copy.common.openMenu}
              onClick={() => setOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center border border-ink/15 text-ink"
            >
              {open ? <X size={21} /> : <List size={21} />}
            </button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="border-t border-ink/10 bg-paper px-4 lg:hidden">
            <nav className="mx-auto grid max-w-[1440px] gap-1 py-4" aria-label={copy.common.mobileNav}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="border-b border-ink/10 py-3 font-display text-2xl tracking-tight text-ink aria-[current=page]:text-clay"
                >
                  {copy.nav[item.key]}
                </Link>
              ))}
            </nav>
            <div className="mx-auto flex max-w-[1440px] gap-2 pb-5">
              <button
                type="button"
                onClick={toggleLocale}
                className="flex-1 border border-ink/15 px-4 py-3 font-mono text-xs uppercase tracking-[0.18em]"
              >
                {locale === "en" ? "Norsk" : "English"}
              </button>
              <Link href="/booking" className="btn btn-primary flex-1 justify-center text-sm">
                {copy.common.bookNow}
              </Link>
            </div>
          </div>
        )}
      </header>

      <main id="main" className="pt-16">
        {children}
      </main>

      <Footer />
      <CartDrawer />
    </div>
  );
}

function Footer() {
  const copy = useCopy();

  return (
    <footer className="bg-ink text-paper">
      <section className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:py-24">
        <div>
          <p className="eyebrow text-paper/62">{copy.footer.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[0.92] tracking-[-0.055em] text-paper sm:text-7xl">
            {copy.footer.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-paper/72">{copy.footer.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/booking" className="btn bg-paper text-ink hover:bg-clay hover:text-paper">
              {copy.common.bookNow}
            </Link>
            <Link href="/visit" className="btn border border-paper/25 text-paper hover:border-paper hover:bg-paper hover:text-ink">
              {copy.footer.visit}
            </Link>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-paper/48">{copy.footer.navigate}</h3>
            <div className="mt-5 grid gap-3">
              {navItems.slice(1, 8).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-display text-3xl leading-none tracking-[-0.04em] text-paper/86 transition hover:text-clay"
                >
                  {copy.nav[item.key]}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-paper/48">{copy.footer.details}</h3>
            <div className="mt-5 space-y-5 text-sm leading-6 text-paper/72">
              <p>
                Markveien 58
                <br />
                Grünerløkka, Oslo
              </p>
              <p>
                Tue-Fri 10-20
                <br />
                Sat 10-17
              </p>
              <a href="tel:+4722550144" className="block text-paper hover:text-clay">
                +47 22 55 01 44
              </a>
              <a href="https://instagram.com" className="block text-paper hover:text-clay">
                Instagram only
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="border-t border-paper/10 px-4 py-6 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-paper/42 sm:px-6 lg:px-8">
        © 2026 Jackson & Coil. Prototype website2.
      </div>
    </footer>
  );
}
