"use client";

import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { articles } from "@/lib/content/journal";
import { ArticleCard } from "@/components/journal/ArticleCard";
import { JournalSubscribe } from "@/components/journal/JournalSubscribe";

export default function JournalPage() {
  const { t } = useLang();
  const featured = articles.find((a) => a.featured) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured.id);

  return (
    <>
      {/* Hero / opener */}
      <section className="bg-cream-deep">
        <Container width="wide" className="pt-16 md:pt-24 pb-14 md:pb-20">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-6">
            {t({ en: "Journal", no: "Magasin" })}
          </p>
          <h1 className="font-display text-[clamp(56px,11vw,180px)] tracking-display leading-[0.92] text-ink">
            {t({ en: "Journal.", no: "Magasin." })}
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-snug text-ink-soft">
            {t({
              en: "Notes from the chair. What we know about curls, the products we keep on the shelf, and the people who come through the door.",
              no: "Notater fra stolen. Det vi vet om krøller, produktene vi har på hylla, og menneskene som kommer inn.",
            })}
          </p>
        </Container>
      </section>

      {/* Featured article */}
      <section className="bg-cream">
        <Container width="wide" className="pt-12 md:pt-20 pb-10 md:pb-16">
          <ArticleCard article={featured} variant="featured" />
        </Container>
      </section>

      {/* Rest of the grid */}
      <section className="bg-cream">
        <Container width="wide" className="pb-24 md:pb-32">
          <div className="border-t border-line pt-10 md:pt-14">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-10 md:mb-14">
              {t({ en: "More notes", no: "Flere notater" })}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Subscribe */}
      <section className="bg-cream pb-16 md:pb-24">
        <Container width="wide">
          <JournalSubscribe />
        </Container>
      </section>
    </>
  );
}
