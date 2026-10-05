import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { ImageReveal } from "@/components/ui/image-reveal";
import { getDestinationWeddingStories, type TravelerStoryCard } from "@/lib/cms/traveler-stories";

function StoryMeta({ story }: { story: TravelerStoryCard }) {
  const parts = [story.destinationName, story.travelYear?.toString()].filter(Boolean);
  if (parts.length === 0) return null;
  return <p className="text-xs tracking-[0.15em] text-stone uppercase">{parts.join(" · ")}</p>;
}

function StoryCard({ story, featured }: { story: TravelerStoryCard; featured: boolean }) {
  return (
    <article className={featured ? "grid items-center gap-8 md:grid-cols-[1.25fr_1fr] md:gap-14" : "flex flex-col gap-5"}>
      <ImageReveal
        src={story.image.src}
        alt={story.image.alt}
        fill
        sizes={featured ? "(min-width: 768px) 56vw, 92vw" : "(min-width: 768px) 46vw, 92vw"}
        containerClassName={featured ? "relative aspect-[4/5] md:aspect-[5/4] overflow-hidden" : "relative aspect-[4/5] overflow-hidden"}
      />
      <div className="flex flex-col gap-4">
        <StoryMeta story={story} />
        <h3 className={featured ? "font-serif text-3xl leading-tight text-ink md:text-4xl" : "font-serif text-2xl leading-tight text-ink"}>
          {story.title}
        </h3>
        {story.summary && <p className="text-base leading-relaxed text-stone">{story.summary}</p>}
        {story.highlightQuote && (
          <blockquote className="border-l border-magenta/40 pl-5 font-serif text-lg italic text-ink">
            {story.highlightQuote}
            {story.displayName && <cite className="mt-2 block font-sans text-sm not-italic text-stone">{story.displayName}</cite>}
          </blockquote>
        )}
      </div>
    </article>
  );
}

/**
 * Bloco de histórias reais de Destination Wedding. Só aparece com pelo menos
 * uma história autorizada e ativa no Sanity; sem nenhuma, não renderiza nada.
 */
export async function TravelerStories() {
  const stories = await getDestinationWeddingStories();
  if (!stories) return null;

  const featured = stories.length === 1;
  const grid = stories.length >= 3 ? "grid gap-12 md:grid-cols-2 lg:grid-cols-3" : "grid gap-12 md:grid-cols-2";

  return (
    <section className="bg-ivory py-16 md:py-24" aria-labelledby="historias-titulo">
      <Container>
        <div className="max-w-2xl">
          <EditorialHeading as="h2" size="md">
            <span id="historias-titulo">Histórias que a Cays acompanhou de perto</span>
          </EditorialHeading>
          <p className="mt-5 text-base leading-relaxed text-stone">
            Cada celebração começa de um jeito diferente. O papel da Cays é entender o casal, organizar os detalhes e transformar a viagem em uma experiência que faça sentido para todos.
          </p>
        </div>

        <div className={featured ? "mt-12" : `mt-12 ${grid}`}>
          {stories.map((story) => (
            <StoryCard key={story.slug} story={story} featured={featured} />
          ))}
        </div>
      </Container>
    </section>
  );
}
