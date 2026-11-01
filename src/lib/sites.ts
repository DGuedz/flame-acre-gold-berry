export type Peca = { titulo: string; frase: string };

export type Site = {
  id: "curto" | "padrao" | "longo";
  nome: string;
  preco: number;
  cara: string;
  atras: Peca[];
};

export const SITES: Site[] = [
  {
    id: "curto",
    nome: "Vitrine",
    preco: 1497,
    cara: "Uma página. Quem pesquisa cai no seu Zap.",
    atras: [
      { titulo: "Uma página", frase: "Seu nome, o que você faz e o botão do WhatsApp. A frente é só isso." },
      { titulo: "WhatsApp", frase: "O botão abre o Zap que recebe o cliente." },
      { titulo: "Google", frase: "A página já nasce com título e texto. Quem pesquisa pode te achar." },
      { titulo: "Domínio", frase: "Se o domínio já é seu, a página aponta pra ele." },
      { titulo: "Sem sistema velho", frase: "Caixa, agenda e programa antigo não entram. Se precisar, o site é outro." },
      { titulo: "Uma aula", frase: "Você mexe numa parte da página, com a gente do lado." },
      { titulo: "15 dias", frase: "Depois do Pix, dois toques. Aí para." },
    ],
  },
  {
    id: "padrao",
    nome: "Loja",
    preco: 2997,
    cara: "Dá pra entrar. O que você vende está escrito.",
    atras: [
      { titulo: "Mais que a vitrine", frase: "Páginas do que você vende, de quem você é e de como chamar." },
      { titulo: "WhatsApp", frase: "Cada página chama no mesmo Zap." },
      { titulo: "Google", frase: "Título e texto em cada página, pra pesquisa." },
      { titulo: "Lugar do anúncio", frase: "A estrutura já recebe um anúncio. A verba do Google não entra no preço." },
      { titulo: "Um sistema", frase: "Um programa que você já usa. A senha só anda com você na sala." },
      { titulo: "Duas aulas", frase: "Você opera neste site, não numa aula solta." },
      { titulo: "30 dias", frase: "Um toque por semana, a partir do Pix." },
    ],
  },
  {
    id: "longo",
    nome: "Casa",
    preco: 4997,
    cara: "A marca inteira numa fachada. O que está atrás também.",
    atras: [
      { titulo: "A casa", frase: "Marca, páginas e o Zap na mesma fachada." },
      { titulo: "WhatsApp", frase: "Um Zap comercial. O cliente não cai em número pessoal." },
      { titulo: "Google e anúncio", frase: "Pesquisa e o lugar do anúncio. A verba continua fora." },
      { titulo: "Até dois sistemas", frase: "Cada acesso novo é numa sessão, com você autorizando." },
      { titulo: "Domínios", frase: "Se tiver mais de um, a porta da frente é uma só." },
      { titulo: "Quatro aulas", frase: "Tem tarefa entre um encontro e outro. O curso é no projeto." },
      { titulo: "45 dias", frase: "Toque semanal e um plantão. Depois, para." },
    ],
  },
];

export function siteDe(id: string) {
  return SITES.find((site) => site.id === id) ?? SITES[1];
}
