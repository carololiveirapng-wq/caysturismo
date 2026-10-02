# Guia Cays — Conteúdo e Leads

Dois painéis, dois usos:

- **`/studio`** — editar o conteúdo do site (Home, Sobre, destinos, experiências, viagens, artigos, equipe, depoimentos).
- **`/admin`** — acompanhar os pedidos de planejamento (leads) que chegam pelo site.

---

## GUIA CAYS — CONTEÚDO (`/studio`)

1. **Entrar em `/studio`** com seu login.
2. No menu lateral, **Páginas** tem a Home, Sobre e os 4 hubs (Destinos, Experiências, Viagens, Curadoria) — cada um é único, não dá pra criar uma segunda Home por engano.
3. **Editar a Home**: Páginas → Home. Dá pra mudar o texto do topo, o manifesto, o "Como funciona", e escolher quais destinos/experiências/viagens/artigos aparecem em destaque (sempre escolhendo entre o que já existe — não digite nome de destino ali, selecione a referência).
4. **Adicionar um destino novo**: Conteúdo → Destinos → botão de criar. Preencha nome, imagem, textos do hero e marque "Ativo" quando estiver pronto pra publicar.
5. **Adicionar uma experiência nova**: Conteúdo → Experiências, mesmo fluxo.
6. **Adicionar uma viagem nova**: Conteúdo → Viagens. É o documento com mais campos — preencha pelo menos título, tipo, galeria de fotos e status. O resto (roteiro, inclusos, etc.) pode ser preenchido aos poucos.
7. **Publicar um artigo de Curadoria**: Conteúdo → Curadoria, criar novo, escrever o texto e marcar "Ativo".
8. **Cadastrar alguém da equipe**: Pessoas → Equipe. Sem foto real, a pessoa não aparece em /sobre — é assim de propósito, pra nunca mostrar um rosto que não é real.
9. **Editar um depoimento**: Prova social → Depoimentos. Dá pra ativar/desativar um sem apagar.
10. **Configurações gerais** (WhatsApp, telefone, e-mail, endereço, Instagram, CNPJ, Cadastur, slogan): Configurações do site, no fim do menu. Um campo vazio simplesmente não aparece no site — nunca inventamos dado.

**Importante:** depois de publicar (botão "Publish"), a mudança pode levar de 1 a 3 minutos pra aparecer no site — é o tempo normal de propagação, não precisa publicar de novo.

---

## GUIA CAYS — LEADS (`/admin`)

1. **Entrar em `/admin`** com seu login (e-mail e senha da equipe).
2. **Painel inicial**: visão geral dos últimos pedidos e um resumo por status.
3. **Visualizar um lead novo**: menu "Leads" lista todos os pedidos, com busca e filtro por status/destino/experiência/período.
4. **Abrir um lead**: clique nele pra ver todos os dados que a pessoa preencheu (destino, data, quantas pessoas, etc.) e de onde ela veio (WhatsApp, Google, indicação...).
5. **Alterar o status**: no lado direito da tela do lead, escolha o novo status (Novo, Em contato, Qualificado, Proposta, Fechado, Perdido) e salve.
6. **Adicionar uma observação interna**: mesmo lugar — é só a equipe Cays que vê, o cliente nunca lê isso.
7. **Abrir o WhatsApp direto com o cliente**: botão "WhatsApp" no topo da tela do lead, já abre a conversa com uma saudação pronta.
8. **Responder por e-mail**: botão "E-mail" abre seu cliente de e-mail com o endereço do lead preenchido.

**Notificação automática:** quando configurada (ver seção técnica abaixo), todo lead novo chega por e-mail também — não depende de ficar olhando o painel o dia inteiro.

---

## O que ainda falta configurar (lado técnico, uma vez só)

Isso aqui não precisa de conhecimento técnico pra entender — é só a lista do que falta a Cays confirmar ou alguém técnico configurar antes do lançamento oficial:

- **Domínio oficial do site** (ex.: caysturismo.com.br) — hoje o site roda num endereço provisório da Vercel.
- **E-mail de notificação de leads** — pra receber um e-mail a cada pedido novo, alguém técnico precisa configurar o serviço de envio (Resend) com o domínio de e-mail da Cays verificado.
- **CNPJ, Cadastur, telefone, endereço, horário de atendimento, Instagram** — os campos já existem em Configurações do site, só faltam os dados reais da Cays preencherem.
- **Login do `/admin`** — cada pessoa da equipe que for usar o painel de leads precisa de um usuário criado (fala com quem administra o projeto).

Nenhuma senha, chave de API ou link interno fica neste guia — isso fica só com quem administra o projeto.
