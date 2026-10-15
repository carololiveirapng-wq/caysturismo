import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal } from "@/components/ui/image-reveal";
import { EditorialHeading } from "@/components/ui/editorial-heading";
import { StarRating } from "@/components/ui/star-rating";
import { SimpleImageCarousel } from "@/components/experience/simple-image-carousel";
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
    images: [{ url: `${siteConfig.url}/maldivas-lua-de-mel/hero-couple-beach.jpg` }],
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
  "Esportes aquáticos e voos panorâmicos sobre o arquipélago.",
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

const EXPERIENCE_OUTCOMES = [
  "Vocês vão se sentir relaxados e curtir uma natureza exuberante.",
  "Sem preocupação alguma — só aproveitar cada segundo.",
  "Vão voltar com as energias renovadas, prontos para a rotina.",
  "Mais próximos um do outro — uma viagem assim cria laços que ficam.",
  "Histórias e fotos incríveis para contar pelo resto da vida.",
];

const DESERVE = [
  "Descansar e renovar as energias.",
  "Viver as melhores experiências que a vida pode proporcionar.",
  "Conhecer e registrar um dos lugares mais incríveis do mundo.",
  "Realizar o sonho de uma viagem inesquecível, a dois.",
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

const ROMANCE_GALLERY = [
  { src: "/maldivas-lua-de-mel/romance-1.webp", alt: "Casal de noivos em um deck de madeira entre bangalôs sobre o mar, nas Maldivas" },
  { src: "/maldivas-lua-de-mel/romance-2.webp", alt: "Casal de noivos em um buggy sobre o deck de madeira, nas Maldivas" },
  { src: "/maldivas-lua-de-mel/romance-3.webp", alt: "Interior de um restaurante sobre a água, nas Maldivas, ao entardecer" },
  { src: "/maldivas-lua-de-mel/romance-4.webp", alt: "Casal abraçado em um deck de madeira entre bangalôs, nas Maldivas" },
  { src: "/maldivas-lua-de-mel/romance-5.webp", alt: "Casal caminhando por um deck de madeira entre bangalôs, nas Maldivas" },
];

const RESORT_GALLERY = [
  { src: "/maldivas-lua-de-mel/resort-1.webp", alt: "Buffet de café da manhã em um resort nas Maldivas" },
  { src: "/maldivas-lua-de-mel/resort-2.webp", alt: "Mesa de café da manhã com vista para o jardim, em um resort nas Maldivas" },
  { src: "/maldivas-lua-de-mel/resort-3.webp", alt: "Chef preparando pratos ao vivo em um resort nas Maldivas" },
  { src: "/maldivas-lua-de-mel/resort-4.webp", alt: "Área de estar de um resort nas Maldivas" },
  { src: "/maldivas-lua-de-mel/resort-5.webp", alt: "Detalhes da gastronomia de um resort nas Maldivas" },
];

const LOCAL_REVIEWS = [
  {
    name: "Suellen Aline",
    text: "Uma amiga fechou em 2018 com eles e me indicou — desde o primeiro contato recebi uma atenção diferente de todas as agências. A Gerlane e o Cassius nos deixaram super confortáveis para tirar todas as dúvidas, nos deram ótimas dicas, e mesmo a agência não sendo da minha cidade senti confiança. Durante a viagem eles entraram em contato pra saber se estava tudo bem — um excelente pós-venda. Já estamos pensando no próximo destino, e com certeza faremos com eles. Super indico.",
  },
  {
    name: "Thais Guimaraes",
    text: "Maravilhoso do começo ao fim. As sugestões de hotel, as reservas, o cuidado com nosso filho de 6 anos, tudo. Amamos Dubai e Maldivas — os hotéis, o traslado também foi super tranquilo, porque a Gerlane nos orientou e organizou absolutamente tudo!",
  },
];

function BulletList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-stone">
          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-magenta-dark" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group/cta inline-flex items-center gap-3 text-sm font-medium tracking-[0.08em] text-ink uppercase"
    >
      <span className="flex size-10 items-center justify-center rounded-full border border-ink/30 transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:bg-ink">
        <span aria-hidden className="text-base text-ink transition-colors duration-500 ease-[var(--ease-editorial)] group-hover/cta:text-ivory">
          ↗
        </span>
      </span>
      {label}
    </Link>
  );
}

