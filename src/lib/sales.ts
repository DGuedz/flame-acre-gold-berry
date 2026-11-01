export const PRICE = 2997;
export const PIX = "062996463066";

export type Tier = {
  id: string;
  label: string;
  price: number;
  installments: string;
  calendar: string;
  hours: string;
  course: string;
  legacy: string;
  follow: string;
  fit: string;
};

export const TIERS: Tier[] = [
  {
    id: "curto",
    label: "Curto",
    price: 1497,
    installments: "3x de R$ 499",
    calendar: "Site no ar em 7 dias",
    hours: "2 encontros de 45 min",
    course: "1 sessão. O contratante edita uma seção no Claude ou no Codex, com você do lado.",
    legacy: "Não entra sistema legado. Se precisar, sobe de ritmo.",
    follow: "15 dias a partir do Pix, com dois toques.",
    fit: "Marca e domínio já existem. Querem o site no ar sem abrir o sistema velho.",
  },
  {
    id: "padrao",
    label: "Padrão",
    price: 2997,
    installments: "3x de R$ 999",
    calendar: "Site no ar em 7 dias",
    hours: "4 encontros de 60 min",
    course: "2 sessões. O contratante opera Claude e Codex no projeto, sob a gestão dele.",
    legacy: "1 sistema. A permissão sai na sessão, com você supervisionando.",
    follow: "30 dias a partir do Pix, um toque por semana.",
    fit: "Tem site antigo, documentos e um sistema que o site novo precisa enxergar.",
  },
  {
    id: "longo",
    label: "Longo",
    price: 4997,
    installments: "5x de R$ 999",
    calendar: "Site no ar em 7 dias",
    hours: "8 encontros de 60 min",
    course: "4 sessões. Curso de verdade: há tarefa entre um encontro e outro.",
    legacy: "Até 2 sistemas. Cada acesso novo é numa sessão supervisionada.",
    follow: "45 dias a partir do Pix, toque semanal e um plantão.",
    fit: "Mais de um domínio, marca a organizar, legado que não cabe numa tarde.",
  },
];

export function tierById(id?: string) {
  return TIERS.find((tier) => tier.id === id) ?? TIERS[1];
}

export function formatBrl(value: number) {
  return value.toLocaleString("pt-BR");
}

export const PIPELINE = [
  {
    title: "Prospecção",
    text: "Um nicho, 20 nomes, no máximo 15 mensagens. Ainda não fala os três preços.",
  },
  {
    title: "Fechamento",
    text: "Escolhe um ritmo, manda o Pix e marca o primeiro encontro de contexto.",
  },
  {
    title: "Estágios",
    text: "Contexto, integração e o curso. O contratante entra onde a permissão é dele.",
  },
  {
    title: "Entrega",
    text: "Refino com o cliente e o projeto no ar. Antes disso não se chama de entregue.",
  },
  {
    title: "1 mês",
    text: "Acompanhamento no tamanho do ritmo. Não é suporte infinito.",
  },
];

export const STAGES = [
  {
    n: "1",
    title: "Contexto",
    text: "Sites, documentos, domínios e marca. Sem isso, integração vira chute.",
  },
  {
    n: "2",
    title: "Integração",
    text: "Sistema legado. O contratante autoriza na sessão. Senha não fica solta no grupo.",
  },
  {
    n: "3",
    title: "Claude e Codex",
    text: "O site passa à gestão do contratante. Curso na obra real. Exige dedicação entre as sessões.",
  },
  {
    n: "4",
    title: "Refino e ar",
    text: "Ajustes do cliente e publicação. WhatsApp, SEO da estrutura e a base do Ads vão juntos.",
  },
];

export type Niche = {
  id: string;
  label: string;
  maps: string;
  pain: string;
};

