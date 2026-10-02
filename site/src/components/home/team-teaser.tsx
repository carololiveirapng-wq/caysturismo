import Image from "next/image";
import { User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Person } from "@/types";

/**
 * Teaser de equipe na Home — ponte entre a história da marca e a prova
 * social (fica antes de Histórias de Viajantes/Depoimentos). Sem gente
 * real cadastrada, não existe estrutura de placeholder aqui como em
 * /sobre — a seção simplesmente não aparece, por pedido explícito de
 * nunca publicar um "em construção" na Home.
 */
export function TeamTeaser({ people }: { people: Person[] }) {
  if (people.length === 0) return null;
  const featured = people.slice(0, 4);

  return (
    <section className="bg-sand py-16 md:py-20">
      <Container>
        <Reveal className="max-w-md">
          <SectionLabel>Quem cuida da sua viagem</SectionLabel>
          <EditorialHeading as="h2" size="md" className="mt-4">
            Por trás de cada viagem, pessoas que conhecem você antes de conhecer o roteiro.
          </EditorialHeading>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-6 md:mt-12 sm:grid-cols-4">
          {featured.map((person, i) => (
            <Reveal key={person.id} delay={i * 0.06} className="text-center">
              <div className="relative mx-auto size-20 overflow-hidden rounded-full border border-ink/10 md:size-24">
                {person.photo ? (
                  <Image src={person.photo.src} alt={person.photo.alt} fill sizes="96px" className="object-cover" />
                ) : (
                  <span className="flex size-full items-center justify-center text-stone">
                    <User aria-hidden className="size-6" />
                  </span>
                )}
              </div>
              <p className="mt-3.5 text-sm font-medium text-ink">{person.name}</p>
              {person.role && <p className="mt-0.5 text-xs text-stone">{person.role}</p>}
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
