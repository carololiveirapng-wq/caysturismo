/**
 * Textos públicos de Política de Privacidade e Termos de Uso da Cays Turismo.
 *
 * NOTA INTERNA (não exibir na página): texto informativo, escrito para
 * transparência e proteção básica. Não substitui revisão jurídica e não
 * afirma conformidade absoluta com a LGPD. Revisar quando:
 * - o canal de privacidade for confirmado pelo cliente (hoje aponta para a
 *   página de contato, porque há divergência entre contato@ e gerlane@);
 * - houver fornecedor novo que trate dados (ex.: Resend, se for ativado —
 *   hoje não está configurado em produção);
 * - o prazo de retenção for definido pelo cliente.
 */

export const LAST_UPDATED = "2026-10-05";

export const controller = {
  legalName: "CAYS VIAGENS E TURISMO LTDA",
  tradeName: "Cays Turismo",
  cnpj: "02.194.063/0001-51",
  city: "Brasília",
  state: "DF",
  website: "caysturismo.com.br",
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
      `Esta política explica como a ${controller.legalName}, que atua como ${controller.tradeName} (CNPJ ${controller.cnpj}, ${controller.city}/${controller.state}), trata seus dados pessoais quando você usa o site e pede um planejamento de viagem.`,
    ],
  },
  {
    id: "dados",
    title: "Quais dados coletamos",
    paragraphs: [
      "Quando você envia o formulário de planejamento, coletamos apenas o que está nele. Campos que você não preencher não são guardados.",
    ],
    list: [
      "Contato: nome, e-mail, WhatsApp e cidade (quando informada).",
      "Preferência de contato: WhatsApp ou e-mail.",
      "Sobre a viagem: destinos de interesse, tipo de experiência, viagem relacionada (quando você chega por uma página específica), mês, ano ou período aproximado, duração, número de adultos e crianças, idade das crianças (quando informada), faixa de investimento e observações.",
      "Origem do contato: como você conheceu a Cays (quando informado), parâmetros de campanha (UTM) e a página pela qual você entrou no site.",
    ],
  },
  {
    id: "uso",
    title: "Como usamos seus dados",
    paragraphs: [
      "Usamos seus dados para responder ao seu pedido de planejamento, entrar em contato pelo canal que você escolheu, entender melhor a viagem que você imagina e dar o atendimento necessário.",
      "Também usamos os dados para operar o site, manter a segurança, prevenir abusos (como envios automáticos repetidos) e organizar nosso atendimento comercial. Os parâmetros de campanha servem para entender de onde vêm os contatos.",
    ],
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento com fornecedores",
    paragraphs: [
      "Não vendemos seus dados. Eles podem ser tratados por fornecedores de tecnologia que usamos para operar o site:",
    ],
    list: [
      "Supabase: armazenamento dos pedidos de planejamento e autenticação da equipe no painel interno.",
      "Vercel: hospedagem e execução do site.",
      "Sanity: gerenciamento do conteúdo do site. Os pedidos de planejamento não são armazenados no Sanity.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies e origem de acesso",
    paragraphs: [
      "O site grava um cookie chamado cays_attribution. Ele é do próprio site (primeira parte), não é publicitário e não é lido por ferramentas de terceiros.",
      "Quando você chega por um link com parâmetros de campanha (utm_source, utm_medium, utm_campaign, utm_content e utm_term), o cookie guarda esses valores e a página de entrada, para que possamos registrar a origem do seu contato. Ele não guarda senha nem dado sensível.",
      "O cookie dura 30 dias e não é renovado a cada visita: vale a primeira origem registrada até o prazo acabar.",
      "Quem entra no painel interno da equipe usa também um cookie de sessão, necessário para manter o acesso.",
      "Você pode apagar os cookies pelo próprio navegador a qualquer momento.",
    ],
  },
  {
    id: "seguranca",
    title: "Armazenamento e segurança",
    paragraphs: [
      "Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acesso não autorizado, perda, alteração ou divulgação indevida. Entre elas estão a conexão criptografada (HTTPS), o acesso restrito ao painel interno e a limitação de envios repetidos no formulário.",
      "Nenhum sistema é totalmente imune a incidentes. Se algo acontecer que possa afetar você de forma relevante, faremos o que a lei exigir para informar.",
    ],
  },
  {
    id: "retencao",
    title: "Retenção",
    paragraphs: [
      "Os dados são mantidos pelo tempo necessário para o atendimento, a continuidade do relacionamento, o cumprimento de obrigações legais e a proteção de direitos. Quando deixarem de ser necessários, podem ser eliminados, salvo quando houver obrigação legítima de conservação.",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    paragraphs: ["Você pode nos pedir, a qualquer momento:"],
    list: [
      "Confirmação de que tratamos seus dados.",
      "Acesso aos dados que temos sobre você.",
      "Correção ou atualização de dados incompletos ou desatualizados.",
      "Exclusão dos seus dados, quando aplicável.",
      "Revogação do consentimento, quando o tratamento depender dele.",
      "Informações sobre com quais fornecedores seus dados são compartilhados.",
    ],
  },
  {
    id: "transferencias",
    title: "Transferências internacionais",
    paragraphs: [
      "Alguns fornecedores de tecnologia podem processar ou armazenar dados em infraestrutura localizada fora do Brasil. Nesses casos, buscamos fornecedores reconhecidos e medidas adequadas de proteção.",
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações desta política",
    paragraphs: [
      "Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última atualização fica no topo da página.",
    ],
  },
  {
    id: "canal",
    title: "Canal de privacidade",
    paragraphs: [
      "Para pedidos sobre seus dados (acesso, correção, exclusão ou outras dúvidas sobre privacidade), use a página de Contato do site e escreva no campo de observações que o assunto é privacidade. Você também pode nos chamar pelo WhatsApp indicado na página de contato.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "uso-do-site",
    title: "Uso do site",
    paragraphs: [
      "O site da Cays Turismo apresenta destinos, experiências, viagens e artigos de curadoria. Ao usá-lo, você concorda em fazê-lo de forma lícita e respeitosa, sem tentar acessar áreas restritas, sobrecarregar o serviço ou enviar informações falsas.",
    ],
  },
  {
    id: "caracter",
    title: "Caráter informativo",
    paragraphs: [
      "Os conteúdos do site têm caráter informativo e servem para inspirar e orientar o planejamento. Eles podem mudar sem aviso prévio e não substituem uma proposta personalizada.",
    ],
  },
  {
    id: "pedido",
    title: "Pedido de planejamento não é contratação",
    paragraphs: [
      "Enviar o formulário de planejamento é um pedido de contato. Ele não gera reserva, compra nem contratação de nenhum serviço.",
    ],
  },
  {
    id: "condicoes",
    title: "Valores e condições",
    paragraphs: [
      "Valores, disponibilidade e condições de cada viagem são apresentados em proposta específica, depois do atendimento. Só existe contratação quando há proposta aceita por escrito.",
    ],
  },
  {
    id: "propriedade",
    title: "Propriedade intelectual",
    paragraphs: [
      "Textos, imagens, marcas e o layout do site pertencem à Cays Turismo ou são usados com autorização. Não é permitido reproduzi-los sem autorização prévia por escrito.",
    ],
  },
  {
    id: "terceiros",
    title: "Links e serviços de terceiros",
    paragraphs: [
      "O site pode trazer links para redes sociais, aplicativos de mensagem e outros sites. Esses serviços têm regras próprias, e não somos responsáveis pelo conteúdo nem pelas práticas deles.",
    ],
  },
  {
    id: "disponibilidade",
    title: "Disponibilidade e erros",
    paragraphs: [
      "Fazemos o possível para manter o site disponível e as informações corretas, mas podem ocorrer interrupções ou imprecisões. Quando identificarmos um erro relevante, faremos a correção assim que possível.",
    ],
  },
  {
    id: "alteracoes",
    title: "Atualizações dos termos",
    paragraphs: [
      "Estes termos podem ser atualizados. A versão vigente é sempre a publicada nesta página, com a data da última atualização.",
    ],
  },
  {
    id: "contato",
    title: "Contato",
    paragraphs: [
      `${controller.legalName} (${controller.tradeName}), CNPJ ${controller.cnpj}, ${controller.city}/${controller.state}.`,
      "Para dúvidas sobre estes termos, use a página de Contato do site.",
    ],
  },
];
