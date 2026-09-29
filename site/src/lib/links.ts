import { getDestinationDetailBySlug } from "@/data/destinations";
import { getExperienceDetailBySlug } from "@/data/experiences";
import { getTravelProductBySlug } from "@/data/travel-products";
import { getCuradoriaArticleBySlug } from "@/data/curadoria";

/**
 * O painel só tem página completa pra parte dos destinos/experiências/
 * viagens/artigos mockados até agora. Essas funções são o único lugar que
 * decide "essa página existe de verdade?" — todo card/link do site deve
 * passar por aqui em vez de montar a URL na mão, pra nunca mandar alguém
 * pra um 404. Quando não existe página própria, cai no contato com o
 * contexto certo (nunca um link morto).
 */

export function destinationHref(slug: string): string {
  return getDestinationDetailBySlug(slug) ? `/destinos/${slug}` : `/contato?destino=${slug}`;
}

export function experienceHref(slug: string): string {
  return getExperienceDetailBySlug(slug) ? `/experiencias/${slug}` : `/contato?experiencia=${slug}`;
}

export function travelProductHref(slug: string): string {
  return getTravelProductBySlug(slug) ? `/viagens/${slug}` : `/contato?viagem=${slug}`;
}

/** Sem query param equivalente pra artigo — na ausência da página, volta pro hub em vez de 404. */
export function curadoriaArticleHref(slug: string): string {
  return getCuradoriaArticleBySlug(slug) ? `/curadoria/${slug}` : "/curadoria";
}
