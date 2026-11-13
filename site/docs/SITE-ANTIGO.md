# Site antigo (WordPress) — o que foi feito e o que NÃO fazer

O site antigo foi comprometido (milhares de posts de spam de cassino). **Ele nunca deve voltar ao ar** — nem em domínio de teste.

## Como o conteúdo foi tratado (sem executar nada do site antigo)
- O backup `.wpress` foi lido **só como arquivo**: extraímos apenas o texto das páginas/posts do banco (`database.sql`). Nenhum plugin, PHP, script ou tema antigo foi aberto ou executado, e o banco antigo não foi restaurado em lugar nenhum.
- Dos ~36 mil posts publicados, **207 são o blog legítimo da Cays (2011–2019)** e 10 são páginas institucionais. O resto é spam injetado.
- O texto limpo está em `dados/site-antigo/conteudo-bruto.jsonl` (fora do git, na pasta do projeto): título, data, URL antiga e texto puro (sem HTML).
- O mapa `docs/mapa-redirects-site-antigo.csv` lista cada URL antiga com a decisão.

## Decisões de URL
- **301 aplicado (12):** só onde a intenção é equivalente (ex.: "10 destinos mais procurados para lua de mel" → `/experiencias/lua-de-mel`; os 3 posts de "lua de mel nas Maldivas" → `/experiencias/lua-de-mel/maldivas`; `/orcamento` → `/contato`; páginas institucionais já mapeadas antes).
- **301 sugerido (B), 95 URLs:** posts sobre um destino/tema que existe no site novo. **Não aplicados** — dependem de decisão (conteúdo de 2011–2016 é antigo; redirecionar vários posts para a mesma página não ajuda o Google). Ficam no CSV para revisão.
- **410 (removida):** posts datados, `/shops/…`, `/mbr/`, `/tpc/`, `/category/…`, `/tag/…` que não têm equivalente. É o que o Google mais rápido entende como "página removida" (regra em `src/proxy.ts`).
- Nada vai para a Home.

## Search Console
O export de cobertura (`Coverage-Valid-2026-10-07.zip`) tem 1.000 URLs "válidas": ~99% são spam (`/?p=ID`, `/shops/…`, cassino). As únicas úteis: `/orcamento/` e o post "10 destinos…" (ambos redirecionados) e as tags `/tag/amsterda/` e `/tag/nova-zelandia/` (sem equivalente → 410).
