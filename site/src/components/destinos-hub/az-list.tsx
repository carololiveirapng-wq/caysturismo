import Link from "next/link";
import Image from "next/image";
import { azDestinations, continents, type AZDestination } from "@/data/destinations-hub";
import { destinationHref } from "@/lib/links";

export function AZList({
  filterContinent,
  onClearFilter,
}: {
  filterContinent: string | null;
  onClearFilter: () => void;
}) {
  const items = filterContinent
    ? azDestinations.filter((d) => d.continentSlug === filterContinent)
    : azDestinations;

  const grouped = items.reduce<Record<string, AZDestination[]>>((acc, item) => {
    const letter = item.name[0]?.toUpperCase() ?? "#";
    (acc[letter] ??= []).push(item);
    return acc;
  }, {});
  const letters = Object.keys(grouped).sort();
  const continentName = continents.find((c) => c.slug === filterContinent)?.name;

  return (
    <div>
      {filterContinent && (
        <button
          type="button"
          onClick={onClearFilter}
          className="mb-7 inline-flex items-center gap-2 border border-ink/15 px-3 py-1.5 text-xs font-medium tracking-wide text-ink uppercase transition-colors hover:border-ink/30"
        >
          {continentName}
          <span aria-hidden>×</span>
        </button>
      )}

      {letters.length === 0 ? (
        <p className="text-sm text-stone">Nenhum destino nessa região ainda.</p>
      ) : (
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {letters.map((letter) => (
            <div key={letter}>
              <p className="font-serif text-2xl text-magenta">{letter}</p>
              <ul className="mt-2 divide-y divide-ink/10 border-t border-ink/10">
                {grouped[letter].map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={destinationHref(d.slug)}
                      className="flex items-center gap-3 py-2.5 text-sm text-ink transition-colors duration-300 hover:text-magenta"
                    >
                      <span className="relative size-8 shrink-0 overflow-hidden rounded-full">
                        <Image src={d.image.src} alt="" fill sizes="32px" className="object-cover" />
                      </span>
                      {d.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
