import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Recebemos seu pedido | Cays Turismo",
  robots: { index: false, follow: false },
};

export default function ContatoObrigadoPage() {
  return (
    <section className="flex min-h-[70svh] items-center bg-ivory pt-28 pb-16 md:pt-32">
      <Container narrow className="text-center">
        <Reveal className="mx-auto flex flex-col items-center">
          <p className="text-xs font-medium tracking-[0.25em] text-magenta uppercase">Pedido enviado</p>
          <h1 className="mt-4 font-serif text-3xl leading-tight text-ink md:text-4xl">Recebemos seu pedido.</h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-stone">
            Alguém da equipe Cays vai analisar o que você nos contou e entrar em contato pela forma que você
            preferiu, para começar a desenhar sua viagem.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium tracking-wide text-ivory uppercase transition-colors duration-300 hover:bg-magenta"
            >
              Voltar ao site
            </Link>
            <Link
              href="/curadoria"
              className="text-sm font-medium tracking-wide text-ink underline-offset-4 hover:underline"
            >
              Explorar a Curadoria
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
