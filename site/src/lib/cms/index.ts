/**
 * Camada de acesso a dados centralizada — todo componente/página que
 * precisa de destino, experiência, viagem ou artigo passa por aqui, nunca
 * direto pelos mocks ou pelo cliente Sanity. Hoje (sem projeto Sanity
 * configurado) toda função cai no mock; no dia em que o CMS tiver conteúdo
 * publicado, o mesmo código passa a servir dados reais sem mudar nada nas
 * páginas.
 */
export * from "./destinations";
export * from "./experiences";
export * from "./travel-products";
export * from "./curadoria-articles";
export * from "./settings";
export * from "./home";
export * from "./testimonials";
export * from "./people";
export * from "./about";
export * from "./hubs";