export default async function MaldivasLuaDeMelPage() {
  const [settings, testimonials] = await Promise.all([getSettings(), getTestimonials()]);
  const foundedYear = settings.foundedDate ? new Date(settings.foundedDate).getFullYear() : undefined;
  const yearsOfExperience = foundedYear ? new Date().getFullYear() - foundedYear : undefined;
  const natalia = testimonials.find((t) => t.id === "testimonial-google-review-natalia-rezende-jordao");

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[80svh] items-end overflow-hidden bg-ink">
        <Image
          src="/maldivas-lua-de-mel/hero-couple-beach.jpg"
          alt="Casal caminhando de mãos dadas em uma praia de areia branca e água turquesa, nas Maldivas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
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
            {yearsOfExperience && (
              <p className="text-xs font-medium tracking-[0.25em] text-ivory/75 uppercase">
                Lua de mel · Maldivas · Há {yearsOfExperience} anos realizando sonhos
              </p>
            )}
            <h1 className="mt-3 font-serif text-[clamp(2.5rem,6vw,5.25rem)] leading-[1.05] text-balance text-ivory">
              Maldivas: a lua de mel mais desejada do mundo
            </h1>
            <p className="mt-5 max-w-lg border-l border-ivory/25 pl-5 text-base leading-relaxed text-ivory/80">
              Vivam os momentos mais memoráveis da vida de vocês no lugar mais extraordinário do mundo — e levem
              para sempre a lembrança perfeita da melhor viagem que já fizeram.
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
                Quero conhecer as Ilhas Maldivas
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
              <EditorialHeading as="h2" size="md" className="max-w-md">
                O compromisso de vocês é relaxar — do resto, cuidamos nós.
              </EditorialHeading>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-stone">
                Imagine acordar em um dos resorts mais encantadores do mundo e ver, logo à sua frente, água morna e
                cristalina, arraias e golfinhos nadando, areia branca e fininha. Parece até um sonho, né? Mas esse
                paraíso existe — e é um dos destinos mais elegantes, cobiçados e exclusivos do planeta.
              </p>
              <ul className="mt-6 flex flex-col gap-3 border-t border-ink/10 pt-6 text-[15px] text-stone">
                <li>→ As fotos mais bonitas que vocês já tiraram juntos.</li>
                <li>→ Passear e pisar na areia mais branca e fininha que existe.</li>
                <li>→ Momentos a dois em um dos lugares mais espetaculares da Terra.</li>
              </ul>
              <p className="mt-6 font-serif text-xl text-ink">O momento perfeito é agora.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <ImageReveal
              src="/maldivas-lua-de-mel/bedroom-pool.webp"
              alt="Suíte com piscina privativa e vista para a praia, nas Maldivas"
              width={700}
              height={700}
              sizes="(min-width: 1024px) 32vw, 90vw"
              containerClassName="aspect-square"
            />
          </Reveal>
        </Container>
      </section>

      {/* Clima de romance — galeria */}
      <section className="bg-sand py-14 md:py-20">
        <Container>
          <Reveal className="text-center">
            <EditorialHeading as="h2" size="md" className="mx-auto max-w-xl">
              Todo o clima de romance, em um dos lugares mais desejados do mundo
            </EditorialHeading>
            <p className="mx-auto mt-4 max-w-lg text-sm text-stone">
              Infraestrutura impecável, serviço cinco estrelas e o clima de paraíso tropical de luxo.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <SimpleImageCarousel images={ROMANCE_GALLERY} />
          </Reveal>
          <Reveal delay={0.15} className="mt-10 text-center">
            <SectionCta href={CONTACT_HREF} label="Quero ir para as Ilhas Maldivas" />
          </Reveal>
        </Container>
      </section>

      {/* O que espera vocês */}
      <section className="bg-ivory py-14 md:py-20">
        <Container narrow>
          <Reveal>
            <EditorialHeading as="h2" size="md">
              O que espera vocês nas Maldivas
            </EditorialHeading>
            <div className="mt-8">
              <BulletList items={AWAITS} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Galeria resort */}
      <section className="bg-sand py-14 md:py-20">
        <Container>
          <Reveal>
            <SimpleImageCarousel images={RESORT_GALLERY} />
          </Reveal>
        </Container>
      </section>

      {/* Prévia + seleto grupo */}
      <section className="bg-ivory py-14 md:py-20">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="order-2 lg:order-1 lg:col-span-5">
            <ImageReveal
              src="/maldivas-lua-de-mel/villa-night-pool.webp"
              alt="Villa com piscina privativa iluminada ao entardecer, nas Maldivas"
              width={700}
              height={525}
              sizes="(min-width: 1024px) 32vw, 90vw"
              containerClassName="aspect-[4/3]"
            />
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <Reveal>
              <p className="max-w-md text-[15px] leading-relaxed text-stone">
                Tudo isso é apenas uma prévia das belezas que só se encontram nas Maldivas, e que poucos têm o
                prazer de ver e sentir ao vivo.
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone">
                Vocês e a companhia perfeita, em um dos destinos mais cobiçados do mundo, em pleno Oceano Índico e
                longe do estresse e da poluição do mundo moderno. Façam parte do seleto grupo de casais que têm o
                privilégio de curtir um ao outro em um dos lugares mais lindos de todo o planeta.
              </p>
              <div className="mt-6">
                <SectionCta href={CONTACT_HREF} label="Quero conhecer o paraíso" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Perfeitas para quem */}
      <section className="bg-sand py-14 md:py-20">
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

      {/* Match perfeito */}
      <section className="bg-ivory py-14 md:py-20">
        <Container narrow className="text-center">
          <Reveal className="mx-auto max-w-xl">
            <EditorialHeading as="h2" size="md">
              Maldivas + Vocês + Cays Turismo
            </EditorialHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-stone">
              Além de viverem a viagem dos sonhos, vocês contam com todo o cuidado e a atenção da Cays Turismo, que
              viaja há anos para as Maldivas e conhece cada detalhe desse paraíso na Terra.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Atendimento exclusivo */}
      <section className="bg-sand py-14 md:py-20">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <EditorialHeading as="h2" size="md">
                A melhor viagem da vida de vocês, com o atendimento exclusivo que merecem.
              </EditorialHeading>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <ul className="flex flex-col gap-5 text-[15px] leading-relaxed text-stone">
                <li className="border-t border-ink/10 pt-5 first:border-t-0 first:pt-0">
                  Alguém com anos de experiência, especializado em resolver qualquer imprevisto da viagem.
                </li>
                <li className="border-t border-ink/10 pt-5">
                  Vocês relaxam e curtem cada detalhe, sem se preocupar com mais nada além disso.
                </li>
                <li className="border-t border-ink/10 pt-5">
                  Alguém cuidando de tudo — do check-in no hotel à reserva no restaurante.
                </li>
                <li className="border-t border-ink/10 pt-5">
                  Uma viagem personalizada exatamente de acordo com a preferência e o perfil de vocês.
                </li>
              </ul>
            </Reveal>
          </div>
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
            <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-stone">
              Atendimento rápido, direto pelo WhatsApp, do início ao fim da viagem
              {yearsOfExperience ? ` — ${yearsOfExperience} anos de experiência e profissionalismo, com atendimento exclusivo e familiar.` : "."}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Como será a experiência */}
      <section className="bg-sand py-14 md:py-20">
        <Container narrow>
          <Reveal className="text-center">
            <EditorialHeading as="h2" size="md" className="mx-auto max-w-xl">
              Como será a experiência de vocês nas Maldivas
            </EditorialHeading>
          </Reveal>
          <div className="mt-10 text-left">
            <BulletList items={EXPERIENCE_OUTCOMES} />
          </div>
        </Container>
      </section>

      {/* Testemunhos reais */}
      <section className="bg-ivory py-16 md:py-20">
        <Container narrow>
          <Reveal className="text-center">
            <EditorialHeading as="h2" size="md" className="mx-auto max-w-lg">
              Confira o que nossos clientes falam de nós
            </EditorialHeading>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {natalia && (
              <Reveal className="flex flex-col items-center border-t border-ink/10 pt-6 text-center md:border-t-0 md:pt-0">
                <StarRating rating={natalia.rating} />
                <blockquote className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{natalia.text}&rdquo;</blockquote>
                <p className="mt-5 text-sm font-medium text-stone">{natalia.authorName} · Google Reviews</p>
              </Reveal>
            )}
            {LOCAL_REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={(i + 1) * 0.06} className="flex flex-col items-center border-t border-ink/10 pt-6 text-center md:border-t-0 md:pt-0">
                <StarRating rating={5} />
                <blockquote className="mt-4 text-sm leading-relaxed text-ink">&ldquo;{r.text}&rdquo;</blockquote>
                <p className="mt-5 text-sm font-medium text-stone">{r.name} · Google Reviews</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* A melhor viagem da vida + quote */}
      <section className="bg-graphite py-16 md:py-20">
        <Container className="text-center">
          <Reveal className="mx-auto max-w-2xl">
            <div className="mx-auto h-px w-16 bg-magenta/40" />
            <p className="mt-8 font-serif text-2xl leading-snug text-ivory italic md:text-3xl">
              &ldquo;Entre todos os livros do mundo, as melhores histórias estão entre as páginas de um
              passaporte.&rdquo;
            </p>
            <div className="mx-auto mt-8 h-px w-16 bg-magenta/40" />
            <p className="mt-8 text-[15px] leading-relaxed text-ivory/75">
              Quem nunca sentiu, depois de muito tempo trabalhando sem parar, que precisava viajar e descansar a
              mente? É exatamente isso que uma viagem faz: alivia as tensões, ajuda a sair da rotina e nos aproxima
              de novas culturas e sabores.
            </p>
            <p className="mt-6 font-serif text-xl text-ivory">
              Vivam o agora — o lugar mais exclusivo e cobiçado do mundo espera por vocês.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Quem vai guiar */}
      <section className="bg-ivory py-14 md:py-20">
        <Container narrow className="text-center">
          <Reveal className="mx-auto max-w-xl">
            <EditorialHeading as="h2" size="md">
              Conheçam quem vai guiar essa viagem
            </EditorialHeading>
            <p className="mt-5 text-[15px] leading-relaxed text-stone">
              {foundedYear ? `Desde ${foundedYear}, a` : "A"} Cays Turismo proporciona viagens e experiências
              exclusivas e sofisticadas para clientes de todo o Brasil. Planejamos cada roteiro de maneira
              transparente, com base na confiança e na atenção ao relacionamento com cada cliente — para sermos,
              além de agência, grandes amigos.
            </p>
            <div className="mt-6">
              <SectionCta href="/sobre" label="Conhecer a Cays" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Sonhos adiados */}
      <section className="bg-sand py-14 md:py-20">
        <Container narrow className="text-center">
          <Reveal className="mx-auto max-w-xl">
            <EditorialHeading as="h2" size="md">
              Quais sonhos vocês têm deixado para depois?
            </EditorialHeading>
            <p className="mt-4 text-[15px] text-stone">Vocês merecem…</p>
          </Reveal>
          <div className="mt-8 text-left">
            <BulletList items={DESERVE} />
          </div>
        </Container>
      </section>

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
