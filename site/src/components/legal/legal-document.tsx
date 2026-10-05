import { LAST_UPDATED, type LegalSection } from "@/lib/legal/content";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function LegalDocument({ title, intro, sections }: { title: string; intro?: string; sections: LegalSection[] }) {
  return (
    <section className="bg-ivory pt-28 pb-20 md:pt-36">
      <div className="mx-auto w-full max-w-[42rem] px-6">
        <p className="text-xs font-medium tracking-[0.25em] text-magenta-dark uppercase">Cays Turismo</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-stone">Última atualização: {formatDate(LAST_UPDATED)}</p>
        {intro && <p className="mt-8 text-base leading-relaxed text-stone">{intro}</p>}

        <nav aria-label="Seções desta página" className="mt-10 border-y border-ink/10 py-6">
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
                {section.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {section.list && (
                  <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 marker:text-magenta-dark">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