export const NICHES: Niche[] = [
  {
    id: "adv",
    label: "Advogado",
    maps: "advogado Curitiba",
    pain: "O cliente pesquisa, acha o escritório e precisa cair no WhatsApp. Sem isso, ele liga no próximo.",
  },
  {
    id: "dent",
    label: "Dentista",
    maps: "dentista Curitiba",
    pain: "Quem busca horário manda mensagem. O site tem que abrir o WhatsApp da clínica, não um formulário morto.",
  },
  {
    id: "est",
    label: "Estética",
    maps: "clínica de estética Curitiba",
    pain: "Procedimento se fecha no Zap. A página só serve se a conversa começar ali.",
  },
  {
    id: "cont",
    label: "Contador",
    maps: "escritório de contabilidade Curitiba",
    pain: "MEI manda documento no WhatsApp. O site é a porta; o Zap é o balcão.",
  },
  {
    id: "imob",
    label: "Imobiliária",
    maps: "imobiliária Curitiba",
    pain: "Lead de imóvel esfria em uma hora. O botão tem que abrir a conversa com o imóvel já escrito.",
  },
  {
    id: "arq",
    label: "Arquiteto",
    maps: "arquiteto Curitiba",
    pain: "Portfólio sem WhatsApp vira revista. Com o botão, o briefing já chega escrito.",
  },
  {
    id: "psi",
    label: "Psicólogo",
    maps: "psicólogo Curitiba",
    pain: "Paciente não preenche formulário. Ele manda um oi. O site precisa entregar esse oi no seu WhatsApp.",
  },
  {
    id: "pet",
    label: "Pet shop",
    maps: "pet shop Curitiba",
    pain: "Banho e tosa se marcam no Zap. Quem não tem o botão no site perde para a loja da esquina.",
  },
];

export type ScriptKind = {
  id: string;
  label: string;
  build: (input: ScriptInput) => string;
};

export type ScriptInput = {
  business: string;
  niche: Niche;
  seller: string;
  city: string;
  tier: Tier;
};

function who(seller: string) {
  return seller.trim() || "eu";
}

export const SCRIPTS: ScriptKind[] = [
  {
    id: "direto",
    label: "Direto",
    build: ({ business, niche, seller, city, tier }) =>
      `Oi, tudo bem? Aqui é ${who(seller)}.\n\nContrata a construção do site e leva um curso flash de Claude e Codex, feito no projeto de vocês, não numa aula solta.\n\nO ritmo ${tier.label} são ${tier.calendar}, ${tier.hours.toLowerCase()}, R$ ${formatBrl(tier.price)}. WhatsApp de vocês ligado. Vi o ${business || niche.label.toLowerCase()} em ${city}. Posso te contar o caminho?`,
  },
  {
    id: "dor",
    label: "Dor",
    build: ({ business, niche, city, tier }) =>
      `Oi! O ${business || niche.label.toLowerCase()} em ${city} ainda não tem uma obra com começo, meio e fim.\n\nO site entra no ar em ${tier.calendar}, e no caminho o contratante aprende a mexer nele no Claude e no Codex. Ritmo ${tier.label}, R$ ${formatBrl(tier.price)}. Quer que eu explique as fases?`,
  },
  {
    id: "prova",
    label: "Prova",
    build: ({ business, niche, seller, tier }) =>
      `Oi, sou ${who(seller)}. A oferta é a construção do site mais um curso prático de Claude e Codex, no próprio projeto.\n\nRitmo ${tier.label}: ${tier.calendar}, ${tier.hours.toLowerCase()}, R$ ${formatBrl(tier.price)}. Olhei o ${business || niche.label.toLowerCase()}. Te explico em áudio curto ou por aqui?`,
  },
  {
    id: "curto",
    label: "Curto",
    build: ({ business, niche, tier }) =>
      `Oi! Vi o ${business || niche.label.toLowerCase()}.\n\nEu construo o site e, no meio da obra, ensino Claude e Codex na prática. Ritmo ${tier.label}, ${tier.calendar}, R$ ${formatBrl(tier.price)} no Pix ou ${tier.installments}. Posso te mandar as fases?`,
  },
];

