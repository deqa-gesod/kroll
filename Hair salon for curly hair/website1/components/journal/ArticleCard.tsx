"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/providers/LangProvider";
import { images } from "@/lib/content/images";
import { type JournalArticle, labelFor } from "@/lib/content/journal";
import { cn } from "@/lib/cn";

type Props = {
  article: JournalArticle;
  variant?: "default" | "featured";
};

export function ArticleCard({ article, variant = "default" }: Props) {
  const { t } = useLang();
  const img = images[article.image];
  const isFeatured = variant === "featured";

  return (
    <Link
      href={article.href}
      className={cn(
        "group flex flex-col",
        isFeatured && "md:col-span-2 md:flex-row md:gap-10"
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-cream-deep",
          isFeatured ? "aspect-[16/10] md:aspect-[5/4] md:w-3/5" : "aspect-[4/3]"
        )}
      >
        <Image
          src={`/images/${img.file}`}
          alt={img.alt}
          fill
          sizes={
            isFeatured
              ? "(max-width: 768px) 100vw, 60vw"
              : "(max-width: 1024px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          priority={isFeatured}
        />
      </div>
      <div
        className={cn(
          "flex flex-col",
          isFeatured ? "mt-6 md:mt-0 md:w-2/5 md:justify-center" : "mt-5"
        )}
      >
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
          {t(labelFor(article.category))}
        </p>
        <h2
          className={cn(
            "font-display tracking-tight leading-[1.05] text-ink mt-3 group-hover:text-terracotta-deep transition-colors",
            isFeatured ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
          )}
        >
          {t(article.title)}
        </h2>
        <p
          className={cn(
            "text-ink-soft leading-snug mt-4",
            isFeatured ? "text-base md:text-lg max-w-xl" : "text-[15px]"
          )}
        >
          {t(article.preview)}
        </p>
        <p className="mt-5 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
          {t(article.readTime)} · {article.date}
        </p>
      </div>
    </Link>
  );
}
