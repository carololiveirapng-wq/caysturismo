import type { DemoImage } from "@/types";
import { unsplash } from "@/data/home/shared";

export interface ExperienceHubCard {
  slug: string;
  name: string;
  image: DemoImage;
}

// TODO CMS: algumas destas ainda não têm página própria — usam o mesmo
// padrão de link "adiantado" já usado no resto do site (ex.: submenu do
// Header), e passam a funcionar assim que a experiência for construída.
export const occasions: ExperienceHubCard[] = [
  { slug: "lua-de-mel", name: "Lua de Mel", image: { src: unsplash("1519307212971-dd9561667ffb", 1000), alt: "Casal em silhueta observando o pôr do sol na praia" } },
  { slug: "destination-wedding", name: "Destination Wedding", image: { src: unsplash("1599142296733-1c1f2073e6de", 1000), alt: "Noiva de vestido branco à beira-mar" } },
  { slug: "bodas", name: "Bodas", image: { src: unsplash("1599142296733-1c1f2073e6de", 1000), alt: "Noiva de vestido branco à beira-mar" } },
  { slug: "grandes-eventos", name: "Grandes Eventos", image: { src: unsplash("1580657274234-7339717f4541", 1000), alt: "Taças de espumante sendo servidas em uma celebração" } },
];

export const styles: ExperienceHubCard[] = [
  { slug: "familia", name: "Viagens em Família", image: { src: unsplash("1475503572774-15a45e5d60b9", 1000), alt: "Família de mãos dadas caminhando à beira-mar" } },
  { slug: "cruzeiros", name: "Cruzeiros", image: { src: unsplash("1548574505-5e239809ee19", 1000), alt: "Navio de cruzeiro ancorado em um porto, visto do alto" } },
  { slug: "gastronomia", name: "Gastronomia", image: { src: unsplash("1632709810780-b5a4343cebec", 1000), alt: "Tigela de ramen com ovo, chashu e cebolinha" } },
  { slug: "natureza-aventura", name: "Natureza & Aventura", image: { src: unsplash("1476514525535-07fb3b4ae5f1", 1000), alt: "Barco de madeira em lago alpino cercado por montanhas nas Dolomitas" } },
  { slug: "safari", name: "Safari", image: { src: unsplash("1577971132997-c10be9372519", 1000), alt: "Elefantes avistados durante um safári fotográfico" } },
  { slug: "privativas", name: "Viagens Privativas", image: { src: unsplash("1562281302-809108fd533c", 1000), alt: "Iate de luxo ancorado em uma marina ao entardecer" } },
];
