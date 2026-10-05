import { Container } from "@/components/ui/container";
import { LEGAL_DRAFT, type LegalSection } from "@/lib/legal/content";

/** Marcadores entre colchetes são pontos que dependem do cliente ou do jurídico — destacados pra ninguém publicar sem ver. */
function withPlaceholders(text: string) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return parts.map((part, i) =>
    /^\[.+\]$/.test(part) ? (
      <mark key={i} className="bg-magenta/10 px-1 font-medium text-magenta-dark">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export function LegalDocument({ title, intro, sections }: { title: string; intro?: string; sections: LegalSection[] }) {
  return (
    <section className="bg-ivory pt-28 pb-20 md:pt-36">
      <Container narrow>
        {LEGAL_DRAFT && (
          <p
            role="note"
            className="mb-8 border border-magenta/30 bg-magenta/5 px-4 py-3 text-sm text-ink"
          >
            Versão em revisão. Este texto ainda não foi validado pelo jurídico nem pelo cliente e não deve ser considerado final.
          </p>
        )}

        <p className="text-xs font-medium tracking-[0.25em] text-magenta-dark uppercase">Cays Turismo</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">{title}</h1>
        {intro && <p className="mt-6 text-base leading-relaxed text-stone">{withPlaceholders(intro)}</p>}

        <nav aria-label="Seções" className="mt-10 border-y border-ink/10 py-6">
          <ol className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            {sections.map((section, i) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-ink underline-offset-4 hover:underline">
                  {i + 1}. {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-12 flex flex-col gap-12">
          {sections.map((section, i) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-28">
              <h2 id={`${section.id}-title`} className="font-serif text-2xl text-ink">
                {i + 1}. {section.title}
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-base leading-relaxed text-stone">
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{withPlaceholders(p)}</p>
                ))}
                {section.list && (
                  <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 marker:text-magenta-dark">
                    {section.list.map((item, k) => (
                      <li key={k}>{withPlaceholders(item)}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
