import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { StarRating } from "@/components/ui/star-rating";
import { HowItWorks } from "@/components/experience/how-it-works";
import { DestinationFaq } from "@/components/destination/destination-faq";
import { DestinationFinalCTA } from "@/components/destination/destination-final-cta";
import { getSettings, getTestimonials } from "@/lib/cms";
import { siteConfig } from "@/lib/site-config";

const title = "Lua de Mel nas Maldivas | Cays Turismo";
const description =
  "Bangalôs sobre o mar, água cristalina e privacidade absoluta — planeje com a Cays a lua de mel nas Maldivas.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/experiencias/lua-de-mel/maldivas" },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}/experiencias/lua-de-mel/maldivas`,
    images: [{ url: `${siteConfig.url}/maldivas-lua-de-mel/hero-boardwalk.webp` }],
  },
};

const CONTACT_HREF = "/contato?destino=maldivas";

const AWAITS = [
  "As águas azul-turquesa mais cristalinas do mundo.",
  "Trilhas de areia branca entre bancos de areia dignos de cinema.",
  "Os bangalôs sobre a água que já são sinônimo das Maldivas.",
  "Um cruzeiro ao pôr do sol, com golfinhos acompanhando o caminho.",
  "Mergulho em uma das faunas aquáticas mais ricas do planeta.",
  "Esportes aquáticos como wakeboard, jet ski e flyboard.",
  "Gastronomia de alto padrão, para todos os paladares.",
  "Um dos nascer do sol mais belos do mundo.",
];

const PERFECT_FOR = [
  "Presentear o parceiro com os melhores dias de vida a dois.",
  "Se conectar com uma natureza exuberante e única.",
  "Nadar em águas cristalinas e quentes o ano inteiro.",
  "Apreciar gastronomia de alto padrão.",
  "Fotos de um pôr do sol cinematográfico.",
  "Sossego, segurança e um número limitado de turistas.",
  "Acomodações 5 estrelas, com máximo conforto.",
  "Esportes aquáticos e vistas panorâmicas inesquecíveis.",
];

const PROCESS = [
  { title: "Bate-papo", text: "Para te conhecer e entender suas preferências nos mínimos detalhes." },
  { title: "Desenho da viagem", text: "Planejamos o itinerário, tiramos dúvidas sobre documentação e começamos as reservas." },
  { title: "Organização das reservas", text: "Cuidamos de cada reserva com atenção aos detalhes dessa experiência." },
  { title: "Malas prontas", text: "Com tudo organizado, é hora de embarcar com nosso suporte durante toda a jornada." },
  { title: "Bem-vindos de volta", text: "Vocês voltam com a viagem mais extraordinária da vida — e já pensando na próxima." },
];

const REASSURANCE = [
  "Reserva de passagens, hotel e passeios.",
  "Organização de roteiro e itinerário.",
  "Imprevistos durante a viagem.",
];

const FAQ = [
  {
    question: "É caro viajar para as Maldivas?",
    answer:
      "O investimento para uma viagem completa a dois começa a partir de R$ 40 mil — varia de acordo com resort, categoria de acomodação e época do ano.",
  },
  {
    question: "Quanto tempo ficar nas Maldivas?",
    answer: "Recomendamos no mínimo seis dias, para compensar as longas horas de voo e aproveitar bem o que as ilhas oferecem.",
  },
  {
    question: "Como escolher o resort certo?",
    answer: "Apresentamos as melhores opções de acordo com o seu perfil e orçamento, com base na nossa experiência real com os resorts das Maldivas.",
  },
  {
    question: "Qual a melhor época para ir?",
    answer:
      "A alta temporada vai de dezembro a março, com menor chance de chuva. De abril a setembro é baixa temporada, com mais possibilidade de monções; outubro e novembro ficam no meio, com chuvas rápidas e pontuais, geralmente no fim da tarde.",
  },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-stone">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-magenta-dark" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function MaldivasLuaDeMelPage() {
  const [settings, testimonials] = await Promise.all([getSettings(), getTestimonials()]);
  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;
  const yearsOfExperience = foundedYear ? new Date().getFullYear() - foundedYear : undefined;
  const review = testimonials.find((t) => t.id === "testimonial-google-review-natalia-rezende-jordao");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-ink">
        <Image src="/maldivas-lua-de-mel/hero-boardwalk.webp" alt="Casal caminhando por um deck de madeira entre bangalôs sobre o mar, nas Maldivas" fill priority sizes="100vw" className="object-cover" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/40" />

        <Container className="relative z-10 pb-14 md:pb-20">
          <Reveal className="max-w-2xl">
            <Breadcrumb
              items={[
                { label: "Experiências", href: "/experiencias" },
                { label: "Lua de Mel", href: "/experiencias/lua-de-mel" },
                { label: "Maldivas" },
              ]}
              tone="light"
              className="mb-6"
            />
            <p className="text-xs font-medium tracking-[0.25em] text-ivory/75 uppercase">Lua de mel · Maldivas</p>
            <h1 className="mt-3 font-serif text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] text-balance text-ivory">
              Maldivas: a lua de mel mais desejada do mundo
            </h1>
            <p className="mt-5 max-w-lg border-l border-ivory/25 pl-5 text-base leading-relaxed text-ivory/80">
              Bangalôs sobre o mar, água cristalina em todas as tonalidades de azul e a privacidade de um dos destinos
              mais exclusivos do planeta — vivido a dois.
            </p>

            <div className="mt-8">
              <Link
                href={CONTACT_HREF}
                className="group/cta inline-flex items-center gap-4 text-sm font-medium tracking-[0.08em] text-ivory uppercase"
              >
                <span className="flex size-12 items-center justify-center rounded-full border border-ivory/70 transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:bg-ivory">
                  <span aria-hidden className="text-base text-ivory transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:text-ink">
                    ↗
                  </span>
                </span>
                Planejar minha lua de mel
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Intro */}
      <section className="bg-ivory py-14 md:py-20">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              {yearsOfExperience && (
                <p className="text-xs font-medium tracking-[0.2em] text-magenta-dark uppercase">
                  Há {yearsOfExperience} anos planejando luas de mel
                </p>
              )}
              <EditorialHeading as="h2" size="md" className="mt-4 max-w-md">
                O compromisso de vocês é relaxar — do resto, cuidamos nós.
              </EditorialHeading>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-stone">
                Imagine acordar em um dos resorts mais encantadores do mundo e ver, logo à sua frente, água morna e
                cristalina, arraias e golfinhos nadando, areia branca e fininha. Esse paraíso existe — e é um dos
                destinos mais elegantes, cobiçados e exclusivos do planeta.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <ImageReveal
              src="/maldivas-lua-de-mel/bedroom-pool.webp"
              alt="Suíte com piscina privativa e vista para a praia, nas Maldivas"
              width={900}
              height={1100}
              sizes="(min-width: 1024px) 38vw, 90vw"
              containerClassName="aspect-[4/5]"
            />
          </Reveal>
        </Container>
      </section>

      {/* O que espera vocês */}
      <section className="bg-sand py-14 md:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <ImageReveal
              src="/maldivas-lua-de-mel/couple-buggy.webp"
              alt="Casal de noivos em um buggy sobre o deck de madeira, entre bangalôs nas Maldivas"
              width={900}
              height={1100}
              sizes="(min-width: 1024px) 38vw, 90vw"
              containerClassName="aspect-[4/5]"
            />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <EditorialHeading as="h2" size="md" className="max-w-md">
                O que espera vocês nas Maldivas
              </EditorialHeading>
              <div className="mt-8">
                <BulletList items={AWAITS} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Perfeitas para quem */}
      <section className="bg-ivory py-14 md:py-20">
        <Container narrow>
          <Reveal className="text-center">
            <EditorialHeading as="h2" size="md" className="mx-auto max-w-xl">
              As Maldivas são perfeitas para quem gosta de
            </EditorialHeading>
          </Reveal>
          <div className="mt-10 text-left">
            <BulletList items={PERFECT_FOR} />
          </div>
        </Container>
      </section>

      {/* Por que são famosas */}
      <section className="bg-graphite py-16 md:py-20">
        <Container className="text-center">
          <Reveal className="mx-auto max-w-2xl">
            <EditorialHeading as="h2" size="md" className="text-ivory">
              Por que as Maldivas são tão famosas
            </EditorialHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-ivory/75">
              Esse arquipélago de mais de mil ilhas, com água entre 26°C e 30°C o ano inteiro, é um dos destinos mais
              cobiçados do mundo — pela combinação rara de isolamento, paisagem e privacidade. Cada resort costuma
              ocupar uma ilha inteira, o que mantém a experiência rarefeita e exclusiva mesmo em alta temporada.
            </p>
          </Reveal>
        </Container>
      </section>

      <HowItWorks id="como-funciona" steps={PROCESS} />

      {/* Reassurance */}
      <section className="bg-ivory py-14 md:py-20">
        <Container narrow className="text-center">
          <Reveal>
            <EditorialHeading as="h2" size="md" className="mx-auto max-w-lg">
              Com a Cays, vocês não precisam se preocupar com
            </EditorialHeading>
            <ul className="mx-auto mt-8 flex max-w-md flex-col gap-4 text-left">
              {REASSURANCE.map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-ink/10 pt-4 text-sm text-stone first:border-t-0 first:pt-0">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-magenta-dark" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Testimonial real */}
      {review && (
        <section className="bg-sand py-16 md:py-20">
          <Container narrow className="text-center">
            <Reveal className="mx-auto max-w-2xl">
              <StarRating rating={review.rating} />
              <blockquote className="mt-5 font-serif text-xl leading-relaxed text-ink md:text-2xl">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <p className="mt-6 text-sm font-medium text-stone">{review.authorName} · Google Reviews</p>
            </Reveal>
          </Container>
        </section>
      )}

      <DestinationFaq id="faq" items={FAQ} />

      <DestinationFinalCTA
        title="Prontos para viver essa lua de mel?"
        supporting="Fale com a Cays e comece a planejar a viagem que vai marcar o início de tudo."
        ctaLabel="Planejar minha lua de mel"
        ctaHref={CONTACT_HREF}
        note="Fale com um especialista da Cays"
      />
    </>
  );
}
