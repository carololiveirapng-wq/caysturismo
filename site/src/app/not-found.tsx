import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Página não encontrada | Cays Turismo",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-ivory py-24 md:py-32">
      <Container className="flex flex-col items-center text-center">
        <p className="text-xs font-medium tracking-[0.25em] text-stone uppercase">404</p>
        <h1 className="mt-4 max-w-xl font-serif text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.1] text-balance text-ink">
          Essa página não embarcou com a gente.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-stone">
          O endereço pode ter mudado ou não existir mais.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/contato"
            className="bg-ink px-6 py-3.5 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta-dark"
          >
            Falar com a Cays
          </Link>
          <Link
            href="/destinos"
            className="border border-ink/15 px-6 py-3.5 text-sm font-medium tracking-wide text-ink transition-colors duration-300 hover:border-ink/30"
          >
            Explorar destinos
          </Link>
        </div>

        <Link href="/" className="mt-7 text-sm text-stone underline underline-offset-2 transition-colors hover:text-ink">
          Voltar para o início
        </Link>
      </Container>
    </section>
  );
}
