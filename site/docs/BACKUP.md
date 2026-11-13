# Backup técnico — o que existe, como rodar e como restaurar

## O que já é recuperável sem fazer nada
- **Sanity (conteúdo):** o Studio guarda o histórico de versões de cada documento (relógio / "Histórico" no documento). Neste projeto a retenção é de **3 dias** (plano gratuito: `maxRetentionDays = 3`). Serve para desfazer uma edição recente, **não** é backup.
- **Imagens:** ficam no Sanity e entram no export abaixo.
- **Supabase (leads):** conferir no painel do Supabase se há backups automáticos (dependem do plano; o gratuito não garante). Não presumir.
- **Código:** GitHub, repositório `caysturismo`.

## Como rodar (testado em 13/11/2026)
Dentro de `site/`:
```
npm run backup                      # Sanity + banco
node scripts/backup.mjs --sanity    # só Sanity
node scripts/backup.mjs --banco     # só banco (leads)
```
Requisitos: estar logado no Sanity (`npx sanity login`) e ter `DATABASE_URL` no `.env.local`. O script só **lê** dos dois serviços; não altera nada em produção.

**Onde salva:** `<raiz do repositório>/_backups/AAAA-MM-DD/` (a pasta fica fora do git, porque tem dados pessoais de leads):
- `sanity-production.tar.gz` — documentos + imagens
- `banco/<tabela>.json` — uma tabela por arquivo (leads, eventos de lead…)

**Resultado do teste real (13/11/2026):** export concluído em ~18 s; **119 documentos** (inclui 4 rascunhos — a Home, entre eles — e todas as referências entre documentos, que são IDs dentro dos próprios documentos); **203 imagens** dentro do arquivo; tamanho **88 MB**. Banco: `leads` (44 linhas) e `lead_events` (114 linhas).

## Procedimento recomendado
1. Rodar `npm run backup` **uma vez por mês** e **antes** de qualquer mudança grande (migração, troca de domínio, limpeza de conteúdo, publicação em lote).
2. Copiar a pasta do dia para fora do computador (Drive/OneDrive da empresa, acesso restrito — contém dados de clientes, LGPD).
3. Manter os 3 últimos backups; apagar os mais antigos.

## Como restaurar (documentado; NÃO foi executado em produção)
Antes de qualquer restauração, rode `npm run backup` de novo (para poder voltar atrás).
- **Um documento só (o caso mais comum):** abrir o histórico do documento no Studio (até 3 dias). Se já passou disso: descompactar o `.tar.gz`, abrir `data.ndjson`, copiar o documento desejado (procure pelo `_id`) e colar no Studio ou criar um arquivo `.ndjson` só com ele e importar com `--replace` (abaixo).
- **Conferir sem risco:** importar para um dataset de teste, nunca direto no `production`:
  `npx sanity dataset import sanity-production.tar.gz restauracao-teste --missing`
  (`npx sanity dataset create restauracao-teste` antes; apagar depois).
- **Restauração completa:** `npx sanity dataset import sanity-production.tar.gz production --replace`.
  `--replace` troca os documentos que têm o mesmo `_id`; documentos criados **depois** do backup **não** são apagados. `--missing` só traz o que está faltando. Imagens já existentes são reaproveitadas (`--replace-assets` força reenviar).
- **Banco (leads):** os JSON são cópia de leitura. Para restaurar, reinserir as linhas necessárias (SQL ou painel do Supabase). Não há restauração automática.

## Não foi criado (de propósito)
Backup agendado automático. Se o volume de leads crescer, o caminho mais simples é ativar o backup diário do plano pago do Supabase e lembrar o `npm run backup` mensal.