export const OBJECTIONS: { q: string; a: string }[] = [
  {
    q: "Tá caro",
    a: "O Curto é R$ 1.497, com 2 encontros. O Padrão, R$ 2.997, 4 encontros. O Longo, R$ 4.997, quando tem legado e mais hora juntos. O curso entra em todos. A verba de anúncio não entra.",
  },
  {
    q: "Vou pensar",
    a: "Beleza. Te mando o exemplo hoje e a gente fala segunda. Manhã ou tarde?",
  },
  {
    q: "Já tenho site",
    a: "Então eu não refaço tudo. Eu ligo o WhatsApp nele: botão, mensagem pronta e o aviso caindo no número de vocês. Se o site estiver velho, eu troco a página junto.",
  },
  {
    q: "Já tenho WhatsApp",
    a: "O Zap de vocês continua. Eu só faço o site mandar o cliente pra ele, com o serviço escrito. Vocês não mudam de número.",
  },
  {
    q: "Não preciso de site",
    a: "O site é a porta. O produto é a conversa no WhatsApp. Sem a porta, quem pesquisa não acha o número.",
  },
  {
    q: "Não tenho tempo para curso",
    a: "Por isso o ritmo existe. No Curto são 2 encontros de 45 min, um deles é a sessão prática. Sem sentar uma vez, o Codex fica na minha mão e você não leva o curso.",
  },
  {
    q: "E o sistema velho?",
    a: "No Curto ele fica de fora. No Padrão entra um sistema, com você autorizando na sessão. No Longo, até dois. Senha não anda sozinha.",
  },
  {
    q: "Vocês sobem o anúncio?",
    a: "A página mede o clique no WhatsApp. A verba e a campanha ficam na conta de vocês. O que eu entrego é a obra e o curso, não a gestão do Ads.",
  },
];

export function closingMessage(pix: string, tier: Tier) {
  const key = pix.trim() || "[sua chave Pix]";
  return `Fechado no ritmo ${tier.label}.\n\nConstrução do site + curso prático de Claude e Codex no projeto de vocês.\n${tier.calendar}. ${tier.hours}.\nCurso: ${tier.course}\nLegado: ${tier.legacy}\nDepois do ar: ${tier.follow}\n\nFases: contexto, integração, curso, refino e publicação.\nO contratante precisa estar nos encontros. Permissão de sistema só na sessão.\n\nValor: R$ ${formatBrl(tier.price)} no Pix, ou ${tier.installments}.\nPix: ${key}\n\nPara o primeiro encontro, separa: sites atuais, domínio, marca, documentos e o WhatsApp que recebe o cliente.\nAssim que o Pix cair, eu marco o contexto.`;
}

export function botPrompt(seller: string, pix: string, city: string, tier: Tier) {
  const name = seller.trim() || "Ana";
  const key = pix.trim() || "chave Pix combinada com o dono";
  return `Você é ${name}, de um estúdio em ${city}. Você vende a construção de um site e, junto, um curso prático de Claude e Codex feito nesse site. Conversa curta, uma ideia por mensagem, sem markdown, sem lista, sem emoji.

Oferta
- Três ritmos, um só produto. Não despeje os três preços na primeira mensagem.
- Curto: R$ 1.497, site em 7 dias, acompanha 15 dias a partir do Pix, 2 encontros de 45 min, sem sistema legado.
- Padrão: R$ 2.997, site em 7 dias, acompanha 30 dias a partir do Pix, 4 encontros de 60 min, 1 sistema legado.
- Longo: R$ 4.997, site em 7 dias, acompanha 45 dias a partir do Pix, 8 encontros de 60 min, até 2 sistemas.
- Ritmo sugerido nesta conversa, se perguntarem preço agora: ${tier.label}, R$ ${formatBrl(tier.price)}, site em 7 dias, acompanhamento ${tier.follow}.
- A entrega do site é 7 dias nos três. O que muda é o tempo de acompanhamento, e ele começa quando o Pix cai.
- O site leva o WhatsApp do cliente, SEO na estrutura e o clique medido para o Ads. Verba de anúncio não entra.
- Pix: ${key}

Fases depois do Pix
- Contexto: sites, documentos, domínios, marca.
- Integração: sistema legado só se o ritmo incluir. O contratante autoriza na sessão.
- Curso: Claude e Codex sob a gestão do contratante. Sem a presença dele, não tem curso.
- Refino e publicação.

Como vender
- A frase é: contratar a construção do site e ganhar o curso na obra.
- Não prometa primeiro lugar, nem que você administra o Google Ads.
- Não peça senha por mensagem.
- Se a pessoa não puder sentar nos encontros, ofereça o Curto, não finja que o curso acontece sozinho.
- No sim, confirme o ritmo, passe o Pix e peça o material do contexto.
- No máximo 2 mensagens seguidas sem resposta.`;
}

