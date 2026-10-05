/**
 * Conteúdo jurídico da Cays Turismo — RASCUNHO PARA REVISÃO.
 *
 * Não é versão final: nada aqui foi validado por advogado ou pelo cliente.
 * Tudo que ainda depende de decisão ou dado do cliente está entre colchetes
 * e em maiúsculas (ex.: [PRAZO DE RETENÇÃO A VALIDAR).
 *
 * Mantido em código (e não no Sanity) de propósito: cláusulas legais devem
 * mudar por revisão versionada no Git, não por edição de conteúdo — assim
 * nenhuma alteração entra no ar sem deixar rastro.
 *
 * `LEGAL_DRAFT` controla o estado de publicação: enquanto for `true`, as
 * páginas mostram o aviso "versão em revisão" e saem do índice do Google.
 * Só mude para `false` depois da validação jurídica e do cliente.
 */
export const LEGAL_DRAFT = true;

export const controller = {
  legalName: "CAYS VIAGENS E TURISMO LTDA",
  tradeName: "Cays Turismo",
  cnpj: "02.194.063/0001-51",
  city: "Brasília",
  state: "DF",
  website: "caysturismo.com.br",
};

/**
 * Canal de privacidade. Sem encarregado (DPO) confirmado, o texto usa só
 * "Canal de Privacidade" e nenhum nome é inventado.
 */
