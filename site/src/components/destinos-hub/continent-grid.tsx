import { ImageReveal } from "@/components/ui/image-reveal";
import { continents } from "@/data/destinations-hub";

export function ContinentGrid({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5">
      <h2 className="sr-only">Escolha um continente</h2>
      {continents.map((continent) => (
        <button
          key={continent.slug}
          type="button"
          onClick={() => onSelect(continent.slug)}
          className="group/card relative block text-left"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <ImageReveal
              src={continent.image.src}
              alt={continent.image.alt}
              fill
              sizes="(min-width: 768px) 30vw, 45vw"
              containerClassName="absolute inset-0"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h3 className="font-serif text-lg text-ivory md:text-xl">{continent.name}</h3>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