export function kapsoSketch() {
  return `O que você entrega no site (sem copiar bot de ninguém)

No botão do site, link wa.me do número DO CLIENTE:
https://wa.me/55DDDNUMERO?text=Oi%2C%20vim%20pelo%20site%20e%20quero%20falar%20sobre%20...

A mensagem já nasce escrita. O WhatsApp que abre é o dele.

Quando for a sua vez de atender pelo Kapso (número seu, ou o do cliente se ele te der acesso):

1. Phone number no painel. Copia o phone_number_id.
2. API key só no servidor. Header X-API-Key.
3. Webhook do evento whatsapp.message.received.
   POST https://api.kapso.ai/platform/v1/whatsapp/phone_numbers/{phone_number_id}/webhooks
4. Confere X-Webhook-Signature e responde 200.
5. Texto livre só dentro de 24h depois que a pessoa falou. Fora isso, só template aprovado. Não dispara lista fria por ali: queima o número.
6. Resposta:
   POST https://api.kapso.ai/meta/whatsapp/v24.0/{phone_number_id}/messages
   {
     "messaging_product": "whatsapp",
     "recipient_type": "individual",
     "to": "5541...",
     "type": "text",
     "text": { "body": "..." }
   }

O site de segunda não depende desse webhook. O webhook é o atendimento que você liga depois, no número certo.`;
}

export const SATURDAY = [
  { id: "s1", text: "Travar o ritmo padrão na conversa. Os outros dois só se perguntarem horário ou preço." },
  { id: "s2", text: "Preencher seu nome e a chave Pix nesta central." },
  { id: "s3", text: "Escolher 1 nicho só. Não misture oito." },
  { id: "s4", text: "No Google Maps, achar 20 negócios sem site, ou com site sem botão de Zap." },
  { id: "s5", text: "Deixar 1 página sua de exemplo, com o botão abrindo um WhatsApp." },
];

export const SUNDAY = [
  { id: "d1", text: "Mandar no máximo 15 mensagens, entre 10h e 17h." },
  { id: "d2", text: "Sem link na primeira mensagem. Sem áudio longo." },
  { id: "d3", text: "Variar o texto. Copiar e colar idêntico toma bloqueio." },
  { id: "d4", text: "Quem responder, marcar como respondeu e seguir o script." },
];

export const MONDAY = [
  { id: "m1", text: "Follow-up curto em quem visualizou e não respondeu." },
  { id: "m2", text: "Empurrar quem disse 'vou pensar' para um horário hoje." },
  { id: "m3", text: "No sim: mandar o fechamento do ritmo escolhido, com o Pix." },
  { id: "m4", text: "Pix caiu: marcar o encontro de contexto e pedir sites, domínio, marca e documentos." },
];

export const INCLUDES = [
  "Construção do site, com WhatsApp, SEO da estrutura e base de Ads",
  "Curso prático de Claude e Codex, no projeto, não em slide",
  "Estágios: contexto, integração, curso, refino e ar",
  "1 mês de acompanhamento no tamanho do ritmo",
];

export const EXCLUDES = [
  "Verba de anúncio e gestão de campanha",
  "Promessa de primeiro lugar no Google",
  "Senha enviada por mensagem, sem o contratante na sessão",
  "Curso sem a presença de quem vai operar",
  "Sistema legado no ritmo Curto",
];

export const SECTIONS = [
  "Hero — frase, cidade e o botão do WhatsApp",
  "Serviços — exatamente 3",
  "Prova — bairro e em quanto tempo respondem",
  "Passos — 3, do clique até a mensagem",
  "Perguntas — 3",
  "Fecho — o mesmo WhatsApp, de novo",
];

export function codexBrief(city: string) {
  const place = city.trim() || "Curitiba";
  return `Arquivo único de conteúdo. Codex e Claude só mexem nele.

secoes:
- hero: frase, cidade, botao WhatsApp
- servicos: exatamente 3
- prova: bairro e tempo de resposta
- passos: 3
- faq: 3
- fecho: o mesmo WhatsApp

seo:
- title com o serviço e ${place}
- description com cerca de 150 caracteres, citando WhatsApp
- um H1 só, o mesmo texto do hero
- dados locais (nome, telefone, endereço, cidade)
- sitemap e robots

ads:
- um único botão, o WhatsApp
- no clique, evento whatsapp_click para o Google Ads
- nenhum segundo botão competindo

Pedido:
"Muda só o conteúdo. Não cria página nova, não mexe no layout, não promete posição no Google."`;
}