export const privacyChannel = {
  contactName: null as string | null,
  email: null as string | null,
  phone: null as string | null,
};

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export const privacySections: LegalSection[] = [
  {
    id: "quem-somos",
    title: "Quem somos",
    paragraphs: [
      `Esta política descreve como a ${controller.legalName}, que atua como ${controller.tradeName} (CNPJ ${controller.cnpj}, ${controller.city}/${controller.state}), trata dados pessoais quando você usa o site ${controller.website} e solicita um planejamento de viagem.`,
    ],
  },
  {
    id: "dados",
    title: "Quais dados coletamos",
    paragraphs: [
      "Quando você envia o formulário de planejamento, coletamos somente os campos abaixo. Campos não preenchidos não são armazenados.",
    ],
    list: [
      "Identificação e contato: nome, e-mail, WhatsApp e cidade (opcional).",
      "Preferência de contato (WhatsApp ou e-mail).",
      "Sobre a viagem: destinos de interesse, tipo de experiência, produto de viagem relacionado (quando você chega a partir de uma página específica), mês, ano ou datas aproximadas, duração, número de adultos e crianças, idade das crianças (quando informada), faixa de investimento (escolha ou texto livre) e observações.",
      "Origem do pedido: como você conheceu a Cays (opcional) e os dados de campanha descritos na seção de cookies.",
      "Página de entrada do formulário.",
    ],
  },
  {
    id: "coleta",
    title: "Como os dados são coletados",
    paragraphs: [
      "Os dados são informados por você diretamente no formulário do site.",
      "Além disso, o site registra os parâmetros de campanha (UTM) da primeira visita, em um cookie descrito na seção Cookies e UTMs.",
      "Não utilizamos, neste rascunho, ferramentas de análise de comportamento de terceiros. [CONFIRMAR: nenhuma ferramenta de mensuração ou pixel de anúncio está instalada]",
    ],
  },
  {
    id: "finalidades",
    title: "Para que usamos os dados",
    paragraphs: [
      "Cada finalidade abaixo tem uma base legal que ainda precisa ser confirmada pelo jurídico. A base legal aparece como marcação até essa validação.",
    ],
    list: [
      "Responder seu pedido de planejamento de viagem. [BASE LEGAL A VALIDAR]",
      "Entrar em contato pelo canal que você escolheu. [BASE LEGAL A VALIDAR]",
      "Elaborar proposta e conduzir o atendimento comercial, se você quiser seguir. [BASE LEGAL A VALIDAR]",
      "Operar o site e o painel interno da equipe. [BASE LEGAL A VALIDAR]",
      "Segurança e prevenção de abuso, como limitar envios repetidos e bloquear robôs. [BASE LEGAL A VALIDAR]",
      "Medir de qual campanha ou canal vieram os pedidos. [BASE LEGAL A VALIDAR]",
    ],
  },
  {
    id: "compartilhamento",
    title: "Com quem podemos compartilhar",
    paragraphs: [
      "Não vendemos seus dados. Compartilhamos apenas com fornecedores que nos ajudam a operar o site, nas finalidades acima:",
    ],
    list: [
      "Supabase: armazenamento do banco de dados dos pedidos e autenticação do painel interno.",
      "Vercel: hospedagem e execução do site.",
      "Sanity: gerenciamento do conteúdo do site. Os pedidos de viagem não são armazenados no Sanity.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies e UTMs",
    paragraphs: [
      "Cookie de origem (cays_attribution): quando você chega ao site por um link com parâmetros de campanha (utm_source, utm_medium, utm_campaign, utm_content, utm_term), guardamos esses valores e a página de entrada para identificar de onde veio o pedido.",
      "Duração: 30 dias. O cookie não é renovado a cada visita: a primeira origem registrada é mantida até o prazo acabar.",
      "Características: é técnico, do próprio site (primeira parte), não guarda senha nem dado sensível e não é lido por ferramentas de terceiros.",
      "Membros da equipe que entram no painel interno usam um cookie de sessão de autenticação, necessário para o acesso. Visitantes que não entram no painel não recebem esse cookie.",
      "Você pode apagar os cookies pelo próprio navegador a qualquer momento. [VALIDAR SE É NECESSÁRIO UM AVISO DE COOKIES NO SITE]",
    ],
  },
  {
    id: "armazenamento",
    title: "Armazenamento e segurança",
    paragraphs: [
      "Adotamos medidas técnicas e administrativas razoáveis para proteger os dados, como conexão criptografada (HTTPS), acesso ao painel restrito à equipe autenticada e limitação de envios repetidos no formulário. [VALIDAR DESCRIÇÃO DAS MEDIDAS COM O CLIENTE]",
      "Nenhum sistema é totalmente imune a incidentes. Se ocorrer um incidente que possa causar risco relevante a você, avisaremos nos termos da lei.",
    ],
  },
  {
    id: "retencao",
    title: "Retenção",
    paragraphs: [
      "Mantemos os dados pelo tempo necessário para as finalidades acima e para cumprir obrigações legais ou contratuais.",
      "[PRAZO DE RETENÇÃO A VALIDAR — o cliente ainda não definiu prazos. Não preencher sem decisão formal.]",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    paragraphs: ["Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode pedir:"],
    list: [
      "Confirmação de que tratamos seus dados.",
      "Acesso aos dados que temos sobre você.",
      "Correção de dados incompletos, inexatos ou desatualizados.",
      "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.",
      "Informação sobre com quais entidades compartilhamos seus dados.",
      "Revogação do consentimento, quando o tratamento depender dele.",
      "Oposição a tratamentos realizados em outra hipótese, quando cabível.",
      "Eliminação dos dados tratados com base no seu consentimento, observadas as exceções legais.",
    ],
  },
  {
    id: "solicitar",
    title: "Como solicitar acesso, correção ou exclusão",
    paragraphs: [
      "Envie sua solicitação para o canal de privacidade indicado no fim desta página. Podemos pedir informações para confirmar sua identidade antes de atender.",
      "[PROCEDIMENTO INTERNO DE EXCLUSÃO A VALIDAR PELO CLIENTE]",
    ],
  },
  {
    id: "transferencias",
    title: "Transferências internacionais",
    paragraphs: [
      "Alguns fornecedores listados acima podem processar dados fora do Brasil, dependendo da região onde seus serviços estão hospedados. [CONFIRMAR REGIÕES DE HOSPEDAGEM E BASE PARA TRANSFERÊNCIA]",
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações nesta política",
    paragraphs: [
      "Podemos atualizar esta política para refletir mudanças no site ou na legislação. A data de atualização fica no topo da página.",
    ],
  },
  {
    id: "canal",
    title: "Canal de privacidade",
    paragraphs: [
      privacyChannel.contactName
        ? `Encarregado: ${privacyChannel.contactName}.`
        : "Canal de Privacidade. [ENCARREGADO (DPO) NÃO DEFINIDO — usar apenas este canal até validação]",
      privacyChannel.email
        ? `E-mail: ${privacyChannel.email}.`
        : "E-mail: [E-MAIL DO CANAL DE PRIVACIDADE A VALIDAR]",
      "Você também pode apresentar reclamações à Autoridade Nacional de Proteção de Dados (ANPD).",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "natureza",
    title: "Natureza informativa do site",
    paragraphs: [
      "O site da Cays Turismo apresenta destinos, experiências, viagens e artigos de curadoria para inspirar e orientar o planejamento. Os conteúdos têm caráter informativo.",
    ],
  },
  {
    id: "pedido",
    title: "Pedido de planejamento não é contratação",
    paragraphs: [
      "Enviar o formulário de planejamento é apenas um pedido de contato. Ele não gera reserva, compra nem contratação automática de nenhum serviço.",
    ],
  },
  {
    id: "condicoes",
    title: "Condições comerciais",
    paragraphs: [
      "Preços, disponibilidade, condições de pagamento, cancelamento e demais termos comerciais dependem de proposta e de contrato específicos, feitos depois do atendimento.",
      "[CONDIÇÕES COMERCIAIS GERAIS A DEFINIR PELO CLIENTE — não preencher sem confirmação]",
    ],
  },
  {
    id: "propriedade",
    title: "Propriedade intelectual",
    paragraphs: [
      "Textos, imagens, marcas, layout e demais conteúdos do site pertencem à Cays Turismo ou são usados com autorização. Não é permitido reproduzi-los sem autorização prévia por escrito.",
    ],
  },
  {
    id: "uso",
    title: "Uso adequado do site",
    paragraphs: [
      "Você se compromete a usar o site de forma lícita, sem tentar acessar áreas restritas, sobrecarregar o serviço, enviar dados falsos ou usar o formulário para spam.",
    ],
  },
  {
    id: "terceiros",
    title: "Links e serviços de terceiros",
    paragraphs: [
      "O site pode conter links para redes sociais, plataformas de mensagem e outros sites. Não somos responsáveis pelo conteúdo nem pelas práticas desses terceiros.",
    ],
  },
  {
    id: "responsabilidade",
    title: "Limitação de responsabilidade",
    paragraphs: [
      "Empregamos cuidado razoável com as informações do site, mas elas podem ficar desatualizadas ou conter imprecisões. Não nos responsabilizamos por decisões tomadas apenas com base nos conteúdos informativos.",
      "[LIMITAÇÃO DE RESPONSABILIDADE A VALIDAR PELO JURÍDICO]",
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações destes termos",
    paragraphs: ["Podemos atualizar estes termos. A versão vigente é sempre a publicada nesta página."],
  },
  {
    id: "contato",
    title: "Contato",
    paragraphs: [
      `${controller.legalName} (${controller.tradeName}), CNPJ ${controller.cnpj}, ${controller.city}/${controller.state}.`,
      "Para dúvidas sobre estes termos, use o canal indicado em nossa Política de Privacidade. [E-MAIL DE CONTATO GERAL A VALIDAR]",
    ],
  },
];

export const dataProcessors = ["Supabase", "Vercel", "Sanity"] as const;
