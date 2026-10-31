import { TIERS, tierById, type Tier } from "@/lib/sales";

export type Opcao = {
  id: string;
  label: string;
  logo: string;
};

export const USA: Opcao[] = [
  { id: "whatsapp", label: "WhatsApp", logo: "whatsapp" },
  { id: "instagram", label: "Instagram", logo: "instagram" },
  { id: "google", label: "Google", logo: "google" },
  { id: "email", label: "E-mail", logo: "gmail" },
];

export const EMPERRA: Opcao[] = [
  { id: "achar", label: "Não me acham", logo: "google" },
  { id: "chamar", label: "Não chamam no Zap", logo: "whatsapp" },
  { id: "escrever", label: "Não mandam e-mail", logo: "gmail" },
  { id: "ver", label: "Não veem o que eu vendo", logo: "instagram" },
];

export const TRIAGEM: { id: string; label: string }[] = [
  { id: "logo", label: "Já tenho logo" },
  { id: "dominio", label: "Já tenho domínio" },
  { id: "zap", label: "O Zap é comercial" },
  { id: "sento", label: "Sento esta semana" },
];

export type Item = {
  logo: string;
  label: string;
  frase: string;
};

export type Beneficio = {
  titulo: string;
  frase: string;
};

export type Horario = {
  id: string;
  quando: string;
  nota: string;
};

export function diagnostico(usa: string[], emperra: string[]) {
  const itens: Item[] = [];
  const zap = usa.includes("whatsapp") || emperra.includes("chamar") || usa.length === 0;
  const google = !usa.includes("google") || emperra.includes("achar");
  const email = usa.includes("email") || emperra.includes("escrever");
  const vitrine = usa.includes("instagram") || emperra.includes("ver");

  if (zap) itens.push({ logo: "whatsapp", label: "WhatsApp", frase: "O botão abre o seu Zap." });
  if (google) itens.push({ logo: "google", label: "Google", frase: "O cliente te acha na pesquisa." });
  if (vitrine) itens.push({ logo: "instagram", label: "Instagram", frase: "Quem te vê no Instagram cai no site." });
  if (email) itens.push({ logo: "gmail", label: "E-mail", frase: "O aviso também cai no seu e-mail." });

  const canais = [zap, google, email || vitrine].filter(Boolean).length;
  const sugerido = tierById(canais >= 3 ? "longo" : canais === 2 ? "padrao" : "curto");
  return { itens, sugerido };
}

export function beneficios(tier: Tier): Beneficio[] {
  return [
    { titulo: "No ar", frase: `${tier.calendar}. O botão abre o seu WhatsApp.` },
    { titulo: "Os encontros", frase: tier.hours + ". Você senta. A gente faz junto." },
    { titulo: "O curso", frase: tier.course },
    { titulo: "O que entra de sistema", frase: tier.legacy },
    { titulo: "Depois do ar", frase: tier.follow },
  ];
}

const FECHO: Record<string, { promessa: string; entrega: string; acompanha: string; fecha: string }> = {
  curto: {
    promessa: "Quem pesquisa te acha e cai no seu Zap.",
    entrega: "Site em 7 dias",
    acompanha: "Acompanha 15 dias",
    fecha: "O Pix liga 15 dias de acompanhamento. O site entra em 7.",
  },
  padrao: {
    promessa: "O site mostra o que você vende e chama no Zap.",
    entrega: "Site em 7 dias",
    acompanha: "Acompanha 30 dias",
    fecha: "O Pix liga 30 dias de acompanhamento. O site entra em 7.",
  },
  longo: {
    promessa: "Marca, domínio e o sistema velho cabem numa fachada só.",
    entrega: "Site em 7 dias",
    acompanha: "Acompanha 45 dias",
    fecha: "O Pix liga 45 dias de acompanhamento. O site entra em 7.",
  },
};

export function oferta(id: string) {
  return FECHO[id] ?? FECHO.padrao;
}

export function precos() {
  return TIERS.map((tier) => ({
    id: tier.id,
    label: tier.label,
    valor: `R$ ${tier.price.toLocaleString("pt-BR")}`,
    quando: tier.calendar,
    ...oferta(tier.id),
  }));
}

export function horarios(tier: Tier, senta: boolean): Horario[] {
  const mesa: Record<string, Horario[]> = {
    curto: [
      { id: "c1", quando: "Terça, 10h", nota: "Contexto. 45 min." },
      { id: "c2", quando: "Quinta, 15h", nota: "Contexto. 45 min." },
      { id: "c3", quando: "Terça que vem, 10h", nota: "Contexto. 45 min." },
    ],
    padrao: [
      { id: "p1", quando: "Quarta, 10h", nota: "Contexto. 60 min." },
      { id: "p2", quando: "Sexta, 14h", nota: "Contexto. 60 min." },
      { id: "p3", quando: "Segunda que vem, 9h", nota: "Contexto. 60 min." },
    ],
    longo: [
      { id: "l1", quando: "Quinta, 9h", nota: "Contexto. 60 min." },
      { id: "l2", quando: "Sexta, 16h", nota: "Contexto. 60 min." },
      { id: "l3", quando: "Terça que vem, 11h", nota: "Contexto. 60 min." },
    ],
  };
  const lista = mesa[tier.id] ?? mesa.padrao;
  if (senta) return lista.filter((item) => !item.quando.includes("que vem"));
  return lista.filter((item) => item.quando.includes("que vem"));
}

export function mensagemAgenda(
  nome: string,
  tier: Tier,
  itens: Item[],
  marcas: string[],
  horario: Horario,
) {
  const quem = nome.trim() || "oi";
  const entra = itens.map((item) => item.label.toLowerCase()).join(", ");
  const pronto = [
    marcas.includes("logo") ? "Você já tem logo." : "",
    marcas.includes("dominio") ? "O domínio já é seu." : "",
    marcas.includes("zap") ? "O WhatsApp que recebe o cliente é comercial." : "",
  ].filter(Boolean);
  const falta =
    marcas.includes("logo") && marcas.includes("dominio")
      ? ""
      : "Se logo ou domínio ainda não estiver na mão, a gente resolve nesse primeiro encontro.";
  return [
    `Oi, ${quem}. O Pix do ${tier.label} caiu. R$ ${tier.price.toLocaleString("pt-BR")}.`,
    entra ? `Pelo que você marcou, o site entra com ${entra}.` : "",
    pronto.join(" "),
    falta,
    `Site em 7 dias. Acompanhamento: ${tier.follow}`,
    `Travei o primeiro encontro: ${horario.quando}. ${horario.nota} A gente olha o que você vende, a marca e o número que recebe o cliente.`,
    `Me responde "fechado" que esse horário fica seu.`,
  ]
    .filter(Boolean)
    .join(" ");
}

export function waLink(phone: string, text: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length <= 11) digits = `55${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function mailLink(email: string, text: string) {
  const subject = encodeURIComponent("Pix caiu — horário do seu site");
  const body = encodeURIComponent(text);
  return `mailto:${email.trim()}?subject=${subject}&body=${body}`;
}
