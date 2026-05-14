"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLang, type Lang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";
import { images, type ImageKey } from "@/lib/content/images";

type RetailItem = {
  key: ImageKey;
  brand: string;
  name: Record<Lang, string>;
  price: string;
  aspect?: "square" | "tall";
};

const items: RetailItem[] = [
  {
    key: "retailHero",
    brand: "The Edit",
    name: {
      en: "Curl essentials, curated",
      no: "Krøll-essensielt, kuratert",
    },
    price: "—",
    aspect: "tall",
  },
  {
    key: "retail1",
    brand: "Bread Beauty Supply",
    name: { en: "Hair-Wash leave-in", no: "Hair-Wash leave-in" },
    price: "295,—",
  },
  {
    key: "retail2",
    brand: "Annie",
    name: { en: "Twist sponge brush", no: "Twist-svamp børste" },
    price: "180,—",
  },
  {
    key: "retail3",
    brand: "Slip",
    name: { en: "Silk durag, deep teal", no: "Silke-durag, dyp teal" },
    price: "390,—",
  },
];

export function RetailTeaser() {
  const { t } = useLang();

  return (
    <section className="bg-cream-deep border-t border-line">
      <Container width="wide" className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-12">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {t({ en: "The shop", no: "Butikken" })}
            </span>
            <h2 className="mt-5 font-display text-[clamp(36px,5.5vw,68px)] tracking-display leading-[1.02] text-ink">
              {t({
                en: "Hard-to-find brands, finally in Oslo.",
                no: "Vanskelig-å-finne merker, endelig i Oslo.",
              })}
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-3">
            <p className="text-[15px] leading-relaxed text-ink-soft max-w-md">
              {t({
                en: "Bread, Pattern, Bouclème, Adwoa, Innersense, Mielle. The products you currently order from Amazon UK — stocked here, modest markup, no flight.",
                no: "Bread, Pattern, Bouclème, Adwoa, Innersense, Mielle. Produktene du i dag bestiller fra Amazon UK — på hylla her, beskjeden markup, ingen flyreise.",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {items.map((item, i) => {
            const img = images[item.key];
            const isTall = item.aspect === "tall";
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`group ${
                  isTall ? "row-span-2 col-span-2 md:col-span-1 md:row-span-1" : ""
                }`}
              >
                <Link
                  href="/shop"
                  className={`relative block w-full overflow-hidden bg-cream ${
                    isTall ? "aspect-[4/5] md:aspect-square" : "aspect-square"
                  }`}
                >
                  <Image
                    src={`/images/${img.file}`}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </Link>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted">
                      {item.brand}
                    </p>
                    <p className="mt-1 text-[13px] text-ink truncate">
                      {t(item.name)}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] tracking-tight text-ink whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-start">
          <Link
            href="/shop"
            className="inline-flex h-12 px-7 items-center border border-ink text-ink text-[14px] tracking-wide hover:bg-ink hover:text-cream transition-colors"
          >
            {t({ en: "Browse the shop", no: "Se hele butikken" })}
            <span className="ml-2" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
