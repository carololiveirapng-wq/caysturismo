import { User } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Person } from "@/types";

/**
 * Sem pessoas reais cadastradas ainda → a seção inteira não renderiza.
 * Nunca um placeholder tipo "em construção" nem cargos genéricos no lugar
 * de gente real — mesmo princípio já usado em `home/team-teaser.tsx`.
 */
export function Team({ people }: { people: Person[] }) {
  if (people.length === 0) return null;

  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Quem cuida da sua viagem
          </EditorialHeading>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {people.map((person) => (
            <div key={person.id} className="text-center">
              <div className="relative mx-auto size-24 overflow-hidden rounded-full border border-ink/10">
                {person.photo ? (
                  <Image
                    src={person.photo.src}
                    alt={person.photo.alt}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center text-stone">
                    <User aria-hidden className="size-6" />
                  </span>
                )}
              </div>
              <p className="mt-4 text-sm font-medium text-ink">{person.name}</p>
              {person.role && <p className="mt-0.5 text-xs text-stone">{person.role}</p>}
              {person.specialties && person.specialties.length > 0 && (
                <p className="mt-1 text-xs text-stone">{person.specialties.join(" · ")}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
