"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import { cn } from "@/lib/cn";

type LocalizedString = { en: string; no: string };

type Props = {
  index: number;
  /** total step count for the "01 / 05" mono indicator */
  total: number;
  eyebrow: LocalizedString;
  title: LocalizedString;
  body: LocalizedString;
  /** small set of named-move tags, mono caps */
  moves?: LocalizedString[];
  /** image — optional; some steps are text-only */
  image?: {
    src: string;
    alt: string;
  };
  /** flip image to the left */
  reverse?: boolean;
};

export function MethodStep({
  index,
  total,
  eyebrow,
  title,
  body,
  moves,
  image,
  reverse = false,
}: Props) {
  const { t } = useLang();
  const num = String(index).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <section className="relative py-20 md:py-32 border-t border-line">
      <div className="grid grid-cols-12 gap-6 md:gap-10">
        {/* Big serif step number, runs into the gutter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 md:col-span-1 font-mono text-[11px] tracking-[0.22em] text-ink-muted"
        >
          {num} / {totalStr}
        </motion.div>

        {/* Image side */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "col-span-12 md:col-span-5 relative aspect-[4/5] overflow-hidden bg-cream-deep",
              reverse ? "md:order-2" : "md:order-3"
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          </motion.div>
        )}

        {/* Text side */}
        <div
          className={cn(
            "col-span-12",
            image ? "md:col-span-6" : "md:col-span-11",
            image && (reverse ? "md:order-3" : "md:order-2")
          )}
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep"
          >
            {t(eyebrow)}
          </motion.p>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(36px,5.4vw,76px)] tracking-display leading-[0.95] text-ink"
          >
            {t(title)}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="mt-6 max-w-prose text-[17px] md:text-[18px] leading-relaxed text-ink-soft"
          >
            {t(body)}
          </motion.p>

          {moves && moves.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {moves.map((m, i) => (
                <li
                  key={i}
                  className="px-3 py-1.5 border border-line text-[10.5px] font-mono tracking-[0.22em] uppercase text-ink-soft"
                >
                  {t(m)}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </div>
    </section>
  );
}
