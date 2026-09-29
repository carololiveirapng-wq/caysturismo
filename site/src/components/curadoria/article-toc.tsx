interface TocItem {
  id: string;
  heading: string;
}

/** Índice sticky no desktop; recolhível (`<details>` nativo) no mobile. Não aparece se o artigo tiver só uma seção. */
export function ArticleToc({ sections }: { sections: TocItem[] }) {
  if (sections.length < 2) return null;

  return (
    <>
      <nav aria-label="Índice do artigo" className="hidden lg:sticky lg:top-28 lg:block">
        <p className="text-xs font-medium tracking-[0.15em] text-stone uppercase">Neste artigo</p>
        <ul className="mt-4 space-y-2.5 border-l border-ink/10">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="-ml-px block border-l border-transparent pl-4 text-sm text-stone transition-colors duration-300 hover:border-magenta hover:text-ink"
              >
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <details className="mb-8 border border-ink/10 p-4 lg:hidden">
        <summary className="cursor-pointer list-none text-xs font-medium tracking-[0.15em] text-stone uppercase marker:content-none">
          Neste artigo
        </summary>
        <ul className="mt-4 space-y-2.5">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-sm text-ink">
                {section.heading}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}
