# Backup técnico — o que já existe e o que fazer

## O que já é recuperável sem fazer nada
- **Sanity (conteúdo):** o Studio guarda o histórico de versões de cada documento (botão de relógio / "Histórico" no documento). O prazo de retenção depende do plano do Sanity; no plano grátis é curto. Serve para desfazer uma edição recente, **não** como backup.
- **Imagens:** ficam no Sanity (CDN) e entram no export abaixo.
- **Supabase (leads):** conferir no painel do Supabase se o projeto tem backups automáticos (dependem do plano; o plano gratuito não garante backup diário). Não presumir que existe.
- **Código do site:** está no GitHub (repositório `caysturismo`).

## O que precisa de export (manual, simples)
Um comando faz os dois: `npm run backup` (dentro de `site/`).
- Gera `_backups/AAAA-MM-DD/sanity-production.tar.gz` (todos os documentos **e** as imagens) e `_backups/AAAA-MM-DD/banco/*.json` (uma tabela por arquivo: leads, eventos de lead etc.).
- Só **lê** dos dois serviços; não altera nada. A pasta `_backups/` fica fora do git (tem dados pessoais de leads).
- Opções: `node scripts/backup.mjs --sanity` ou `--banco`.
- Requisitos: `.env.local` com `DATABASE_URL` e estar logado no Sanity (`npx sanity login`).

## Procedimento recomendado
1. Rodar `npm run backup` **uma vez por mês** e antes de qualquer mudança grande (migração, troca de domínio, limpeza de conteúdo).
2. Copiar a pasta do dia para um lugar fora do computador (Google Drive/OneDrive da empresa), com acesso restrito: contém dados de clientes (LGPD).
3. Guardar os últimos 3 backups e apagar os mais antigos.

## Como restaurar
- **Sanity:** `npx sanity dataset import <arquivo>.tar.gz production --replace` (substitui o conteúdo — usar com cuidado; para restaurar um documento só, abrir o histórico dele no Studio ou importar para um dataset de teste e copiar).
- **Banco:** os JSON são cópia de leitura; para restaurar, reinserir as linhas necessárias (SQL ou painel do Supabase).

## Não foi criado (de propósito)
Backup automático agendado. Se o volume de leads crescer, o caminho mais barato é ativar o backup diário do plano pago do Supabase e agendar `npm run backup` numa tarefa mensal.
