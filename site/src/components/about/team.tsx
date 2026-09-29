import { User } from "lucide-react";
import { Container } from "@/components/ui/container";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { Reveal } from "@/components/ui/reveal";

/** Sem fotos/nomes reais ainda — placeholder honesto, nunca um perfil inventado passando por real. */
export function Team({ roles }: { roles: string[] }) {
  return (
    <section className="bg-sand py-14 md:py-20">
      <Container>
        <Reveal>
          <EditorialHeading as="h2" size="md">
            Quem cuida da sua viagem
          </EditorialHeading>
          <p className="mt-2.5 max-w-md text-sm text-stone">
            Perfis da equipe em construção — em breve, com nomes e rostos reais.
          </p>
        </Reveal>

        <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {roles.map((role) => (
            <div key={role} className="border border-ink/10 p-6 text-center">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-ink/15 text-stone">
                <User aria-hidden className="size-6" />
              </span>
              <p className="mt-4 text-sm text-ink">{role}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
