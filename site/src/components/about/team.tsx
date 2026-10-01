import { User } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";
import type { Person } from "@/types";

/** Sem pessoas reais cadastradas ainda → placeholder honesto por cargo, nunca um perfil inventado passando por real. */
export function Team({ people, fallbackRoles }: { people: Person[]; fallbackRoles: string[] }) {
  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Quem cuida da sua viagem
          </EditorialHeading>
          {people.length === 0 && (
            <p className="mt-2.5 max-w-md text-sm text-stone">
              Perfis da equipe em construção — em breve, com nomes e rostos reais.
            </p>
          )}
        </Reveal>

        {people.length > 0 ? (
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
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {fallbackRoles.map((role) => (
              <div key={role} className="border border-ink/10 p-6 text-center">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-ink/15 text-stone">
                  <User aria-hidden className="size-6" />
                </span>
                <p className="mt-4 text-sm text-ink">{role}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
